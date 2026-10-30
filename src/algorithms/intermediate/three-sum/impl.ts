/**
 * 3Sum (LeetCode 15) – tìm mọi bộ ba [a, b, c] không trùng có a + b + c = 0.
 * Sắp xếp, cố định i, rồi two pointers l / r trên phần còn lại; bỏ qua giá trị trùng.
 * @param nums mảng số nguyên
 * @returns các bộ ba theo thứ tự quét trên mảng đã sắp xếp
 */
export function threeSum(nums: number[]): number[][] {
  const a = [...nums].sort((x, y) => x - y);
  const n = a.length;
  const result: number[][] = [];
  for (let i = 0; i < n - 2; i++) {
    if (a[i] > 0) break; // số nhỏ nhất đã dương ⇒ tổng không thể bằng 0
    if (i > 0 && a[i] === a[i - 1]) continue; // cùng a[i] ⇒ cùng tập bộ ba
    let l = i + 1;
    let r = n - 1;
    while (l < r) {
      const sum = a[i] + a[l] + a[r];
      if (sum === 0) {
        result.push([a[i], a[l], a[r]]);
        while (l < r && a[l] === a[l + 1]) l++; // bỏ qua trùng bên trái
        while (l < r && a[r] === a[r - 1]) r--; // bỏ qua trùng bên phải
        l++;
        r--;
      } else if (sum < 0) {
        l++; // tổng nhỏ ⇒ cần số lớn hơn
      } else {
        r--; // tổng lớn ⇒ cần số nhỏ hơn
      }
    }
  }
  return result;
}
