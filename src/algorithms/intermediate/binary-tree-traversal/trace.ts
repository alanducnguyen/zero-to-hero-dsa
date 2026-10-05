import { arr, composite, frame, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import { fromLevelOrder, type TreeNode } from './impl';
import { normalizeOrder, parseTree, type TraversalInput } from './node';

export function* trace(input: TraversalInput): Generator<Frame, number[]> {
  const root = fromLevelOrder(parseTree(input.tree));
  const order = normalizeOrder(input.order);
  const ids = new Map<TreeNode, string>();
  const nodes: TreeVisual['nodes'] = [];
  let seq = 0;
  const build = (n: TreeNode | null): string | null => {
    if (!n) return null;
    const id = `n${seq++}`;
    ids.set(n, id);
    const l = build(n.left);
    const r = build(n.right);
    const children: string[] = [];
    if (l || r) {
      if (l) children.push(l); else { nodes.push({ id: `${id}L`, label: '', children: [], hidden: true }); children.push(`${id}L`); }
      if (r) children.push(r); else { nodes.push({ id: `${id}R`, label: '', children: [], hidden: true }); children.push(`${id}R`); }
    }
    nodes.push({ id, label: String(n.val), children });
    return id;
  };
  const rootId = build(root);
  const out: number[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];
  const viz = (hl: Record<string, Highlight> = {}, extra?: ReturnType<typeof queueViz>) => {
    const h: Record<string, Highlight> = {};
    for (const v of visited) h[v] = 'visited';
    const tree: TreeVisual = { kind: 'tree', title: `Cây nhị phân – ${order}`, nodes, rootId, highlights: { ...h, ...hl } };
    const parts = [tree, arr(out.length ? out : ['—'], { title: 'Kết quả duyệt' })];
    return composite(extra ? [tree, extra, parts[1]] : parts);
  };
  const cs = () => [...stack];
  const id = (n: TreeNode) => ids.get(n)!;

  if (order === 'bfs') {
    if (!root) {
      yield frame(37, { result: [] }, viz(), 'Cây rỗng ⇒ kết quả rỗng.');
      return out;
    }
    const q: TreeNode[] = [root];
    let head = 0;
    const qViz = () => queueViz(q.slice(head).map((n) => n.val), undefined, 'Queue');
    yield frame(38, { queue: [root.val] }, viz({ [id(root)]: 'range' }, qViz()), 'BFS: đưa gốc vào queue. Queue luôn chứa các node theo thứ tự tầng.');
    while (head < q.length) {
      const node = q[head++];
      yield frame(41, { node: node.val, queueSize: q.length - head }, viz({ [id(node)]: 'active' }, qViz()), `Lấy ${node.val} ra khỏi đầu queue.`, { callStack: ['levelOrder'] });
      out.push(node.val);
      visited.add(id(node));
      yield frame(42, { node: node.val, out: [...out] }, viz({ [id(node)]: 'done' }, qViz()), `Thăm ${node.val}: thêm vào kết quả.`, { callStack: ['levelOrder'] });
      if (node.left) {
        q.push(node.left);
        yield frame(43, { node: node.val, left: node.left.val }, viz({ [id(node)]: 'done', [id(node.left)]: 'range' }, qViz()), `Con trái ${node.left.val} vào cuối queue.`, { callStack: ['levelOrder'] });
      }
      if (node.right) {
        q.push(node.right);
        yield frame(44, { node: node.val, right: node.right.val }, viz({ [id(node)]: 'done', [id(node.right)]: 'range' }, qViz()), `Con phải ${node.right.val} vào cuối queue.`, { callStack: ['levelOrder'] });
      }
    }
    yield frame(46, { result: [...out] }, viz(), `Queue rỗng ⇒ xong. Kết quả theo tầng: ${out.join(', ')}.`);
    return out;
  }

  const fnName = order;
  const lines = { preorder: { enter: 9, visit: 10, left: 11, right: 12, ret: 13 }, inorder: { enter: 18, left: 19, visit: 20, right: 21, ret: 22 }, postorder: { enter: 27, left: 28, right: 29, visit: 30, ret: 31 } }[fnName];
  function* dfs(n: TreeNode | null, from: string): Generator<Frame, void> {
    stack.push(`${fnName}(${n ? n.val : 'null'})`);
    if (!n) {
      yield frame(lines.enter, { root: 'null' }, viz(), `${from}: con là null ⇒ trả về ngay (base case).`, { callStack: cs() });
      stack.pop();
      return;
    }
    yield frame(lines.enter, { root: n.val }, viz({ [id(n)]: 'active' }), `Vào ${fnName}(${n.val}).`, { callStack: cs() });
    const visit = function* () {
      out.push(n.val);
      visited.add(id(n));
      yield frame(lines.visit, { root: n.val, out: [...out] }, viz({ [id(n)]: 'done' }), `Thăm ${n.val} (${fnName === 'preorder' ? 'trước khi xuống con' : fnName === 'inorder' ? 'sau con trái, trước con phải' : 'sau cả hai con'}).`, { callStack: cs() });
    };
    const goLeft = function* () {
      yield frame(lines.left, { root: n.val, left: n.left ? n.left.val : 'null' }, viz({ [id(n)]: 'active', ...(n.left ? { [id(n.left)]: 'compare' as Highlight } : {}) }), `Đệ quy sang con trái của ${n.val}.`, { callStack: cs() });
      yield* dfs(n.left, `con trái của ${n.val}`);
    };
    const goRight = function* () {
      yield frame(lines.right, { root: n.val, right: n.right ? n.right.val : 'null' }, viz({ [id(n)]: 'active', ...(n.right ? { [id(n.right)]: 'compare' as Highlight } : {}) }), `Đệ quy sang con phải của ${n.val}.`, { callStack: cs() });
      yield* dfs(n.right, `con phải của ${n.val}`);
    };
    if (fnName === 'preorder') { yield* visit(); yield* goLeft(); yield* goRight(); }
    else if (fnName === 'inorder') { yield* goLeft(); yield* visit(); yield* goRight(); }
    else { yield* goLeft(); yield* goRight(); yield* visit(); }
    yield frame(lines.ret, { root: n.val }, viz({ [id(n)]: 'done' }), `Xong cây con gốc ${n.val}, quay lên tầng trên.`, { callStack: cs() });
    stack.pop();
  }
  yield* dfs(root, 'gốc');
  yield frame(lines.ret, { result: [...out] }, viz(), `Hoàn tất ${fnName}: ${out.join(', ')}.`);
  return out;
}
