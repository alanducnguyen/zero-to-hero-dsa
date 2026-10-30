/** Hai lượt: binary search tìm pivot (chỉ số nhỏ nhất), rồi binary search trên nửa đã sắp xếp chứa target. O(log n). */
export function search(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1; // có "vách" bên phải mid ⇒ min nằm ở (mid, hi]
    else hi = mid; // [mid, hi] tăng dần ⇒ min nằm ở [lo, mid]
  }
  const pivot = lo; // nums[pivot] là phần tử nhỏ nhất
  const n = nums.length;
  [lo, hi] = target >= nums[pivot] && target <= nums[n - 1] ? [pivot, n - 1] : [0, pivot - 1];
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
