import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; t: string }): Generator<Frame, boolean> {
  const { s, t } = input;
  const count = new Map<string, number>();
  const viz = (si: number, ti: number, hl: Record<string, Highlight> = {}) =>
    composite([
      arr([...s], { title: 's (cộng)', highlights: si < s.length ? { [si]: 'active' } : {} }),
      arr([...t], { title: 't (trừ)', highlights: ti < t.length ? { [ti]: 'active' } : {} }),
      mapViz(Object.fromEntries([...count].map(([k, v]) => [k, v])), hl, 'count: ký tự → (số lần trong s) − (số lần trong t)'),
    ]);
  if (s.length !== t.length) {
    yield frame(3, { 's.length': s.length, 't.length': t.length }, viz(s.length, t.length), 'Độ dài khác ⇒ false ngay.');
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    count.set(s[i], (count.get(s[i]) ?? 0) + 1);
    yield frame(5, { c: s[i], 'count[c]': count.get(s[i]) }, viz(i, t.length, { [s[i]]: 'compare' }), `Cộng '${s[i]}' → ${count.get(s[i])}.`);
  }
  for (let i = 0; i < t.length; i++) {
    const v = (count.get(t[i]) ?? 0) - 1;
    count.set(t[i], v);
    yield frame(7, { c: t[i], 'count[c]': v }, viz(s.length, i, { [t[i]]: v < 0 ? 'swap' : 'compare' }), v < 0 ? `Trừ '${t[i]}' xuống ${v} < 0: t có '${t[i]}' nhiều hơn s ⇒ false, dừng sớm.` : `Trừ '${t[i]}' → ${v}.`);
    if (v < 0) return false;
  }
  yield frame(11, { count: Object.fromEntries(count) }, viz(s.length, t.length, Object.fromEntries([...count.keys()].map((k) => [k, 'done' as Highlight]))), 'Không giá trị nào âm và tổng cộng = tổng trừ ⇒ tất cả về 0 ⇒ anagram.');
  return true;
}
