/** Đệ quy + memo trên trạng thái (i, rem). O(n·S) thời gian và bộ nhớ, S = total/2. */
export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const memo = new Map<string, boolean>(); // "i,rem" → kết quả
  const go = (i: number, rem: number): boolean => {
    if (rem === 0) return true;
    if (i === nums.length || rem < 0) return false;
    const key = `${i},${rem}`;
    if (memo.has(key)) return memo.get(key)!; // trạng thái đã giải ⇒ O(1)
    const res = go(i + 1, rem - nums[i]) || go(i + 1, rem);
    memo.set(key, res);
    return res;
  };
  return go(0, total / 2);
}
