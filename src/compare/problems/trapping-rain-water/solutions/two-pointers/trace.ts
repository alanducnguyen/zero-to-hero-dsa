import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const h = input.height;
  const n = h.length;
  let left = 0, right = n - 1, leftMax = 0, rightMax = 0, water = 0;
  const w: number[] = new Array<number>(n).fill(0);
  const viz = (hl: Record<number, Highlight> = {}) => composite([arr(h, { mode: 'bars', highlights: { ...Object.fromEntries(w.map((v, k) => [k, (k < left || k > right ? (v > 0 ? 'range' : 'done') : 'visited') as Highlight])), ...hl }, pointers: n ? [{ name: 'L', index: Math.min(left, n - 1) }, { name: 'R', index: Math.max(right, 0) }] : [] }), mapViz({ leftMax, rightMax, water }, { water: 'done' }, 'Chỉ 3 biến – O(1) bộ nhớ')]);
  while (left < right) {
    if (h[left] < h[right]) {
      leftMax = Math.max(leftMax, h[left]);
      w[left] = leftMax - h[left];
      water += w[left];
      yield frame(9, { left, right, 'h[L] < h[R]': true, leftMax, 'nước': w[left], water }, viz({ [left]: w[left] > 0 ? 'range' : 'active', [right]: 'compare' }), `h[L] = ${h[left]} < h[R] = ${h[right]} ⇒ bên phải có tường ≥ ${h[right]}, nên mức nước tại L chỉ do leftMax = ${leftMax} quyết định: +${w[left]}.`);
      left++;
    } else {
      rightMax = Math.max(rightMax, h[right]);
      w[right] = rightMax - h[right];
      water += w[right];
      yield frame(13, { left, right, 'h[L] < h[R]': false, rightMax, 'nước': w[right], water }, viz({ [right]: w[right] > 0 ? 'range' : 'active', [left]: 'compare' }), `h[L] = ${h[left]} ≥ h[R] = ${h[right]} ⇒ bên trái có tường ≥ ${h[left]}, mức nước tại R do rightMax = ${rightMax} quyết định: +${w[right]}.`);
      right--;
    }
  }
  yield frame(17, { water }, viz(), `Hai con trỏ gặp nhau. Tổng ${water}: một lượt, không mảng phụ.`);
  return water;
}
