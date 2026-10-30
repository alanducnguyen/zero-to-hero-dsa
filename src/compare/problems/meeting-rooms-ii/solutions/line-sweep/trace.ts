import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { timeline, type Iv } from '../../viz';

export function* trace({ intervals }: { intervals: Iv[] }): Generator<Frame, number> {
  if (intervals.length === 0) {
    yield frame(3, {}, arr([], { title: 'Không có cuộc họp' }), 'Không có cuộc họp ⇒ 0 phòng.');
    return 0;
  }
  const lo = Math.min(...intervals.map((iv) => iv[0]));
  const hi = Math.max(...intervals.map((iv) => iv[1]));
  const diff = new Array<number>(hi - lo + 1).fill(0);
  const viz = (rowHl: (k: number) => Highlight, dHl: Record<number, Highlight> = {}, x?: number): VisualState => composite([
    timeline(intervals, rowHl, 'Timeline', x),
    arr(diff, { title: `diff theo thời gian ${lo} → ${hi} (R = ${diff.length} ô)`, mode: 'cells', highlights: dHl, pointers: x !== undefined ? [{ name: 'x', index: x - lo }] : [] }),
  ]);
  yield frame(6, { lo, hi, R: diff.length }, viz(() => 'muted'), `Mảng diff dài R = ${diff.length} theo miền thời gian – KHÔNG phụ thuộc n. Đây là điểm mạnh (không sort) và cũng là điểm yếu (R có thể là 10⁹).`);
  for (let k = 0; k < intervals.length; k++) {
    const [s, e] = intervals[k];
    diff[s - lo]++;
    diff[e - lo]--;
    yield frame(9, { s, e, [`diff[${s}]`]: diff[s - lo], [`diff[${e}]`]: diff[e - lo] }, viz((j) => (j < k ? 'visited' : j === k ? 'active' : 'muted'), { [s - lo]: 'done', [e - lo]: 'swap' }),
      `${s}-${e}: +1 tại ${s}, −1 tại ${e}. Đặt −1 ngay tại e (không phải e + 1) vì cuộc họp kết thúc lúc e đã trả phòng – cuộc họp bắt đầu lúc e dùng chung được. O(1) mỗi cuộc họp, không cần thứ tự.`);
  }
  let cur = 0;
  let rooms = 0;
  for (let x = 0; x < diff.length; x++) {
    cur += diff[x];
    const prev = rooms;
    rooms = Math.max(rooms, cur);
    if (diff[x] === 0 && x !== diff.length - 1) continue; // ô không có sự kiện: vẫn tốn O(1) nhưng không vẽ frame
    yield frame(15, { x: x + lo, cur, rooms }, viz((j) => (intervals[j][0] <= x + lo && x + lo < intervals[j][1] ? 'active' : 'visited'), { [x]: 'compare' }, x + lo),
      rooms > prev ? `Tại ${x + lo}: cộng dồn = ${cur} cuộc họp đang diễn ra ⇒ kỷ lục mới rooms = ${rooms}.` : `Tại ${x + lo}: đang có ${cur} cuộc họp, chưa vượt rooms = ${rooms}.`);
  }
  yield frame(17, { rooms }, viz(() => 'done'), `Kết quả ${rooms} phòng = độ chồng lấn lớn nhất. Quét ĐỦ R ô kể cả ô trống ⇒ O(n + R): thắng sort khi R nhỏ, thua thảm khi R lớn.`);
  return rooms;
}
