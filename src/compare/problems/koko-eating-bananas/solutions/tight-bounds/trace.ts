import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { piles: number[]; h: number }): Generator<Frame, number> {
  const { piles, h } = input;
  const n = piles.length;
  const sum = piles.reduce((a, b) => a + b, 0);
  const max = Math.max(...piles);
  const speeds = Array.from({ length: max }, (_, i) => i + 1);
  const viz = (lo: number, hi: number, mid: number | null, per: number[] | null) => {
    const sh: Record<number, Highlight> = {};
    speeds.forEach((s, i) => { sh[i] = s < lo || s > hi ? 'muted' : 'range'; });
    if (mid !== null) sh[mid - 1] = 'active';
    if (lo === hi) sh[lo - 1] = 'done';
    const ptrs: Pointer[] = [{ name: 'lo', index: lo - 1 }, { name: 'hi', index: hi - 1 }];
    if (mid !== null) ptrs.push({ name: 'mid', index: mid - 1 });
    return composite([
      arr(speeds, { title: 'Khoảng tốc độ ứng viên (mờ = loại bằng cận toán học hoặc binary search)', highlights: sh, pointers: ptrs }),
      arr(piles.map((p, i) => (per ? `${p}→${per[i]}h` : `${p}`)), { title: mid !== null && per ? `piles: số giờ mỗi đống với k = ${mid}` : 'piles' }),
    ]);
  };
  let lo = Math.max(1, Math.ceil(sum / h));
  let hi = max;
  yield frame(6, { sum, h, lo }, viz(lo, hi, null, null), `sum = ${sum}. Kể cả ăn không lãng phí giờ nào, h giờ chỉ ăn được h·k chuối ⇒ cần k ≥ ⌈${sum}/${h}⌉ = ${lo}. Loại ngay ${lo - 1} tốc độ mà không thử.`);
  if (h > n) {
    const cap = Math.ceil(sum / (h - n));
    hi = Math.min(hi, cap);
    yield frame(8, { sum, h, n, '⌈sum/(h−n)⌉': cap, hi }, viz(lo, hi, null, null), `Mỗi đống lãng phí < 1 giờ ⇒ giờ < sum/k + n. Với k ≥ ⌈${sum}/(${h}−${n})⌉ = ${cap} thì giờ < h nên chắc chắn kịp ⇒ hi = min(${max}, ${cap}) = ${hi}.`);
  } else {
    yield frame(8, { h, n, hi }, viz(lo, hi, null, null), `h = n ⇒ mỗi đống đúng 1 giờ, cận trên sum/(h−n) không dùng được; hi giữ = max = ${hi}.`);
  }
  let probes = 0;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const per = piles.map((p) => Math.ceil(p / mid));
    const hours = per.reduce((a, b) => a + b, 0);
    probes++;
    const ok = hours <= h;
    yield frame(11, { lo, hi, mid, hours, h, ok, 'số lần thử': probes }, viz(lo, hi, mid, per),
      ok ? `k = ${mid}: ${hours} ≤ ${h} giờ ⇒ kịp, hi = mid.` : `k = ${mid}: ${hours} > ${h} giờ ⇒ không kịp, lo = mid + 1.`);
    if (ok) hi = mid;
    else lo = mid + 1;
  }
  yield frame(14, { result: lo, 'số lần thử': probes }, viz(lo, hi, null, null), `Đáp án ${lo} sau ${probes} lần thử. Cận chặt chỉ bớt vài vòng (hằng số); worst case h = n vẫn là O(n · log max).`);
  return lo;
}
