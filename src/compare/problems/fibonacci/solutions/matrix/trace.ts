import { composite, frame, matrix } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

type M = [number, number, number, number];
const mul = (a: M, b: M): M => [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3]];

export function* trace(input: { n: number }): Generator<Frame, number> {
  const n = input.n;
  let result: M = [1, 0, 0, 1];
  let base: M = [1, 1, 1, 0];
  let e = n;
  let pow = 1;
  const viz = (hlR?: 'done' | 'swap', hlB?: 'compare') =>
    composite([
      matrix([[result[0], result[1]], [result[2], result[3]]], { title: `result (= Q^k với k = bit đã dùng)`, highlights: hlR ? { '0,1': hlR } : {} }),
      matrix([[base[0], base[1]], [base[2], base[3]]], { title: `base = Q^${pow}`, highlights: hlB ? { '0,0': hlB, '0,1': hlB, '1,0': hlB, '1,1': hlB } : {} }),
    ], 'row');
  yield frame(4, { n, 'n nhị phân': n.toString(2) }, viz(), `Q = [[1,1],[1,0]] có Qⁿ = [[F(n+1), F(n)], [F(n), F(n−1)]]. Tính Qⁿ bằng bình phương liên tiếp theo các bit của n = ${n.toString(2)}₂.`);
  while (e > 0) {
    if (e & 1) {
      result = mul(result, base);
      yield frame(7, { e, 'bit thấp': 1, 'result[0][1]': result[1] }, viz('swap'), `Bit thấp của e = ${e} là 1 ⇒ nhân result với base (Q^${pow}).`);
    } else {
      yield frame(7, { e, 'bit thấp': 0 }, viz(), `Bit thấp của e = ${e} là 0 ⇒ bỏ qua, không nhân.`);
    }
    base = mul(base, base);
    pow *= 2;
    e >>= 1;
    yield frame(8, { e, 'base = Q^': pow }, viz(undefined, 'compare'), `Bình phương base ⇒ Q^${pow}; e >>= 1 = ${e}. Chỉ log₂(n) vòng.`);
  }
  yield frame(11, { result: result[1] }, viz('done'), `F(${n}) = result[0][1] = ${result[1]}. O(log n) phép nhân ma trận 2×2.`);
  return result[1];
}
