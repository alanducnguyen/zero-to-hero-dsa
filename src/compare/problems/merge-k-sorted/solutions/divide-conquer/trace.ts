import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { lists: number[][] }): Generator<Frame, number[]> {
  const lists = input.lists;
  if (lists.length === 0) { yield frame(3, {}, arr(['∅']), 'Không có list nào.'); return []; }
  let cur = lists;
  let level = 0;
  const rows = (ls: number[][], title: string, hlPair?: number) => composite([arr([title]), ...ls.map((l, i) => arr(l.length ? l : ['∅'], { title: `#${i}`, highlights: hlPair !== undefined && (i === hlPair || i === hlPair + 1) ? Object.fromEntries(l.map((_, k) => [k, 'active' as const])) : {} }))]);
  yield frame(4, { k: cur.length }, rows(cur, `tầng 0: ${cur.length} list`), `Trộn cặp đôi: ${cur.length} list → ${Math.ceil(cur.length / 2)} → … → 1. Số tầng = ⌈log₂ k⌉.`);
  while (cur.length > 1) {
    const next: number[][] = [];
    for (let i = 0; i < cur.length; i += 2) {
      if (i + 1 < cur.length) {
        const a = cur[i], b = cur[i + 1], out: number[] = [];
        let x = 0, y = 0;
        while (x < a.length && y < b.length) out.push(a[x] <= b[y] ? a[x++] : b[y++]);
        while (x < a.length) out.push(a[x++]);
        while (y < b.length) out.push(b[y++]);
        next.push(out);
        yield frame(7, { 'tầng': level, 'cặp': `#${i} + #${i + 1}`, 'kết quả': out }, composite([rows(cur, `tầng ${level}`, i), arr(out.length ? out : ['∅'], { title: 'mergeTwo', highlights: Object.fromEntries(out.map((_, k) => [k, 'done' as const])) })]), `Trộn #${i} với #${i + 1} bằng hai con trỏ O(|a| + |b|). Mỗi phần tử được chép đúng một lần ở mỗi tầng.`);
      } else {
        next.push(cur[i]);
        yield frame(7, { 'tầng': level, 'lẻ': `#${i}` }, rows(cur, `tầng ${level}`, i), `#${i} lẻ cặp ⇒ chuyển thẳng lên tầng sau.`);
      }
    }
    cur = next;
    level++;
    yield frame(8, { 'tầng': level, 'số list': cur.length }, rows(cur, `tầng ${level}: ${cur.length} list`), `Tầng ${level}: còn ${cur.length} list. Mỗi tầng tốn O(N).`);
  }
  yield frame(10, { result: cur[0], 'số tầng': level }, arr(cur[0].length ? cur[0] : ['∅'], { title: 'kết quả', highlights: Object.fromEntries(cur[0].map((_, k) => [k, 'done' as const])) }), `Xong sau ${level} tầng × O(N) = O(N log k), không cần heap.`);
  return cur[0];
}
