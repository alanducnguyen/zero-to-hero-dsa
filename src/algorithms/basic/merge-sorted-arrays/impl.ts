/**
 * Merge Sorted Array – trộn nums2 vào nums1 tại chỗ (nums1 có m phần tử thật và đủ chỗ trống phía sau).
 * Hai con trỏ đi từ CUỐI: ghi phần tử lớn hơn vào ô cuối cùng còn trống, không bao giờ đè lên dữ liệu chưa xét.
 */
export function mergeSortedArrays(nums1: number[], m: number, nums2: number[], n: number): number[] {
  let i = m - 1; // phần tử thật cuối của nums1
  let j = n - 1; // phần tử cuối của nums2
  let k = m + n - 1; // ô ghi hiện tại (cuối nums1)
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i]; // nums1[i] lớn hơn ⇒ đứng cuối
      i--;
    } else {
      nums1[k] = nums2[j]; // nums2[j] lớn hơn hoặc nums1 đã hết
      j--;
    }
    k--;
  }
  return nums1; // phần còn lại của nums1 (nếu có) đã đúng chỗ
}
