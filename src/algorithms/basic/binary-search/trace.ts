import { arr, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[]; target: number }): Generator<Frame, number> {
  const a = [...input.array].sort((x, y) => x - y);
  const target = input.target;
  const n = a.length;
  const viz = (lo: number, hi: number, extra: Record<number, Highlight> = {}, mid?: number) => {
    const base: Record<number, Highlight> = {};
    for (let i = 0; i < n; i++) if (i < lo || i > hi) base[i] = 'muted';
    const pointers = [{ name: 'lo', index: lo }, { name: 'hi', index: hi }];
    if (mid !== undefined) pointers.push({ name: 'mid', index: mid });
    return arr(a, {
      highlights: { ...base, ...extra },
      pointers,
      ranges: lo <= hi ? [{ from: lo, to: hi, label: `khoảng tìm kiếm (${hi - lo + 1} phần tử)` }] : [],
    });
  };
  let lo = 0;
  let hi = n - 1;
  yield frame(9, { target, lo, hi }, viz(lo, hi), `Khoảng tìm kiếm ban đầu là cả mảng [0, ${n - 1}]. Bất biến: nếu target có trong mảng thì nó nằm trong [lo, hi].`);
  while (lo <= hi) {
    yield frame(10, { target, lo, hi }, viz(lo, hi), `lo=${lo} ≤ hi=${hi} ⇒ khoảng còn phần tử, tiếp tục.`);
    const mid = lo + Math.floor((hi - lo) / 2);
    yield frame(11, { target, lo, hi, mid, 'a[mid]': a[mid] }, viz(lo, hi, hl([mid, 'compare']), mid), `mid = ${lo} + ⌊(${hi} − ${lo}) / 2⌋ = ${mid}. Viết lo + (hi−lo)/2 thay vì (lo+hi)/2 để tránh tràn số ở C++/Java.`);
    if (a[mid] === target) {
      yield frame(13, { target, lo, hi, mid, 'a[mid]': a[mid] }, viz(lo, hi, hl([mid, 'done']), mid), `a[mid] = ${a[mid]} = target. Tìm thấy tại chỉ số ${mid}!`);
      return mid;
    } else if (a[mid] < target) {
      yield frame(15, { target, lo, hi, mid, 'a[mid]': a[mid] }, viz(lo, hi, hl([mid, 'compare']), mid), `a[mid] = ${a[mid]} < ${target}. Vì mảng tăng dần, mọi phần tử từ ${lo}..${mid} đều < target ⇒ loại bỏ nửa trái, lo = ${mid + 1}.`);
      lo = mid + 1;
    } else {
      yield frame(17, { target, lo, hi, mid, 'a[mid]': a[mid] }, viz(lo, hi, hl([mid, 'compare']), mid), `a[mid] = ${a[mid]} > ${target}. Mọi phần tử từ ${mid}..${hi} đều > target ⇒ loại bỏ nửa phải, hi = ${mid - 1}.`);
      hi = mid - 1;
    }
  }
  yield frame(20, { target, lo, hi }, viz(lo, hi, hlRange(0, n - 1, 'muted')), `lo=${lo} > hi=${hi}: khoảng rỗng ⇒ target không tồn tại. Trả về -1. (Lưu ý: lo = ${lo} chính là vị trí chèn để mảng vẫn sắp xếp.)`);
  return -1;
}
