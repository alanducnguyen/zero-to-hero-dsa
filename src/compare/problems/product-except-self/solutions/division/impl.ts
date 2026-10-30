/** Tích toàn bộ rồi chia cho nums[i] – đề LeetCode CẤM phép chia, và phải xử lý số 0 riêng. O(n) thời gian, O(1) phụ. */
export function productExceptSelf(nums: number[]): number[] {
  let product = 1; // tích các phần tử KHÁC 0
  let zeros = 0;
  for (const x of nums) {
    if (x === 0) zeros++;
    else product *= x;
  }
  return nums.map((x) => {
    if (zeros > 1) return 0; // ≥ 2 số 0 ⇒ tích nào cũng chứa ít nhất một số 0
    if (zeros === 1) return x === 0 ? product : 0; // chỉ vị trí số 0 nhận tích phần còn lại
    return product / x; // không có số 0 ⇒ chia an toàn
  });
}
