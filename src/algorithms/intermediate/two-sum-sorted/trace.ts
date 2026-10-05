import { arr, frame, hl } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[]; target: number }): Generator<Frame, [number, number] | null> {
  const a = [...input.array].sort((x, y) => x - y);
  const target = input.target;
  const n = a.length;
  const viz = (left: number, right: number, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < left || k > right) h[k] = 'muted';
    return arr(a, { highlights: { ...h, ...extra }, pointers: n ? [{ name: 'left', index: Math.max(0, left) }, { name: 'right', index: Math.min(n - 1, right) }] : [], ranges: left < right ? [{ from: left, to: right, label: 'ứng viên còn lại' }] : [] });
  };
  let left = 0;
  let right = n - 1;
  yield frame(10, { target, left, right }, viz(left, right), 'Hai con trỏ ở hai đầu mảng đã sắp xếp. Bất biến: nếu có cặp đúng, cả hai phần tử của nó nằm trong [left, right].');
  while (left < right) {
    const sum = a[left] + a[right];
    yield frame(12, { target, left, right, 'a[left]': a[left], 'a[right]': a[right], sum }, viz(left, right, hl([left, 'compare'], [right, 'compare'])), `sum = ${a[left]} + ${a[right]} = ${sum}, so với target ${target}.`);
    if (sum === target) {
      yield frame(14, { left, right, result: [left, right] }, viz(left, right, hl([left, 'done'], [right, 'done'])), `Bằng target ⇒ tìm thấy cặp (${left}, ${right}).`);
      return [left, right];
    } else if (sum < target) {
      yield frame(16, { target, left, right, sum }, viz(left, right, hl([left, 'swap'], [right, 'compare'])), `sum < target. Với a[left] = ${a[left]}, mọi a[k] (k ≤ right) đều cho tổng ≤ ${sum} < target ⇒ a[left] không thể thuộc cặp nào ⇒ loại, left++.`);
      left++;
    } else {
      yield frame(18, { target, left, right, sum }, viz(left, right, hl([left, 'compare'], [right, 'swap'])), `sum > target. Với a[right] = ${a[right]}, mọi a[k] (k ≥ left) đều cho tổng ≥ ${sum} > target ⇒ a[right] không thể thuộc cặp nào ⇒ loại, right--.`);
      right--;
    }
  }
  yield frame(21, { target, left, right, result: null }, viz(left, right), 'left ≥ right: không còn cặp nào để xét ⇒ không tồn tại. Mỗi bước loại đúng 1 phần tử ⇒ tổng O(n).');
  return null;
}
