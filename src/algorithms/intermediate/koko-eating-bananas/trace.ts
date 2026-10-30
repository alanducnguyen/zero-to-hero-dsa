import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { piles: number[]; h: number }): Generator<Frame, number> {
  const { piles, h } = input;
  const maxP = Math.max(1, ...piles);
  const speeds = Array.from({ length: maxP }, (_, i) => i + 1);

  const viz = (lo: number, hi: number, mid: number | null, perPile: (number | null)[], cur = -1) => {
    const rh: Record<number, Highlight> = {};
    speeds.forEach((s, i) => {
      rh[i] = s < lo || s > hi ? 'muted' : 'range';
    });
    if (mid !== null) rh[mid - 1] = 'active';
    if (lo === hi) rh[lo - 1] = 'done';
    const ptrs: Pointer[] = [{ name: 'lo', index: lo - 1 }, { name: 'hi', index: hi - 1 }];
    if (mid !== null) ptrs.push({ name: 'mid', index: mid - 1 });
    const ph: Record<number, Highlight> = {};
    perPile.forEach((v, i) => {
      if (v !== null) ph[i] = 'visited';
    });
    if (cur >= 0) ph[cur] = 'compare';
    return composite([
      arr(speeds, { title: 'Khoảng tốc độ ứng viên k (cyan = còn xét, mờ = đã loại)', highlights: rh, pointers: ptrs }),
      arr(
        piles.map((p, i) => (perPile[i] === null ? `${p}` : `${p}→${perPile[i]}h`)),
        { title: mid === null ? 'piles' : `piles: số giờ mỗi đống với k = ${mid}`, highlights: ph },
      ),
    ]);
  };
  const empty = () => piles.map(() => null as number | null);

  let lo = 1;
  yield frame(10, { lo, h }, viz(lo, maxP, null, empty()), 'Tốc độ nhỏ nhất có nghĩa là 1 chuối/giờ – cận dưới của đáp án.');
  let hi = maxP;
  yield frame(11, { lo, hi, h }, viz(lo, hi, null, empty()),
    `hi = max(piles) = ${hi}: với tốc độ này mỗi đống mất đúng 1 giờ, tổng ${piles.length} giờ ≤ h nên chắc chắn đủ. Tốc độ lớn hơn không giúp gì thêm ⇒ đáp án nằm trong [1, ${hi}].`);
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    yield frame(13, { lo, hi, mid }, viz(lo, hi, mid, empty()),
      `Thử tốc độ giữa mid = ${mid}. Vị từ "ăn kịp với tốc độ k" đơn điệu: nếu k kịp thì mọi k' > k cũng kịp ⇒ một phép thử loại được một nửa khoảng.`);
    let hours = 0;
    const per = empty();
    for (let i = 0; i < piles.length; i++) {
      const p = piles[i];
      const c = Math.ceil(p / mid);
      hours += c;
      per[i] = c;
      yield frame(15, { lo, hi, mid, p, 'ceil(p/mid)': c, hours }, viz(lo, hi, mid, per, i),
        `Đống ${p} chuối với tốc độ ${mid} cần ceil(${p}/${mid}) = ${c} giờ (giờ lẻ vẫn tính trọn vì Koko không chuyển đống giữa giờ). Tổng tạm: ${hours}.`);
    }
    const ok = hours <= h;
    yield frame(16, { lo, hi, mid, hours, h, ok }, viz(lo, hi, mid, per),
      `Tổng ${hours} giờ ${ok ? '≤' : '>'} h = ${h} ⇒ tốc độ ${mid} ${ok ? 'ĐỦ' : 'KHÔNG đủ'}.`);
    if (ok) {
      hi = mid;
      yield frame(17, { lo, hi, mid }, viz(lo, hi, null, per),
        `hi = mid = ${mid}: mid kịp nên đáp án ≤ ${mid}; giữ lại mid (không phải mid − 1) vì chính mid có thể là đáp án nhỏ nhất.`);
    } else {
      lo = mid + 1;
      yield frame(19, { lo, hi, mid }, viz(lo, hi, null, per),
        `lo = mid + 1 = ${lo}: mid không kịp thì mọi tốc độ ≤ ${mid} cũng không kịp (tính đơn điệu) ⇒ loại cả nửa trái.`);
    }
  }
  yield frame(22, { result: lo }, viz(lo, hi, null, empty()),
    `lo == hi = ${lo}: khoảng chỉ còn một ứng viên, đó là tốc độ nhỏ nhất làm vị từ đúng (điểm chuyển false → true).`);
  return lo;
}
