import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const height = input.height;
  const n = height.length;
  const waterAt: number[] = new Array<number>(n).fill(0);
  let left = 0;
  let right = n - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  const viz = (hl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < left || k > right) h[k] = waterAt[k] > 0 ? 'range' : 'done';
    return composite([
      arr(height, { mode: 'bars', title: 'height (cyan = cột có nước đọng, xanh lá = đã xét không đọng)', highlights: { ...h, ...hl }, pointers: n ? [{ name: 'L', index: Math.min(left, n - 1) }, { name: 'R', index: Math.max(right, 0) }] : [] }),
      arr(waterAt, { title: 'nước tại mỗi cột = min(maxTrái, maxPhải) − height', highlights: Object.fromEntries(waterAt.map((w, k) => [k, (w > 0 ? 'range' : 'muted') as Highlight])) }),
      mapViz({ leftMax, rightMax, water }, { water: 'done' }, 'Trạng thái'),
    ]);
  };
  yield frame(11, { left, right, leftMax, rightMax, water }, viz(), 'Hai con trỏ từ hai đầu, leftMax/rightMax là cột cao nhất đã thấy từ mỗi phía. Nước tại một cột bị chặn bởi min của hai bức tường cao nhất hai bên.');
  while (left < right) {
    if (height[left] < height[right]) {
      yield frame(13, { left, right, 'height[left]': height[left], 'height[right]': height[right] }, viz({ [left]: 'compare', [right]: 'compare' }), `height[L] = ${height[left]} < height[R] = ${height[right]} ⇒ bên phải có tường ≥ ${height[right]} > tường trái, nên mức nước tại L chỉ phụ thuộc leftMax. Xử lý bên trái.`);
      leftMax = Math.max(leftMax, height[left]);
      waterAt[left] = leftMax - height[left];
      water += waterAt[left];
      yield frame(16, { left, leftMax, 'nước tại L': waterAt[left], water }, viz({ [left]: waterAt[left] > 0 ? 'range' : 'active' }), waterAt[left] > 0 ? `Cột ${left} cao ${height[left]} < leftMax = ${leftMax} ⇒ đọng ${waterAt[left]} đơn vị. Tổng = ${water}.` : `Cột ${left} là tường mới bên trái (leftMax = ${leftMax}) ⇒ không đọng nước.`);
      left++;
    } else {
      yield frame(13, { left, right, 'height[left]': height[left], 'height[right]': height[right] }, viz({ [left]: 'compare', [right]: 'compare' }), `height[L] = ${height[left]} ≥ height[R] = ${height[right]} ⇒ bên trái có tường ≥ tường phải, mức nước tại R chỉ phụ thuộc rightMax. Xử lý bên phải.`);
      rightMax = Math.max(rightMax, height[right]);
      waterAt[right] = rightMax - height[right];
      water += waterAt[right];
      yield frame(20, { right, rightMax, 'nước tại R': waterAt[right], water }, viz({ [right]: waterAt[right] > 0 ? 'range' : 'active' }), waterAt[right] > 0 ? `Cột ${right} cao ${height[right]} < rightMax = ${rightMax} ⇒ đọng ${waterAt[right]} đơn vị. Tổng = ${water}.` : `Cột ${right} là tường mới bên phải (rightMax = ${rightMax}) ⇒ không đọng nước.`);
      right--;
    }
  }
  yield frame(24, { water }, viz(n ? { [left]: 'done' } : {}), `Hai con trỏ gặp nhau. Tổng nước = ${water}. Một lượt O(n), O(1) bộ nhớ.`);
  return water;
}
