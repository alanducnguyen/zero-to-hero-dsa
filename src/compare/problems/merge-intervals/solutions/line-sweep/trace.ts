import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { fmt, type Iv } from '../../viz';

export function* trace(input: { intervals: Iv[] }): Generator<Frame, Iv[]> {
  const all = input.intervals;
  if (all.length === 0) {
    yield frame(3, { n: 0 }, arr(['—'], { title: 'intervals' }), 'Không có khoảng ⇒ trả về [] (tránh Math.min của mảng rỗng).');
    return [];
  }
  const lo = Math.min(...all.map((iv) => iv[0]));
  const hi = Math.max(...all.map((iv) => iv[1]));
  const diff = new Array<number>(2 * (hi - lo) + 2).fill(0);
  const label = (p: number) => (p % 2 === 0 ? String(p / 2 + lo) : `${(p - 1) / 2 + lo}⁺`);
  const small = diff.length <= 48;
  const merged: Iv[] = [];
  const viz = (hl: Record<number, Highlight> = {}, cov?: number[]) =>
    composite([
      arr(all.map(fmt), { title: 'intervals' }),
      small
        ? arr(diff, { title: 'diff trên trục nhân đôi (ô lẻ = x⁺, ngay sau x)', highlights: hl })
        : arr([`R = ${hi - lo}, ${diff.length} ô`], { title: 'diff (quá dài để vẽ)' }),
      ...(small && cov ? [arr(cov.map((c, p) => `${label(p)}:${c}`), { title: 'độ phủ (vị trí:cover)', highlights: hl })] : []),
      arr(merged.length ? merged.map(fmt) : ['—'], { title: 'merged' }),
    ]);
  yield frame(6, { lo, hi, R: hi - lo, cells: diff.length }, viz(), `Cấp mảng đếm theo MIỀN toạ độ [${lo}, ${hi}], không theo n. Nhân đôi để có ô "ngay sau x": nếu −1 đặt ở ô x+1 thì [1,2] và [3,4] sẽ bị dính nhầm thành [1,4].`);
  for (const [s, e] of all) {
    diff[2 * (s - lo)]++;
    diff[2 * (e - lo) + 1]--;
    yield frame(9, { s, e, '+1 tại': label(2 * (s - lo)), '−1 tại': label(2 * (e - lo) + 1) }, viz({ [2 * (s - lo)]: 'done', [2 * (e - lo) + 1]: 'swap' }), `Sự kiện của ${fmt([s, e])}: +1 tại ${s}, −1 tại ${e}⁺ (ngay sau ${e}). Nhờ vậy khoảng kết thúc ở ${e} vẫn "đang phủ" khi khoảng khác bắt đầu đúng tại ${e}.`);
  }
  const cov: number[] = [];
  let cover = 0;
  let start = 0;
  for (let p = 0; p < diff.length; p++) {
    const prev = cover;
    cover += diff[p];
    cov.push(cover);
    if (prev === 0 && cover > 0) {
      start = p / 2 + lo;
      yield frame(17, { p: label(p), prev, cover, start }, viz({ [p]: 'active' }, cov), `Độ phủ ${prev} → ${cover}: bước vào vùng được phủ ⇒ mở khoảng gộp tại ${start}.`);
    } else if (prev > 0 && cover === 0) {
      merged.push([start, (p - 1) / 2 + lo]);
      yield frame(18, { p: label(p), prev, cover, merged: merged.map(fmt) }, viz({ [p]: 'done' }, cov), `Độ phủ về 0 tại ${label(p)} ⇒ đóng khoảng ${fmt(merged[merged.length - 1])}. Vùng phủ > 0 liên tục chính là một khoảng gộp.`);
    } else if (diff[p] !== 0) {
      yield frame(16, { p: label(p), diff: diff[p], cover }, viz({ [p]: 'compare' }, cov), `Độ phủ đổi thành ${cover} nhưng vẫn > 0 ⇒ còn trong cùng khoảng gộp (các khoảng đang chồng nhau).`);
    }
  }
  yield frame(20, { result: merged.map(fmt), cells: diff.length }, viz({}, cov), `Xong: O(n + R) với R = ${hi - lo}. Thắng sort khi miền toạ độ nhỏ (R ≈ n); thua nặng khi toạ độ tới 10⁹.`);
  return merged;
}
