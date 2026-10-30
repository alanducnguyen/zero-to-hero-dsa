/** Một lượt binary search: tại mỗi mid, ít nhất một nửa đã sắp xếp – kiểm tra target có nằm gọn trong nửa đó không. O(log n). */
export function search(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      // nửa trái [lo..mid] tăng dần
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // nửa phải [mid..hi] tăng dần
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
