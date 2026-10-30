import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const total = nums.reduce((a, b) => a + b, 0);
  yield frame(3, { total }, arr(nums, { title: 'nums' }), `Tổng = ${total}. Cần tập con tổng total/2.`);
  if (total % 2 !== 0) {
    yield frame(4, { total, result: false }, arr(nums, { title: 'nums' }), 'Tổng lẻ ⇒ false, khỏi lập bảng.');
    return false;
  }
  const target = total / 2;
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<boolean>(target + 1).fill(false));
  dp[0][0] = true;
  const viz = (i: number, extra: Record<string, Highlight> = {}) => {
    const h: Record<string, Highlight> = {};
    dp.forEach((row, r) => row.forEach((v, c) => { if (v && r <= i) h[`${r},${c}`] = 'done'; }));
    return composite([
      arr(nums, { title: 'nums', highlights: i >= 1 && i <= n ? { [i - 1]: 'active' } : {} }),
      matrix(dp.map((row, r) => row.map((v) => (r <= i ? (v ? 'T' : 'F') : null))), { title: `dp[i][j]: i số đầu đạt tổng j? (${n + 1} × ${target + 1} ô)`, highlights: { ...h, ...extra }, rowLabels: dp.map((_, r) => (r === 0 ? '∅' : `+${nums[r - 1]}`)), colLabels: dp[0].map((_, c) => String(c)) }),
    ]);
  };
  yield frame(8, { target, n }, viz(0, { '0,0': 'done' }), `Bảng (n+1) × (S+1). Hàng 0 = chưa dùng số nào: chỉ tổng 0 đạt được.`);
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= target; j++) {
      const skip = dp[i - 1][j];
      const take = j >= num && dp[i - 1][j - num];
      dp[i][j] = skip || take;
      const hl: Record<string, Highlight> = { [`${i - 1},${j}`]: 'compare', [`${i},${j}`]: dp[i][j] ? 'swap' : 'active' };
      if (j >= num) hl[`${i - 1},${j - num}`] = 'pointer';
      yield frame(12, { i, num, j, 'bỏ: dp[i-1][j]': skip, 'lấy: dp[i-1][j-num]': j >= num ? dp[i - 1][j - num] : '—', 'dp[i][j]': dp[i][j] }, viz(i, hl),
        skip ? `dp[${i}][${j}] = true vì không cần ${num}: hàng trên đã đạt ${j}.` : take ? `Lấy ${num}: hàng trên đạt ${j - num} ⇒ thêm ${num} được ${j}. Đọc từ hàng i−1 nên mỗi số dùng tối đa 1 lần.` : `Không bỏ được (hàng trên chưa đạt ${j}) và ${j >= num ? `không lấy được (chưa đạt ${j - num})` : `${num} > ${j}`} ⇒ false.`);
    }
  }
  yield frame(15, { result: dp[n][target] }, viz(n, { [`${n},${target}`]: dp[n][target] ? 'done' : 'swap' }), `dp[${n}][${target}] = ${dp[n][target]}. Bảng đầy đủ tốn O(n·S) bộ nhớ nhưng cho phép truy vết lại tập con nào được chọn.`);
  return dp[n][target];
}
