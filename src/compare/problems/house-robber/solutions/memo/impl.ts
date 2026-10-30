/** Top-down + memo: best(i) = tiền lớn nhất từ nhà i trở đi, mỗi i tính đúng một lần. O(n)/O(n). */
export function rob(nums: number[]): number {
  const memo = new Map<number, number>();
  const best = (i: number): number => {
    if (i >= nums.length) return 0;
    if (memo.has(i)) return memo.get(i)!; // đã tính ⇒ trả ngay
    const v = Math.max(best(i + 1), nums[i] + best(i + 2));
    memo.set(i, v);
    return v;
  };
  return best(0);
}
