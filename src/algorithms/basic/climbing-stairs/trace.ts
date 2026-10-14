import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = Math.max(0, Math.floor(input.n));
  if (n <= 1) {
    yield frame(6, { n }, arr([1], { title: 'dp', highlights: { 0: 'done' } }), `n = ${n} ⇒ chỉ có 1 cách (${n === 0 ? 'không bước' : 'một bước 1 bậc'}).`);
    return 1;
  }
  const dp: (number | string)[] = new Array<number | string>(n + 1).fill('·');
  const viz = (hl: Record<number, 'active' | 'compare' | 'done'> = {}) => arr(dp, { title: 'dp[i] = số cách leo tới bậc i', highlights: hl });
  yield frame(7, { n }, viz(), `Tạo dp kích thước ${n + 1}: dp[i] là số cách leo tới bậc i.`);
  dp[0] = 1;
  dp[1] = 1;
  yield frame(9, { 'dp[0]': 1, 'dp[1]': 1 }, viz({ 0: 'done', 1: 'done' }), 'Cơ sở: dp[0] = 1 (đứng yên là một cách), dp[1] = 1 (một bước 1 bậc).');
  for (let i = 2; i <= n; i++) {
    yield frame(11, { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2] }, viz({ [i]: 'active', [i - 1]: 'compare', [i - 2]: 'compare' }), `Tới bậc ${i} chỉ có hai cách kết thúc: bước 1 bậc từ ${i - 1} hoặc bước 2 bậc từ ${i - 2}. Hai nhóm này không trùng nhau nên cộng lại.`);
    dp[i] = (dp[i - 1] as number) + (dp[i - 2] as number);
    yield frame(11, { i, 'dp[i]': dp[i] }, viz({ [i]: 'done' }), `dp[${i}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.`);
  }
  yield frame(13, { 'dp[n]': dp[n] }, viz({ [n]: 'done' }), `Kết quả dp[${n}] = ${dp[n]}. Đây chính là dãy Fibonacci; chỉ cần 2 biến là đủ (O(1) bộ nhớ).`);
  return dp[n] as number;
}
