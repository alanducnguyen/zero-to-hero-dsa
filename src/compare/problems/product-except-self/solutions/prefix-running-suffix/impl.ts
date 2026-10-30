/** Prefix ghi thẳng vào answer, suffix chỉ là một biến chạy ngược. O(n) thời gian, O(1) bộ nhớ phụ (không tính output). */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);
  for (let i = 1; i < n; i++) answer[i] = answer[i - 1] * nums[i - 1]; // lượt 1: answer[i] = tích bên trái
  let suffix = 1; // tích các phần tử bên phải i, cập nhật khi đi ngược
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix; // trái × phải
    suffix *= nums[i]; // nhận nums[i] SAU khi dùng, vì i không được tính cho chính nó
  }
  return answer;
}
