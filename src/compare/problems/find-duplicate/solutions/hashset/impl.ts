/** HashSet: phần tử đầu tiên đã thấy là đáp án. O(n) thời gian, O(n) bộ nhớ. */
export function findDuplicate(nums: number[]): number {
  const seen = new Set<number>();
  for (const x of nums) {
    if (seen.has(x)) return x;
    seen.add(x);
  }
  return -1;
}
