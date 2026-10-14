import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import type { RKInput } from './node';

export function* trace(input: RKInput): Generator<Frame, number[]> {
  const text = input.text;
  const pattern = input.pattern;
  const base = 31;
  const mod = Math.max(2, Math.floor(input.mod) || 101);
  const t = [...text];
  const p = [...pattern];
  const n = t.length;
  const m = p.length;
  const matches: number[] = [];
  let hp = 0;
  let ht = 0;
  let high = 1;

  const viz = (i?: number, extra: Record<number, Highlight> = {}, hashHl: Record<string, Highlight> = {}) => {
    const matchHl: Record<number, Highlight> = {};
    for (const s of matches) for (let k = 0; k < m; k++) matchHl[s + k] = 'done';
    return composite([
      arr(t, { title: 'text', highlights: { ...matchHl, ...extra }, ranges: i !== undefined ? [{ from: i, to: i + m - 1, label: `cửa sổ [${i}, ${i + m - 1}]`, color: 'range' }] : [], pointers: i !== undefined ? [{ name: 'i', index: i }] : [] }),
      arr(p, { title: 'pattern' }),
      mapViz({ 'hash(pattern)': hp, 'hash(cửa sổ)': ht, 'B^(m-1) mod M': high, 'base B': base, 'mod M': mod }, hashHl, 'Rolling hash'),
      ...(matches.length ? [arr(matches, { title: 'Vị trí khớp' })] : []),
    ]);
  };

  if (m === 0 || m > n) {
    yield frame(10, { n, m }, viz(), m === 0 ? 'Pattern rỗng ⇒ không tìm.' : 'Pattern dài hơn text ⇒ không thể khớp.');
    return matches;
  }
  for (let i = 1; i < m; i++) high = (high * base) % mod;
  yield frame(12, { m, base, mod, high }, viz(undefined, {}, { 'B^(m-1) mod M': 'active' }), `high = B^(m−1) mod M = ${high}: trọng số của ký tự đầu cửa sổ, cần để "trừ" nó ra khi trượt.`);
  for (let i = 0; i < m; i++) {
    hp = (hp * base + pattern.charCodeAt(i)) % mod;
    ht = (ht * base + text.charCodeAt(i)) % mod;
  }
  yield frame(18, { hp, ht }, viz(0, {}, { 'hash(pattern)': 'active', 'hash(cửa sổ)': 'active' }), `Hash kiểu Horner: h = (h·B + mã ký tự) mod M. hash(pattern) = ${hp}, hash(cửa sổ đầu) = ${ht}.`);
  for (let i = 0; i + m <= n; i++) {
    if (ht === hp) {
      const same = text.slice(i, i + m) === pattern;
      if (same) matches.push(i);
      yield frame(20, { i, ht, hp, 'so sánh trực tiếp': same }, viz(i, Object.fromEntries(Array.from({ length: m }, (_, k) => [i + k, (same ? 'done' : 'swap') as Highlight])), { 'hash(cửa sổ)': same ? 'done' : 'swap' }),
        same ? `Hash trùng và so sánh ký tự khớp ⇒ tìm thấy tại ${i}.` : `Hash trùng (${ht}) nhưng chuỗi khác ⇒ va chạm giả (spurious hit). Phải so sánh trực tiếp mới kết luận được – vì thế trường hợp xấu là O(n·m).`);
    } else {
      yield frame(20, { i, ht, hp }, viz(i, {}, { 'hash(cửa sổ)': 'compare' }), `hash(cửa sổ) = ${ht} ≠ ${hp} ⇒ chắc chắn không khớp, bỏ qua không cần so ký tự.`);
    }
    if (i + m < n) {
      const out = text.charCodeAt(i);
      const inn = text.charCodeAt(i + m);
      ht = (ht - out * high) % mod;
      ht = (ht * base + inn) % mod;
      if (ht < 0) ht += mod;
      yield frame(23, { i, 'bỏ': t[i], 'thêm': t[i + m], ht }, viz(i + 1, { [i]: 'muted', [i + m]: 'active' }, { 'hash(cửa sổ)': 'active' }), `Trượt: bỏ '${t[i]}' (trừ mã × high), nhân B, cộng mã '${t[i + m]}' ⇒ hash mới = ${ht}. O(1) thay vì băm lại m ký tự.`);
    }
  }
  yield frame(27, { matches }, viz(), matches.length ? `Tìm thấy ${matches.length} vị trí: [${matches.join(', ')}].` : 'Không có vị trí nào khớp.');
  return matches;
}
