/** Đệ quy thuần: mỗi số chọn LẤY hoặc BỎ vào tập có tổng total/2. O(2ⁿ) thời gian, O(n) stack. */
export function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false; // tổng lẻ không chia đôi được
  const go = (i: number, rem: number): boolean => {
    if (rem === 0) return true; // đã gom đủ total/2
    if (i === nums.length || rem < 0) return false; // hết số hoặc vượt quá
    return go(i + 1, rem - nums[i]) || go(i + 1, rem); // lấy nums[i] || bỏ nums[i]
  };
  return go(0, total / 2);
}
