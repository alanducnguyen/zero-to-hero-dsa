/** Trộn hai mảng đã sắp xếp như bước merge của merge sort, rồi lấy phần tử giữa. O(m+n), O(m+n). */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const merged: number[] = [];
  let i = 0, j = 0;
  while (i < nums1.length || j < nums2.length) {
    if (j >= nums2.length || (i < nums1.length && nums1[i] <= nums2[j])) merged.push(nums1[i++]);
    else merged.push(nums2[j++]);
  }
  const mid = merged.length >> 1;
  return merged.length % 2 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2;
}
