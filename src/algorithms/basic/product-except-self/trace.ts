import { arr, composite, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[]> {
  const nums = input.nums;
  const n = nums.length;
  const answer: number[] = new Array<number>(n).fill(1);
  const viz = (i: number | undefined, numsHl: Record<number, Highlight> = {}, ansHl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums', highlights: numsHl, pointers: i !== undefined && i >= 0 && i < n ? [{ name: 'i', index: i }] : [] }),
      arr(answer, { title: 'answer (lượt 1: prefix · lượt 2: prefix × suffix)', highlights: ansHl, pointers: i !== undefined && i >= 0 && i < n ? [{ name: 'i', index: i }] : [] }),
    ]);

  yield frame(9, { n, answer: [...answer] }, viz(undefined), 'Khởi tạo answer toàn 1 – phần tử đơn vị của phép nhân. Mảng output không tính vào bộ nhớ phụ nên ta tận dụng nó để lưu prefix.');
  let prefix = 1;
  yield frame(10, { prefix }, viz(undefined), 'prefix = 1 = tích của 0 phần tử (tích rỗng). Bên trái nums[0] không có gì nên answer[0] phải bắt đầu từ 1.');
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    yield frame(12, { i, prefix, 'answer[i]': answer[i] }, viz(i, i > 0 ? hlRange(0, i - 1, 'range', { [i]: 'active' }) : { [i]: 'active' }, { [i]: 'swap' }),
      `answer[${i}] = prefix = ${prefix} = ${i > 0 ? `tích nums[0..${i - 1}] (cyan)` : 'tích rỗng (chưa có gì bên trái)'}. Ghi TRƯỚC khi nhân nums[${i}] vì answer[${i}] không được chứa chính nums[${i}].`);
    prefix *= nums[i];
    yield frame(13, { i, 'nums[i]': nums[i], prefix }, viz(i, hlRange(0, i, 'range'), { [i]: 'done' }),
      `prefix *= ${nums[i]} ⇒ ${prefix}: giờ prefix là tích nums[0..${i}], sẵn sàng cho ô kế tiếp.`);
  }
  let suffix = 1;
  yield frame(15, { suffix, answer: [...answer] }, viz(undefined), 'Lượt 1 xong: answer[i] = tích bên trái. Giờ đi ngược với suffix = 1 (tích rỗng bên phải phần tử cuối) để nhân nốt phần bên phải.');
  for (let i = n - 1; i >= 0; i--) {
    const left = answer[i];
    answer[i] = answer[i] * suffix + 0;
    const numsHl: Record<number, Highlight> = { [i]: 'active' };
    for (let j = i + 1; j < n; j++) numsHl[j] = 'compare';
    for (let j = 0; j < i; j++) numsHl[j] = 'range';
    yield frame(17, { i, 'trái (answer[i] cũ)': left, suffix, 'answer[i]': answer[i] }, viz(i, numsHl, { [i]: 'done' }),
      `answer[${i}] = ${left} (tích bên trái${i > 0 ? ', cyan' : ' – rỗng'}) × ${suffix} (tích bên phải${i < n - 1 ? ', vàng' : ' – rỗng'}) = ${answer[i]}. Đủ mọi phần tử trừ nums[${i}] (tím).`);
    suffix *= nums[i];
    yield frame(18, { i, 'nums[i]': nums[i], suffix }, viz(i, hlRange(i, n - 1, 'compare')),
      `suffix *= ${nums[i]} ⇒ ${suffix}: tích nums[${i}..${n - 1}], đúng phần "bên phải" cho ô i−1 ở vòng sau.`);
  }
  yield frame(20, { answer: [...answer] }, viz(undefined, {}, hlRange(0, n - 1, 'done')),
    'Hoàn tất với 2 lượt O(n), chỉ 2 biến phụ (prefix, suffix) và không phép chia ⇒ không lo chia cho 0.');
  return answer;
}
