import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const h = input.height;
  const n = h.length;
  if (n === 0) { yield frame(4, {}, arr(['∅']), 'Mảng rỗng ⇒ 0.'); return 0; }
  const L: (number | string)[] = new Array<number | string>(n).fill('·');
  const R: (number | string)[] = new Array<number | string>(n).fill('·');
  const viz = (hl: Record<number, Highlight> = {}, lHl: Record<number, Highlight> = {}, rHl: Record<number, Highlight> = {}) =>
    composite([arr(h, { mode: 'bars', title: 'height', highlights: hl }), arr(L, { title: 'maxLeft[i] = max(height[0..i])', highlights: lHl }), arr(R, { title: 'maxRight[i] = max(height[i..n−1])', highlights: rHl })]);
  L[0] = h[0];
  for (let i = 1; i < n; i++) {
    L[i] = Math.max(L[i - 1] as number, h[i]);
    yield frame(8, { i, 'maxLeft[i]': L[i] }, viz({ [i]: 'active' }, { [i]: 'done', [i - 1]: 'compare' }), `Lượt 1 (trái → phải): maxLeft[${i}] = max(maxLeft[${i - 1}], height[${i}]) = ${L[i]}.`);
  }
  R[n - 1] = h[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    R[i] = Math.max(R[i + 1] as number, h[i]);
    yield frame(10, { i, 'maxRight[i]': R[i] }, viz({ [i]: 'active' }, {}, { [i]: 'done', [i + 1]: 'compare' }), `Lượt 2 (phải → trái): maxRight[${i}] = max(maxRight[${i + 1}], height[${i}]) = ${R[i]}.`);
  }
  let water = 0;
  const w: number[] = [];
  for (let i = 0; i < n; i++) {
    w[i] = Math.min(L[i] as number, R[i] as number) - h[i];
    water += w[i];
    yield frame(12, { i, 'min(L,R)': Math.min(L[i] as number, R[i] as number), 'height[i]': h[i], 'nước': w[i], water }, viz(Object.fromEntries(w.map((v, k) => [k, (v > 0 ? 'range' : 'muted') as Highlight])), { [i]: 'compare' }, { [i]: 'compare' }), `Lượt 3: nước tại ${i} = min(${L[i]}, ${R[i]}) − ${h[i]} = ${w[i]}. Tổng = ${water}.`);
  }
  yield frame(13, { water }, viz(Object.fromEntries(w.map((v, k) => [k, (v > 0 ? 'range' : 'done') as Highlight]))), `Tổng ${water}. Ba lượt O(n), đổi O(n) bộ nhớ lấy tốc độ – dễ hiểu nhất trong các cách tuyến tính.`);
  return water;
}
