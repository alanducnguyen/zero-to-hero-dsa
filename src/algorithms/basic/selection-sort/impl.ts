/**
 * Selection Sort – mỗi lượt chọn phần tử nhỏ nhất của phần chưa sắp xếp
 * rồi đưa về đầu phần đó. Số lần hoán đổi tối đa n-1.
 * @param input mảng số
 * @returns mảng mới đã sắp xếp tăng dần
 */
export function selectionSort(input: number[]): number[] {
  const a = [...input];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i; // giả sử phần tử đầu phần chưa sắp xếp là nhỏ nhất
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[minIdx]) {
        minIdx = j; // tìm thấy phần tử nhỏ hơn
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]]; // một hoán đổi duy nhất mỗi lượt
    }
  }
  return a;
}
