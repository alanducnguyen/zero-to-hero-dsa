import { arr, frame, hl } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { height: number[] }): Generator<Frame, number> {
  const height = [...input.height];
  const n = height.length;
  const viz = (left: number, right: number, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < left || k > right) h[k] = 'muted';
    return arr(height, {
      mode: 'bars',
      highlights: { ...h, ...extra },
      pointers: n ? [{ name: 'left', index: Math.min(n - 1, left) }, { name: 'right', index: Math.max(0, right) }] : [],
      ranges: left < right ? [{ from: left, to: right, label: `container rộng ${right - left}`, color: 'range' }] : [],
    });
  };
  let left = 0;
  let right = n - 1;
  let best = 0;
  yield frame(10, { left, right, best }, viz(left, right),
    'Bắt đầu với container rộng nhất (hai tường ở hai đầu). Bất biến: mọi cặp (i, j) đã bị loại đều không thể cho diện tích lớn hơn best.');
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    yield frame(12, { left, right, best, 'height[left]': height[left], 'height[right]': height[right], h }, viz(left, right, hl([left, 'compare'], [right, 'compare'])),
      `Mực nước bị giới hạn bởi tường thấp hơn: h = min(${height[left]}, ${height[right]}) = ${h}. Nước sẽ tràn qua tường thấp, nên tường cao không quyết định.`);
    const area = h * (right - left);
    yield frame(13, { left, right, best, h, area }, viz(left, right, hl([left, 'compare'], [right, 'compare'])),
      `area = h × (right − left) = ${h} × ${right - left} = ${area}.`);
    if (area > best) {
      best = area;
      yield frame(14, { left, right, best, area }, viz(left, right, hl([left, 'done'], [right, 'done'])),
        `${area} lớn hơn kỷ lục cũ ⇒ cập nhật best = ${best}.`);
    }
    if (height[left] < height[right]) {
      yield frame(16, { left, right, best, 'height[left]': height[left], 'height[right]': height[right] }, viz(left, right, hl([left, 'swap'], [right, 'pointer'])),
        `Tường trái (${height[left]}) thấp hơn. Mọi container dùng tường trái với tường j < right đều hẹp hơn và cao không quá ${height[left]} ⇒ diện tích ≤ ${area}. Tường trái đã "dùng hết tiềm năng" ⇒ loại nó, left++.`);
      left++;
    } else {
      yield frame(18, { left, right, best, 'height[left]': height[left], 'height[right]': height[right] }, viz(left, right, hl([left, 'pointer'], [right, 'swap'])),
        `Tường phải (${height[right]}) thấp hơn hoặc bằng. Ghép nó với bất kỳ tường i > left đều hẹp hơn và cao không quá ${height[right]} ⇒ không thể vượt ${area}. Loại tường phải, right--.`);
      right--;
    }
  }
  yield frame(21, { best, result: best }, viz(left, right),
    `left ≥ right: mọi cặp tường đều đã được xét hoặc bị loại một cách an toàn ⇒ đáp án là ${best}. Tổng cộng chỉ n − 1 bước, O(n).`);
  return best;
}
