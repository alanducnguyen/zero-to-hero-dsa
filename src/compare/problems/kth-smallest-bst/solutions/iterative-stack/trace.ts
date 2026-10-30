import { composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { buildBST, treeViz, type KthInput, type TreeNode } from '../../shared';

export function* trace(input: KthInput): Generator<Frame, number> {
  const root = buildBST(input.values);
  const k = input.k;
  const st: TreeNode[] = [];
  const popped: number[] = [];
  const viz = (cur: TreeNode | null, curHl: Highlight = 'active') => {
    const h: Record<number, Highlight> = {};
    for (const s of st) h[s.val] = 'pointer';
    for (const p of popped) h[p] = 'done';
    if (cur) h[cur.val] = curHl;
    const marks: Record<number, string> = {};
    popped.forEach((p, i) => { marks[p] = `#${i + 1}`; });
    return composite([
      treeViz(root, h, marks, 'BST (tím = node, xanh dương = trong stack, xanh lá = đã pop, #i = thứ tự inorder)'),
      stack(st.length ? st.map((s) => s.val) : ['∅'], {}, `stack tường minh (${st.length} node)`),
    ]);
  };
  let node = root;
  let count = 0;
  const v = () => ({ node: node ? node.val : null, count, k, stack: st.map((s) => s.val) });

  yield frame(5, v(), viz(node), `Dựng BST từ [${input.values.join(', ')}]. Stack tường minh thay cho call stack: cùng O(h + k) như đệ quy, nhưng nằm trên heap nên cây lệch sâu 10⁵ tầng cũng không tràn stack.`);
  yield frame(7, v(), viz(node), 'node bắt đầu từ gốc, count đếm số node đã thăm theo inorder.');
  while (node !== null || st.length > 0) {
    yield frame(8, v(), viz(node), node !== null ? `node = ${node.val} ⇒ còn cây con cần khám phá.` : `node = null nhưng stack còn ${st.length} node ⇒ quay về tổ tiên gần nhất chưa thăm.`);
    while (node !== null) {
      st.push(node);
      yield frame(10, v(), viz(node), `Đẩy ${node.val}: chưa thăm được vì cây con trái của nó (nhỏ hơn) phải được đếm trước.`);
      node = node.left;
      yield frame(11, v(), viz(node), node ? `Đi sang con trái ${node.val}.` : 'Con trái null ⇒ chạm đáy trái, đỉnh stack là node nhỏ nhất chưa thăm.');
    }
    node = st.pop()!;
    yield frame(13, v(), viz(node), `Pop ${node.val}: cây con trái của nó đã xong, nên ${node.val} là giá trị nhỏ nhất còn lại.`);
    count++;
    popped.push(node.val);
    yield frame(14, v(), viz(node, 'done'), `Thăm ${node.val} ⇒ count = ${count}.`);
    if (count === k) {
      yield frame(15, { ...v(), result: node.val }, viz(node, 'swap'), `count === k = ${k} ⇒ trả về ${node.val} ngay, không cần cờ "found" lan ngược như bản đệ quy.`);
      return node.val;
    }
    node = node.right;
    yield frame(16, v(), viz(node), node ? `Sang cây con phải (gốc ${node.val}): lớn hơn node vừa thăm nhưng nhỏ hơn tổ tiên đang chờ trong stack.` : 'Không có con phải ⇒ vòng sau pop tổ tiên kế tiếp.');
  }
  yield frame(18, { count, k, result: -1 }, viz(null), `Duyệt hết ${count} node mà chưa tới k = ${k} ⇒ trả về -1.`);
  return -1;
}
