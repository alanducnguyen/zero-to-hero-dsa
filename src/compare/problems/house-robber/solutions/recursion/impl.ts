/** Đệ quy thuần: ở nhà i chọn bỏ qua (sang i+1) hoặc cướp (nhảy sang i+2). O(φⁿ) vì bài con bị tính lại. */
export function rob(nums: number[], i = 0): number {
  if (i >= nums.length) return 0; // hết nhà ⇒ không lấy thêm được gì
  const skip = rob(nums, i + 1); // bỏ nhà i
  const take = nums[i] + rob(nums, i + 2); // cướp nhà i ⇒ không được đụng nhà i+1
  return Math.max(skip, take);
}
