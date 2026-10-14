/**
 * Rotate Array – xoay phải k bước, tại chỗ O(1) bộ nhớ bằng "đảo ba lần".
 * Đảo cả mảng, rồi đảo k phần tử đầu, rồi đảo phần còn lại.
 */
export function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n; // xoay n bước = không đổi
  reverse(nums, 0, n - 1); // đảo toàn bộ
  reverse(nums, 0, k - 1); // đảo k phần tử đầu
  reverse(nums, k, n - 1); // đảo phần còn lại
  return nums;
}

function reverse(a: number[], i: number, j: number): void {
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i++;
    j--;
  }
}
