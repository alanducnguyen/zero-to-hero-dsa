import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const a = [...input.nums];
  const n = a.length;
  const k = Math.max(1, Math.min(input.k, n));
  const target = n - k;
  let lo = 0;
  let hi = n - 1;
  const viz = (hl: Record<number, Highlight> = {}, pointers: { name: string; index: number }[] = []) => {
    const h: Record<number, Highlight> = {};
    for (let t = 0; t < n; t++) if (t < lo || t > hi) h[t] = 'muted';
    return arr(a, { mode: 'bars', highlights: { ...h, ...hl }, pointers: [...pointers, { name: 'target', index: target }], ranges: lo <= hi ? [{ from: lo, to: hi, label: `đang xét [${lo}, ${hi}]`, color: 'range' }] : [] });
  };
  yield frame(4, { k, target, n }, viz(), `Lớn thứ ${k} = phần tử ở chỉ số ${target} sau khi sắp xếp. Không sắp xếp hết: chỉ cần đưa đúng một phần tử về đúng chỗ.`);
  while (lo <= hi) {
    const pivot = a[hi];
    let i = lo;
    yield frame(8, { lo, hi, pivot }, viz({ [hi]: 'active' }, [{ name: 'pivot', index: hi }]), `Pivot = a[${hi}] = ${pivot}. Partition: dồn phần tử < pivot sang trái.`);
    for (let j = lo; j < hi; j++) if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
    [a[i], a[hi]] = [a[hi], a[i]];
    yield frame(11, { p: i, pivot, target }, viz({ [i]: 'done' }, [{ name: 'p', index: i }]), `Pivot về vị trí ${i}: trái < ${pivot} ≤ phải. ${i === target ? 'Đúng target ⇒ xong!' : i < target ? `${i} < ${target} ⇒ bỏ toàn bộ nửa trái.` : `${i} > ${target} ⇒ bỏ toàn bộ nửa phải.`}`);
    if (i === target) {
      yield frame(12, { result: a[i] }, viz({ [i]: 'done' }), `Phần tử lớn thứ ${k} là ${a[i]}. Mỗi vòng loại trung bình một nửa ⇒ n + n/2 + … = O(n).`);
      return a[i];
    }
    if (i < target) lo = i + 1;
    else hi = i - 1;
  }
  return a[target];
}
