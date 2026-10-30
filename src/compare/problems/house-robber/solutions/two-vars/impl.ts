/** Hai biến: dp[i] chỉ phụ thuộc dp[i-1], dp[i-2] ⇒ giữ đúng 2 giá trị. O(n) thời gian, O(1) bộ nhớ. */
export function rob(nums: number[]): number {
  let prev = 0; // tốt nhất đến nhà i-2
  let cur = 0; // tốt nhất đến nhà i-1
  for (const x of nums) {
    [prev, cur] = [cur, Math.max(cur, prev + x)]; // bỏ x hoặc cướp x
  }
  return cur;
}
