import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { heights: number[] }): Generator<Frame, number> {
  const h = input.heights;
  const calls: string[] = [];
  let best = 0;
  const viz = (lo: number, hi: number, extra: Record<number, Highlight> = {}) => composite([
    arr(h, { mode: 'bars', highlights: { ...hlRange(lo, hi, 'range'), ...extra }, pointers: lo <= hi ? [{ name: 'lo', index: lo }, { name: 'hi', index: hi }] : [] }),
    mapViz({ 'đoạn': lo <= hi ? `[${lo}..${hi}]` : 'rỗng', 'độ sâu': calls.length, 'best đến giờ': best }, {}, 'Chia tại cột thấp nhất'),
  ]);
  function* solve(lo: number, hi: number): Generator<Frame, number> {
    if (lo > hi) return 0;
    calls.push(`solve(${lo}, ${hi})`);
    let m = lo;
    for (let k = lo + 1; k <= hi; k++) if (h[k] < h[m]) m = k;
    const across = h[m] * (hi - lo + 1);
    best = Math.max(best, across);
    yield frame(7, { lo, hi, m, 'h[m]': h[m], across }, viz(lo, hi, { [m]: 'active' }), `Cột thấp nhất của [${lo}..${hi}] là #${m} (cao ${h[m]}). Mọi hình chứa cột này cao ≤ ${h[m]}, nên hình tốt nhất chứa nó là trải hết đoạn: ${h[m]} × ${hi - lo + 1} = ${across}. Hình không chứa #${m} thì nằm gọn bên trái hoặc bên phải ⇒ đệ quy.`, { callStack: [...calls] });
    const l = yield* solve(lo, m - 1);
    const r = yield* solve(m + 1, hi);
    const res = Math.max(across, l, r);
    yield frame(8, { lo, hi, across, 'trái': l, 'phải': r, 'kết quả': res }, viz(lo, hi, { [m]: 'done' }), `[${lo}..${hi}]: max(trải hết ${across}, trái ${l}, phải ${r}) = ${res}.`, { callStack: [...calls] });
    calls.pop();
    return res;
  }
  const ans = yield* solve(0, h.length - 1);
  yield frame(10, { 'kết quả': ans }, viz(0, -1), `Đáp án ${ans}. Nhanh khi cột thấp nhất nằm giữa (O(n log n)); mảng đã sắp xếp làm cây đệ quy lệch thành O(n²).`);
  return ans;
}
