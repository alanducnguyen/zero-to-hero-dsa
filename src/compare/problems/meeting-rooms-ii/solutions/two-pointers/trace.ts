import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { type Iv } from '../../viz';

export function* trace({ intervals }: { intervals: Iv[] }): Generator<Frame, number> {
  const starts = intervals.map((iv) => iv[0]).sort((a, b) => a - b);
  const ends = intervals.map((iv) => iv[1]).sort((a, b) => a - b);
  let rooms = 0;
  let e = 0;
  const viz = (s: number, sHl?: Highlight, eHl?: Highlight): VisualState => composite([
    arr(starts, { title: 'starts (đã sort)', mode: 'cells', highlights: { ...Object.fromEntries(starts.map((_, k) => [k, k < s ? 'visited' : 'muted'])), ...(s >= 0 && s < starts.length ? { [s]: sHl ?? 'active' } : {}) }, pointers: s >= 0 && s < starts.length ? [{ name: 's', index: s }] : [] }),
    arr(ends, { title: `ends (đã sort) – ${e} phòng đã được trả & dùng lại`, mode: 'cells', highlights: { ...Object.fromEntries(ends.map((_, k) => [k, k < e ? 'done' : 'muted'])), ...(e < ends.length && s >= 0 && s < starts.length ? { [e]: eHl ?? 'pointer' } : {}) }, pointers: e < ends.length ? [{ name: 'e', index: e }] : [] }),
  ]);
  yield frame(4, { starts, ends }, viz(-1), 'Sort starts và ends RIÊNG: ta không cần biết cuộc họp nào dùng phòng nào, chỉ cần đếm "đã có bao nhiêu phòng được trả trước thời điểm này". Sort là phần O(n log n).');
  for (let s = 0; s < starts.length; s++) {
    const start = starts[s];
    const open = start < ends[e];
    yield frame(open ? 8 : 9, { start, 'ends[e]': ends[e], e, rooms: open ? rooms + 1 : rooms }, viz(s, open ? 'swap' : 'done', open ? 'compare' : 'done'),
      open ? `start = ${start} < ends[e] = ${ends[e]}: chưa cuộc họp nào kết thúc kịp ⇒ rooms = ${rooms + 1}.` : `start = ${start} ≥ ends[e] = ${ends[e]}: một cuộc họp đã trả phòng (chạm mút vẫn được) ⇒ tái dùng, e tiến lên ${e + 1}, rooms giữ ${rooms}.`);
    if (open) rooms++;
    else e++;
  }
  yield frame(11, { rooms }, viz(starts.length), `Kết quả ${rooms} phòng. Vòng quét chỉ O(n) với hai biến – không heap, không bộ nhớ ngoài hai mảng; chi phí còn lại hoàn toàn nằm ở hai lần sort.`);
  return rooms;
}
