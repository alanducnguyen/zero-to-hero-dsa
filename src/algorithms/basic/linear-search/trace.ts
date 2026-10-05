import { arr, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { array: number[]; target: number }): Generator<Frame, number> {
  const a = input.array;
  const target = input.target;
  yield frame(9, { target, i: 0, n: a.length }, arr(a, { pointers: a.length ? [{ name: 'i', index: 0 }] : [] }), `Bắt đầu từ i = 0. Linear search không cần mảng sắp xếp: chỉ việc nhìn từng ô một.`);
  for (let i = 0; i < a.length; i++) {
    const visited = i > 0 ? hlRange(0, i - 1, 'visited') : {};
    yield frame(10, { target, i, 'a[i]': a[i] }, arr(a, { highlights: { ...visited, ...hl([i, 'compare']) }, pointers: [{ name: 'i', index: i }] }), `So sánh a[${i}] = ${a[i]} với target ${target}: ${a[i] === target ? 'bằng nhau!' : 'khác ⇒ sang ô kế tiếp.'}`);
    if (a[i] === target) {
      yield frame(11, { target, i, result: i }, arr(a, { highlights: { ...visited, ...hl([i, 'done']) }, pointers: [{ name: 'i', index: i }] }), `Tìm thấy tại chỉ số ${i}. Dừng ngay – không cần xét ${a.length - 1 - i} phần tử còn lại.`);
      return i;
    }
  }
  yield frame(14, { target, result: -1 }, arr(a, { highlights: hlRange(0, a.length - 1, 'muted') }), `Đã duyệt hết ${a.length} phần tử mà không gặp ${target} ⇒ trả về -1. Đây là worst case: n phép so sánh.`);
  return -1;
}
