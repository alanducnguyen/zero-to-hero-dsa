import { fromLevelOrder, inorder, levelOrder, postorder, preorder } from './impl';

export type Order = 'preorder' | 'inorder' | 'postorder' | 'bfs';
export interface TraversalInput {
  tree: string[];
  order: string;
}

export function parseTree(tokens: string[]): (number | null)[] {
  return tokens.map((t) => (t === 'null' || t === '#' || t === '_' ? null : Number(t))).map((x) => (x === null || Number.isNaN(x) ? null : x));
}

export function normalizeOrder(o: string): Order {
  const s = o.trim().toLowerCase();
  if (s.startsWith('in')) return 'inorder';
  if (s.startsWith('post')) return 'postorder';
  if (s.startsWith('bfs') || s.startsWith('level')) return 'bfs';
  return 'preorder';
}

export function run(input: TraversalInput): number[] {
  const root = fromLevelOrder(parseTree(input.tree));
  switch (normalizeOrder(input.order)) {
    case 'inorder': return inorder(root);
    case 'postorder': return postorder(root);
    case 'bfs': return levelOrder(root);
    default: return preorder(root);
  }
}
