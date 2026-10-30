import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = input.s;
  let prev2 = 0;
  let prev1 = 1;
  const viz = (charHl: Record<number, Highlight> = {}, varHl: Record<string, Highlight> = {}) =>
    composite([arr(s.split(''), { mode: 'cells', title: 's (nhãn = chỉ số)', highlights: charHl }), mapViz({ prev2, prev1 }, varHl, 'Chỉ 2 biến: dp[i−2], dp[i−1]')]);
  yield frame(4, { prev2, prev1 }, viz({}, { prev1: 'active' }), 'prev1 = dp[0] = 1 (tiền tố rỗng). prev2 chưa có nghĩa, đặt 0 – ở i = 1 không bao giờ ghép cặp nên nó không bị dùng.');
  for (let i = 1; i <= s.length; i++) {
    const one = s[i - 1];
    let cur = one !== '0' ? prev1 : 0;
    const two = i >= 2 ? Number(s.slice(i - 2, i)) : 0;
    const ok = two >= 10 && two <= 26;
    yield frame(6, { i, one, cur, prev1 }, viz({ [i - 1]: one === '0' ? 'muted' : 'active' }, { prev1: 'compare' }), one !== '0' ? `'${one}' đứng một mình ⇒ cur = prev1 = ${prev1}.` : `Bẫy '0': không đứng một mình ⇒ cur = 0; chỉ còn hy vọng ghép "10"/"20".`);
    if (ok) {
      cur += prev2;
      yield frame(8, { i, two, cur, prev2 }, viz({ [i - 2]: 'compare', [i - 1]: 'compare' }, { prev2: 'compare' }), `"${s.slice(i - 2, i)}" ∈ [10, 26] ⇒ cur += prev2 = ${prev2} ⇒ ${cur}.`);
    }
    [prev2, prev1] = [prev1, cur];
    yield frame(9, { i, prev2, prev1 }, viz({ [i - 1]: 'done' }, { prev2: 'swap', prev1: 'swap' }), `Trượt: prev2 ← dp[${i - 1}], prev1 ← dp[${i}] = ${cur}. Giá trị cũ hơn không bao giờ được dùng lại nên bỏ đi an toàn.${cur === 0 && prev2 === 0 ? ' Cả hai bằng 0 ⇒ đáp án chắc chắn 0.' : ''}`);
  }
  yield frame(11, { result: prev1 }, viz({}, { prev1: 'done' }), `Kết quả ${prev1}. O(n) thời gian, O(1) bộ nhớ – tối ưu.`);
  return prev1;
}
