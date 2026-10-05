/**
 * Longest Increasing Subsequence – O(n log n) bằng "patience sorting".
 * tails[len] = phần tử cuối NHỎ NHẤT của một dãy tăng độ dài len+1.
 * tails luôn tăng dần ⇒ binary search vị trí thay thế.
 */
export function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];
  for (const x of nums) {
    let lo = 0;
    let hi = tails.length; // tìm vị trí đầu tiên có tails[pos] >= x (lower bound)
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) {
      tails.push(x); // x lớn hơn mọi tail ⇒ kéo dài LIS
    } else {
      tails[lo] = x; // thay tail bằng x nhỏ hơn ⇒ dãy độ dài lo+1 "dễ nối" hơn
    }
  }
  return tails.length;
}
