import { insert, maxDepth, type TreeNode } from './impl';

export interface DepthInput {
  values: number[];
}

/** Dựng BST bằng cách chèn lần lượt các giá trị (trùng bị bỏ qua). */
export function buildBST(values: number[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const v of values) root = insert(root, v);
  return root;
}

export function run(input: DepthInput): number {
  return maxDepth(buildBST(input.values));
}
