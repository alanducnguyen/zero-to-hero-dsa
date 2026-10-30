import { arr, composite, frame, queue } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const { nums, k } = input;
  const dq: number[] = [];
  let head = 0;
  const res: number[] = [];
  const viz = (i: number, hl: Record<number, Highlight> = {}, qhl: Record<number, Highlight> = {}): VisualState => {
    const hls: Record<number, Highlight> = {};
    for (let p = 0; p < Math.max(0, i - k + 1); p++) hls[p] = 'visited';
    for (let p = head; p < dq.length; p++) hls[dq[p]] = 'pointer';
    return composite([
      arr(nums, { title: 'nums (xanh dương = chỉ số đang nằm trong deque)', highlights: { ...hls, ...hl }, ranges: [{ from: Math.max(0, i - k + 1), to: i, label: 'cửa sổ', color: 'range' }], pointers: [{ name: 'i', index: i }] }),
      queue(dq.slice(head).map((j) => `${nums[j]}@${j}`), qhl, 'deque: giá trị@chỉ số, giảm dần từ đầu'),
      arr(res, { title: 'res' }),
    ]);
  };
  for (let i = 0; i < nums.length; i++) {
    if (head < dq.length && dq[head] <= i - k) {
      yield frame(7, { i, 'dq[head]': dq[head], 'i − k': i - k }, viz(i, { [dq[head]]: 'swap' }, { 0: 'swap' }), `Đầu deque là chỉ số ${dq[head]} ≤ ${i - k} ⇒ đã rời cửa sổ, bỏ khỏi đầu. Mỗi bước chỉ có tối đa một phần tử rời đi.`);
      head++;
    }
    while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) {
      const j = dq[dq.length - 1];
      yield frame(8, { i, 'nums[i]': nums[i], 'cuối deque': `${nums[j]}@${j}` }, viz(i, { [j]: 'swap', [i]: 'compare' }, { [dq.length - 1 - head]: 'swap' }),
        `${nums[j]} ≤ ${nums[i]} và chỉ số ${j} < ${i} ⇒ ${nums[j]} rời cửa sổ trước mà lại không lớn hơn, nó không bao giờ là max nữa. Bỏ vĩnh viễn.`);
      dq.pop();
    }
    dq.push(i);
    yield frame(9, { i, 'nums[i]': nums[i], deque: dq.slice(head) }, viz(i, { [i]: 'active' }, { [dq.length - 1 - head]: 'active' }), `Đẩy ${nums[i]}@${i} vào cuối. Deque vẫn giảm dần ⇒ đầu deque là max cửa sổ.`);
    if (i >= k - 1) {
      res.push(nums[dq[head]]);
      yield frame(10, { i, max: nums[dq[head]], res }, viz(i, { [dq[head]]: 'done' }, { 0: 'done' }), `Cửa sổ [${i - k + 1}..${i}] đầy ⇒ max = đầu deque = ${nums[dq[head]]}, lấy O(1).`);
    }
  }
  yield frame(12, { res }, arr(res, { title: 'res' }), 'Xong. Mỗi chỉ số được push một lần và pop/bỏ đầu tối đa một lần ⇒ tổng O(n), không phụ thuộc k.');
  return res;
}
