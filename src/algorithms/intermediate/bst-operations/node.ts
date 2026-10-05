import { insert, remove, search, type TreeNode } from './impl';
export interface BSTInput { ops: string[] }
export type Op = { op: 'insert' | 'search' | 'delete'; val: number };
export function parseOps(ops: string[]): Op[] {
  const out: Op[] = [];
  for (const raw of ops) {
    const m = /^(insert|search|delete|remove)\s+(-?\d+)$/i.exec(raw.trim());
    if (!m) continue;
    const op = m[1].toLowerCase();
    out.push({ op: op === 'remove' ? 'delete' : (op as Op['op']), val: Number(m[2]) });
  }
  return out;
}
export function toLevelOrder(root: TreeNode | null): (number | null)[] {
  const out: (number | null)[] = [];
  const q: (TreeNode | null)[] = [root];
  while (q.length) {
    const n = q.shift()!;
    if (!n) { out.push(null); continue; }
    out.push(n.val);
    q.push(n.left, n.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
export function run(input: BSTInput): { tree: (number | null)[]; searches: string[] } {
  let root: TreeNode | null = null;
  const searches: string[] = [];
  for (const { op, val } of parseOps(input.ops)) {
    if (op === 'insert') root = insert(root, val);
    else if (op === 'delete') root = remove(root, val);
    else searches.push(`search ${val} → ${search(root, val)}`);
  }
  return { tree: toLevelOrder(root), searches };
}
