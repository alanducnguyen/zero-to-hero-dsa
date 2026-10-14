import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, [number, number] | null> {
  const { nums, target } = input;
  const idx = nums.map((_, i) => i).sort((a, b) => nums[a] - nums[b]);
  const sorted = idx.map((i) => nums[i]);
  let l = 0;
  let r = idx.length - 1;
  const viz = (hl: Record<number, 'compare' | 'done' | 'muted'> = {}) =>
    composite([
      arr(nums, { title: 'nums gốc', highlights: Object.fromEntries(idx.filter((_, k) => k < l || k > r).map((i) => [i, 'muted' as const])) }),
      arr(sorted, { title: 'đã sắp xếp (nhãn = giá trị; chỉ số gốc giữ trong idx[])', highlights: hl, pointers: l < r ? [{ name: 'l', index: l }, { name: 'r', index: r }] : [] }),
    ]);
  yield frame(3, { idx, sorted }, viz(), `Sắp xếp O(n log n). Phải giữ mảng chỉ số gốc vì đề hỏi chỉ số, không hỏi giá trị.`);
  while (l < r) {
    const sum = sorted[l] + sorted[r];
    if (sum === target) {
      yield frame(8, { l, r, sum, target }, viz({ [l]: 'done', [r]: 'done' }), `${sorted[l]} + ${sorted[r]} = ${target} ⇒ trả về chỉ số gốc [${Math.min(idx[l], idx[r])}, ${Math.max(idx[l], idx[r])}].`);
      return [Math.min(idx[l], idx[r]), Math.max(idx[l], idx[r])];
    }
    if (sum < target) {
      yield frame(9, { l, r, sum, target }, viz({ [l]: 'compare', [r]: 'compare' }), `${sum} < ${target} ⇒ cần tổng lớn hơn; mọi cặp (l, x) với x ≤ r đều ≤ tổng này nên bỏ hẳn l, tiến l.`);
      l++;
    } else {
      yield frame(10, { l, r, sum, target }, viz({ [l]: 'compare', [r]: 'compare' }), `${sum} > ${target} ⇒ cần tổng nhỏ hơn; mọi cặp (x, r) với x ≥ l đều ≥ tổng này nên bỏ hẳn r, lùi r.`);
      r--;
    }
  }
  yield frame(12, { l, r }, viz(), 'Hai con trỏ gặp nhau, không có cặp nào.');
  return null;
}
