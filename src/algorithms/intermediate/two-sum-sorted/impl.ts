/**
 * Two Sum II – mảng đã sắp xếp, tìm hai số có tổng bằng target.
 * Hai con trỏ từ hai đầu tiến vào giữa.
 * @param a mảng sắp xếp tăng dần
 * @param target tổng cần tìm
 * @returns [i, j] với i < j, hoặc null nếu không có
 */
export function twoSumSorted(a: number[], target: number): [number, number] | null {
  let left = 0;
  let right = a.length - 1;
  while (left < right) {
    const sum = a[left] + a[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++; // tổng nhỏ ⇒ cần số lớn hơn ⇒ tiến left
    } else {
      right--; // tổng lớn ⇒ cần số nhỏ hơn ⇒ lùi right
    }
  }
  return null;
}
