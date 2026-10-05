import { arr, composite, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const bin = (x: number) => (x >>> 0).toString(2).padStart(8, '0');
const bits = (x: number) => bin(x).split('');

export function* trace(input: { nums: number[] }): Generator<Frame, { singleNumber: number; bitCount: number; isPowerOfTwo: boolean }> {
  const nums = input.nums.map((x) => Math.max(0, Math.min(255, Math.floor(x))));
  const n = nums.length;
  let acc = 0;
  const viz = (i: number, xBits?: Record<number, Highlight>, accBits?: Record<number, Highlight>, title = `acc = ${acc} = ${bin(acc)}`) =>
    composite([
      arr(nums, { title: 'nums', highlights: { ...(i > 0 ? hlRange(0, i - 1, 'visited') : {}), ...(i < n ? hl([i, 'active']) : {}) } }),
      composite([
        arr(i < n ? bits(nums[i]) : bits(0), { title: i < n ? `x = ${nums[i]} = ${bin(nums[i])}` : 'x', highlights: xBits }),
        arr(bits(acc), { title, highlights: accBits }),
      ], 'row'),
    ]);
  yield frame(7, { acc: 0 }, viz(0, undefined, undefined, 'acc = 0 = 00000000'), 'acc = 0. Ba tính chất của XOR: a ^ a = 0, a ^ 0 = a, giao hoán + kết hợp ⇒ thứ tự XOR không quan trọng, các cặp giống nhau triệt tiêu.');
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    const xb = bits(x), ab = bits(acc);
    const changed: Record<number, Highlight> = {};
    for (let k = 0; k < 8; k++) if (xb[k] === '1') changed[k] = 'compare';
    yield frame(9, { i, x, acc, 'x (bin)': bin(x), 'acc (bin)': bin(acc) }, viz(i, changed, changed), `XOR từng bit của acc với x = ${x}. Bit nào của x là 1 thì bit tương ứng của acc bị LẬT (vàng).`);
    const before = acc;
    acc ^= x;
    const flipped: Record<number, Highlight> = {};
    const nb = bits(acc);
    for (let k = 0; k < 8; k++) if (nb[k] !== ab[k]) flipped[k] = 'swap';
    yield frame(9, { i, x, acc, 'acc (bin)': bin(acc) }, viz(i + 1, undefined, flipped), `acc = ${before} ^ ${x} = ${acc}.${acc === 0 ? ' acc về 0: các số đã gặp triệt tiêu nhau hết.' : ''}`);
  }
  const result = acc;
  yield frame(11, { result, 'result (bin)': bin(result) }, viz(n, undefined, Object.fromEntries(bits(result).map((b, k) => [k, b === '1' ? 'done' : 'muted'] as [number, Highlight]))), `Mọi số xuất hiện 2 lần đã triệt tiêu ⇒ acc = ${result} chính là số xuất hiện 1 lần. O(n) thời gian, O(1) bộ nhớ – không cần HashMap.`);

  // bonus: đếm bit bằng n & (n-1)
  let m = result;
  let count = 0;
  const cs = ['countBits()'];
  yield frame(16, { n: m, 'n (bin)': bin(m), count }, viz(n, undefined, Object.fromEntries(bits(m).map((b, k) => [k, b === '1' ? 'active' : 'muted'] as [number, Highlight])), `n = ${m} = ${bin(m)}`), `Bonus – đếm số bit 1 của kết quả bằng mẹo Brian Kernighan: n & (n−1) xoá đúng bit 1 THẤP NHẤT của n.`, { callStack: cs });
  while (m !== 0) {
    const low = m & -m;
    const lowIdx = 7 - Math.log2(low);
    yield frame(18, { n: m, 'n-1 (bin)': bin(m - 1), 'n & (n-1)': m & (m - 1), count }, viz(n, undefined, { ...Object.fromEntries(bits(m).map((b, k) => [k, b === '1' ? 'active' : 'muted'] as [number, Highlight])), [lowIdx]: 'swap' }, `n = ${m} = ${bin(m)}`), `n−1 = ${bin(m - 1)} lật bit 1 thấp nhất và mọi bit 0 bên phải nó; AND với n giữ nguyên phần bên trái ⇒ xoá bit đỏ.`, { callStack: cs });
    m &= m - 1;
    count++;
    yield frame(19, { n: m, 'n (bin)': bin(m), count }, viz(n, undefined, Object.fromEntries(bits(m).map((b, k) => [k, b === '1' ? 'active' : 'muted'] as [number, Highlight])), `n = ${m} = ${bin(m)}`), `count = ${count}. Số vòng lặp = số bit 1, không phải số bit của kiểu dữ liệu.`, { callStack: cs });
  }
  const pow2 = result > 0 && (result & (result - 1)) === 0;
  yield frame(26, { n: result, bitCount: count, isPowerOfTwo: pow2 }, viz(n, undefined, Object.fromEntries(bits(result).map((b, k) => [k, b === '1' ? 'done' : 'muted'] as [number, Highlight]))), `${result} có ${count} bit 1 ⇒ ${pow2 ? 'là' : 'không phải'} luỹ thừa của 2 (luỹ thừa của 2 ⇔ đúng 1 bit 1 ⇔ n & (n−1) = 0).`);
  return { singleNumber: result, bitCount: count, isPowerOfTwo: pow2 };
}
