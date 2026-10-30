import { composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import type { TreeNode } from './impl';
import { buildBST, type KthInput } from './node';

export function* trace(input: KthInput): Generator<Frame, number> {
  const root = buildBST(input.values);
  const k = input.k;
  const st: TreeNode[] = [];
  const popped: number[] = [];
  const idOf = (n: TreeNode) => `v${n.val}`;

  const viz = (cur: TreeNode | null, extra: Record<string, Highlight> = {}) => {
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
    const h: Record<string, Highlight> = {};
    for (const s of st) h[idOf(s)] = 'pointer';
    for (const v of popped) h[`v${v}`] = 'done';
    if (cur) h[idOf(cur)] = 'active';
    Object.assign(h, extra);
    const marks: Record<string, string> = {};
    popped.forEach((v, i) => { marks[`v${v}`] = `#${i + 1}`; });
    const tree: TreeVisual = { kind: 'tree', title: 'BST (tím = node, xanh dương = trong stack, xanh lá = đã pop, #i = thứ tự inorder)', nodes, rootId, highlights: h, marks };
    return composite([
      tree,
      stack(st.length ? st.map((s) => s.val) : ['∅'], {}, `stack (${st.length} node chờ xử lý)`),
    ]);
  };

  let node = root;
  let count = 0;
  const v = () => ({ node: node ? node.val : null, count, k, stack: st.map((s) => s.val) });

  yield frame(21, v(), viz(node),
    `Dựng BST từ [${input.values.join(', ')}] rồi tìm phần tử nhỏ thứ k = ${k}. Inorder (trái → gốc → phải) của BST đi qua các giá trị theo thứ tự tăng dần, nên chỉ cần đếm node khi "thăm".`);
  yield frame(23, v(), viz(node),
    'Stack tường minh thay cho call stack của đệ quy: cho phép dừng ngay khi tìm thấy, không phải duyệt hết cây. count đếm số node đã thăm theo inorder.');
  while (node !== null || st.length > 0) {
    yield frame(24, v(), viz(node),
      node !== null
        ? `node = ${node.val} khác null ⇒ còn cây con cần khám phá.`
        : `node = null nhưng stack còn ${st.length} node ⇒ quay về tổ tiên gần nhất chưa thăm.`);
    while (node !== null) {
      st.push(node);
      yield frame(26, v(), viz(node),
        `Đẩy ${node.val} vào stack: chưa thể thăm nó vì mọi node trong cây con trái đều nhỏ hơn ${node.val} và phải được đếm trước.`);
      node = node.left;
      yield frame(27, v(), viz(node),
        node ? `Đi sang con trái ${node.val}.` : 'Con trái là null ⇒ đã chạm đáy trái, đỉnh stack là node nhỏ nhất chưa thăm.');
    }
    node = st.pop()!;
    yield frame(29, v(), viz(node),
      `Pop ${node.val}: cây con trái của nó đã xử lý xong (hoặc rỗng), nên ${node.val} là giá trị nhỏ nhất còn lại.`);
    count++;
    popped.push(node.val);
    yield frame(30, v(), viz(node, { [idOf(node)]: 'done' }),
      `Thăm ${node.val} ⇒ count = ${count}: ${node.val} là phần tử nhỏ thứ ${count} của cây.`);
    if (count === k) {
      yield frame(31, { ...v(), result: node.val }, viz(node, { [idOf(node)]: 'swap' }),
        `count === k = ${k} ⇒ trả về ${node.val}. Dừng sớm: chỉ tốn O(h + k) thay vì duyệt toàn bộ n node.`);
      return node.val;
    }
    yield frame(31, v(), viz(node, { [idOf(node)]: 'done' }), `count = ${count} < k = ${k} ⇒ chưa tới, tiếp tục.`);
    node = node.right;
    yield frame(32, v(), viz(node),
      node ? `Chuyển sang cây con phải (gốc ${node.val}): các giá trị ở đó lớn hơn node vừa thăm nhưng nhỏ hơn tổ tiên đang chờ trong stack.` : 'Không có con phải ⇒ lần lặp sau sẽ pop tổ tiên kế tiếp từ stack.');
  }
  yield frame(34, { count, k, result: -1 }, viz(null),
    `Duyệt hết ${count} node mà chưa tới k = ${k} ⇒ k không hợp lệ, trả về -1.`);
  return -1;
}
