import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[]> {
  const { nums } = input;
  const n = nums.length;
  const answer: (number | string)[] = new Array(n).fill('?');
  let mults = 0;
  const viz = (i: number, j: number) =>
    composite([
      arr(nums, { title: 'nums', highlights: { [i]: 'muted', ...(j >= 0 && j !== i ? { [j]: 'compare' } : {}) }, pointers: [{ name: 'i', index: i }, ...(j >= 0 ? [{ name: 'j', index: j }] : [])] }),
      arr(answer, { title: 'answer', highlights: { [i]: 'active' } }),
    ]);
  for (let i = 0; i < n; i++) {
    let p = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        p *= nums[j];
        mults++;
      }
      yield frame(8, { i, j, p, 'số phép nhân': mults }, viz(i, j), j === i ? `j = i = ${i} ⇒ bỏ qua chính nó.` : `p ×= nums[${j}] = ${nums[j]} ⇒ p = ${p}. Mỗi answer[i] tính lại từ đầu, không tái dùng gì từ answer[i−1].`);
    }
    answer[i] = p;
    yield frame(10, { i, p }, viz(i, -1), `answer[${i}] = ${p}. Đã tốn ${mults} phép nhân; tổng cộng sẽ là n(n−1) = ${n * (n - 1)} ⇒ O(n²).`);
  }
  yield frame(12, { answer }, composite([arr(nums, { title: 'nums' }), arr(answer, { title: 'answer' })]), `Xong sau ${mults} phép nhân. Với n = 10⁵ là 10¹⁰ phép – quá chậm.`);
  return answer as number[];
}
