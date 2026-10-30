/**
 * Search in Rotated Sorted Array – binary search một lượt.
 * Tại mỗi bước, ít nhất một nửa [lo, mid] hoặc [mid, hi] chắc chắn đã sắp xếp;
 * kiểm tra target có nằm trong nửa đó không để quyết định bỏ nửa nào.
 * @param nums mảng tăng dần (phần tử phân biệt) đã bị xoay tại một điểm
 * @param target giá trị cần tìm
 * @returns chỉ số của target, hoặc -1 nếu không có
 */
export function searchRotated(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      // nửa trái [lo, mid] đã sắp xếp
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // nửa phải [mid, hi] đã sắp xếp
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
