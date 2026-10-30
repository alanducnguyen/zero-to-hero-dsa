/** Patience sorting: tails[k] = phần tử cuối nhỏ nhất của mọi dãy tăng dài k + 1. O(n log n). */
export function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      // tìm vị trí đầu tiên có tails[mid] ≥ x (lower bound)
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x; // lo === tails.length ⇒ nối dài; ngược lại thay bằng đuôi nhỏ hơn
  }
  return tails.length;
}
