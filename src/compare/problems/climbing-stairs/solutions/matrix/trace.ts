import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

type M = [number, number, number, number];
const mul = (a: M, b: M): M => [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3]];

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  let result: M = [1, 0, 0, 1];
  let base: M = [1, 1, 1, 0];
  let pow = 1;
  const viz = (hlR?: 'done' | 'swap', hlB?: 'compare') =>
    composite([
      matrix([[result[0], result[1]], [result[2], result[3]]], { title: 'result (= Q^k, k = tổng các bit đã dùng)', highlights: hlR ? { '0,0': hlR } : {} }),
      matrix([[base[0], base[1]], [base[2], base[3]]], { title: `base = Q^${pow}`, highlights: hlB ? { '0,0': hlB, '0,1': hlB, '1,0': hlB, '1,1': hlB } : {} }),
    ], 'row');
  yield frame(5, { n, 'n nhị phân': n.toString(2) }, viz(), `ways(n) = ways(n−1) + ways(n−2) là hồi quy tuyến tính ⇒ ways(n) = F(n+1) = Qⁿ[0][0]. Tính Qⁿ theo các bit của n = ${n.toString(2)}₂.`);
  for (let e = n; e > 0; e >>= 1) {
    if (e & 1) {
      result = mul(result, base);
      yield frame(7, { e, 'bit thấp': 1, 'result[0][0]': result[0] }, viz('swap'), `Bit thấp của e = ${e} là 1 ⇒ nhân result với base (Q^${pow}).`);
    } else {
      yield frame(7, { e, 'bit thấp': 0 }, viz(), `Bit thấp của e = ${e} là 0 ⇒ không nhân.`);
    }
    base = mul(base, base);
    pow *= 2;
    yield frame(8, { e: e >> 1, 'base = Q^': pow }, viz(undefined, 'compare'), `Bình phương base ⇒ Q^${pow}. Chỉ ⌊log₂ n⌋ + 1 vòng thay vì n.`);
  }
  yield frame(10, { result: result[0] }, viz('done'), `ways(${n}) = Qⁿ[0][0] = ${result[0]}. Với n ≤ 45 thì vòng lặp O(n) đơn giản hơn; ma trận chỉ thắng khi n khổng lồ (kèm modulo).`);
  return result[0];
}
