/**
 * Insertion Sort – giống cách xếp bài trên tay: lấy từng lá bài mới
 * và chèn vào đúng vị trí trong phần đã sắp xếp bên trái.
 * @param input mảng số
 * @returns mảng mới đã sắp xếp tăng dần
 */
export function insertionSort(input: number[]): number[] {
  const a = [...input];
  for (let i = 1; i < a.length; i++) {
    const key = a[i]; // phần tử cần chèn
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]; // dịch phần tử lớn hơn sang phải
      j--;
    }
    a[j + 1] = key; // chèn key vào chỗ trống
  }
  return a;
}
