import { arr, composite, frame, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const nums = input.nums;
  const n = nums.length;
  const k = Math.max(1, Math.min(n || 1, Math.floor(input.k)));
  const out: number[] = [];
  const dq: number[] = [];
  let head = 0;
  const viz = (i: number, extra: Record<number, Highlight> = {}, dqHl?: Record<number, Highlight>) => {
    const h: Record<number, Highlight> = {};
    const lo = Math.max(0, i - k + 1);
    for (let j = lo; j <= i && j < n; j++) h[j] = 'range';
    for (let q = head; q < dq.length; q++) h[dq[q]] = 'active';
    return composite([
      arr(nums, { mode: 'bars', title: `nums, k = ${k}`, highlights: { ...h, ...extra }, pointers: i < n ? [{ name: 'i', index: i }] : [], ranges: i >= 0 && i < n ? [{ from: lo, to: i, label: 'cửa sổ' }] : [] }),
      composite([queueViz(dq.slice(head).map((j) => `${j}:${nums[j]}`), dqHl, 'Deque (idx:val) – giảm dần, đầu = max'), arr(out.length ? out : ['—'], { title: 'out (max mỗi cửa sổ)' })], 'row'),
    ]);
  };
  yield frame(7, { k, n }, viz(-1), 'Deque chứa chỉ số các "ứng viên max": giá trị giảm dần từ đầu tới cuối. Đầu deque luôn là max của cửa sổ hiện tại.');
  for (let i = 0; i < n; i++) {
    yield frame(9, { i, 'nums[i]': nums[i] }, viz(i, { [i]: 'compare' }), `Thêm nums[${i}] = ${nums[i]} vào cửa sổ.`);
    while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) {
      const victim = dq[dq.length - 1];
      yield frame(11, { i, tail: victim, 'nums[tail]': nums[victim] }, viz(i, { [i]: 'compare', [victim]: 'swap' }, { [dq.length - 1 - head]: 'swap' }), `Cuối deque (${victim}:${nums[victim]}) ≤ ${nums[i]} và nó vào sớm hơn ⇒ sẽ rời cửa sổ trước ${i} và không bao giờ lớn hơn ⇒ KHÔNG THỂ là max nữa ⇒ pop.`);
      dq.pop();
    }
    dq.push(i);
    yield frame(13, { i, deque: dq.slice(head) }, viz(i, {}, { [dq.length - 1 - head]: 'done' }), `Push ${i} vào cuối deque. Deque vẫn giảm dần.`);
    if (dq[head] <= i - k) {
      const old = dq[head];
      yield frame(14, { i, front: old, windowStart: i - k + 1 }, viz(i, { [old]: 'swap' }, { 0: 'swap' }), `Đầu deque (${old}) ≤ ${i} − ${k} ⇒ đã rời khỏi cửa sổ ⇒ bỏ đầu. (Tối đa 1 phần tử cần bỏ vì mỗi bước cửa sổ chỉ trượt 1.)`);
      head++;
    }
    if (i >= k - 1) {
      out.push(nums[dq[head]]);
      yield frame(15, { i, max: nums[dq[head]], out: [...out] }, viz(i, { [dq[head]]: 'done' }, { 0: 'done' }), `Cửa sổ [${i - k + 1}..${i}] đủ k ⇒ max = nums[${dq[head]}] = ${nums[dq[head]]} (đầu deque).`);
    }
  }
  yield frame(17, { result: [...out] }, viz(n), `Kết quả: [${out.join(', ')}]. Mỗi chỉ số push 1 lần, pop tối đa 1 lần ⇒ O(n) tổng cộng dù có vòng while.`);
  return out;
}
