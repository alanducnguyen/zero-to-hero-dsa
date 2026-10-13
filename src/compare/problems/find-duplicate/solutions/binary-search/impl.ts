/** Nhị phân trên GIÁ TRỊ: đếm số phần tử ≤ mid; nếu > mid thì số trùng nằm trong [lo, mid] (nguyên lý Dirichlet). O(n log n), O(1), không sửa mảng. */
export function findDuplicate(nums: number[]): number {
  let lo = 1, hi = nums.length - 1; // giá trị trong [1, n]
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    let count = 0;
    for (const x of nums) if (x <= mid) count++;
    if (count > mid) hi = mid; // nhiều hơn mid số trong [1, mid] ⇒ trùng ở nửa dưới
    else lo = mid + 1;
  }
  return lo;
}
