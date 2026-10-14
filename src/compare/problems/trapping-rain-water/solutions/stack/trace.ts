import { arr, composite, frame, mapViz, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const h = input.height;
  const st: number[] = [];
  let water = 0;
  const viz = (i: number, hl: Record<number, Highlight> = {}, layer?: { from: number; to: number; label: string }) =>
    composite([arr(h, { mode: 'bars', highlights: { ...Object.fromEntries(st.map((k) => [k, 'compare' as Highlight])), ...hl }, pointers: i < h.length ? [{ name: 'i', index: i }] : [], ranges: layer ? [{ ...layer, color: 'range' }] : [] }), composite([stackViz(st.length ? st.map((k) => `${k}:${h[k]}`) : ['rỗng'], {}, 'stack (chỉ số:cao), giảm dần'), mapViz({ water }, {}, 'Tổng')], 'row')]);
  for (let i = 0; i < h.length; i++) {
    yield frame(5, { i, 'height[i]': h[i], 'đỉnh': st.length ? h[st[st.length - 1]] : '–' }, viz(i, { [i]: 'active' }), st.length && h[i] > h[st[st.length - 1]] ? `height[${i}] = ${h[i]} > đỉnh ⇒ cột này là tường phải cho hố ở đỉnh stack. Pop và tính lớp nước.` : `height[${i}] = ${h[i]} ≤ đỉnh (hoặc stack rỗng) ⇒ chưa khép được hố nào, đẩy vào stack.`);
    while (st.length > 0 && h[i] > h[st[st.length - 1]]) {
      const bottom = st.pop()!;
      if (st.length === 0) {
        yield frame(8, { bottom }, viz(i, { [i]: 'active', [bottom]: 'muted' }), `Pop đáy ${bottom} nhưng stack rỗng ⇒ không có tường trái, không đọng nước.`);
        break;
      }
      const left = st[st.length - 1];
      const width = i - left - 1;
      const level = Math.min(h[left], h[i]) - h[bottom];
      water += width * level;
      yield frame(12, { bottom, left, i, width, level, 'lớp': width * level, water }, viz(i, { [i]: 'active', [left]: 'pointer', [bottom]: 'swap' }, { from: left + 1, to: i - 1, label: `lớp ${width}×${level}` }), `Hố đáy ${bottom} (cao ${h[bottom]}), tường trái ${left} (${h[left]}), tường phải ${i} (${h[i]}): lớp nước rộng ${width}, cao min(${h[left]}, ${h[i]}) − ${h[bottom]} = ${level} ⇒ +${width * level}.`);
    }
    st.push(i);
  }
  yield frame(16, { water }, viz(h.length), `Tổng ${water}. Mỗi chỉ số push/pop một lần ⇒ O(n). Cách này tính nước theo lớp ngang, khác hai cách kia tính theo cột.`);
  return water;
}
