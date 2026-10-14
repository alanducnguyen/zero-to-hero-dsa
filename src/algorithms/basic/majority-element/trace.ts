import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  let candidate = nums[0];
  let count = 0;
  const viz = (i: number | undefined, hl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums', highlights: hl, pointers: i !== undefined ? [{ name: 'x', index: i }] : [] }),
      mapViz({ candidate: candidate ?? '–', count }, { count: count === 0 ? 'swap' : 'done' }, 'Ứng viên & bộ đếm (count = 0 ⇒ đổi ứng viên)'),
    ]);
  yield frame(8, { candidate, count }, viz(undefined), 'Bắt đầu: ứng viên là nums[0], count = 0. Ý tưởng: mỗi phần tử khác ứng viên "triệt tiêu" một phiếu của ứng viên.');
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (count === 0) {
      candidate = x;
      yield frame(10, { i, x, candidate, count }, viz(i, { [i]: 'active' }), `count = 0 ⇒ ứng viên cũ đã bị triệt tiêu hết, chọn ${x} làm ứng viên mới. Mọi phần tử trước đó đã cặp đôi triệt tiêu nhau nên có thể bỏ qua.`);
    }
    count += x === candidate ? 1 : -1;
    yield frame(11, { i, x, candidate, count }, viz(i, { [i]: x === candidate ? 'done' : 'swap' }), x === candidate ? `${x} = ứng viên ⇒ count = ${count}.` : `${x} ≠ ứng viên ${candidate} ⇒ triệt tiêu một phiếu, count = ${count}.`);
  }
  yield frame(13, { candidate, count }, viz(undefined, Object.fromEntries(nums.map((v, k) => [k, (v === candidate ? 'done' : 'muted') as Highlight]))), `Kết quả: ${candidate}. Phần tử > n/2 lần không thể bị triệt tiêu hết vì số phiếu của nó nhiều hơn tổng tất cả phần tử khác.`);
  return candidate;
}
