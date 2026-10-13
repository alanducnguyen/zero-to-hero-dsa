/** Sắp xếp giảm dần rồi lấy phần tử thứ k. O(n log n) thời gian, O(n) nếu không sort tại chỗ. */
export function kthLargest(nums: number[], k: number): number {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}
