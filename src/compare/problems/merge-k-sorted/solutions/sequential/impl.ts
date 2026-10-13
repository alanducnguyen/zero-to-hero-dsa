/** Trộn lần lượt: kết quả = merge(kết quả, list i) với từng list. O(N·k) vì kết quả bị duyệt lại k lần. O(N) bộ nhớ. */
export function mergeK(lists: number[][]): number[] {
  let result: number[] = [];
  for (const l of lists) result = mergeTwo(result, l);
  return result;
}
function mergeTwo(a: number[], b: number[]): number[] {
  const out: number[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
