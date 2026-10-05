/**
 * Quick Sort – chia để trị với phân hoạch Lomuto (pivot = phần tử cuối).
 * @param input mảng số
 * @returns mảng mới đã sắp xếp
 */
export function quickSort(input: number[]): number[] {
  const a = [...input];
  sort(a, 0, a.length - 1);
  return a;
}

function sort(a: number[], lo: number, hi: number): void {
  if (lo >= hi) return; // 0 hoặc 1 phần tử: đã sắp xếp
  const p = partition(a, lo, hi);
  sort(a, lo, p - 1); // bên trái pivot
  sort(a, p + 1, hi); // bên phải pivot
}

/** Đưa pivot về đúng vị trí, trả về chỉ số đó. */
function partition(a: number[], lo: number, hi: number): number {
  const pivot = a[hi];
  let i = lo; // a[lo..i-1] < pivot
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]]; // đặt pivot vào giữa
  return i;
}
