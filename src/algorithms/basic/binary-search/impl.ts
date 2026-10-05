/**
 * Binary Search – tìm kiếm nhị phân trên mảng đã sắp xếp tăng dần.
 * @param a mảng đã sắp xếp
 * @param target giá trị cần tìm
 * @returns chỉ số của target, hoặc -1 nếu không có
 */
export function binarySearch(a: number[], target: number): number {
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2); // tránh tràn số ở ngôn ngữ khác
    if (a[mid] === target) {
      return mid;
    } else if (a[mid] < target) {
      lo = mid + 1; // target nằm bên phải
    } else {
      hi = mid - 1; // target nằm bên trái
    }
  }
  return -1;
}
