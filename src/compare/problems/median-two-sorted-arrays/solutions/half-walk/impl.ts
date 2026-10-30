/** Chỉ đi tới phần tử giữa, nhớ 2 giá trị cuối – không cần mảng gộp. O(m+n), O(1). */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const total = nums1.length + nums2.length;
  let i = 0, j = 0, prev = 0, cur = 0;
  for (let step = 0; step <= total >> 1; step++) {
    prev = cur;
    if (j >= nums2.length || (i < nums1.length && nums1[i] <= nums2[j])) cur = nums1[i++];
    else cur = nums2[j++];
  }
  return total % 2 ? cur : (prev + cur) / 2;
}
