import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { countPhase, freqViz, type TkInput } from '../../count';

export function* trace(input: TkInput): Generator<Frame, number[]> {
  const { nums, k } = input;
  const freq = new Map<number, number>();
  yield* countPhase(nums, freq);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  const result: number[] = [];
  const viz = (hl: Record<number, Highlight> = {}, mapHl: Record<string, Highlight> = {}) =>
    composite([
      freqViz(freq, mapHl),
      arr(buckets.map((b, c) => `${c}: ${b.length ? b.join(',') : '·'}`), { title: 'buckets[count] = các giá trị', highlights: hl }),
      arr(result.length ? result : ['—'], { title: `result (cần k = ${k})` }),
    ]);
  yield frame(5, { buckets: buckets.length }, viz(), `Mấu chốt: count chỉ nằm trong [1, n = ${nums.length}] ⇒ dùng count làm CHỈ SỐ mảng, không cần so sánh. Cấp n + 1 bucket.`);
  for (const [value, count] of freq) {
    buckets[count].push(value);
    yield frame(6, { value, count }, viz({ [count]: 'swap' }, { [String(value)]: 'active' }), `Bỏ ${value} vào buckets[${count}] – O(1), không cần sort.`);
  }
  for (let c = nums.length; c >= 1 && result.length < k; c--) {
    if (buckets[c].length === 0) {
      yield frame(8, { c, 'result.length': result.length }, viz({ [c]: 'visited' }), `buckets[${c}] rỗng – bỏ qua. Quét tối đa n bucket nên vẫn O(n).`);
      continue;
    }
    for (const value of buckets[c]) {
      if (result.length === k) break;
      result.push(value);
      yield frame(11, { c, value, result: [...result] }, viz({ [c]: 'done' }, { [String(value)]: 'done' }), `Đi từ count lớn xuống ⇒ ${value} (×${c}) là giá trị phổ biến tiếp theo. Lấy vào result (${result.length}/${k}).`);
    }
  }
  yield frame(14, { result }, viz(), `Đủ k = ${k} ⇒ dừng sớm. Tổng O(n) thời gian, O(n) bộ nhớ – nhanh nhất về độ phức tạp, nhưng cần biết hết dữ liệu trước (không hợp luồng).`);
  return result;
}
