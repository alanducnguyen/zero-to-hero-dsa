/**
 * Product of Array Except Self – answer[i] = tích mọi phần tử trừ nums[i], KHÔNG dùng phép chia.
 * Lượt 1 (trái → phải): answer[i] = tích mọi phần tử bên trái i (prefix product).
 * Lượt 2 (phải → trái): nhân thêm biến suffix = tích mọi phần tử bên phải i.
 * O(n) thời gian, O(1) bộ nhớ phụ (mảng output không tính).
 */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer: number[] = new Array<number>(n).fill(1);
  let prefix = 1; // tích nums[0..i-1]
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1; // tích nums[i+1..n-1]
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * suffix + 0; // + 0 chuẩn hoá -0 thành 0
    suffix *= nums[i];
  }
  return answer;
}
