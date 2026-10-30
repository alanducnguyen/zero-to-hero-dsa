import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { parse, type IInput } from './node';

type Status = 'pending' | 'left' | 'merged' | 'right';

export function* trace(input: IInput): Generator<Frame, number[][]> {
  const { intervals, newInterval } = parse(input);
  const fmt = (iv: number[]) => `[${iv[0]},${iv[1]}]`;
  const n = intervals.length;
  const all = [...intervals, newInterval];
  const lo = Math.min(...all.map((iv) => iv[0]));
  const hi = Math.max(...all.map((iv) => iv[1]));
  const width = Math.min(Math.max(hi - lo, 1), 40);
  const scale = (x: number) => Math.round(((x - lo) / Math.max(1, hi - lo)) * width);
  const status: Status[] = intervals.map(() => 'pending');
  const result: number[][] = [];
  let [start, end] = newInterval;
  let i = 0;
  const statusHl: Record<Status, Highlight> = { pending: 'range', left: 'done', merged: 'muted', right: 'done' };

  const viz = (cur = -1, curHl: Highlight = 'compare', newHl: Highlight = 'active'): VisualState => {
    const rows: { label: string; iv: number[]; hl: Highlight }[] = intervals.map((iv, k) => ({
      label: `${fmt(iv)}${status[k] === 'merged' ? ' (gộp)' : ''}`,
      iv,
      hl: k === cur ? curHl : statusHl[status[k]],
    }));
    rows.push({ label: `mới ${fmt([start, end])}`, iv: [start, end], hl: newHl });
    const cells = rows.map((r) => Array.from({ length: width + 1 }, (_, c) => (c >= scale(r.iv[0]) && c <= scale(r.iv[1]) ? '' : null)));
    const h: Record<string, Highlight> = {};
    rows.forEach((r, ri) => { for (let c = scale(r.iv[0]); c <= scale(r.iv[1]); c++) h[`${ri},${c}`] = r.hl; });
    return composite([
      matrix(cells, { title: `Trục thời gian ${lo} → ${hi}`, rowLabels: rows.map((r) => r.label), highlights: h }),
      arr(result.length ? result.map(fmt) : ['—'], { title: 'result' }),
    ]);
  };

  yield frame(11, { newInterval: fmt(newInterval), start, end, n }, viz(),
    `Khoảng mới ${fmt(newInterval)} (màu tím). Danh sách đã sắp xếp và rời nhau ⇒ chỉ cần MỘT lượt quét, chia làm 3 pha: trái – chồng lấn – phải.`);

  // Pha 1
  for (;;) {
    const cond = i < n && intervals[i][1] < start;
    yield frame(15, { i, start, end, 'intervals[i]': i < n ? fmt(intervals[i]) : null, cond }, viz(i < n ? i : -1),
      i >= n
        ? 'Hết danh sách ⇒ không còn khoảng nào bên trái.'
        : cond
          ? `Pha 1: ${fmt(intervals[i])} kết thúc tại ${intervals[i][1]} < start = ${start} ⇒ nằm HẲN bên trái khoảng mới, không thể chồng lấn.`
          : `Pha 1 dừng: ${fmt(intervals[i])} kết thúc tại ${intervals[i][1]} ≥ start = ${start} ⇒ không còn nằm hẳn bên trái. Vì danh sách đã sắp xếp, mọi khoảng phía sau cũng vậy.`);
    if (!cond) break;
    status[i] = 'left';
    result.push([...intervals[i]]);
    yield frame(16, { i, result: result.map(fmt) }, viz(i, 'done'), `Đưa ${fmt(intervals[i])} vào result nguyên vẹn – nó đứng trước khoảng mới trong thứ tự cuối.`);
    i++;
  }

  // Pha 2
  for (;;) {
    const cond = i < n && intervals[i][0] <= end;
    yield frame(20, { i, start, end, 'intervals[i]': i < n ? fmt(intervals[i]) : null, cond }, viz(i < n ? i : -1),
      i >= n
        ? 'Hết danh sách ⇒ kết thúc pha gộp.'
        : cond
          ? `Pha 2: ${fmt(intervals[i])} bắt đầu tại ${intervals[i][0]} ≤ end = ${end}. Kết hợp với điều kiện pha 1 (nó kết thúc ≥ start) ⇒ hai khoảng CHỒNG LẤN.`
          : `Pha 2 dừng: ${fmt(intervals[i])} bắt đầu tại ${intervals[i][0]} > end = ${end} ⇒ nằm hẳn bên phải, không chạm khoảng mới.`);
    if (!cond) break;
    const before = fmt([start, end]);
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    status[i] = 'merged';
    yield frame(22, { i, start, end }, viz(i, 'swap', 'swap'),
      `Gộp: ${before} ∪ ${fmt(intervals[i])} = ${fmt([start, end])}. Dùng min/max vì khoảng cũ có thể thò ra ngoài ở một hoặc cả hai đầu.`);
    i++;
  }

  result.push([start, end]);
  yield frame(25, { start, end, result: result.map(fmt) }, viz(-1, 'compare', 'done'),
    `Đưa khoảng đã gộp ${fmt([start, end])} vào result. Nó đứng đúng chỗ: sau mọi khoảng bên trái, trước mọi khoảng bên phải.`);

  // Pha 3
  for (;;) {
    const cond = i < n;
    yield frame(27, { i, n, cond }, viz(i < n ? i : -1, 'compare', 'done'),
      cond ? `Pha 3: ${fmt(intervals[i])} nằm hẳn bên phải ⇒ chép nguyên.` : 'Đã duyệt hết danh sách.');
    if (!cond) break;
    status[i] = 'right';
    result.push([...intervals[i]]);
    yield frame(28, { i, result: result.map(fmt) }, viz(i, 'done', 'done'), `Thêm ${fmt(intervals[i])} vào result.`);
    i++;
  }

  yield frame(31, { result: result.map(fmt) }, viz(-1, 'compare', 'done'),
    `Kết quả: ${result.map(fmt).join(' ')}. Mỗi khoảng được xét đúng một lần ⇒ O(n), không cần sắp xếp lại.`);
  return result;
}
