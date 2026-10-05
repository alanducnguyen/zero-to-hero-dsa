import { arr, frame, hl } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { array: number[] }): Generator<Frame, number[]> {
  const a = [...input.array];
  const n = a.length;
  const fixed = new Set<number>(); // vị trí pivot đã đúng
  const stack: string[] = [];
  const viz = (lo: number, hi: number, extra: Record<number, Highlight> = {}, pointers: { name: string; index: number }[] = []) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < lo || k > hi) h[k] = 'muted';
    for (const k of fixed) h[k] = 'done';
    return arr(a, { mode: 'bars', highlights: { ...h, ...extra }, pointers, ranges: lo <= hi ? [{ from: lo, to: hi, label: `sort(${lo}, ${hi})` }] : [] });
  };
  const cs = () => [...stack];

  function* sort(lo: number, hi: number): Generator<Frame, void> {
    stack.push(`sort(lo=${lo}, hi=${hi})`);
    yield frame(13, { lo, hi }, viz(lo, hi), lo >= hi ? `Đoạn [${lo}, ${hi}] có ${Math.max(0, hi - lo + 1)} phần tử ⇒ đã sắp xếp, trả về ngay (base case).` : `Gọi sort trên đoạn [${lo}, ${hi}] (${hi - lo + 1} phần tử).`, { callStack: cs() });
    if (lo >= hi) {
      if (lo === hi) fixed.add(lo);
      stack.pop();
      return;
    }
    // partition
    stack.push(`partition(lo=${lo}, hi=${hi})`);
    const pivot = a[hi];
    yield frame(21, { lo, hi, pivot }, viz(lo, hi, hl([hi, 'active']), [{ name: 'pivot', index: hi }]), `Chọn pivot = a[${hi}] = ${pivot} (phần tử cuối – Lomuto). Mục tiêu: đưa mọi phần tử < pivot sang trái, ≥ pivot sang phải.`, { callStack: cs() });
    let i = lo;
    yield frame(22, { lo, hi, pivot, i }, viz(lo, hi, hl([hi, 'active']), [{ name: 'i', index: i }, { name: 'pivot', index: hi }]), `i = ${lo}. Bất biến: a[lo..i-1] < pivot, a[i..j-1] ≥ pivot.`, { callStack: cs() });
    for (let j = lo; j < hi; j++) {
      yield frame(24, { lo, hi, pivot, i, j, 'a[j]': a[j] }, viz(lo, hi, { [hi]: 'active', [j]: 'compare' }, [{ name: 'i', index: i }, { name: 'j', index: j }, { name: 'pivot', index: hi }]),
        `So sánh a[${j}] = ${a[j]} với pivot ${pivot}: ${a[j] < pivot ? 'nhỏ hơn ⇒ đổi chỗ với a[i] rồi tăng i.' : 'không nhỏ hơn ⇒ giữ nguyên, nó ở vùng ≥ pivot.'}`, { callStack: cs() });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        yield frame(25, { lo, hi, pivot, i, j }, viz(lo, hi, { [hi]: 'active', [i]: 'swap', [j]: 'swap' }, [{ name: 'i', index: i }, { name: 'j', index: j }, { name: 'pivot', index: hi }]),
          i === j ? `a[i] và a[j] cùng vị trí ⇒ hoán đổi không đổi gì.` : `Hoán đổi a[${i}] ↔ a[${j}]: ${a[i]} vào vùng "< pivot".`, { callStack: cs() });
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    fixed.add(i);
    yield frame(29, { lo, hi, pivot, i }, viz(lo, hi, { [i]: 'done' }, [{ name: 'i', index: i }]), `Đặt pivot vào a[${i}]: mọi phần tử bên trái < ${pivot}, bên phải ≥ ${pivot}. Pivot ĐÃ ĐÚNG VỊ TRÍ CUỐI CÙNG.`, { callStack: cs() });
    stack.pop();
    const p = i;
    yield frame(14, { lo, hi, p }, viz(lo, hi), `partition trả về p = ${p}. Giờ đệ quy hai nửa độc lập.`, { callStack: cs() });
    yield frame(15, { lo, hi, p }, viz(lo, p - 1), `Đệ quy nửa trái [${lo}, ${p - 1}].`, { callStack: cs() });
    yield* sort(lo, p - 1);
    yield frame(16, { lo, hi, p }, viz(p + 1, hi), `Đệ quy nửa phải [${p + 1}, ${hi}].`, { callStack: cs() });
    yield* sort(p + 1, hi);
    stack.pop();
  }

  stack.push('quickSort()');
  yield frame(8, { n }, arr(a, { mode: 'bars' }), 'Bắt đầu: gọi sort trên toàn bộ mảng.', { callStack: cs() });
  yield* sort(0, n - 1);
  stack.pop();
  yield frame(9, { result: a }, arr(a, { mode: 'bars', highlights: Object.fromEntries(a.map((_, k) => [k, 'done' as Highlight])) }), 'Hoàn tất. Mọi pivot đều đã được đặt đúng chỗ.');
  return a;
}
