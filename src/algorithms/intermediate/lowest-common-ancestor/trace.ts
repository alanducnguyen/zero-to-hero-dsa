import { frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import { fromLevelOrder, type TreeNode } from './impl';
import { parseTree, type LCAInput } from './node';

export function* trace(input: LCAInput): Generator<Frame, number | null> {
  const root = fromLevelOrder(parseTree(input.tree));
  const { p, q } = input;
  const nodes: TreeVisual['nodes'] = [];
  const ids = new Map<TreeNode, string>();
  let seq = 0;
  const build = (n: TreeNode | null): string | null => {
    if (!n) return null;
    const id = `n${seq++}`; ids.set(n, id);
    const l = build(n.left), r = build(n.right);
    const children: string[] = [];
    if (l || r) { if (l) children.push(l); else { nodes.push({ id: `${id}L`, label: '', children: [], hidden: true }); children.push(`${id}L`); } if (r) children.push(r); else { nodes.push({ id: `${id}R`, label: '', children: [], hidden: true }); children.push(`${id}R`); } }
    nodes.push({ id, label: String(n.val), children });
    return id;
  };
  const rootId = build(root);
  const marks: Record<string, string> = {};
  const cs: string[] = [];
  const viz = (hl: Record<string, Highlight> = {}): TreeVisual => {
    const base: Record<string, Highlight> = {};
    for (const [n, id] of ids) if (n.val === p || n.val === q) base[id] = 'range';
    return { kind: 'tree', title: `Tìm LCA của ${p} và ${q} (cyan = p/q)`, nodes, rootId, highlights: { ...base, ...hl }, marks: { ...marks } };
  };
  const id = (n: TreeNode) => ids.get(n)!;

  function* lca(n: TreeNode | null, from: string): Generator<Frame, TreeNode | null> {
    cs.push(`lca(${n ? n.val : 'null'})`);
    if (!n) { yield frame(12, { root: 'null' }, viz(), `${from} là null ⇒ trả null (không chứa p/q).`, { callStack: [...cs] }); cs.pop(); return null; }
    if (n.val === p || n.val === q) {
      marks[id(n)] = `↑ ${n.val}`;
      yield frame(13, { 'root.val': n.val }, viz({ [id(n)]: 'done' }), `Gặp ${n.val} (là p hoặc q) ⇒ trả ngay chính nó. Không cần xuống dưới: nếu node kia nằm trong cây con này thì ${n.val} vẫn là LCA.`, { callStack: [...cs] });
      cs.pop(); return n;
    }
    yield frame(14, { 'root.val': n.val }, viz({ [id(n)]: 'active' }), `${n.val} không phải p/q ⇒ hỏi cây con trái.`, { callStack: [...cs] });
    const left = yield* lca(n.left, `con trái của ${n.val}`);
    yield frame(15, { 'root.val': n.val, left: left ? left.val : 'null' }, viz({ [id(n)]: 'active' }), `Trái trả ${left ? left.val : 'null'}. Hỏi cây con phải.`, { callStack: [...cs] });
    const right = yield* lca(n.right, `con phải của ${n.val}`);
    if (left && right) {
      marks[id(n)] = 'LCA';
      yield frame(16, { 'root.val': n.val, left: left.val, right: right.val }, viz({ [id(n)]: 'swap' }), `Trái trả ${left.val}, phải trả ${right.val}: p và q nằm hai bên ⇒ ${n.val} là LCA.`, { callStack: [...cs] });
      cs.pop(); return n;
    }
    const res = left ?? right;
    if (res) marks[id(n)] = `↑ ${res.val}`;
    yield frame(17, { 'root.val': n.val, left: left ? left.val : 'null', right: right ? right.val : 'null', 'trả': res ? res.val : 'null' }, viz({ [id(n)]: res ? 'compare' : 'muted' }), res ? `Chỉ một bên có kết quả (${res.val}) ⇒ chuyển tiếp lên trên.` : `Cả hai bên null ⇒ cây con ${n.val} không chứa p/q.`, { callStack: [...cs] });
    cs.pop(); return res;
  }
  const r = yield* lca(root, 'gốc');
  yield frame(18, { result: r ? r.val : null }, viz(r ? { [id(r)]: 'done' } : {}), r ? `LCA(${p}, ${q}) = ${r.val}. Một lượt postorder O(n).` : 'Không tìm thấy p/q trong cây.');
  return r ? r.val : null;
}
