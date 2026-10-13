import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const a = input.nums;
  const stack: string[] = [];
  const viz = (lo: number, hi: number, hl: Record<number, Highlight> = {}, ranges: { from: number; to: number; label: string; color: Highlight }[] = []) =>
    arr(a, { mode: 'bars', highlights: { ...Object.fromEntries(a.map((_, k) => [k, (k < lo || k > hi ? 'muted' : 'visited') as Highlight])), ...hl }, ranges: [{ from: lo, to: hi, label: `solve(${lo}, ${hi})`, color: 'range' }, ...ranges] });
  function* solve(lo: number, hi: number): Generator<Frame, number> {
    stack.push(`solve(${lo}, ${hi})`);
    if (lo === hi) {
      yield frame(6, { lo, hi, 'a[lo]': a[lo] }, viz(lo, hi, { [lo]: 'done' }), `Một phần tử ⇒ đáp án là chính nó: ${a[lo]}.`, { callStack: [...stack] });
      stack.pop();
      return a[lo];
    }
    const mid = (lo + hi) >> 1;
    yield frame(7, { lo, mid, hi }, viz(lo, hi, {}, [{ from: lo, to: mid, label: 'trái', color: 'pointer' }, { from: mid + 1, to: hi, label: 'phải', color: 'active' }]), `Chia tại mid = ${mid}. Đoạn tốt nhất hoặc nằm hẳn bên trái, hẳn bên phải, hoặc vắt qua mid.`, { callStack: [...stack] });
    const left = yield* solve(lo, mid);
    const right = yield* solve(mid + 1, hi);
    let sum = 0, bestL = -Infinity, iL = mid;
    for (let i = mid; i >= lo; i--) { sum += a[i]; if (sum > bestL) { bestL = sum; iL = i; } }
    sum = 0; let bestR = -Infinity, iR = mid + 1;
    for (let i = mid + 1; i <= hi; i++) { sum += a[i]; if (sum > bestR) { bestR = sum; iR = i; } }
    yield frame(13, { left, right, bestL, bestR, 'vắt qua': bestL + bestR }, viz(lo, hi, {}, [{ from: iL, to: iR, label: `vắt qua mid = ${bestL + bestR}`, color: 'compare' }]), `Đoạn vắt qua mid = hậu tố tốt nhất của trái (${bestL}) + tiền tố tốt nhất của phải (${bestR}) = ${bestL + bestR}. So với trái = ${left}, phải = ${right}.`, { callStack: [...stack] });
    const res = Math.max(left, right, bestL + bestR);
    yield frame(14, { result: res }, viz(lo, hi, {}, []), `solve(${lo}, ${hi}) = max(${left}, ${right}, ${bestL + bestR}) = ${res}.`, { callStack: [...stack] });
    stack.pop();
    return res;
  }
  const r = yield* solve(0, a.length - 1);
  yield frame(2, { result: r }, arr(a, { mode: 'bars' }), `Kết quả ${r}. Mỗi tầng O(n) gộp, log n tầng ⇒ O(n log n) – chậm hơn Kadane nhưng song song hoá được.`);
  return r;
}
