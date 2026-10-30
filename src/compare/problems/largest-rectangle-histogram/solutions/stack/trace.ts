import { arr, composite, frame, hlRange, mapViz, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { heights: number[] }): Generator<Frame, number> {
  const h = input.heights;
  const n = h.length;
  const st: number[] = [];
  let best = 0;
  const viz = (i: number, hl: Record<number, Highlight>) => composite([
    arr(h, { mode: 'bars', highlights: { ...Object.fromEntries(st.map((k) => [k, 'pointer'])), ...hl }, pointers: i < n ? [{ name: 'i', index: i }] : [] }),
    stack(st.map((k) => `#${k}:${h[k]}`), undefined, 'Stack chỉ số (cao tăng dần)'),
    mapViz({ best }, { best: 'done' }),
  ], 'column');
  for (let i = 0; i <= n; i++) {
    const cur = i === n ? 0 : h[i];
    while (st.length && h[st[st.length - 1]] >= cur) {
      const top = st.pop()!;
      const left = st.length ? st[st.length - 1] : -1;
      const area = h[top] * (i - left - 1);
      const better = area > best;
      best = Math.max(best, area);
      yield frame(10, { i, h: cur, top, left, 'rộng': i - left - 1, area, best }, viz(i, { ...hlRange(left + 1, i - 1, 'range'), [top]: better ? 'done' : 'swap' }), `${i === n ? 'Cột ảo 0 ở cuối' : `h[${i}] = ${cur}`} ≤ h[${top}] = ${h[top]} ⇒ #${top} không thể kéo sang phải nữa: biên phải = ${i}. Biên trái = phần tử ngay dưới nó trong stack (${left}), vì mọi cột giữa đã bị pop do cao hơn. Diện tích ${h[top]} × ${i - left - 1} = ${area}${better ? ' – kỷ lục mới' : ''}.`);
    }
    st.push(i);
    if (i < n) yield frame(12, { i, h: cur, best }, viz(i, { [i]: 'active' }), `Push #${i}: stack vẫn tăng dần. Cột này chưa biết biên phải nên chưa tính – mỗi cột được push/pop đúng một lần ⇒ O(n).`);
  }
  st.length = 0; // bỏ cột ảo khỏi hình
  yield frame(14, { best }, viz(n, {}), `Đáp án ${best}. Một lượt, mỗi chỉ số vào/ra stack một lần: O(n) thời gian, O(n) bộ nhớ.`);
  return best;
}
