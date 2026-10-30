/** Quét tuyến tính: bỏ qua hoàn toàn cấu trúc "sắp xếp rồi xoay". O(n) thời gian, O(1) bộ nhớ. */
export function search(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}
