import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number | null> {
  const a = [...input.nums];
  const n = a.length;
  if (n === 0) {
    yield frame(17, { n: 0 }, arr(['∅'], { title: 'Mảng rỗng' }), 'Không có phần tử ⇒ không có đáp án.');
    return null;
  }
  const k = Math.max(1, Math.min(Math.floor(input.k), n));
  const target = k - 1;
  let lo = 0;
  let hi = n - 1;
  const viz = (l: number, h: number, extra: Record<number, Highlight> = {}, pointers: { name: string; index: number }[] = []) => {
    const hl: Record<number, Highlight> = {};
    for (let t = 0; t < n; t++) if (t < l || t > h) hl[t] = 'muted';
    hl[target] = hl[target] === 'muted' ? 'muted' : 'range';
    return arr(a, { mode: 'bars', highlights: { ...hl, ...extra }, pointers, ranges: l <= h ? [{ from: l, to: h, label: `đang xét [${l}, ${h}]`, color: 'range' }] : [] });
  };
  const cs = (extra?: string) => (extra ? ['quickselect()', extra] : ['quickselect()']);
  yield frame(10, { k, target, lo, hi }, viz(lo, hi, {}, [{ name: 'k-1', index: target }]), `Cần phần tử nhỏ thứ k = ${k} ⇒ phần tử sẽ đứng ở chỉ số ${target} sau khi sắp xếp. Không sắp xếp toàn bộ: chỉ cần partition tới khi pivot rơi đúng chỉ số đó.`, { callStack: cs() });
  while (lo <= hi) {
    const pivot = a[hi];
    let i = lo;
    yield frame(22, { lo, hi, pivot }, viz(lo, hi, { [hi]: 'active' }, [{ name: 'pivot', index: hi }, { name: 'k-1', index: target }]), `partition(${lo}, ${hi}): pivot = a[${hi}] = ${pivot}. Dồn các phần tử < pivot về bên trái ranh giới i.`, { callStack: cs(`partition(${lo}, ${hi})`) });
    for (let j = lo; j < hi; j++) {
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield frame(26, { i, j, 'a[j]': a[i], pivot }, viz(lo, hi, { [hi]: 'active', [i]: 'swap', [j]: 'swap' }, [{ name: 'i', index: i }, { name: 'j', index: j }]), `a[${j}] < ${pivot} ⇒ hoán đổi vào vị trí i = ${i}, i tăng. Vùng [${lo}, ${i}] giờ toàn phần tử < pivot.`, { callStack: cs(`partition(${lo}, ${hi})`) });
        i++;
      } else {
        yield frame(25, { i, j, 'a[j]': a[j], pivot }, viz(lo, hi, { [hi]: 'active', [j]: 'compare' }, [{ name: 'i', index: i }, { name: 'j', index: j }]), `a[${j}] = ${a[j]} ≥ ${pivot} ⇒ giữ bên phải ranh giới.`, { callStack: cs(`partition(${lo}, ${hi})`) });
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    const p = i;
    yield frame(30, { p, pivot }, viz(lo, hi, { [p]: 'done' }, [{ name: 'p', index: p }, { name: 'k-1', index: target }]), `Đặt pivot vào ranh giới: a[${p}] = ${pivot} đã đứng ĐÚNG vị trí cuối cùng (mọi phần tử trái < nó, phải ≥ nó).`, { callStack: cs(`partition(${lo}, ${hi})`) });
    if (p === target) {
      yield frame(13, { p, target, 'a[p]': a[p] }, viz(lo, hi, { [p]: 'done' }), `p = ${p} = k−1 ⇒ phần tử nhỏ thứ ${k} là ${a[p]}. Không cần sắp xếp phần còn lại.`, { callStack: cs() });
      return a[p];
    }
    if (p < target) {
      lo = p + 1;
      yield frame(14, { p, target, lo, hi }, viz(lo, hi, { [p]: 'done' }), `p = ${p} < ${target} ⇒ đáp án nằm bên phải pivot. Bỏ hẳn nửa trái, xét [${lo}, ${hi}].`, { callStack: cs() });
    } else {
      hi = p - 1;
      yield frame(15, { p, target, lo, hi }, viz(lo, hi, { [p]: 'done' }), `p = ${p} > ${target} ⇒ đáp án nằm bên trái pivot. Bỏ hẳn nửa phải, xét [${lo}, ${hi}].`, { callStack: cs() });
    }
  }
  return null;
}
