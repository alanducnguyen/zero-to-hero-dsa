import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { piles: number[]; h: number }): Generator<Frame, number> {
  const { piles, h } = input;
  const max = Math.max(...piles);
  const speeds = Array.from({ length: max }, (_, i) => i + 1);
  const viz = (k: number, per: number[] | null, ok = false) => {
    const sh: Record<number, Highlight> = {};
    for (let s = 1; s < k; s++) sh[s - 1] = 'visited';
    sh[k - 1] = ok ? 'done' : 'active';
    return composite([
      arr(speeds, { title: 'Tốc độ k (xám = đã thử và thất bại)', highlights: sh, pointers: [{ name: 'k', index: k - 1 }] }),
      arr(piles.map((p, i) => (per ? `${p}→${per[i]}h` : `${p}`)), { title: per ? `piles: số giờ mỗi đống với k = ${k}` : 'piles' }),
    ]);
  };
  yield frame(3, { max, h }, viz(1, null), `max = ${max}: tốc độ ${max} chắc chắn kịp (mỗi đống 1 giờ). Đáp án nằm trong [1, ${max}]; quét từ nhỏ lên để gặp đáp án nhỏ nhất đầu tiên.`);
  let tested = 0;
  for (let k = 1; k < max; k++) {
    const per = piles.map((p) => Math.ceil(p / k));
    const hours = per.reduce((a, b) => a + b, 0);
    tested++;
    const ok = hours <= h;
    yield frame(7, { k, hours, h, ok, 'số tốc độ đã thử': tested }, viz(k, per, ok),
      ok ? `k = ${k} cần ${hours} ≤ ${h} giờ ⇒ kịp. Vì mọi k nhỏ hơn đều đã thất bại, ${k} là đáp án. Tốn ${tested} lần tính tổng, mỗi lần O(n).` : `k = ${k} cần ${hours} > ${h} giờ ⇒ chưa kịp, tăng k. Quét tuyến tính không tận dụng tính đơn điệu nên có thể phải thử tới ${max} tốc độ.`);
    if (ok) return k;
  }
  yield frame(9, { k: max, h }, viz(max, piles.map(() => 1), true), `Mọi k < ${max} đều không kịp ⇒ trả về ${max} (mỗi đống 1 giờ, ${piles.length} ≤ h). Đây là worst case O(n · max).`);
  return max;
}
