/** Prefix sum: tổng đoạn [i, j] = P[j+1] − P[i]. Với mỗi j, lấy P[j+1] trừ min prefix trước đó. O(n), O(1) phụ. */
export function maxSubArray(nums: number[]): number {
  let prefix = 0; // P[j+1]
  let minPrefix = 0; // min P[i] với i ≤ j
  let best = -Infinity;
  for (const x of nums) {
    prefix += x;
    best = Math.max(best, prefix - minPrefix); // đoạn kết thúc tại j tốt nhất
    minPrefix = Math.min(minPrefix, prefix); // chuẩn bị cho j + 1
  }
  return best;
}
