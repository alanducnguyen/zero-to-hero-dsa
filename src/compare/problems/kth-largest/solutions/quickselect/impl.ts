/** Quickselect: partition quanh pivot, chỉ đệ quy vào bên chứa vị trí cần tìm. O(n) trung bình, O(1) bộ nhớ phụ. */
export function kthLargest(nums: number[], k: number): number {
  const a = [...nums];
  const target = a.length - k; // lớn thứ k = nhỏ thứ (n − k + 1) ⇒ chỉ số n − k
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
    [a[i], a[hi]] = [a[hi], a[i]]; // pivot về đúng vị trí i
    if (i === target) return a[i];
    if (i < target) lo = i + 1; // đáp án ở bên phải
    else hi = i - 1;
  }
  return a[target];
}
