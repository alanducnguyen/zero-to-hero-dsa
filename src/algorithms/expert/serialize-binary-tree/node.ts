import { deserialize, serialize, type TreeNode } from './impl';

export interface SerializeInput {
  /** cây theo level-order, "null" / "#" = rỗng */
  tree: string[];
}

export interface SerializeOutput {
  data: string;
  /** deserialize(data) dựng lại đúng cây ban đầu */
  roundTrip: boolean;
}

export function parseTree(tokens: string[]): (number | null)[] {
  return tokens.map((t) => {
    const s = String(t).trim();
    if (s === 'null' || s === '#' || s === '_' || s === '') return null;
    const x = Number(s);
    return Number.isNaN(x) ? null : x;
  });
}

/** Dựng cây từ mảng level-order kiểu LeetCode (null = không có node). */
export function fromLevelOrder(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;
  const root: TreeNode = { val: values[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  for (let head = 0; head < queue.length && i < values.length; head++) {
    const node = queue[head];
    const l = values[i++];
    if (l !== null && l !== undefined) queue.push((node.left = { val: l, left: null, right: null }));
    const r = values[i++];
    if (r !== null && r !== undefined) queue.push((node.right = { val: r, left: null, right: null }));
  }
  return root;
}

export function sameTree(a: TreeNode | null, b: TreeNode | null): boolean {
  if (a === null || b === null) return a === b;
  return a.val === b.val && sameTree(a.left, b.left) && sameTree(a.right, b.right);
}

export function run(input: SerializeInput): SerializeOutput {
  const root = fromLevelOrder(parseTree(input.tree));
  const data = serialize(root);
  return { data, roundTrip: sameTree(deserialize(data), root) };
}
