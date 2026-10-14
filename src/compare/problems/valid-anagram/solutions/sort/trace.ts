import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; t: string }): Generator<Frame, boolean> {
  const { s, t } = input;
  if (s.length !== t.length) {
    yield frame(3, { 's.length': s.length, 't.length': t.length }, composite([arr([...s], { title: 's' }), arr([...t], { title: 't' })]), 'Độ dài khác nhau ⇒ không thể là anagram, trả về false ngay.');
    return false;
  }
  const a = [...s].sort().join('');
  const b = [...t].sort().join('');
  yield frame(5, { a, b }, composite([arr([...a], { title: 's đã sắp xếp' }), arr([...b], { title: 't đã sắp xếp' })]), 'Sắp xếp cả hai chuỗi O(n log n): anagram ⟺ cùng multiset ký tự ⟺ cùng chuỗi sau khi sắp xếp.');
  const diff = [...a].findIndex((c, i) => c !== b[i]);
  const hl: Record<number, Highlight> = diff >= 0 ? { [diff]: 'swap' } : Object.fromEntries([...a].map((_, i) => [i, 'done' as Highlight]));
  yield frame(6, { 'a === b': a === b }, composite([arr([...a], { title: 's đã sắp xếp', highlights: hl }), arr([...b], { title: 't đã sắp xếp', highlights: hl })]), a === b ? 'Hai chuỗi giống hệt ⇒ anagram.' : `Khác nhau tại vị trí ${diff} ⇒ không phải anagram.`);
  return a === b;
}
