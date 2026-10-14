/** Chia để trị: max(trái, phải, đoạn vắt qua giữa). O(n log n), O(log n) stack. */
export function maxSubArray(nums: number[]): number {
  return solve(nums, 0, nums.length - 1);
}
function solve(a: number[], lo: number, hi: number): number {
  if (lo === hi) return a[lo];
  const mid = (lo + hi) >> 1;
  const left = solve(a, lo, mid);
  const right = solve(a, mid + 1, hi);
  let sum = 0, bestL = -Infinity;
  for (let i = mid; i >= lo; i--) { sum += a[i]; bestL = Math.max(bestL, sum); } // hậu tố tốt nhất của nửa trái
  sum = 0; let bestR = -Infinity;
  for (let i = mid + 1; i <= hi; i++) { sum += a[i]; bestR = Math.max(bestR, sum); } // tiền tố tốt nhất của nửa phải
  return Math.max(left, right, bestL + bestR);
}
