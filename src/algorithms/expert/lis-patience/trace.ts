import { arr, composite, frame, hl, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  const tails: number[] = [];
  const viz = (i: number, extra: Record<number, Highlight> = {}, tailHl: Record<number, Highlight> = {}, ptrs: { name: string; index: number }[] = []) =>
    composite([
      arr(nums, { title: 'nums', highlights: { ...(i > 0 ? hlRange(0, i - 1, 'visited') : {}), ...extra }, pointers: i < nums.length ? [{ name: 'x', index: i }] : [] }),
      arr(tails.length ? tails : ['—'], { title: 'tails[len] = tail nhỏ nhất của dãy tăng độ dài len+1 (luôn tăng dần)', highlights: tailHl, pointers: ptrs }),
    ]);
  yield frame(7, {}, viz(0), 'tails rỗng. Ý tưởng: với mỗi độ dài, chỉ cần nhớ tail NHỎ NHẤT – tail nhỏ thì dễ nối thêm phần tử sau hơn.');
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    yield frame(8, { i, x, tails: [...tails] }, viz(i, hl([i, 'active'])), `Xét x = ${x}. Tìm vị trí đầu tiên trong tails có tails[pos] ≥ x (lower bound) bằng binary search.`);
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      const goRight = tails[mid] < x;
      yield frame(13, { x, lo, hi, mid, 'tails[mid]': tails[mid] }, viz(i, hl([i, 'active']), { ...hlRange(lo, hi - 1, 'range'), [mid]: 'compare' }, [{ name: 'lo', index: lo }, { name: 'hi', index: Math.min(hi, tails.length - 1) }, { name: 'mid', index: mid }]), `tails[${mid}] = ${tails[mid]} ${goRight ? '<' : '≥'} ${x} ⇒ ${goRight ? 'lo = mid + 1' : 'hi = mid'}.`);
      if (goRight) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) {
      tails.push(x);
      yield frame(17, { x, pos: lo, length: tails.length }, viz(i, hl([i, 'done']), { [lo]: 'done' }), `pos = ${lo} = tails.length ⇒ x lớn hơn mọi tail ⇒ nối vào cuối: có dãy tăng độ dài ${tails.length}.`);
    } else {
      const old = tails[lo];
      tails[lo] = x;
      yield frame(19, { x, pos: lo, replaced: old }, viz(i, hl([i, 'swap']), { [lo]: 'swap' }), `pos = ${lo} ⇒ thay tails[${lo}] = ${old} bằng ${x}: dãy tăng độ dài ${lo + 1} giờ kết thúc bằng số nhỏ hơn, dễ kéo dài hơn. Độ dài LIS không đổi.`);
    }
  }
  yield frame(22, { result: tails.length, tails: [...tails] }, viz(nums.length, {}, hlRange(0, tails.length - 1, 'done')), `LIS có độ dài ${tails.length}. LƯU Ý: tails KHÔNG phải một LIS thật (chỉ đúng độ dài); để dựng dãy cần lưu thêm chỉ số cha.`);
  return tails.length;
}
