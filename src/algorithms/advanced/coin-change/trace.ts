import { arr, composite, frame, hl, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { coins: number[]; amount: number }): Generator<Frame, number> {
  const coins = [...new Set(input.coins.filter((c) => c > 0))];
  const amount = Math.max(0, Math.min(30, Math.floor(input.amount)));
  const INF = Number.POSITIVE_INFINITY;
  const dp: (number | string | null)[] = new Array(amount + 1).fill(null);
  const labels = Array.from({ length: amount + 1 }, (_, i) => String(i));
  const show = (x: number | string | null) => (x === INF ? '∞' : x);
  const viz = (dpHl: Record<string, Highlight> = {}, coinHl: Record<number, Highlight> = {}) =>
    composite([
      arr(coins, { title: 'coins', highlights: coinHl }),
      matrix([dp.map(show)], { title: 'dp[a] = số xu ít nhất tạo ra a', colLabels: labels, highlights: dpHl }),
    ]);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) dp[a] = INF;
  yield frame(9, { amount, coins }, viz({ '0,0': 'done' }), `dp[0] = 0 (0 đồng cần 0 xu), các ô khác = ∞ (chưa biết cách tạo). Tính từ nhỏ đến lớn vì dp[a] phụ thuộc dp[a − coin].`);
  for (let a = 1; a <= amount; a++) {
    yield frame(10, { a, 'dp[a]': show(dp[a]) }, viz({ [`0,${a}`]: 'active' }), `Tính dp[${a}]: thử từng loại xu làm "xu cuối cùng".`);
    for (let ci = 0; ci < coins.length; ci++) {
      const coin = coins[ci];
      if (coin > a) {
        yield frame(12, { a, coin }, viz({ [`0,${a}`]: 'active' }, hl([ci, 'muted'])), `Xu ${coin} > ${a} ⇒ không dùng được.`);
        continue;
      }
      const cand = (dp[a - coin] as number) + 1;
      const better = cand < (dp[a] as number);
      yield frame(12, { a, coin, 'dp[a-coin]': show(dp[a - coin]), candidate: show(cand), 'dp[a]': show(dp[a]) }, viz({ [`0,${a}`]: 'active', [`0,${a - coin}`]: 'compare' }, hl([ci, 'compare'])), `Dùng xu ${coin} cuối ⇒ còn ${a - coin} đồng, cần dp[${a - coin}] = ${show(dp[a - coin])} xu ⇒ tổng ${show(cand)}. ${dp[a - coin] === INF ? 'Không tạo được phần còn lại.' : better ? 'Tốt hơn ⇒ cập nhật.' : 'Không tốt hơn.'}`);
      if (better) {
        dp[a] = cand;
        yield frame(13, { a, coin, 'dp[a]': dp[a] }, viz({ [`0,${a}`]: 'swap', [`0,${a - coin}`]: 'compare' }, hl([ci, 'swap'])), `dp[${a}] = ${dp[a]}.`);
      }
    }
  }
  const result = dp[amount] === INF ? -1 : (dp[amount] as number);
  yield frame(17, { result }, viz({ [`0,${amount}`]: result < 0 ? 'swap' : 'done' }), result < 0 ? `dp[${amount}] = ∞ ⇒ không thể tạo ${amount} từ các xu ⇒ -1.` : `dp[${amount}] = ${result} xu. Tham lam (lấy xu to nhất trước) có thể sai – ví dụ coins [1, 3, 4], amount 6: tham lam 4+1+1 = 3 xu, DP 3+3 = 2 xu.`);
  return result;
}
