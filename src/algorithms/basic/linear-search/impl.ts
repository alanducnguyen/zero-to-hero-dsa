/**
 * Linear Search – duyệt tuần tự từng phần tử cho tới khi gặp target.
 * Không cần mảng sắp xếp. Đây là thuật toán tìm kiếm đơn giản nhất.
 * @param a mảng bất kỳ
 * @param target giá trị cần tìm
 * @returns chỉ số đầu tiên của target, hoặc -1 nếu không có
 */
export function linearSearch(a: number[], target: number): number {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === target) {
      return i; // tìm thấy, dừng ngay
    }
  }
  return -1; // duyệt hết mà không thấy
}
