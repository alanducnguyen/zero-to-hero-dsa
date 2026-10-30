/** Binary search vị trí cắt trên mảng ngắn hơn sao cho nửa trái gộp ≤ nửa phải gộp. O(log min(m,n)), O(1). */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const [a, b] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1]; // tìm trên mảng ngắn
  const m = a.length, n = b.length, half = (m + n + 1) >> 1;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1; // lấy i phần tử của a vào nửa trái
    const j = half - i; // phần còn lại của nửa trái lấy từ b
    const aL = i > 0 ? a[i - 1] : -Infinity, aR = i < m ? a[i] : Infinity;
    const bL = j > 0 ? b[j - 1] : -Infinity, bR = j < n ? b[j] : Infinity;
    if (aL > bR) hi = i - 1; // lấy quá nhiều từ a
    else if (bL > aR) lo = i + 1; // lấy quá ít từ a
    else return (m + n) % 2 ? Math.max(aL, bL) : (Math.max(aL, bL) + Math.min(aR, bR)) / 2;
  }
  throw new Error('Input chưa được sắp xếp');
}
