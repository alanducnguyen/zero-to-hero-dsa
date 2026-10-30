import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import type { TreeNode } from './impl';
import { fromLevelOrder, parseTree, sameTree, type SerializeInput, type SerializeOutput } from './node';

/** Vẽ cây; con rỗng hiện thành node "#" nếu slot của nó nằm trong showNull (hoặc showNull = 'all'). */
function treeViz(
  root: TreeNode | null,
  ids: Map<TreeNode, string>,
  title: string,
  highlights: Record<string, Highlight>,
  showNull: Set<string> | 'all',
): TreeVisual {
  const nodes: TreeVisual['nodes'] = [];
  const build = (n: TreeNode | null, slot: string): string | null => {
    if (n === null) {
      if (showNull === 'all' || showNull.has(slot)) {
        nodes.push({ id: slot, label: '#', children: [] });
        return slot;
      }
      return null;
    }
    const id = ids.get(n)!;
    const l = build(n.left, `${id}L`);
    const r = build(n.right, `${id}R`);
    const children: string[] = [];
    if (l || r) {
      if (l) children.push(l); else { nodes.push({ id: `${id}L`, label: '', children: [], hidden: true }); children.push(`${id}L`); }
      if (r) children.push(r); else { nodes.push({ id: `${id}R`, label: '', children: [], hidden: true }); children.push(`${id}R`); }
    }
    nodes.push({ id, label: String(n.val), children });
    return id;
  };
  const rootId = build(root, 'root');
  return { kind: 'tree', title, nodes, rootId, highlights };
}

export function* trace(input: SerializeInput): Generator<Frame, SerializeOutput> {
  const root = fromLevelOrder(parseTree(input.tree));
  const ids = new Map<TreeNode, string>();
  let seq = 0;
  const assign = (n: TreeNode | null) => {
    if (!n) return;
    ids.set(n, `n${seq++}`);
    assign(n.left);
    assign(n.right);
  };
  assign(root);

  // ---------- Pha 1: serialize ----------
  const out: string[] = [];
  const written = new Set<string>();
  const cs: string[] = ['serialize'];
  const sViz = (cur: string | null) => {
    const h: Record<string, Highlight> = {};
    const all: string[] = [];
    const walk = (n: TreeNode | null, slot: string) => {
      if (!n) { all.push(slot); return; }
      const id = ids.get(n)!;
      all.push(id);
      walk(n.left, `${id}L`);
      walk(n.right, `${id}R`);
    };
    walk(root, 'root');
    for (const id of all) h[id] = written.has(id) ? 'done' : id.endsWith('L') || id.endsWith('R') || id === 'root' ? 'muted' : 'range';
    if (cur) h[cur] = 'active';
    const th: Record<number, Highlight> = {};
    out.forEach((_, k) => { th[k] = k === out.length - 1 ? 'swap' : 'done'; });
    return composite([
      treeViz(root, ids, 'Cây gốc (tím = đang thăm, xanh lá = đã ghi, # = con rỗng)', h, 'all'),
      arr(out.length ? out : ['—'], { title: `Token đã ghi (${out.length})`, highlights: th, mode: 'cells' }),
    ]);
  };
  const sv = (node: TreeNode | null) => ({ node: node ? node.val : null, out: out.join(',') });

  function* dfs(node: TreeNode | null, slot: string): Generator<Frame, void> {
    cs.push(`dfs(${node ? node.val : '#'})`);
    if (node === null) {
      out.push('#');
      written.add(slot);
      yield frame(16, sv(node), sViz(slot),
        'Con rỗng ⇒ ghi "#". Đây là thông tin then chốt: nếu bỏ qua null, preorder "1,2" không phân biệt được 2 là con trái hay con phải của 1.', { callStack: [...cs] });
      cs.pop();
      return;
    }
    const id = ids.get(node)!;
    out.push(String(node.val));
    written.add(id);
    yield frame(19, sv(node), sViz(id),
      `Ghi ${node.val} TRƯỚC khi đi xuống con (preorder) ⇒ khi đọc lại, token đầu tiên của mỗi đoạn luôn là gốc của cây con đó.`, { callStack: [...cs] });
    yield frame(20, sv(node), sViz(id), `Đi sang cây con trái của ${node.val}; toàn bộ cây con trái sẽ được ghi liền một khối ngay sau ${node.val}.`, { callStack: [...cs] });
    yield* dfs(node.left, `${id}L`);
    yield frame(21, sv(node), sViz(id), `Cây con trái của ${node.val} đã ghi xong (kết thúc bằng "#") ⇒ giờ ghi cây con phải.`, { callStack: [...cs] });
    yield* dfs(node.right, `${id}R`);
    cs.pop();
  }

  yield frame(13, { out: '' }, sViz(null),
    `Pha 1 – serialize: duyệt preorder (gốc → trái → phải) và ghi mỗi node thành một token, con rỗng thành "#". Cây có ${ids.size} node ⇒ sẽ có ${ids.size} giá trị + ${ids.size + 1} dấu "#".`, { callStack: [...cs] });
  yield* dfs(root, 'root');
  const data = out.join(',');
  yield frame(24, { data }, sViz(null),
    `data = "${data}". Mọi node đều có đủ 2 "con" (thật hoặc #) nên chuỗi tự mô tả cấu trúc – không cần thêm inorder như cách dựng cây từ 2 dãy duyệt.`, { callStack: ['serialize'] });

  // ---------- Pha 2: deserialize ----------
  const tokens = data.split(',');
  let i = 0;
  let rebuilt: TreeNode | null = null;
  const rIds = new Map<TreeNode, string>();
  const nullSlots = new Set<string>();
  let rSeq = 0;
  const ds: string[] = ['deserialize'];
  const dViz = (cur: string | null, ptr = i) => {
    const h: Record<string, Highlight> = {};
    for (const v of rIds.values()) h[v] = 'done';
    for (const s of nullSlots) h[s] = 'muted';
    if (cur) h[cur] = 'active';
    const th: Record<number, Highlight> = {};
    tokens.forEach((_, k) => { th[k] = k < ptr ? 'visited' : 'range'; });
    if (ptr - 1 >= 0 && ptr - 1 < tokens.length) th[ptr - 1] = 'compare';
    return composite([
      treeViz(rebuilt, rIds, 'Cây dựng lại (tím = node vừa tạo, xanh lá = đã gắn)', h, nullSlots),
      arr(tokens, { title: 'Token (vàng = vừa đọc tokens[i-1], xám = đã tiêu thụ)', highlights: th, pointers: ptr < tokens.length ? [{ name: 'i', index: ptr }] : [], mode: 'cells' }),
    ]);
  };
  const dv = (t?: string) => ({ i, t: t ?? null, data });

  function* build(slot: string, attach: (n: TreeNode) => void): Generator<Frame, TreeNode | null> {
    ds.push(`build(i=${i})`);
    const t = tokens[i++];
    yield frame(32, dv(t), dViz(null),
      `Đọc tokens[${i - 1}] = "${t}" rồi tăng i. Con trỏ i dùng chung cho mọi lời gọi ⇒ mỗi lời gọi build "ăn" đúng phần token của cây con mình, không cần tính trước kích thước.`, { callStack: [...ds] });
    if (t === '#' || t === undefined) {
      nullSlots.add(slot);
      yield frame(33, dv(t), dViz(slot), '"#" ⇒ trả về null: nhánh này rỗng, lời gọi cha sẽ chuyển sang phần tiếp theo.', { callStack: [...ds] });
      ds.pop();
      return null;
    }
    const node: TreeNode = { val: Number(t), left: null, right: null };
    const id = `n${rSeq++}`;
    rIds.set(node, id);
    attach(node);
    yield frame(34, dv(t), dViz(id), `Tạo node ${t}. Theo preorder, token này là gốc của cây con đang dựng.`, { callStack: [...ds] });
    yield frame(35, dv(t), dViz(id), `Gọi build() cho con trái của ${t}: các token kế tiếp mô tả TRỌN cây con trái, kết thúc khi gặp đủ "#".`, { callStack: [...ds] });
    yield* build(`${id}L`, (c) => { node.left = c; });
    yield frame(36, dv(t), dViz(id), `Cây con trái của ${t} xong; i đang trỏ đúng tới đầu cây con phải ⇒ gọi build() lần nữa.`, { callStack: [...ds] });
    yield* build(`${id}R`, (c) => { node.right = c; });
    yield frame(37, dv(t), dViz(id), `Node ${t} đã đủ hai con ⇒ trả về cho cha.`, { callStack: [...ds] });
    ds.pop();
    return node;
  }

  yield frame(29, { data, tokens: tokens.length }, dViz(null, 0),
    `Pha 2 – deserialize: tách "${data}" thành ${tokens.length} token, đọc lại theo đúng thứ tự preorder đã ghi.`, { callStack: [...ds] });
  yield frame(30, dv(), dViz(null), 'i = 0: con trỏ chỉ tiến, mỗi token được tiêu thụ đúng một lần ⇒ O(n).', { callStack: [...ds] });
  yield* build('root', (n) => { rebuilt = n; });
  const roundTrip = sameTree(rebuilt, root);
  yield frame(39, { data, roundTrip, consumed: i }, dViz(null),
    roundTrip
      ? `Đã tiêu thụ ${i}/${tokens.length} token, cây dựng lại trùng khớp cây gốc ⇒ round-trip đúng: deserialize(serialize(t)) = t.`
      : 'Cây dựng lại KHÔNG khớp cây gốc!', { callStack: ['deserialize'] });
  return { data, roundTrip };
}
