/** Boyer-Moore Voting: ứng viên + bộ đếm, phần tử khác triệt tiêu phiếu. O(n) thời gian, O(1) bộ nhớ. */
export function majorityElement(nums: number[]): number {
  let candidate = nums[0];
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate; // giả định đề: đa số luôn tồn tại
}
