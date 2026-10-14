/** Gộp tất cả rồi sort. O(N log N) với N = tổng phần tử, O(N) bộ nhớ. Bỏ phí việc từng list đã sắp xếp. */
export function mergeK(lists: number[][]): number[] {
  const all: number[] = [];
  for (const l of lists) all.push(...l);
  return all.sort((a, b) => a - b);
}
