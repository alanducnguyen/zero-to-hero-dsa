/**
 * Median of Two Sorted Arrays – O(log(min(m, n))) bằng tìm kiếm nhị phân trên điểm cắt.
 * Cắt A tại i, B tại j sao cho i + j = nửa trái. Cắt đúng khi A[i-1] ≤ B[j] và B[j-1] ≤ A[i]:
 * khi đó mọi phần tử nửa trái ≤ nửa phải, trung vị lấy từ 4 phần tử quanh điểm cắt.
 */
export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1;
  let B = nums2;
  if (A.length > B.length) [A, B] = [B, A]; // nhị phân trên mảng ngắn hơn
  const m = A.length;
  const n = B.length;
  const half = Math.floor((m + n + 1) / 2); // số phần tử nửa trái
  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2); // lấy i phần tử đầu của A
    const j = half - i; // lấy j phần tử đầu của B
    const Aleft = i > 0 ? A[i - 1] : -Infinity;
    const Aright = i < m ? A[i] : Infinity;
    const Bleft = j > 0 ? B[j - 1] : -Infinity;
    const Bright = j < n ? B[j] : Infinity;
    if (Aleft <= Bright && Bleft <= Aright) {
      // cắt đúng
      if ((m + n) % 2 === 1) return Math.max(Aleft, Bleft);
      return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
    } else if (Aleft > Bright) hi = i - 1; // lấy quá nhiều từ A ⇒ lùi i
    else lo = i + 1; // lấy quá ít từ A ⇒ tăng i
  }
  throw new Error('inputs are not sorted');
}
