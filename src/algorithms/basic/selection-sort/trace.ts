import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const a = [...input.array];
  const n = a.length;
  const done = (i: number): Record<number, Highlight> => (i > 0 ? hlRange(0, i - 1, 'done') : {});
  const viz = (i: number, extra: Record<number, Highlight>, pointers: { name: string; index: number }[]) =>
    arr(a, { mode: 'bars', highlights: { ...done(i), ...extra }, pointers, ranges: i < n ? [{ from: i, to: n - 1, label: 'chưa sắp xếp' }] : [] });
  yield frame(9, { n }, arr(a, { mode: 'bars' }), 'Bất biến: a[0..i) là i phần tử nhỏ nhất, đã đúng thứ tự (màu xanh lá sẽ lớn dần từ trái).');
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    yield frame(11, { i, minIdx, 'a[minIdx]': a[minIdx] }, viz(i, { [i]: 'active' }, [{ name: 'i', index: i }, { name: 'min', index: minIdx }]), `Lượt ${i + 1}: tạm coi a[${i}] = ${a[i]} là nhỏ nhất của phần chưa sắp xếp, rồi quét để kiểm chứng.`);
    for (let j = i + 1; j < n; j++) {
      yield frame(13, { i, j, minIdx, 'a[j]': a[j], 'a[minIdx]': a[minIdx] }, viz(i, { [minIdx]: 'active', [j]: 'compare' }, [{ name: 'i', index: i }, { name: 'j', index: j }, { name: 'min', index: minIdx }]), `So sánh a[${j}] = ${a[j]} với min hiện tại ${a[minIdx]}: ${a[j] < a[minIdx] ? 'nhỏ hơn ⇒ cập nhật minIdx.' : 'không nhỏ hơn ⇒ giữ nguyên.'}`);
      if (a[j] < a[minIdx]) {
        minIdx = j;
        yield frame(14, { i, j, minIdx }, viz(i, { [minIdx]: 'swap' }, [{ name: 'i', index: i }, { name: 'j', index: j }, { name: 'min', index: minIdx }]), `minIdx = ${j}. Chú ý: chỉ ghi nhớ vị trí, KHÔNG hoán đổi ngay – đó là điểm khác Bubble Sort.`);
      }
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      yield frame(18, { i, minIdx }, viz(i, { [i]: 'swap', [minIdx]: 'swap' }, [{ name: 'i', index: i }, { name: 'min', index: minIdx }]), `Hoán đổi a[${i}] ↔ a[${minIdx}]: phần tử nhỏ nhất ${a[i]} về đúng vị trí ${i}. Mỗi lượt chỉ tốn đúng 1 hoán đổi.`);
    } else {
      yield frame(17, { i, minIdx }, viz(i, { [i]: 'done' }, [{ name: 'i', index: i }]), `minIdx = i: a[${i}] đã là nhỏ nhất, không cần hoán đổi.`);
    }
  }
  yield frame(21, { result: a }, arr(a, { mode: 'bars', highlights: hlRange(0, n - 1, 'done') }), 'Hoàn tất: phần tử cuối cùng tất yếu là lớn nhất nên không cần lượt riêng.');
  return a;
}
