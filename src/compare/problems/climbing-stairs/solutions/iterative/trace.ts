import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  if (n <= 2) {
    yield frame(3, { n }, mapViz({ result: n }, { result: 'done' }, 'Cơ sở'), `n = ${n} ⇒ ${n} cách, trả ngay.`);
    return n;
  }
  let a = 1, b = 2;
  const seq: (number | string)[] = ['–', 1, 2];
  yield frame(5, { a, b }, composite([arr(seq, { title: 'ways(i) đã tính (nhãn = i)', highlights: { 1: 'pointer', 2: 'active' } }), mapViz({ a, b }, {}, 'Chỉ giữ 2 biến')]), 'ways(1) = 1, ways(2) = 2. Mỗi bậc sau chỉ cần hai giá trị ngay trước ⇒ không cần mảng.');
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
    seq.push(b);
    yield frame(7, { i, a, b }, composite([arr(seq, { title: 'ways(i) đã tính (nhãn = i)', highlights: { [i - 1]: 'pointer', [i]: 'active' } }), mapViz({ a, b }, { b: 'done' }, 'Chỉ giữ 2 biến')]), `ways(${i}) = ways(${i - 1}) + ways(${i - 2}) = ${b}: tới bậc ${i} từ bậc ${i - 1} (bước 1) hoặc ${i - 2} (bước 2).`);
  }
  yield frame(9, { result: b }, composite([arr(seq, { title: 'ways(i)', highlights: { [n]: 'done' } }), mapViz({ a, b }, { b: 'done' }, 'Kết quả')]), `Có ${b} cách. O(n) thời gian, O(1) bộ nhớ, không đệ quy.`);
  return b;
}
