/** Gộp rồi sort lại: bỏ qua việc hai mảng đã sắp xếp. O((m+n) log(m+n)), O(m+n). */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const all = [...nums1, ...nums2].sort((x, y) => x - y);
  const mid = all.length >> 1;
  return all.length % 2 ? all[mid] : (all[mid - 1] + all[mid]) / 2;
}
