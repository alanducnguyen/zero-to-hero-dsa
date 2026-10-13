import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { n: number }): Generator<Frame, number[]> {
  const n = Math.max(0, Math.floor(input.n));
  const bits: (number | string)[] = new Array<number | string>(n + 1).fill('·');
  const width = Math.max(1, n.toString(2).length);
  const bin = (i: number) => i.toString(2).padStart(width, '0');
  const viz = (i: number | undefined, hl: Record<number, Highlight> = {}) =>
    composite([
      arr(bits, { title: 'bits[i] = số bit 1 của i (nhãn dưới = i)', highlights: hl, pointers: i !== undefined ? [{ name: 'i', index: i }] : [] }),
      ...(i !== undefined && i > 0
        ? [mapViz({ [`i = ${i}`]: bin(i), [`i >> 1 = ${i >> 1}`]: bin(i >> 1), [`i & 1`]: i & 1 }, { [`i >> 1 = ${i >> 1}`]: 'compare', 'i & 1': 'active' }, 'Nhị phân: bỏ bit cuối (i >> 1) + bit cuối (i & 1)')]
        : []),
    ]);
  bits[0] = 0;
  yield frame(7, { n, 'bits[0]': 0 }, viz(undefined, { 0: 'done' }), `Cơ sở: 0 không có bit 1. Mảng ${n + 1} ô.`);
  for (let i = 1; i <= n; i++) {
    yield frame(8, { i, 'bin(i)': bin(i), 'i >> 1': i >> 1, 'i & 1': i & 1 }, viz(i, { [i]: 'active', [i >> 1]: 'compare' }), `i = ${i} = ${bin(i)}₂. Bỏ bit cuối được ${i >> 1} = ${bin(i >> 1)}₂ – số nhỏ hơn, đã tính rồi.`);
    bits[i] = (bits[i >> 1] as number) + (i & 1);
    yield frame(9, { i, 'bits[i>>1]': bits[i >> 1], 'i & 1': i & 1, 'bits[i]': bits[i] }, viz(i, { [i]: 'done', [i >> 1]: 'compare' }), `bits[${i}] = bits[${i >> 1}] + (${i} & 1) = ${bits[i >> 1]} + ${i & 1} = ${bits[i]}. Mỗi số chỉ tốn O(1).`);
  }
  yield frame(11, { bits: [...bits] }, viz(undefined, Object.fromEntries(bits.map((_, k) => [k, 'done' as Highlight]))), `Xong trong O(n). Nhìn mảng: bits[2k] = bits[k], bits[2k+1] = bits[k] + 1 – cấu trúc tự lặp của hệ nhị phân.`);
  return bits as number[];
}
