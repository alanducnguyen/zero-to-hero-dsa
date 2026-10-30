import { arr, composite, frame, hl, matrix } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight, VisualState } from '@/engine/types';
import { parse, type MRInput } from './node';

export function* trace(input: MRInput): Generator<Frame, number> {
  const sorted = [...parse(input)].sort((a, b) => a[0] - b[0]);
  const labels = sorted.map(([a, b]) => `${a}-${b}`);
  const heap: number[] = [];
  let rooms = 0;
  const lo = sorted.length ? Math.min(...sorted.map((x) => x[0])) : 0;
  const hi = sorted.length ? Math.max(...sorted.map((x) => x[1])) : 0;
  const showTimeline = sorted.length > 0 && hi - lo <= 30 && hi > lo;

  const viz = (idx: number, heapHl?: Record<number, Highlight>, heapTitle?: string): VisualState => {
    const arrHl: Record<number, Highlight> = {};
    labels.forEach((_, k) => (arrHl[k] = k < idx ? 'visited' : k === idx ? 'active' : 'muted'));
    const parts: VisualState[] = [arr(labels, { title: 'Cuộc họp đã sắp xếp theo giờ bắt đầu', highlights: arrHl, mode: 'cells' })];
    if (showTimeline) {
      const cells = sorted.map(([a, b]) => Array.from({ length: hi - lo }, (_, t) => (lo + t >= a && lo + t < b ? '■' : null)));
      const mh: Record<string, Highlight> = {};
      sorted.forEach(([a, b], k) => {
        for (let t = a; t < b; t++) mh[`${k},${t - lo}`] = k < idx ? 'visited' : k === idx ? 'active' : 'muted';
      });
      parts.push(matrix(cells, { title: 'Timeline (mỗi cột = 1 đơn vị thời gian)', highlights: mh, rowLabels: labels, colLabels: Array.from({ length: hi - lo }, (_, t) => String(lo + t)) }));
    }
    const hv: HeapVisual = { kind: 'heap', items: [...heap], highlights: heapHl, title: heapTitle ?? `Min-heap giờ kết thúc (${heap.length} phòng đang dùng)` };
    parts.push(hv);
    return composite(parts, 'column');
  };

  yield frame(9, { intervals: labels }, viz(-1), `Sắp xếp theo giờ bắt đầu: xử lý cuộc họp theo đúng trình tự thời gian, nên khi xét cuộc họp mới ta chỉ cần biết phòng nào trống sớm nhất.`);
  yield frame(11, { rooms }, viz(-1), `Heap rỗng, rooms = 0. Heap lưu giờ kết thúc của các phòng đang bận; đỉnh là phòng rảnh sớm nhất.`);
  for (let idx = 0; idx < sorted.length; idx++) {
    const [start, end] = sorted[idx];
    const canReuse = heap.length > 0 && heap[0] <= start;
    yield frame(13, { start, end, 'heap[0]': heap[0] ?? '—', rooms }, viz(idx, heap.length ? hl([0, 'compare']) : undefined), heap.length === 0 ? `Cuộc họp ${start}-${end}: chưa có phòng nào ⇒ phải mở phòng mới.` : canReuse ? `Cuộc họp ${start}-${end}: phòng rảnh sớm nhất kết thúc lúc ${heap[0]} ≤ ${start} ⇒ đã trống, tái sử dụng được.` : `Cuộc họp ${start}-${end}: phòng rảnh sớm nhất kết thúc lúc ${heap[0]} > ${start}. Nếu phòng sớm nhất còn bận thì MỌI phòng đều bận ⇒ phải mở phòng mới.`);
    if (canReuse) {
      const top = heap[0];
      const last = heap.pop()!;
      if (heap.length > 0) {
        heap[0] = last;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1;
          const r = 2 * i + 2;
          let s = i;
          if (l < heap.length && heap[l] < heap[s]) s = l;
          if (r < heap.length && heap[r] < heap[s]) s = r;
          if (s === i) break;
          [heap[s], heap[i]] = [heap[i], heap[s]];
          yield frame(46, { i, s }, viz(idx, hl([i, 'swap'], [s, 'swap'])), `siftDown: con nhỏ hơn nổi lên để đỉnh heap vẫn là giờ kết thúc nhỏ nhất.`, { callStack: ['minMeetingRooms()', 'popMin()'] });
          i = s;
        }
      }
      yield frame(14, { removed: top, heap: [...heap] }, viz(idx), `Bỏ giờ kết thúc ${top} khỏi heap: phòng đó được giao cho cuộc họp mới, giờ kết thúc sẽ được thay bằng ${end} ở bước push.`);
    }
    heap.push(end);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      yield frame(28, { i, p }, viz(idx, hl([i, 'swap'], [p, 'swap'])), `siftUp: ${heap[p]} nhỏ hơn cha ⇒ hoán đổi để giữ tính chất min-heap.`, { callStack: ['minMeetingRooms()', 'push()'] });
      i = p;
    }
    yield frame(16, { end, heap: [...heap] }, viz(idx, hl([i, 'pointer'])), `Push ${end}: phòng này bận tới ${end}. Heap size = số phòng đang được dùng tại thời điểm ${start}.`);
    const prev = rooms;
    rooms = Math.max(rooms, heap.length);
    yield frame(17, { rooms, heapSize: heap.length }, viz(idx, hl([0, 'done'])), rooms > prev ? `Heap size ${heap.length} > kỷ lục cũ ${prev} ⇒ rooms = ${rooms}: lúc ${start} có ${rooms} cuộc họp diễn ra đồng thời.` : `Heap size ${heap.length} ≤ rooms = ${rooms} ⇒ không cần thêm phòng.`);
  }
  yield frame(19, { rooms }, viz(sorted.length), `Kết quả: ${rooms} phòng. Đây cũng là số cuộc họp chồng lấn nhiều nhất tại một thời điểm – cận dưới bắt buộc, và thuật toán tham lam đạt đúng cận đó.`);
  return rooms;
}
