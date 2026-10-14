import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const a = [...nums].sort((x, y) => x - y);
  yield frame(3, { sorted: a }, composite([arr(nums, { title: 'nums' }), arr(a, { title: 'đã sắp xếp' })]), 'Sắp xếp O(n log n): hai bản sao của số trùng sẽ đứng cạnh nhau.');
  for (let i = 1; i < a.length; i++) {
    const hit = a[i] === a[i - 1];
    yield frame(5, { i, 'a[i-1]': a[i - 1], 'a[i]': a[i] }, composite([arr(nums, { title: 'nums' }), arr(a, { title: 'đã sắp xếp', highlights: { [i - 1]: hit ? 'done' : 'compare', [i]: hit ? 'done' : 'compare' } })]), hit ? `a[${i - 1}] = a[${i}] = ${a[i]} ⇒ số trùng.` : `${a[i - 1]} ≠ ${a[i]}, tiếp.`);
    if (hit) return a[i];
  }
  return -1;
}
