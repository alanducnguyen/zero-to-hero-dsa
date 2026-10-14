import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { lists: number[][] }): Generator<Frame, number[]> {
  const lists = input.lists;
  const all: number[] = [];
  const rows = () => lists.map((l, i) => arr(l.length ? l : ['∅'], { title: `list ${i}` }));
  for (let i = 0; i < lists.length; i++) {
    all.push(...lists[i]);
    yield frame(4, { i, 'all.length': all.length }, composite([...rows(), arr(all.length ? all : ['—'], { title: 'all (nối)', highlights: Object.fromEntries(lists[i].map((_, k) => [all.length - lists[i].length + k, 'active' as const])) })]), `Nối list ${i} vào cuối. Thứ tự đã sắp xếp của từng list bị bỏ qua hoàn toàn.`);
  }
  const sorted = [...all].sort((a, b) => a - b);
  yield frame(5, { N: all.length }, composite([...rows(), arr(sorted.length ? sorted : ['—'], { title: 'sort(all)', highlights: Object.fromEntries(sorted.map((_, k) => [k, 'done' as const])) })]), `Sort ${all.length} phần tử: O(N log N). Đúng nhưng lãng phí – ta đã có k dãy sắp xếp mà không dùng.`);
  return sorted;
}
