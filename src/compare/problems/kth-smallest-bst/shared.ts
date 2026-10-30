import type { Highlight, TreeVisual } from '@/engine/types';

export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface KthInput {
  values: number[];
  k: number;
}

/** Chèn vào BST (bỏ qua giá trị trùng). */
function insert(root: TreeNode | null, val: number): TreeNode {
  if (root === null) return { val, left: null, right: null };
  if (val < root.val) root.left = insert(root.left, val);
  else if (val > root.val) root.right = insert(root.right, val);
  return root;
}

/** Dựng BST bằng cách chèn lần lượt các giá trị (trùng bị bỏ qua). */
export function buildBST(values: number[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const v of values) root = insert(root, v);
  return root;
}

/** Vẽ BST; highlights/marks đánh theo giá trị node. */
export function treeViz(root: TreeNode | null, highlights: Record<number, Highlight>, marks: Record<number, string>, title: string): TreeVisual {
  const nodes: TreeVisual['nodes'] = [];
  const build = (n: TreeNode | null): string | null => {
    if (!n) return null;
    const id = `v${n.val}`;
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
  for (const [v, c] of Object.entries(highlights)) h[`v${v}`] = c;
  const m: Record<string, string> = {};
  for (const [v, s] of Object.entries(marks)) m[`v${v}`] = s;
  return { kind: 'tree', title, nodes, rootId, highlights: h, marks: m };
}
