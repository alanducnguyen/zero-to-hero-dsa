/**
 * Bubble Sort – sắp xếp nổi bọt.
 * Mỗi lượt đẩy phần tử lớn nhất còn lại về cuối mảng.
 * @param input mảng số
 * @returns mảng mới đã sắp xếp tăng dần
 */
export function bubbleSort(input: number[]): number[] {
  const a = [...input];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // mảng đã có thứ tự, dừng sớm
  }
  return a;
}
