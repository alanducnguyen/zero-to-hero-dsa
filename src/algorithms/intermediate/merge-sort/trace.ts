import { arr, composite, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

/**
 * Trace theo "vị trí toàn cục": mỗi lời gọi đệ quy ứng với đoạn [lo, hi) của mảng gốc.
 * Mảng hiển thị `work` là trạng thái hiện tại của mọi đoạn (đoạn đã merge thì đã sắp xếp).
 */
export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const work = [...input.array];
  const n = work.length;
  const stack: string[] = [];
  const cs = () => [...stack];
  const viz = (lo: number, hi: number, extra: Record<number, Highlight> = {}, label = `mergeSort(${lo}..${hi - 1})`, extraParts: VisualState[] = []): VisualState => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < lo || k >= hi) h[k] = 'muted';
    const main = arr(work, { mode: 'bars', highlights: { ...h, ...extra }, ranges: hi > lo ? [{ from: lo, to: hi - 1, label }] : [] });
    return extraParts.length ? composite([main, ...extraParts]) : main;
  };

  function* sort(lo: number, hi: number): Generator<Frame, void> {
    const len = hi - lo;
    stack.push(`mergeSort([${lo}..${hi - 1}], ${len} phần tử)`);
    yield frame(8, { lo, hi, length: len }, viz(lo, hi), len <= 1 ? `Đoạn có ${len} phần tử ⇒ đã sắp xếp (base case), trả về ngay.` : `Đoạn ${len} phần tử ⇒ chia đôi.`, { callStack: cs() });
    if (len <= 1) {
      stack.pop();
      return;
    }
    const mid = lo + Math.floor(len / 2);
    yield frame(9, { lo, hi, mid }, viz(lo, hi, { ...hlRange(lo, mid - 1, 'range'), ...hlRange(mid, hi - 1, 'compare') }), `mid = ${mid}. Nửa trái [${lo}..${mid - 1}] (cyan), nửa phải [${mid}..${hi - 1}] (vàng).`, { callStack: cs() });
    yield frame(10, { lo, hi, mid }, viz(lo, mid), `Đệ quy sắp xếp nửa trái.`, { callStack: cs() });
    yield* sort(lo, mid);
    yield frame(11, { lo, hi, mid }, viz(mid, hi), `Nửa trái xong. Đệ quy sắp xếp nửa phải.`, { callStack: cs() });
    yield* sort(mid, hi);
    // merge
    stack.push(`merge(trái ${mid - lo}, phải ${hi - mid})`);
    const left = work.slice(lo, mid);
    const right = work.slice(mid, hi);
    const out: number[] = [];
    let i = 0;
    let j = 0;
    const parts = (hl: { li?: number; rj?: number; outIdx?: number }) => [
      composite([
        arr(left, { title: 'left', highlights: hl.li !== undefined ? { [hl.li]: 'compare' } : {}, pointers: i < left.length ? [{ name: 'i', index: i }] : [] }),
        arr(right, { title: 'right', highlights: hl.rj !== undefined ? { [hl.rj]: 'compare' } : {}, pointers: j < right.length ? [{ name: 'j', index: j }] : [] }),
        arr(out.length ? out : ['—'], { title: 'out', highlights: hl.outIdx !== undefined ? { [hl.outIdx]: 'swap' } : {} }),
      ], 'row'),
    ];
    yield frame(12, { lo, hi, left, right }, viz(lo, hi, {}, `merge [${lo}..${hi - 1}]`, parts({})), `Cả hai nửa đã sắp xếp. Trộn chúng bằng hai con trỏ i, j.`, { callStack: cs() });
    while (i < left.length && j < right.length) {
      yield frame(21, { i, j, 'left[i]': left[i], 'right[j]': right[j] }, viz(lo, hi, {}, `merge [${lo}..${hi - 1}]`, parts({ li: i, rj: j })), `So sánh left[${i}] = ${left[i]} với right[${j}] = ${right[j]}: lấy ${left[i] <= right[j] ? 'left (≤ giữ stable)' : 'right'}.`, { callStack: cs() });
      if (left[i] <= right[j]) {
        out.push(left[i++]);
        work[lo + out.length - 1] = out[out.length - 1];
        yield frame(22, { i, j, out: [...out] }, viz(lo, hi, { [lo + out.length - 1]: 'swap' }, `merge [${lo}..${hi - 1}]`, parts({ outIdx: out.length - 1 })), `out.push(${out[out.length - 1]}), i++.`, { callStack: cs() });
      } else {
        out.push(right[j++]);
        work[lo + out.length - 1] = out[out.length - 1];
        yield frame(24, { i, j, out: [...out] }, viz(lo, hi, { [lo + out.length - 1]: 'swap' }, `merge [${lo}..${hi - 1}]`, parts({ outIdx: out.length - 1 })), `out.push(${out[out.length - 1]}), j++.`, { callStack: cs() });
      }
    }
    if (i < left.length) {
      while (i < left.length) {
        out.push(left[i++]);
        work[lo + out.length - 1] = out[out.length - 1];
      }
      yield frame(27, { i, j, out: [...out] }, viz(lo, hi, hlRange(lo, hi - 1, 'done'), `merge [${lo}..${hi - 1}]`, parts({})), `right đã hết ⇒ chép phần dư của left (đã sắp xếp, đều ≥ mọi phần tử đã lấy).`, { callStack: cs() });
    }
    if (j < right.length) {
      while (j < right.length) {
        out.push(right[j++]);
        work[lo + out.length - 1] = out[out.length - 1];
      }
      yield frame(28, { i, j, out: [...out] }, viz(lo, hi, hlRange(lo, hi - 1, 'done'), `merge [${lo}..${hi - 1}]`, parts({})), `left đã hết ⇒ chép phần dư của right.`, { callStack: cs() });
    }
    stack.pop();
    yield frame(12, { lo, hi, merged: [...out] }, viz(lo, hi, hlRange(lo, hi - 1, 'done')), `Đoạn [${lo}..${hi - 1}] đã sắp xếp: ${out.join(', ')}. Trả về cho tầng trên.`, { callStack: cs() });
    stack.pop();
  }

  yield* sort(0, n);
  yield frame(12, { result: work }, arr(work, { mode: 'bars', highlights: hlRange(0, n - 1, 'done') }), `Hoàn tất. log₂(${n}) ≈ ${n ? Math.ceil(Math.log2(Math.max(1, n))) : 0} tầng đệ quy, mỗi tầng merge tổng cộng ${n} phần tử.`);
  return work;
}
