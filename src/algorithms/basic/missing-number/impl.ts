/**
 * Missing Number (LC 268) – XOR chỉ số và giá trị.
 * Mảng chứa n số phân biệt trong [0, n], thiếu đúng một số.
 * x ^ x = 0 và x ^ 0 = x ⇒ mọi số có mặt bị triệt tiêu theo cặp (chỉ số, giá trị),
 * chỉ còn lại số bị thiếu. Không tràn số như cách cộng Gauss.
 * @param nums mảng n số phân biệt trong [0, n]
 * @returns số duy nhất trong [0, n] không xuất hiện trong nums
 */
export function missingNumber(nums: number[]): number {
  const n = nums.length;
  let xor = n; // chỉ số n không có ô tương ứng ⇒ đưa vào trước
  for (let i = 0; i < n; i++) {
    xor ^= i; // chỉ số i: "đáng lẽ phải có"
    xor ^= nums[i]; // giá trị thực tế: triệt tiêu với chỉ số cùng giá trị
  }
  return xor;
}
