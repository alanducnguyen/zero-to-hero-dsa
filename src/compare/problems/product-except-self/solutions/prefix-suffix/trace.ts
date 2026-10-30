import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[]> {
  const { nums } = input;
  const n = nums.length;
  const prefix = new Array<number>(n).fill(1);
  const suffix = new Array<number>(n).fill(1);
  const answer: (number | string)[] = new Array(n).fill('?');
  const viz = (h: { nums?: Record<number, Highlight>; prefix?: Record<number, Highlight>; suffix?: Record<number, Highlight>; answer?: Record<number, Highlight> } = {}) =>
    composite([
      arr(nums, { title: 'nums', highlights: h.nums }),
      arr(prefix, { title: 'prefix[i] = tích bên trái i', highlights: h.prefix }),
      arr(suffix, { title: 'suffix[i] = tích bên phải i', highlights: h.suffix }),
      arr(answer, { title: 'answer', highlights: h.answer }),
    ]);
  yield frame(5, { n }, viz(), 'prefix[0] = 1 và suffix[n−1] = 1: tích của tập rỗng là 1 (phần tử trung hoà của phép nhân).');
  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
    yield frame(6, { i, 'prefix[i]': prefix[i] }, viz({ nums: { [i - 1]: 'compare' }, prefix: { [i - 1]: 'visited', [i]: 'swap' } }), `prefix[${i}] = prefix[${i - 1}] × nums[${i - 1}] = ${prefix[i]}. Tái dùng kết quả trước ⇒ mỗi ô O(1), thay vì nhân lại cả đoạn như brute force.`);
  }
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
    yield frame(7, { i, 'suffix[i]': suffix[i] }, viz({ nums: { [i + 1]: 'compare' }, suffix: { [i + 1]: 'visited', [i]: 'swap' } }), `suffix[${i}] = suffix[${i + 1}] × nums[${i + 1}] = ${suffix[i]}. Đi ngược vì tích bên phải phụ thuộc ô bên phải.`);
  }
  for (let i = 0; i < n; i++) {
    answer[i] = prefix[i] * suffix[i];
    yield frame(9, { i, 'prefix[i]': prefix[i], 'suffix[i]': suffix[i], 'answer[i]': answer[i] }, viz({ nums: { [i]: 'muted' }, prefix: { [i]: 'pointer' }, suffix: { [i]: 'pointer' }, answer: { [i]: 'done' } }),
      `answer[${i}] = ${prefix[i]} × ${suffix[i]} = ${answer[i]}: trái × phải bao đúng mọi phần tử trừ nums[${i}] – không cần chia nên số 0 tự đúng.`);
  }
  yield frame(10, { answer }, viz(), 'Xong: O(n) thời gian nhưng tốn thêm 2 mảng O(n). Nhận xét: prefix có thể ghi thẳng vào answer, suffix chỉ cần một biến ⇒ lời giải O(1).');
  return answer as number[];
}
