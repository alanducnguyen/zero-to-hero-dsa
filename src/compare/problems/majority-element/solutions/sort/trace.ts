import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const m = sorted[mid];
  yield frame(3, { sorted }, composite([arr(nums, { title: 'nums' }), arr(sorted, { title: 'đã sắp xếp' })]), 'Sắp xếp O(n log n). Sau khi sắp xếp, các bản sao của mỗi giá trị nằm liền nhau.');
  yield frame(4, { mid, 'sorted[mid]': m }, composite([arr(nums, { title: 'nums' }), arr(sorted, { title: 'đã sắp xếp', highlights: { ...Object.fromEntries(sorted.map((v, i) => [i, (v === m ? 'done' : 'muted') as Highlight])), [mid]: 'active' }, pointers: [{ name: 'n/2', index: mid }] })]), `Một dải dài hơn n/2 phần tử bắt buộc phủ vị trí giữa ⇒ sorted[${mid}] = ${m} là đa số.`);
  return m;
}
