import { arr, composite, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const { nums, k } = input;
  const prefix = [0];
  for (const x of nums) prefix.push(prefix[prefix.length - 1] + x);
  const viz = (numHl: Record<number, Highlight>, preHl: Record<number, Highlight>) =>
    composite([arr(nums, { title: 'nums', highlights: numHl }), arr(prefix, { title: 'prefix (nhãn i = tổng i phần tử đầu)', highlights: preHl })]);
  yield frame(4, { prefix }, viz({}, {}), `Dựng prefix một lần O(n). prefix[0] = 0 là tiền tố rỗng – nhờ nó các mảng con bắt đầu từ chỉ số 0 cũng được đếm.`);
  let count = 0;
  for (let j = 1; j < prefix.length; j++) {
    for (let i = 0; i < j; i++) {
      const diff = prefix[j] - prefix[i];
      const ok = diff === k;
      if (ok) count++;
      yield frame(8, { i, j, 'prefix[j]': prefix[j], 'prefix[i]': prefix[i], diff, k, count }, viz(hlRange(i, j - 1, ok ? 'done' : 'range'), { [i]: 'pointer', [j]: ok ? 'done' : 'compare' }),
        ok ? `${prefix[j]} − ${prefix[i]} = ${k} ⇒ nums[${i}..${j - 1}] có tổng k, count = ${count}.` : `${prefix[j]} − ${prefix[i]} = ${diff} ≠ ${k}. Tổng mỗi mảng con giờ là O(1), nhưng vẫn duyệt O(n²) cặp. Để ý: với j cố định ta chỉ đang hỏi "có bao nhiêu i có prefix[i] = prefix[j] − k?" – đó là câu hỏi đếm tần suất.`);
    }
  }
  yield frame(11, { count }, viz({}, {}), `Kết quả ${count}. Chậm như cách cộng dồn mà tốn thêm O(n) bộ nhớ – giá trị của nó là dẫn tới nhận xét để dùng HashMap.`);
  return count;
}
