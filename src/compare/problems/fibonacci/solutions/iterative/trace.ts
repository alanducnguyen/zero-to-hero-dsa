import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  if (n <= 1) {
    yield frame(3, { n }, mapViz({ result: n }, {}, 'Cơ sở'), `fib(${n}) = ${n}.`);
    return n;
  }
  let prev = 0, cur = 1;
  const seq: number[] = [0, 1];
  yield frame(5, { prev, cur }, composite([arr(seq, { title: 'dãy đã tính (nhãn = i)', highlights: { 0: 'pointer', 1: 'active' } }), mapViz({ prev, cur }, {}, 'Chỉ giữ 2 biến')]), 'Bắt đầu từ fib(0) = 0, fib(1) = 1. Không cần mảng: mỗi bước chỉ cần 2 giá trị trước.');
  for (let i = 2; i <= n; i++) {
    [prev, cur] = [cur, prev + cur];
    seq.push(cur);
    yield frame(7, { i, prev, cur }, composite([arr(seq, { title: 'dãy đã tính (nhãn = i)', highlights: { [i - 1]: 'pointer', [i]: 'active' } }), mapViz({ prev, cur }, { cur: 'done' }, 'Chỉ giữ 2 biến')]), `fib(${i}) = fib(${i - 1}) + fib(${i - 2}) = ${cur}. Trượt cửa sổ: prev ← cur, cur ← tổng.`);
  }
  yield frame(9, { result: cur }, composite([arr(seq, { title: 'dãy đã tính', highlights: { [n]: 'done' } }), mapViz({ prev, cur }, { cur: 'done' }, 'Kết quả')]), `fib(${n}) = ${cur}. O(n) thời gian, O(1) bộ nhớ, không đệ quy.`);
  return cur;
}
