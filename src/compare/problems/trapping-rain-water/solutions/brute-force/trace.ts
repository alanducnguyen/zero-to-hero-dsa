import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const h = input.height;
  let water = 0;
  const w: number[] = new Array<number>(h.length).fill(0);
  for (let i = 0; i < h.length; i++) {
    let maxL = 0, maxR = 0, iL = i, iR = i;
    for (let j = 0; j <= i; j++) if (h[j] > maxL) { maxL = h[j]; iL = j; }
    for (let j = i; j < h.length; j++) if (h[j] > maxR) { maxR = h[j]; iR = j; }
    yield frame(6, { i, maxL, maxR }, composite([arr(h, { mode: 'bars', highlights: { [i]: 'active', [iL]: 'pointer', [iR]: 'pointer' }, ranges: [{ from: 0, to: i, label: 'quét trái', color: 'range' }, { from: i, to: h.length - 1, label: 'quét phải', color: 'compare' }] }), mapViz({ water }, {}, 'Tổng')]), `Cột ${i}: quét toàn bộ hai phía ⇒ maxL = ${maxL}, maxR = ${maxR}. Mỗi cột tốn O(n) ⇒ O(n²) tổng.`);
    w[i] = Math.min(maxL, maxR) - h[i];
    water += w[i];
    yield frame(8, { i, 'min(maxL,maxR)': Math.min(maxL, maxR), 'height[i]': h[i], 'nước': w[i], water }, composite([arr(h, { mode: 'bars', highlights: { ...Object.fromEntries(w.map((v, k) => [k, (v > 0 ? 'range' : 'muted') as Highlight])), [i]: w[i] > 0 ? 'range' : 'active' } }), mapViz({ water }, { water: 'done' }, 'Tổng')]), `Nước tại ${i} = min(${maxL}, ${maxR}) − ${h[i]} = ${w[i]}. Tổng = ${water}.`);
  }
  return water;
}
