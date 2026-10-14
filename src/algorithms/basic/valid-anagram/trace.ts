import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; t: string }): Generator<Frame, boolean> {
  const s = [...input.s], t = [...input.t];
  const count = new Map<string, number>();
  const viz = (sHl: Record<number, Highlight> = {}, tHl: Record<number, Highlight> = {}, mHl?: Record<string, Highlight>) =>
    composite([composite([arr(s.length ? s : ['∅'], { title: 's', highlights: sHl }), arr(t.length ? t : ['∅'], { title: 't', highlights: tHl })], 'row'), mapViz(count, mHl, 'count: ký tự → (số trong s) − (số trong t)')]);
  if (s.length !== t.length) {
    yield frame(6, { 'len s': s.length, 'len t': t.length, result: false }, viz(), `Độ dài khác nhau (${s.length} ≠ ${t.length}) ⇒ không thể là anagram. Kiểm tra rẻ này loại sớm nhiều case.`);
    return false;
  }
  yield frame(7, {}, viz(), 'Map đếm rỗng. Ý tưởng: cộng 1 cho mỗi ký tự của s, trừ 1 cho mỗi ký tự của t; anagram ⇔ mọi bộ đếm về 0.');
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) ?? 0) + 1);
    yield frame(8, { ch: s[i], count: count.get(s[i]) }, viz({ ...hlRange(0, i - 1, 'visited'), [i]: 'active' }, {}, { [s[i]]: 'swap' }), `count['${s[i]}'] = ${count.get(s[i])}.`);
  }
  for (let i = 0; i < t.length; i++) {
    const c = (count.get(t[i]) ?? 0) - 1;
    if (c < 0) {
      yield frame(11, { ch: t[i], count: c, result: false }, viz(hlRange(0, s.length - 1, 'visited'), { ...hlRange(0, i - 1, 'visited'), [i]: 'swap' }, { [t[i]]: 'swap' }), `'${t[i]}' xuất hiện trong t nhiều hơn trong s (bộ đếm âm) ⇒ false ngay, không cần xem tiếp.`);
      return false;
    }
    count.set(t[i], c);
    yield frame(12, { ch: t[i], count: c }, viz(hlRange(0, s.length - 1, 'visited'), { ...hlRange(0, i - 1, 'visited'), [i]: 'active' }, { [t[i]]: 'compare' }), `count['${t[i]}'] = ${c}.`);
  }
  yield frame(14, { result: true }, viz(hlRange(0, s.length - 1, 'done'), hlRange(0, t.length - 1, 'done'), Object.fromEntries([...count.keys()].map((k) => [k, 'done' as Highlight]))), 'Cùng độ dài, tổng cộng = tổng trừ, không bộ đếm nào âm ⇒ tất cả bằng 0 ⇒ anagram.');
  return true;
}
