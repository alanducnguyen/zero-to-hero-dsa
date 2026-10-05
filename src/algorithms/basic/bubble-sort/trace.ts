import { arr, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const a = [...input.array];
  const n = a.length;
  const done = (i: number) => hlRange(n - i, n - 1, 'done');
  yield frame(8, { n }, arr(a, { mode: 'bars' }), 'Sao chép mảng đầu vào để không làm thay đổi dữ liệu gốc.');
  for (let i = 0; i < n - 1; i++) {
    yield frame(10, { i, n }, arr(a, { mode: 'bars', highlights: done(i) }),
      `Lượt ${i + 1}: ${i} phần tử cuối đã đúng vị trí (màu xanh). Mục tiêu lượt này: đẩy phần tử lớn nhất còn lại về vị trí ${n - 1 - i}.`);
    let swapped = false;
    yield frame(11, { i, swapped }, arr(a, { mode: 'bars', highlights: done(i) }), 'Đặt cờ swapped = false để phát hiện lượt không có hoán đổi.');
    for (let j = 0; j < n - 1 - i; j++) {
      yield frame(13, { i, j, swapped, 'a[j]': a[j], 'a[j+1]': a[j + 1] },
        arr(a, { mode: 'bars', highlights: { ...done(i), ...hl([j, 'compare'], [j + 1, 'compare']) }, pointers: [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }] }),
        `So sánh a[${j}]=${a[j]} với a[${j + 1}]=${a[j + 1]}. ${a[j] > a[j + 1] ? 'Sai thứ tự → cần hoán đổi.' : 'Đúng thứ tự → giữ nguyên.'}`);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
        yield frame(15, { i, j, swapped },
          arr(a, { mode: 'bars', highlights: { ...done(i), ...hl([j, 'swap'], [j + 1, 'swap']) }, pointers: [{ name: 'j', index: j }, { name: 'j+1', index: j + 1 }] }),
          `Đã hoán đổi: phần tử lớn hơn (${a[j + 1]}) "nổi" sang phải. Đặt swapped = true.`);
      }
    }
    yield frame(18, { i, swapped }, arr(a, { mode: 'bars', highlights: done(i + 1) }),
      swapped
        ? `Kết thúc lượt ${i + 1}: phần tử ${a[n - 1 - i]} đã về đúng vị trí. Có hoán đổi nên tiếp tục.`
        : 'Lượt này không có hoán đổi nào ⇒ mảng đã sắp xếp. Dừng sớm (tối ưu best case O(n)).');
    if (!swapped) break;
  }
  yield frame(20, { result: a }, arr(a, { mode: 'bars', highlights: hlRange(0, n - 1, 'done') }), 'Hoàn tất. Mảng đã sắp xếp tăng dần.');
  return a;
}
