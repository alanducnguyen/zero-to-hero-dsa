/** Greedy: giữ farthest = ô xa nhất tới được. Vùng tới được luôn là đoạn liền [0, farthest]. O(n) thời gian, O(1) bộ nhớ. */
export function canJump(nums: number[]): boolean {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // có "lỗ hổng": không ô nào trước đó nhảy tới i
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true; // đã phủ tới ô cuối
  }
  return true;
}
