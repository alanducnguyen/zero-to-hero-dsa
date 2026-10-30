/**
 * Jump Game (LeetCode 55) – tham lam (greedy) theo tầm với xa nhất.
 * nums[i] là số bước nhảy TỐI ĐA từ vị trí i.
 * @param nums mảng độ dài bước nhảy (không âm)
 * @returns true nếu từ chỉ số 0 có thể tới được chỉ số cuối
 */
export function canJump(nums: number[]): boolean {
  let farthest = 0; // chỉ số xa nhất chắc chắn tới được
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // i nằm ngoài tầm với → kẹt
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true; // đã chạm đích
  }
  return true;
}
