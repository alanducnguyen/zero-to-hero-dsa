import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[]> {
  const { nums } = input;
  let product = 1;
  let zeros = 0;
  const answer: (number | string)[] = nums.map(() => '?');
  const viz = (k: number, hl: 'compare' | 'active') =>
    composite([
      arr(nums, { title: `nums · product (bỏ số 0) = ${product} · zeros = ${zeros}`, highlights: k >= 0 ? { [k]: hl } : {}, pointers: k >= 0 ? [{ name: 'i', index: k }] : [] }),
      arr(answer, { title: 'answer', highlights: k >= 0 && hl === 'active' ? { [k]: 'done' } : {} }),
    ]);
  for (let k = 0; k < nums.length; k++) {
    const x = nums[k];
    if (x === 0) zeros++;
    else product *= x;
    yield frame(x === 0 ? 6 : 7, { x, product, zeros }, viz(k, 'compare'),
      x === 0 ? `Gặp số 0 ⇒ KHÔNG nhân vào product (nếu nhân, product = 0 và mất thông tin cho vị trí của chính số 0). zeros = ${zeros}.` : `product ×= ${x} ⇒ ${product}. Chỉ một lượt O(n).`);
  }
  const out: number[] = [];
  for (let k = 0; k < nums.length; k++) {
    const x = nums[k];
    let v: number;
    let line: number;
    let note: string;
    if (zeros > 1) {
      v = 0; line = 10;
      note = `Có ${zeros} số 0 ⇒ bỏ nums[${k}] đi vẫn còn ít nhất một số 0 ⇒ 0.`;
    } else if (zeros === 1) {
      v = x === 0 ? product : 0; line = 11;
      note = x === 0 ? `nums[${k}] chính là số 0 duy nhất ⇒ answer = tích phần còn lại = ${product}.` : `Số 0 nằm ở vị trí khác ⇒ answer = 0. Nếu ngây thơ chia product/x với product = 0 thì vị trí số 0 thành 0/0 = NaN.`;
    } else {
      v = product / x; line = 12;
      note = `${product} / ${x} = ${v}. Ngắn gọn, nhưng đề cấm chia; ngoài ra với số thực, phép chia gây sai số làm tròn.`;
    }
    out.push(v);
    answer[k] = v;
    yield frame(line, { x, product, zeros, 'answer[i]': v }, viz(k, 'active'), note);
  }
  yield frame(9, { answer: out }, viz(-1, 'compare'), 'Xong: O(n) thời gian, O(1) phụ – tối ưu về độ phức tạp, nhưng vi phạm ràng buộc "không dùng phép chia" của đề.');
  return out;
}
