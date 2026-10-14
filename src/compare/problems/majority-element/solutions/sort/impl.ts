/** Sắp xếp: phần tử > n/2 lần chắc chắn chiếm vị trí giữa. O(n log n), O(1) nếu sort tại chỗ. */
export function majorityElement(nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}
