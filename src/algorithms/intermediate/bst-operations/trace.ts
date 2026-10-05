import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import type { TreeNode } from './impl';
import { parseOps, toLevelOrder, type BSTInput } from './node';

export function* trace(input: BSTInput): Generator<Frame, { tree: (number | null)[]; searches: string[] }> {
  let root: TreeNode | null = null;
  const searches: string[] = [];
  const cs: string[] = [];
  const idOf = (n: TreeNode) => `v${n.val}`;
  const viz = (hl: Record<string, Highlight> = {}, marks: Record<string, string> = {}) => {
    const nodes: TreeVisual['nodes'] = [];
    const build = (n: TreeNode | null): string | null => {
      if (!n) return null;
      const id = idOf(n);
      const l = build(n.left), r = build(n.right);
      const children: string[] = [];
      if (l || r) {
        if (l) children.push(l); else { nodes.push({ id: `${id}L`, label: '', children: [], hidden: true }); children.push(`${id}L`); }
        if (r) children.push(r); else { nodes.push({ id: `${id}R`, label: '', children: [], hidden: true }); children.push(`${id}R`); }
      }
      nodes.push({ id, label: String(n.val), children });
      return id;
    };
    const rootId = build(root);
    const tree: TreeVisual = { kind: 'tree', title: 'BST: trái < gốc < phải', nodes, rootId, highlights: hl, marks };
    return composite([tree, arr(searches.length ? searches : ['—'], { title: 'Kết quả search' })]);
  };

  function* ins(node: TreeNode | null, val: number, path: string): Generator<Frame, TreeNode> {
    cs.push(`insert(${node ? node.val : 'null'}, ${val})`);
    if (node === null) {
      const fresh: TreeNode = { val, left: null, right: null };
      yield frame(9, { val, path }, viz(), `Tới chỗ trống (${path}) ⇒ tạo node ${val} ở đây. Vị trí này là duy nhất giữ tính chất BST.`, { callStack: [...cs] });
      cs.pop();
      return fresh;
    }
    yield frame(10, { 'root.val': node.val, val }, viz({ [idOf(node)]: 'active' }), val === node.val ? `${val} đã tồn tại ⇒ bỏ qua (BST không trùng).` : `${val} ${val < node.val ? '<' : '>'} ${node.val} ⇒ đi sang ${val < node.val ? 'TRÁI' : 'PHẢI'}.`, { callStack: [...cs] });
    if (val < node.val) node.left = yield* ins(node.left, val, `con trái của ${node.val}`);
    else if (val > node.val) node.right = yield* ins(node.right, val, `con phải của ${node.val}`);
    cs.pop();
    return node;
  }
  function* srch(val: number): Generator<Frame, boolean> {
    cs.push(`search(${val})`);
    let node = root;
    while (node !== null) {
      yield frame(19, { 'node.val': node.val, val }, viz({ [idOf(node)]: val === node.val ? 'done' : 'compare' }), val === node.val ? `Gặp ${val} ⇒ true.` : `${val} ${val < node.val ? '<' : '>'} ${node.val} ⇒ loại nửa ${val < node.val ? 'phải' : 'trái'}, đi ${val < node.val ? 'trái' : 'phải'}.`, { callStack: [...cs] });
      if (val === node.val) { cs.pop(); return true; }
      node = val < node.val ? node.left : node.right;
    }
    yield frame(22, { val, result: false }, viz(), `Chạm null ⇒ ${val} không có trong cây. Số bước = chiều cao đường đi.`, { callStack: [...cs] });
    cs.pop();
    return false;
  }
  function* del(node: TreeNode | null, val: number): Generator<Frame, TreeNode | null> {
    cs.push(`remove(${node ? node.val : 'null'}, ${val})`);
    if (node === null) {
      yield frame(27, { val }, viz(), `Chạm null ⇒ ${val} không có, không xoá gì.`, { callStack: [...cs] });
      cs.pop();
      return null;
    }
    if (val < node.val) {
      yield frame(29, { 'root.val': node.val, val }, viz({ [idOf(node)]: 'active' }), `${val} < ${node.val} ⇒ xoá trong cây con trái.`, { callStack: [...cs] });
      node.left = yield* del(node.left, val);
    } else if (val > node.val) {
      yield frame(31, { 'root.val': node.val, val }, viz({ [idOf(node)]: 'active' }), `${val} > ${node.val} ⇒ xoá trong cây con phải.`, { callStack: [...cs] });
      node.right = yield* del(node.right, val);
    } else {
      const kids = (node.left ? 1 : 0) + (node.right ? 1 : 0);
      yield frame(33, { 'root.val': node.val, children: kids }, viz({ [idOf(node)]: 'swap' }), `Tìm thấy ${val} với ${kids} con.${kids === 0 ? ' Lá ⇒ bỏ luôn.' : kids === 1 ? ' Một con ⇒ nối con lên thay chỗ.' : ' Hai con ⇒ thay bằng successor (nhỏ nhất bên phải) để giữ thứ tự.'}`, { callStack: [...cs] });
      if (node.left === null) { cs.pop(); return node.right; }
      if (node.right === null) { cs.pop(); return node.left; }
      let succ = node.right;
      while (succ.left !== null) succ = succ.left;
      yield frame(36, { successor: succ.val }, viz({ [idOf(node)]: 'swap', [idOf(succ)]: 'done' }), `Successor = ${succ.val} (đi phải 1 bước rồi trái tới cùng). Nó > mọi node bên trái và < mọi node còn lại bên phải.`, { callStack: [...cs] });
      const old = node.val;
      node.val = succ.val;
      yield frame(37, { 'root.val': node.val }, viz({ [idOf(node)]: 'swap' }), `Chép ${succ.val} lên vị trí của ${old}. Giờ ${succ.val} xuất hiện 2 lần ⇒ xoá bản ở cây phải (nó có tối đa 1 con nên dễ).`, { callStack: [...cs] });
      node.right = yield* del(node.right, succ.val);
    }
    cs.pop();
    return node;
  }

  yield frame(9, {}, viz(), 'Cây rỗng. BST: mọi node bên trái nhỏ hơn, bên phải lớn hơn ⇒ tìm kiếm là "binary search trên cây".');
  for (const { op, val } of parseOps(input.ops)) {
    if (op === 'insert') root = yield* ins(root, val, 'gốc');
    else if (op === 'delete') root = yield* del(root, val);
    else { const r = yield* srch(val); searches.push(`search ${val} → ${r}`); }
    yield frame(op === 'insert' ? 12 : op === 'delete' ? 40 : 22, { op, val, tree: toLevelOrder(root) }, viz(), `Sau ${op} ${val}: cây vẫn thoả tính chất BST.`);
  }
  const result = { tree: toLevelOrder(root), searches };
  yield frame(12, result, viz(), `Xong. Chi phí mỗi thao tác = O(h); cây cân bằng h = log n, cây lệch (chèn tăng dần) h = n.`);
  return result;
}
