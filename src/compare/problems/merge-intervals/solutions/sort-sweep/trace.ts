import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { fmt, timeline, type Iv } from '../../viz';

export function* trace(input: { intervals: Iv[] }): Generator<Frame, Iv[]> {
  const all = input.intervals;
  const sorted = [...all].sort((a, b) => a[0] - b[0]);
  const merged: Iv[] = [];
  const viz = (i: number, lastHl: Highlight = 'done') =>
    composite([
      timeline([
        ...sorted.map((iv, k) => ({ label: fmt(iv), iv, hl: (k < i ? 'visited' : k === i ? 'compare' : 'range') as Highlight })),
        ...merged.map((iv, k) => ({ label: `out ${fmt(iv)}`, iv, hl: (k === merged.length - 1 ? lastHl : 'done') as Highlight })),
      ], all, 'Đã sắp xếp + kết quả'),
      arr(merged.length ? merged.map(fmt) : ['—'], { title: 'merged' }),
    ]);
  yield frame(3, { sorted: sorted.map(fmt) }, viz(-1), 'Sắp xếp theo start – O(n log n). Sau bước này, khoảng nào chồng với khoảng hiện tại chắc chắn nằm NGAY cạnh nó, nên chỉ cần so với khoảng cuối của kết quả.');
  for (let i = 0; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];
    const overlap = !!last && start <= last[1];
    yield frame(7, { i, current: fmt(sorted[i]), last: last ? fmt(last) : null, overlap }, viz(i, overlap ? 'compare' : 'done'),
      !last ? `Kết quả đang rỗng ⇒ ${fmt(sorted[i])} mở khoảng đầu tiên.`
        : `So ${fmt(sorted[i])} với khoảng cuối ${fmt(last)}: start ${start} ${overlap ? '≤' : '>'} ${last[1]} ⇒ ${overlap ? 'chồng lấn (≤ nên chạm đầu mút cũng gộp).' : 'rời nhau. Các khoảng sau có start còn lớn hơn ⇒ khoảng cuối đã "đóng" vĩnh viễn.'}`);
    if (overlap) {
      const before = last[1];
      last[1] = Math.max(last[1], end);
      yield frame(8, { last: fmt(last) }, viz(i, 'swap'), `end = max(${before}, ${end}) = ${last[1]}. Phải dùng max vì khoảng mới có thể nằm gọn bên trong khoảng cũ.`);
    } else {
      merged.push([start, end]);
      yield frame(10, { merged: merged.map(fmt) }, viz(i, 'swap'), `Thêm ${fmt(sorted[i])} làm khoảng cuối mới.`);
    }
  }
  yield frame(13, { result: merged.map(fmt) }, viz(sorted.length), `Xong sau một lượt quét O(n). Tổng O(n log n) do sort – chặn dưới cho bài toán dựa trên so sánh.`);
  return merged;
}
