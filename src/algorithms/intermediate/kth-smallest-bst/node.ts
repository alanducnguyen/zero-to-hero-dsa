import { insert, kthSmallest, type TreeNode } from './impl';

export interface KthInput {
  values: number[];
  k: number;
}

/** Dựng BST bằng cách chèn lần lượt các giá trị (trùng bị bỏ qua). */
export function buildBST(values: number[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const v of values) root = insert(root, v);
  return root;
}

export function run(input: KthInput): number {
  return kthSmallest(buildBST(input.values), input.k);
}
