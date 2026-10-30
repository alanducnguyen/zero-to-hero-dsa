/** Bottom-up từ cuối: good[i] = có ô "tốt" nào trong tầm nhảy của i. O(n²) thời gian, O(n) bộ nhớ, không đệ quy. */
export function canJump(nums: number[]): boolean {
  const n = nums.length;
  const good = new Array<boolean>(n).fill(false);
  good[n - 1] = true; // ô cuối tự nó là đích
  for (let i = n - 2; i >= 0; i--) {
    const far = Math.min(i + nums[i], n - 1);
    for (let j = i + 1; j <= far; j++) {
      if (good[j]) {
        good[i] = true; // nhảy tới một ô tốt ⇒ i cũng tốt
        break;
      }
    }
  }
  return good[0];
}
