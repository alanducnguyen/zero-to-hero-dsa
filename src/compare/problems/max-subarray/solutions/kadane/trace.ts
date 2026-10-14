import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  let cur = nums[0];
  let best = nums[0];
  let start = 0, bs = 0, be = 0;
  yield frame(3, { cur, best }, arr(nums, { mode: 'bars', highlights: { 0: 'done' } }), `Khởi tạo bằng nums[0] = ${nums[0]} (không dùng 0 để mảng toàn âm vẫn đúng).`);
  for (let i = 1; i < nums.length; i++) {
    const extend = cur + nums[i];
    const restart = extend < nums[i];
    cur = Math.max(nums[i], extend);
    if (restart) start = i;
    yield frame(6, { i, 'nums[i]': nums[i], 'cur + nums[i]': extend, cur }, arr(nums, { mode: 'bars', highlights: { [i]: restart ? 'swap' : 'compare' }, ranges: [{ from: start, to: i, label: `cur = ${cur}`, color: 'range' }, { from: bs, to: be, label: `best = ${best}`, color: 'done' }] }), restart ? `cur + nums[i] = ${extend} < nums[i] ⇒ đoạn cũ chỉ kéo tổng xuống, bắt đầu lại từ ${i}.` : `Kéo dài đoạn: cur = ${extend} ≥ nums[i] = ${nums[i]}.`);
    if (cur > best) { best = cur; bs = start; be = i; }
    yield frame(7, { i, cur, best }, arr(nums, { mode: 'bars', ranges: [{ from: start, to: i, label: `cur = ${cur}`, color: 'range' }, { from: bs, to: be, label: `best = ${best}`, color: 'done' }] }), `best = max(best, cur) = ${best}.`);
  }
  yield frame(9, { best }, arr(nums, { mode: 'bars', ranges: [{ from: bs, to: be, label: `best = ${best}`, color: 'done' }] }), `Kết quả ${best}. Một lượt, hai biến.`);
  return best;
}
