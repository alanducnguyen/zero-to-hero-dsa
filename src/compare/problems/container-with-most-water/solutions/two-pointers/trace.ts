import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const height = input.height;
  const n = height.length;
  let left = 0;
  let right = n - 1;
  let best = 0;
  const viz = (extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < left || k > right) h[k] = 'muted';
    return arr(height, { mode: 'bars', highlights: { ...h, ...extra }, pointers: n ? [{ name: 'left', index: Math.min(left, n - 1) }, { name: 'right', index: Math.max(right, 0) }] : [], ranges: left < right ? [{ from: left, to: right, label: `rộng ${right - left}`, color: 'range' }] : [] });
  };
  yield frame(5, { left, right, best }, viz(), 'Bắt đầu với container rộng nhất. Mỗi bước loại hẳn một tường cùng mọi cặp chứa nó ⇒ chỉ n − 1 bước.');
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    const better = area > best;
    best = Math.max(best, area);
    yield frame(8, { left, right, area, best }, viz({ [left]: better ? 'swap' : 'compare', [right]: better ? 'swap' : 'compare' }),
      `min(${height[left]}, ${height[right]}) × ${right - left} = ${area}${better ? ` ⇒ best mới = ${best}` : ` ≤ best = ${best}`}.`);
    if (height[left] < height[right]) {
      yield frame(9, { left, right, 'height[left]': height[left], 'height[right]': height[right] }, viz({ [left]: 'muted' }),
        `Tường trái ${height[left]} thấp hơn: mọi cặp (left, j) với j < right đều hẹp hơn và mực nước ≤ ${height[left]} ⇒ không cặp nào hơn ${area}. Loại left an toàn.`);
      left++;
    } else {
      yield frame(10, { left, right, 'height[left]': height[left], 'height[right]': height[right] }, viz({ [right]: 'muted' }),
        `Tường phải ${height[right]} ≤ tường trái: mọi cặp (i, right) với i > left đều hẹp hơn và nước ≤ ${height[right]} ⇒ loại right.`);
      right--;
    }
  }
  yield frame(12, { best }, viz(), `best = ${best} sau ${Math.max(0, n - 1)} bước. O(n) vì mỗi bước loại một tường – không bỏ sót cặp tối ưu nhờ lập luận ở trên.`);
  return best;
}
