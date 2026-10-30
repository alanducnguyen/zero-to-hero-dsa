import { frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import type { TreeNode } from './impl';
import { buildBST, type DepthInput } from './node';

export function* trace(input: DepthInput): Generator<Frame, number> {
  const root = buildBST(input.values ?? []);
  const idOf = (n: TreeNode) => `v${n.val}`;
  const calls: (TreeNode | null)[] = []; // call stack mô phỏng
  const heights = new Map<TreeNode, number>(); // node đã tính xong ⇒ độ sâu cây con

  const viz = (cur: TreeNode | null, extra: Record<string, Highlight> = {}): TreeVisual => {
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
    const marks: Record<string, string> = {};
    for (const [n, d] of heights) { h[idOf(n)] = 'done'; marks[idOf(n)] = `h=${d}`; }
    calls.forEach((c, i) => { if (c) { h[idOf(c)] = 'pointer'; marks[idOf(c)] = `tầng ${i + 1}`; } });
    if (cur) h[idOf(cur)] = 'active';
    Object.assign(h, extra);
    return {
      kind: 'tree',
      title: 'Cây (tím = đang xét, xanh dương = đang chờ trên call stack, xanh lá = đã tính xong, h = độ sâu cây con)',
      nodes, rootId, highlights: h, marks,
    };
  };
  const cs = () => calls.map((c) => `maxDepth(${c ? c.val : 'null'})`);
  const f = (line: number, vars: Record<string, unknown>, cur: TreeNode | null, note: string, extra: Record<string, Highlight> = {}) =>
    frame(line, { ...vars, 'độ sâu đệ quy': calls.length }, viz(cur, extra), note, { callStack: cs() });

  function* dfs(node: TreeNode | null, parent: TreeNode | null, side: string): Generator<Frame, number> {
    calls.push(node);
    if (node === null) {
      yield f(22, { root: null }, null,
        parent
          ? `Con ${side} của ${parent.val} là null ⇒ trả về 0. Đây là base case: cây rỗng không có node nào, và nhờ nó mà lá tự nhiên có độ sâu 1 + max(0, 0) = 1.`
          : 'Cây rỗng (root = null) ⇒ độ sâu 0.',
        parent ? { [idOf(parent)]: 'compare' } : {});
      calls.pop();
      return 0;
    }
    yield f(21, { root: node.val }, node,
      `Gọi maxDepth(${node.val}) ở tầng ${calls.length}. Chưa thể biết độ sâu của cây con gốc ${node.val} cho tới khi biết độ sâu của cả hai con ⇒ đây là duyệt postorder.`);
    yield f(22, { root: node.val }, node, `${node.val} khác null ⇒ không phải base case, phải đệ quy xuống hai con.`);
    yield f(23, { root: node.val }, node,
      node.left ? `Đệ quy sang con trái ${node.val} → ${node.left.val}. Node ${node.val} được "treo" trên call stack chờ kết quả.` : `Con trái của ${node.val} là null – vẫn gọi đệ quy, base case sẽ lo.`);
    const left = yield* dfs(node.left, node, 'trái');
    yield f(23, { root: node.val, left }, node, `Cây con trái của ${node.val} có độ sâu left = ${left}.`);
    yield f(24, { root: node.val, left }, node,
      node.right ? `Đệ quy sang con phải ${node.val} → ${node.right.val}: cần cả hai bên vì nhánh dài nhất có thể nằm ở bất kỳ phía nào.` : `Con phải của ${node.val} là null – gọi đệ quy để nhận 0.`);
    const right = yield* dfs(node.right, node, 'phải');
    const res = 1 + Math.max(left, right);
    heights.set(node, res);
    yield f(25, { root: node.val, left, right, return: res }, node,
      `return 1 + max(${left}, ${right}) = ${res}: +1 tính chính node ${node.val}, cộng với nhánh con sâu hơn. Node ${node.val} xong, pop khỏi call stack.`,
      { [idOf(node)]: 'done' });
    calls.pop();
    return res;
  }

  const result = yield* dfs(root, null, '');
  yield frame(25, { result }, viz(null),
    root
      ? `Kết quả: độ sâu tối đa = ${result}. Mỗi node được thăm đúng một lần ⇒ O(n); call stack sâu nhất bằng chiều cao cây ⇒ O(h) bộ nhớ.`
      : 'Cây rỗng ⇒ độ sâu 0.',
    { callStack: [] });
  return result;
}
