import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { piles: number[]; h: number }): Generator<Frame, number> {
  const { piles, h } = input;
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
      arr(speeds, { title: 'Khoảng tốc độ ứng viên (cyan = còn xét, mờ = đã loại)', highlights: sh, pointers: ptrs }),
      arr(piles.map((p, i) => (per ? `${p}→${per[i]}h` : `${p}`)), { title: mid !== null && per ? `piles: số giờ mỗi đống với k = ${mid}` : 'piles' }),
    ]);
  };
  let lo = 1;
  let hi = max;
  let probes = 0;
  yield frame(5, { lo, hi, h }, viz(lo, hi, null, null), `Đáp án nằm trong [1, ${max}]: tốc độ ${max} chắc chắn kịp (mỗi đống 1 giờ, n ≤ h). Vị từ "kịp với k" sai…sai rồi đúng…đúng ⇒ tìm điểm chuyển bằng binary search.`);
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const per = piles.map((p) => Math.ceil(p / mid));
    const hours = per.reduce((a, b) => a + b, 0);
    probes++;
    const ok = hours <= h;
    yield frame(8, { lo, hi, mid, hours, h, ok, 'số lần thử': probes }, viz(lo, hi, mid, per),
      ok ? `k = ${mid} cần ${hours} ≤ ${h} giờ ⇒ kịp. Đáp án ≤ ${mid}: đặt hi = mid (giữ mid vì nó có thể chính là đáp án).` : `k = ${mid} cần ${hours} > ${h} giờ ⇒ không kịp, mọi k ≤ ${mid} cũng không kịp (đơn điệu) ⇒ lo = mid + 1.`);
    if (ok) hi = mid;
    else lo = mid + 1;
  }
  yield frame(11, { result: lo, 'số lần thử': probes }, viz(lo, hi, null, null), `lo == hi = ${lo}: khoảng còn một ứng viên. Chỉ ${probes} lần thử (≈ log₂ ${max}) thay vì tới ${max} lần như quét tuyến tính.`);
  return lo;
}
