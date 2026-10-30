import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const { nums, k } = input;
  const res: number[] = [];
  let ops = 0;
  const viz = (i: number, j?: number, bestIdx?: number) => {
    const hls: Record<number, Highlight> = {};
    if (bestIdx !== undefined) hls[bestIdx] = 'done';
    if (j !== undefined) hls[j] = 'compare';
    return composite([
      arr(nums, { title: 'nums', highlights: hls, ranges: i + k <= nums.length ? [{ from: i, to: i + k - 1, label: `cửa sổ ${i}`, color: 'range' }] : [], pointers: j !== undefined ? [{ name: 'j', index: j }] : [] }),
      arr(res, { title: 'res' }),
    ]);
  };
  for (let i = 0; i + k <= nums.length; i++) {
    let best = nums[i];
    let bestIdx = i;
    yield frame(5, { i, best, k }, viz(i, undefined, bestIdx), `Cửa sổ mới [${i}..${i + k - 1}]: bắt đầu lại từ đầu với best = nums[${i}] = ${best}. Mọi thông tin từ cửa sổ trước bị vứt bỏ – đó là chỗ lãng phí.`);
    for (let j = i + 1; j < i + k; j++) {
      ops++;
      const bigger = nums[j] > best;
      yield frame(7, { i, j, 'nums[j]': nums[j], best, 'số phép so sánh': ops }, viz(i, j, bestIdx),
        bigger ? `${nums[j]} > ${best} ⇒ cập nhật best.` : `${nums[j]} ≤ ${best} ⇒ giữ nguyên. Hai cửa sổ liền nhau chung k−1 phần tử nhưng ta vẫn so lại hết.`);
      if (bigger) { best = nums[j]; bestIdx = j; }
    }
    res.push(best);
    yield frame(9, { i, best, res }, viz(i, undefined, bestIdx), `max cửa sổ ${i} = ${best}. Mỗi cửa sổ tốn k−1 = ${k - 1} phép so sánh ⇒ tổng (n−k+1)(k−1).`);
  }
  yield frame(11, { res, 'số phép so sánh': ops }, arr(res, { title: 'res' }), `Xong sau ${ops} phép so sánh – O(n·k). Với n = 10⁵, k = 5·10⁴ là ~2.5·10⁹ phép, quá chậm.`);
  return res;
}
