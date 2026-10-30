import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  let prev = 0, cur = 0;
  const viz = (i?: number, done = false) =>
    composite([
      arr(nums, { title: 'nums', highlights: i !== undefined ? { [i]: 'active' } : {} }),
      mapViz({ prev, cur }, done ? { cur: 'done' } : i !== undefined ? { cur: 'swap' } : {}, 'Chỉ giữ 2 biến'),
    ]);
  yield frame(4, { prev, cur }, viz(), 'prev = tốt nhất đến 2 nhà trước, cur = tốt nhất đến nhà trước. Ban đầu chưa có nhà nào ⇒ cả hai = 0.');
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const take = prev + x;
    [prev, cur] = [cur, Math.max(cur, take)];
    yield frame(6, { i, x, 'bỏ': prev, 'cướp (prev+x)': take, prev, cur }, viz(i),
      `Nhà ${i} (${x}): bỏ ⇒ giữ ${prev}; cướp ⇒ prev cũ + ${x} = ${take}. cur = ${cur}. Trượt cửa sổ: prev ← cur cũ.`);
  }
  yield frame(8, { result: cur }, viz(undefined, true), `Đáp án ${cur}. Cùng công thức với mảng dp nhưng O(1) bộ nhớ, không đệ quy, không cấp phát.`);
  return cur;
}
