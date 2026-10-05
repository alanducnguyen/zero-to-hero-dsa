import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parse, type MInput } from './node';

export function* trace(input: MInput): Generator<Frame, [number, number][]> {
  const intervals = parse(input.intervals);
  const fmt = (iv: [number, number]) => `[${iv[0]},${iv[1]}]`;
  if (intervals.length === 0) {
    yield frame(8, { n: 0 }, arr(['—'], { title: 'intervals' }), 'Không có khoảng ⇒ trả về [].');
    return [];
  }
  const lo = Math.min(...intervals.map((i) => i[0]));
  const hi = Math.max(...intervals.map((i) => i[1]));
  const width = Math.min(hi - lo, 40);
  const scale = (x: number) => Math.round(((x - lo) / Math.max(1, hi - lo)) * width);
  const timeline = (rows: { label: string; iv: [number, number]; hl: Highlight }[]) => {
    const cells = rows.map((r) => Array.from({ length: width + 1 }, (_, c) => (c >= scale(r.iv[0]) && c <= scale(r.iv[1]) ? '' : null)));
    const h: Record<string, Highlight> = {};
    rows.forEach((r, ri) => { for (let c = scale(r.iv[0]); c <= scale(r.iv[1]); c++) h[`${ri},${c}`] = r.hl; });
    return matrix(cells, { title: `Trục thời gian ${lo} → ${hi}`, rowLabels: rows.map((r) => r.label), highlights: h });
  };
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  const viz = (i: number, lastHl: Highlight = 'done', curHl: Highlight = 'compare') => {
    const rows = sorted.map((iv, k) => ({ label: fmt(iv), iv, hl: (k < i ? 'visited' : k === i ? curHl : 'range') as Highlight }));
    const out = merged.map((iv, k) => ({ label: `out ${fmt(iv)}`, iv, hl: (k === merged.length - 1 ? lastHl : 'done') as Highlight }));
    return composite([timeline([...rows, ...out]), arr(merged.length ? merged.map(fmt) : ['—'], { title: 'merged' })]);
  };
  yield frame(9, { sorted: sorted.map(fmt) }, viz(-1), 'Sắp xếp theo điểm đầu. Sau đó chỉ cần so mỗi khoảng với khoảng CUỐI của kết quả – vì mọi khoảng trước đó kết thúc trước hoặc đã được gộp vào nó.');
  merged.push([sorted[0][0], sorted[0][1]]);
  yield frame(10, { merged: merged.map(fmt) }, viz(0, 'done', 'visited'), `Khoảng đầu ${fmt(sorted[0])} vào kết quả.`);
  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];
    const overlap = start <= last[1];
    yield frame(14, { i, current: fmt(sorted[i]), last: fmt(last), overlap }, viz(i, overlap ? 'compare' : 'done'), `So ${fmt(sorted[i])} với khoảng cuối ${fmt(last)}: start ${start} ${overlap ? '≤' : '>'} ${last[1]} ⇒ ${overlap ? 'CHỒNG LẤN ⇒ gộp.' : 'rời nhau ⇒ khoảng mới.'}`);
    if (overlap) {
      const before = last[1];
      last[1] = Math.max(last[1], end);
      yield frame(15, { i, last: fmt(last) }, viz(i, 'swap', 'visited'), `Kéo dài khoảng cuối: end = max(${before}, ${end}) = ${last[1]}. Dùng max vì khoảng mới có thể nằm GỌN trong khoảng cũ.`);
    } else {
      merged.push([start, end]);
      yield frame(17, { i, merged: merged.map(fmt) }, viz(i, 'swap', 'visited'), `Thêm ${fmt(sorted[i])} làm khoảng mới.`);
    }
  }
  yield frame(20, { result: merged.map(fmt) }, viz(sorted.length), `Kết quả: ${merged.map(fmt).join(' ')}. O(n log n) do sắp xếp; bước quét O(n).`);
  return merged;
}
