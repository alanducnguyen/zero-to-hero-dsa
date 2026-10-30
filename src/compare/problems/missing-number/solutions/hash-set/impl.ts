/** HashSet: bỏ mọi số vào Set rồi hỏi lần lượt 0..n số nào vắng. O(n) thời gian, O(n) bộ nhớ. */
export function missingNumber(nums: number[]): number {
  const seen = new Set(nums);
  for (let k = 0; k <= nums.length; k++) {
    if (!seen.has(k)) return k;
  }
  return -1; // không xảy ra với input hợp lệ
}
