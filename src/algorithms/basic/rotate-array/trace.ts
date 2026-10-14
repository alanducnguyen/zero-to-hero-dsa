import { arr, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const a = [...input.nums];
  const n = a.length;
  const viz = (extra: Record<number, Highlight> = {}, ptr: { name: string; index: number }[] = [], ranges: { from: number; to: number; label: string }[] = []) => arr(a, { highlights: extra, pointers: ptr, ranges });
  if (n === 0) { yield frame(7, { n }, viz(), 'Mảng rỗng.'); return a; }
  let k = input.k;
  yield frame(8, { k, n }, viz(), `k = ${k} mod ${n} = ${k % n}: xoay n bước thì về như cũ, nên chỉ cần phần dư.`);
  k %= n;
  const steps: [number, number, number, string][] = [[9, 0, n - 1, 'Đảo toàn bộ: phần tử cuối lên đầu, nhưng thứ tự bên trong mỗi nửa bị ngược.'], [10, 0, k - 1, `Đảo ${k} phần tử đầu: đây chính là ${k} phần tử cuối của mảng gốc, về đúng thứ tự.`], [11, k, n - 1, 'Đảo phần còn lại: các phần tử đầu mảng gốc về đúng thứ tự.']];
  for (const [line, lo, hi, note] of steps) {
    yield frame(line, { k, i: lo, j: hi }, viz(hlRange(lo, hi, 'range'), [{ name: 'i', index: lo }, { name: 'j', index: Math.max(hi, 0) }], hi >= lo ? [{ from: lo, to: hi, label: `reverse(${lo}, ${hi})` }] : []), note);
    let i = lo, j = hi;
    while (i < j) {
      [a[i], a[j]] = [a[j], a[i]];
      yield frame(17, { i, j }, viz({ ...hlRange(lo, hi, 'range'), ...hl([i, 'swap'], [j, 'swap']) }, [{ name: 'i', index: i }, { name: 'j', index: j }], [{ from: lo, to: hi, label: `reverse(${lo}, ${hi})` }]), `Hoán đổi a[${i}] ↔ a[${j}].`);
      i++; j--;
    }
  }
  yield frame(12, { result: a }, viz(hlRange(0, n - 1, 'done')), `Xong: xoay phải ${k} bước, O(n) thời gian, O(1) bộ nhớ, mỗi phần tử được hoán đổi đúng 2 lần.`);
  return a;
}
