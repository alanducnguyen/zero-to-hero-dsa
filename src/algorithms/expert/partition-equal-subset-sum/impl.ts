/**
 * Partition Equal Subset Sum (LeetCode 416) – 0/1 knapsack dạng boolean.
 * Chia được thành hai tập tổng bằng nhau ⇔ tồn tại tập con có tổng = total / 2.
 * dp[j] = true nếu chọn được một tập con (mỗi số dùng tối đa 1 lần) có tổng j.
 * @param nums mảng số nguyên dương
 * @returns true nếu chia được thành hai tập con có tổng bằng nhau
 */
export function canPartition(nums: number[]): boolean {
  let total = 0;
  for (const x of nums) total += x;
  if (total % 2 !== 0) return false; // tổng lẻ thì không thể chia đôi
  const target = total / 2;
  const dp: boolean[] = new Array<boolean>(target + 1).fill(false);
  dp[0] = true; // tổng 0 luôn đạt được bằng tập rỗng
  for (const num of nums) {
    // duyệt j giảm dần để dp[j - num] vẫn là giá trị TRƯỚC khi xét num
    for (let j = target; j >= num; j--) {
      if (dp[j - num]) dp[j] = true;
    }
    if (dp[target]) return true; // dừng sớm khi đã đạt target
  }
  return dp[target];
}
