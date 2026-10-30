import { arr, composite, frame, hlRange, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { heights: number[] }): Generator<Frame, number> {
  const h = input.heights;
  const n = h.length;
  const left = new Array<number>(n).fill(-1);
  const right = new Array<number>(n).fill(n);
  const st: number[] = [];
  const viz = (i: number, hl: Record<number, Highlight>, title: string) => composite([
    arr(h, { mode: 'bars', highlights: hl, pointers: i >= 0 && i < n ? [{ name: 'i', index: i }] : [] }),
    arr(left.map(String), { title: 'left[i]' }),
    arr(right.map(String), { title: 'right[i]' }),
    stack(st.map((k) => `#${k}:${h[k]}`), undefined, title),
  ]);
  for (let i = 0; i < n; i++) {
    let popped = 0;
    while (st.length && h[st[st.length - 1]] >= h[i]) { st.pop(); popped++; }
    if (st.length) left[i] = st[st.length - 1];
    yield frame(9, { i, 'h[i]': h[i], 'pop': popped, 'left[i]': left[i] }, viz(i, { [i]: 'active', ...(left[i] >= 0 ? { [left[i]]: 'pointer' } : {}) }, 'Stack (lượt trái → phải)'), `Pop ${popped} cột ≥ ${h[i]}: chúng không bao giờ là "cột thấp hơn gần nhất" của ai ở bên phải nữa vì #${i} thấp hơn và gần hơn. ${left[i] >= 0 ? `Đỉnh còn lại #${left[i]} là biên trái.` : 'Stack rỗng ⇒ không có cột thấp hơn bên trái, biên = -1.'}`);
    st.push(i);
  }
  st.length = 0;
  for (let i = n - 1; i >= 0; i--) {
    let popped = 0;
    while (st.length && h[st[st.length - 1]] >= h[i]) { st.pop(); popped++; }
    if (st.length) right[i] = st[st.length - 1];
    yield frame(15, { i, 'h[i]': h[i], 'pop': popped, 'right[i]': right[i] }, viz(i, { [i]: 'active', ...(right[i] < n ? { [right[i]]: 'pointer' } : {}) }, 'Stack (lượt phải → trái)'), `Đối xứng: ${right[i] < n ? `#${right[i]} là cột thấp hơn gần nhất bên phải.` : `không có ⇒ biên = n = ${n}.`}`);
    st.push(i);
  }
  let best = 0;
  for (let i = 0; i < n; i++) {
    const area = h[i] * (right[i] - left[i] - 1);
    const better = area > best;
    best = Math.max(best, area);
    yield frame(19, { i, 'left[i]': left[i], 'right[i]': right[i], area, best }, viz(i, { ...hlRange(left[i] + 1, right[i] - 1, 'range'), [i]: better ? 'done' : 'active' }, 'Stack (đã xong)'), `Hình cao đúng h[${i}] = ${h[i]} kéo dài tới khi gặp cột thấp hơn: (${left[i]}, ${right[i]}) mở ⇒ rộng ${right[i] - left[i] - 1}, diện tích ${area}${better ? ' – kỷ lục mới' : ''}.`);
  }
  yield frame(20, { best }, viz(-1, {}, 'Stack'), `Đáp án ${best}. Ba lượt O(n), hai mảng phụ – dễ chứng minh: hình tối ưu luôn có chiều cao bằng một cột nào đó.`);
  return best;
}
