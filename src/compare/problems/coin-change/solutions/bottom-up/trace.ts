import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const show = (v: number) => (v === Infinity ? '∞' : v);

export function* trace(input: { coins: number[]; amount: number }): Generator<Frame, number> {
  const { coins, amount } = input;
  const dp = new Array<number>(amount + 1).fill(Infinity);
  dp[0] = 0;
  const viz = (hl: Record<number, Highlight> = {}, ci?: number) =>
    composite([arr(coins, { title: 'coins', highlights: ci !== undefined ? { [ci]: 'pointer' } : {} }), arr(dp.map(show), { title: 'dp[a] = số đồng ít nhất (nhãn = a)', highlights: hl })]);
  yield frame(4, { amount }, viz({ 0: 'done' }), 'dp[0] = 0, mọi ô khác = ∞ (chưa biết cách tạo). Tính từ nhỏ lên nên khi xét dp[a], mọi dp[a − c] đã xong.');
  for (let a = 1; a <= amount; a++) {
    for (let k = 0; k < coins.length; k++) {
      const c = coins[k];
      if (c > a) continue;
      const cand = dp[a - c] + 1;
      const better = cand < dp[a];
      const old = dp[a];
      if (better) dp[a] = cand;
      yield frame(7, { a, c, 'dp[a-c]': show(dp[a - c]), 'dp[a]': show(dp[a]) }, viz({ [a - c]: 'compare', [a]: better ? 'swap' : 'active' }, k),
        better ? `Đồng ${c} làm đồng cuối: dp[${a - c}] + 1 = ${cand} < ${show(old)} ⇒ cập nhật dp[${a}] = ${cand}.`
          : dp[a - c] === Infinity ? `dp[${a - c}] = ∞: không tạo được ${a - c} nên đồng ${c} không giúp gì cho ${a}.` : `dp[${a - c}] + 1 = ${show(cand)} không tốt hơn ${show(dp[a])} ⇒ giữ nguyên.`);
    }
  }
  const res = dp[amount] === Infinity ? -1 : dp[amount];
  yield frame(10, { result: res }, viz({ [amount]: 'done' }), `dp[${amount}] = ${show(dp[amount])} ⇒ trả ${res}. Không đệ quy, vòng lặp đơn giản, O(amount·k) thời gian.`);
  return res;
}
