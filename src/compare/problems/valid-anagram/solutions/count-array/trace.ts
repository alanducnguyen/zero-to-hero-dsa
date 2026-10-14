import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; t: string }): Generator<Frame, boolean> {
  const { s, t } = input;
  const A = 'a'.charCodeAt(0);
  const count = new Array<number>(26).fill(0);
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i));
  const viz = (i: number, hl: Record<number, Highlight> = {}) =>
    composite([
      composite([arr([...s], { title: 's', highlights: i < s.length ? { [i]: 'active' } : {} }), arr([...t], { title: 't', highlights: i < t.length ? { [i]: 'active' } : {} })], 'row'),
      arr(count.map((v, k) => `${letters[k]}:${v}`), { title: 'count[26] (chữ:giá trị) – bộ nhớ cố định', highlights: hl }),
    ]);
  if (s.length !== t.length) {
    yield frame(3, { 's.length': s.length, 't.length': t.length }, viz(s.length), 'Độ dài khác ⇒ false.');
    return false;
  }
  for (let i = 0; i < s.length; i++) {
    const si = s.charCodeAt(i) - A;
    const ti = t.charCodeAt(i) - A;
    count[si]++;
    count[ti]--;
    yield frame(8, { i, 's[i]': s[i], 't[i]': t[i], [`count[${s[i]}]`]: count[si], [`count[${t[i]}]`]: count[ti] }, viz(i + 1, { [si]: 'compare', [ti]: 'swap' }), `Một lượt duy nhất: +1 cho '${s[i]}', −1 cho '${t[i]}'. Chỉ số = mã ký tự − 'a', không cần hash.`);
  }
  const ok = count.every((v) => v === 0);
  const bad = count.findIndex((v) => v !== 0);
  yield frame(10, { 'mọi ô = 0': ok }, viz(s.length, ok ? Object.fromEntries(count.map((_, k) => [k, 'done' as Highlight])) : { [bad]: 'swap' }), ok ? 'Toàn 0 ⇒ anagram.' : `count['${letters[bad]}'] = ${count[bad]} ≠ 0 ⇒ không phải anagram.`);
  return ok;
}
