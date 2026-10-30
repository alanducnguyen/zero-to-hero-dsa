import { arr, composite, frame, hl } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight, VisualState } from '@/engine/types';
import { label, timeline, type Iv } from '../../viz';

export function* trace({ intervals }: { intervals: Iv[] }): Generator<Frame, number> {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const h: number[] = [];
  const viz = (idx: number, heapHl?: Record<number, Highlight>): VisualState => {
    const st = (k: number): Highlight => (k < idx ? 'visited' : k === idx ? 'active' : 'muted');
    const hv: HeapVisual = { kind: 'heap', items: [...h], highlights: heapHl, title: `Min-heap giờ kết thúc (${h.length} phòng)` };
    return composite([arr(sorted.map(label), { title: 'Cuộc họp đã sort theo giờ bắt đầu', highlights: Object.fromEntries(sorted.map((_, k) => [k, st(k)])), mode: 'cells' }), timeline(sorted, st), hv]);
  };
  yield frame(3, { n: sorted.length }, viz(-1), 'Sort theo giờ bắt đầu: xét cuộc họp theo đúng trình tự thời gian, khi đó chỉ cần biết phòng nào trống SỚM NHẤT ⇒ min-heap. Bước sort đã tốn O(n log n).');
  for (let idx = 0; idx < sorted.length; idx++) {
    const [start, end] = sorted[idx];
    const reuse = h.length > 0 && h[0] <= start;
    yield frame(6, { start, end, 'heap[0]': h[0] ?? '—' }, viz(idx, h.length ? hl([0, reuse ? 'done' : 'compare']) : undefined),
      h.length === 0 ? `${start}-${end}: chưa có phòng ⇒ mở phòng đầu tiên.` : reuse ? `${start}-${end}: phòng trống sớm nhất rảnh lúc ${h[0]} ≤ ${start} (chạm đầu mút vẫn dùng chung) ⇒ pop để giao lại phòng đó.` : `${start}-${end}: phòng rảnh sớm nhất còn bận tới ${h[0]} > ${start} ⇒ mọi phòng đều bận, phải mở thêm.`);
    if (reuse) {
      const last = h.pop()!;
      if (h.length > 0) {
        h[0] = last;
        for (let i = 0; ;) {
          let m = i;
          for (const c of [2 * i + 1, 2 * i + 2]) if (c < h.length && h[c] < h[m]) m = c;
          if (m === i) break;
          [h[i], h[m]] = [h[m], h[i]];
          yield frame(23, { i, m }, viz(idx, hl([i, 'swap'], [m, 'swap'])), 'siftDown: con nhỏ hơn nổi lên – mỗi bước O(1), sâu tối đa log n tầng.', { callStack: ['minMeetingRooms()', 'pop()'] });
          i = m;
        }
      }
    }
    h.push(end);
    for (let i = h.length - 1; i > 0 && h[(i - 1) >> 1] > h[i]; i = (i - 1) >> 1) {
      const p = (i - 1) >> 1;
      [h[i], h[p]] = [h[p], h[i]];
      yield frame(13, { i, p }, viz(idx, hl([i, 'swap'], [p, 'swap'])), `siftUp: ${h[p]} nhỏ hơn cha ⇒ đổi chỗ để đỉnh vẫn là giờ kết thúc nhỏ nhất.`, { callStack: ['minMeetingRooms()', 'push()'] });
    }
    yield frame(7, { end, heap: [...h] }, viz(idx), `Push ${end}: phòng này bận tới ${end}. Heap size = ${h.length} = số phòng đã mở. Mỗi cuộc họp tốn O(log n) cho heap ⇒ tổng O(n log n).`);
  }
  yield frame(9, { rooms: h.length }, viz(sorted.length), `Kết quả ${h.length} phòng. Heap không bao giờ co lại (pop luôn đi kèm push) nên size cuối chính là số phòng tối đa từng cần.`);
  return h.length;
}
