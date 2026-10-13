/** Sắp xếp rồi tìm hai phần tử liền kề bằng nhau. O(n log n), sửa mảng (hoặc O(n) sao chép). */
export function findDuplicate(nums: number[]): number {
  const a = [...nums].sort((x, y) => x - y);
  for (let i = 1; i < a.length; i++) {
    if (a[i] === a[i - 1]) return a[i];
  }
  return -1;
}
