import { arr, composite, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import type { KMPInput } from './node';

export function* trace(input: KMPInput): Generator<Frame, { lps: number[]; matches: number[] }> {
  const text = input.text;
  const pattern = input.pattern;
  const t = [...text];
  const p = [...pattern];
  const m = p.length;
  const lps: (number | string)[] = new Array(m).fill('·');
  const found: number[] = [];

  const lpsViz = (i: number, len: number, extra: Record<number, Highlight> = {}) =>
    composite([
      arr(p, { title: 'pattern', highlights: { ...(len > 0 ? hlRange(0, len - 1, 'range') : {}), ...extra }, pointers: [{ name: 'i', index: Math.min(i, m - 1) }, { name: 'len', index: Math.min(len, m - 1) }] }),
      arr(lps, { title: 'lps[i] = độ dài prefix-cũng-là-suffix dài nhất của pattern[0..i]', highlights: i < m ? hl([i, 'active']) : {} }),
    ]);
  const cs: string[] = [];

  if (m === 0) {
    yield frame(20, { pattern: '' }, arr(t, { title: 'text' }), 'Pattern rỗng ⇒ trả về [].');
    return { lps: [], matches: [] };
  }
  // ---- build LPS
  cs.push('buildLPS()');
  lps[0] = 0;
  let len = 0;
  yield frame(7, { pattern, len }, lpsViz(1, 0, hl([0, 'done'])), 'Giai đoạn 1 – bảng LPS. lps[0] = 0 (prefix "proper" phải ngắn hơn chuỗi). Vùng cyan là prefix đang khớp với suffix kết thúc tại i.', { callStack: [...cs] });
  for (let i = 1; i < m; i++) {
    while (len > 0 && p[i] !== p[len]) {
      yield frame(10, { i, len, 'p[i]': p[i], 'p[len]': p[len], 'lps[len-1]': lps[len - 1] }, lpsViz(i, len, hl([i, 'compare'], [len, 'swap'])), `p[${i}] = '${p[i]}' ≠ p[${len}] = '${p[len]}' ⇒ lùi len về lps[${len - 1}] = ${lps[len - 1]} (prefix ngắn hơn cũng là suffix của phần đã khớp).`, { callStack: [...cs] });
      len = lps[len - 1] as number;
    }
    if (p[i] === p[len]) {
      len++;
      yield frame(12, { i, len, 'p[i]': p[i] }, lpsViz(i, len, hl([i, 'done'], [len - 1, 'done'])), `p[${i}] = p[${len - 1}] = '${p[i]}' ⇒ len = ${len}.`, { callStack: [...cs] });
    } else {
      yield frame(12, { i, len: 0 }, lpsViz(i, 0, hl([i, 'compare'])), `p[${i}] = '${p[i]}' ≠ p[0] và len = 0 ⇒ không có prefix nào khớp.`, { callStack: [...cs] });
    }
    lps[i] = len;
    yield frame(13, { i, 'lps[i]': len }, lpsViz(i, len, hl([i, 'done'])), `lps[${i}] = ${len}.`, { callStack: [...cs] });
  }
  cs.pop();
  const lpsNum = lps as number[];
  // ---- search
  cs.push('kmpSearch()');
  let j = 0;
  const searchViz = (i: number, j: number, extra: Record<number, Highlight> = {}, pExtra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (const s of found) for (let k = s; k < s + m; k++) h[k] = 'done';
    if (j > 0) for (let k = i - j; k < i; k++) h[k] = 'range';
    return composite([
      arr(t, { title: 'text', highlights: { ...h, ...extra }, pointers: i < t.length ? [{ name: 'i', index: i }] : [] }),
      arr(p, { title: 'pattern (căn theo i − j)', highlights: { ...(j > 0 ? hlRange(0, j - 1, 'range') : {}), ...pExtra }, pointers: [{ name: 'j', index: Math.min(j, m - 1) }] }),
      arr(lpsNum, { title: 'lps' }),
    ]);
  };
  yield frame(23, { j }, searchViz(0, 0), 'Giai đoạn 2 – tìm kiếm. j = số ký tự pattern đã khớp. i CHỈ TIẾN, không bao giờ lùi.', { callStack: [...cs] });
  for (let i = 0; i < t.length; i++) {
    while (j > 0 && t[i] !== p[j]) {
      yield frame(26, { i, j, 't[i]': t[i], 'p[j]': p[j], 'lps[j-1]': lpsNum[j - 1] }, searchViz(i, j, hl([i, 'swap']), hl([j, 'swap'])), `t[${i}] = '${t[i]}' ≠ p[${j}] = '${p[j]}'. Thay vì lùi i, dịch pattern: j = lps[${j - 1}] = ${lpsNum[j - 1]} – ${lpsNum[j - 1]} ký tự đầu của pattern vẫn khớp với ${lpsNum[j - 1]} ký tự text ngay trước i.`, { callStack: [...cs] });
      j = lpsNum[j - 1];
    }
    if (t[i] === p[j]) {
      j++;
      yield frame(28, { i, j, 't[i]': t[i] }, searchViz(i, j, hl([i, 'compare']), hl([j - 1, 'compare'])), `t[${i}] = p[${j - 1}] = '${t[i]}' ⇒ j = ${j}.`, { callStack: [...cs] });
    } else {
      yield frame(28, { i, j, 't[i]': t[i] }, searchViz(i, 0, hl([i, 'muted'])), `t[${i}] = '${t[i]}' ≠ p[0], j = 0 ⇒ bỏ qua ký tự này.`, { callStack: [...cs] });
    }
    if (j === m) {
      found.push(i - j + 1);
      yield frame(30, { i, start: i - j + 1, matches: [...found] }, searchViz(i, j, hlRange(i - m + 1, i, 'done')), `j = m ⇒ khớp toàn bộ tại vị trí ${i - j + 1}!`, { callStack: [...cs] });
      j = lpsNum[j - 1];
      yield frame(31, { j }, searchViz(i, j), `j = lps[${m - 1}] = ${j} để tiếp tục tìm khớp chồng lấn.`, { callStack: [...cs] });
    }
  }
  cs.pop();
  yield frame(34, { matches: [...found], lps: lpsNum }, searchViz(t.length, 0), found.length ? `Tìm thấy tại: ${found.join(', ')}. Tổng O(n + m): i tiến n lần, j tăng ≤ n lần nên giảm ≤ n lần.` : 'Không tìm thấy. Vẫn chỉ O(n + m).');
  return { lps: lpsNum, matches: found };
}
