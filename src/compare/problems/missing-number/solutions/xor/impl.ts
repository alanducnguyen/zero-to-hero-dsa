/** XOR: mọi số có mặt xuất hiện 2 lần (chỉ số + giá trị) nên tự triệt tiêu. O(n) thời gian, O(1) bộ nhớ. */
export function missingNumber(nums: number[]): number {
  let xor = nums.length;
  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }
  return xor;
}
