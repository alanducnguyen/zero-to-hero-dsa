import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[]> {
  const { nums } = input;
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);
  let suffix = 1;
  const viz = (title: string, numsHl: Record<number, Highlight> = {}, ansHl: Record<number, Highlight> = {}, i = -1) =>
    composite([
      arr(nums, { title: `nums · suffix = ${suffix}`, highlights: numsHl, pointers: i >= 0 ? [{ name: 'i', index: i }] : [] }),
      arr(answer, { title, highlights: ansHl }),
    ]);
  yield frame(4, { n }, viz('answer (khởi tạo 1)'), 'Dùng chính mảng output để chứa prefix – đề cho phép không tính output vào bộ nhớ phụ.');
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
    yield frame(5, { i, 'answer[i]': answer[i] }, viz('answer = tích bên trái (lượt 1)', { [i - 1]: 'compare' }, { [i - 1]: 'visited', [i]: 'swap' }, i),
      `answer[${i}] = answer[${i - 1}] × nums[${i - 1}] = ${answer[i]} – giống hệt mảng prefix nhưng không cấp phát thêm.`);
  }
  for (let i = n - 1; i >= 0; i--) {
    const left = answer[i];
    answer[i] *= suffix;
    yield frame(8, { i, 'tích trái': left, suffix, 'answer[i]': answer[i] }, viz('answer (lượt 2: × tích bên phải)', { [i]: 'muted' }, { [i]: 'done' }, i),
      `answer[${i}] = ${left} (trái) × ${suffix} (phải) = ${answer[i]}. suffix chỉ là một số vì lượt ngược chỉ cần tích của phần đã đi qua.`);
    suffix *= nums[i];
    yield frame(9, { i, suffix }, viz('answer (lượt 2: × tích bên phải)', { [i]: 'compare' }, {}, i),
      `suffix ×= nums[${i}] ⇒ ${suffix}. Nhân SAU khi dùng: nếu nhân trước, answer[${i}] sẽ chứa cả nums[${i}].`);
  }
  yield frame(11, { answer }, viz('answer'), 'Xong: hai lượt O(n), bộ nhớ phụ O(1) (chỉ biến suffix), không dùng phép chia ⇒ đáp án tối ưu.');
  return answer;
}
