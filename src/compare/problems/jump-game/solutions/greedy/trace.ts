import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const last = nums.length - 1;
  let farthest = 0;
  const viz = (i: number, extra: Highlight = 'active') => {
    const reach = Math.min(farthest, last);
    let h = hlRange(0, reach, 'range');
    if (reach < last) h = hlRange(reach + 1, last, 'muted', h);
    h[Math.min(i, last)] = extra;
    return arr(nums, { highlights: h, pointers: [{ name: 'i', index: Math.min(i, last) }], ranges: [{ from: 0, to: reach, label: `tới được ≤ ${farthest}`, color: 'range' }] });
  };
  yield frame(3, { farthest }, viz(0), 'Đứng ở ô 0 ⇒ tới được [0, 0]. Bất biến: mọi ô ≤ farthest đều tới được, vì đường tới farthest đi qua (hoặc nhảy qua) đoạn liền.');
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) {
      yield frame(5, { i, farthest }, viz(i, 'swap'), `i = ${i} > farthest = ${farthest}: không ô nào trước nhảy tới ${i} ⇒ false. Không cần xét tiếp.`);
      return false;
    }
    const prev = farthest;
    farthest = Math.max(farthest, i + nums[i]);
    yield frame(6, { i, 'nums[i]': nums[i], 'i + nums[i]': i + nums[i], farthest }, viz(i), farthest > prev ? `Từ ô ${i} nhảy xa tới ${i + nums[i]} ⇒ nới farthest ${prev} → ${farthest}.` : `i + nums[i] = ${i + nums[i]} ≤ ${prev}: ô ${i} không mở rộng vùng, chỉ cần nhớ một số thay vì cả mảng good[].`);
    if (farthest >= last) {
      yield frame(7, { i, farthest, last }, viz(i, 'done'), `farthest = ${farthest} ≥ ô cuối ${last} ⇒ true. Một lượt, O(1) bộ nhớ.`);
      return true;
    }
  }
  yield frame(9, { farthest }, viz(last, 'done'), 'Duyệt hết mảng ⇒ true.');
  return true;
}
