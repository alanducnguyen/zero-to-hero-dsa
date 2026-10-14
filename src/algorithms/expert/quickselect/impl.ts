/**
 * Quickselect – phần tử nhỏ thứ k (1-indexed) trong O(n) trung bình, không cần sắp xếp toàn bộ.
 * Partition kiểu Lomuto quanh pivot: pivot về đúng vị trí p. Nếu p == k-1 ⇒ xong;
 * chỉ đệ quy vào MỘT bên chứa k ⇒ n + n/2 + n/4 + … = O(n).
 */
export function quickselect(nums: number[], k: number): number {
  const a = [...nums];
  const target = k - 1; // chỉ số 0-based cần tìm
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const p = partition(a, lo, hi);
    if (p === target) return a[p]; // pivot đứng đúng vị trí thứ k
    if (p < target) lo = p + 1; // phần tử cần tìm ở bên phải pivot
    else hi = p - 1; // ở bên trái pivot
  }
  throw new Error('k out of range');
}

/** Lomuto: chọn phần tử cuối làm pivot, dồn các phần tử < pivot về trái, trả về vị trí cuối của pivot. */
export function partition(a: number[], lo: number, hi: number): number {
  const pivot = a[hi];
  let i = lo; // ranh giới: a[lo..i) < pivot
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]]; // đặt pivot vào ranh giới
  return i;
}
