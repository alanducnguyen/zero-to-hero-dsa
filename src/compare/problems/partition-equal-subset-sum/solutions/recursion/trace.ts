import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const total = nums.reduce((a, b) => a + b, 0);
  const taken = nums.map(() => false);
  const path: string[] = [];
  let calls = 0;
  const viz = (i: number) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < Math.min(i, nums.length); k++) h[k] = taken[k] ? 'done' : 'visited';
    if (i >= 0 && i < nums.length) h[i] = 'active';
    return composite([
      arr(nums, { title: 'nums (xanh = đã lấy, xám = đã bỏ, tím = đang quyết định)', highlights: h, pointers: i >= 0 && i < nums.length ? [{ name: 'i', index: i }] : [] }),
      stack([...path], undefined, 'call stack go(i, rem)'),
    ]);
  };
  yield frame(3, { total }, viz(-1), `Tổng = ${total}. Hai tập bằng nhau ⇔ có tập con tổng đúng total/2 – bài quy về subset sum.`);
  if (total % 2 !== 0) {
    yield frame(4, { total, result: false }, viz(-1), `Tổng ${total} lẻ ⇒ không thể chia đôi thành hai số nguyên. Trả false ngay.`);
    return false;
  }
  function* go(i: number, rem: number): Generator<Frame, boolean> {
    calls++;
    path.push(`go(${i}, ${rem})`);
    let r: boolean;
    if (rem === 0) {
      yield frame(6, { i, rem, 'số lời gọi': calls }, viz(i), `rem = 0 ⇒ các số đã lấy (xanh) có tổng đúng ${total / 2}. Trả true, phép || phía trên sẽ ngắt mạch toàn bộ.`);
      r = true;
    } else if (i === nums.length || rem < 0) {
      yield frame(7, { i, rem, 'số lời gọi': calls }, viz(i), rem < 0 ? `rem = ${rem} < 0 ⇒ đã lấy quá tay, nhánh này chết.` : `Hết số mà vẫn thiếu ${rem} ⇒ nhánh thất bại, quay lui.`);
      r = false;
    } else {
      yield frame(8, { i, 'nums[i]': nums[i], rem, 'số lời gọi': calls }, viz(i), `Thử LẤY ${nums[i]} trước (còn thiếu ${rem - nums[i]}). Mỗi số có 2 lựa chọn ⇒ cây có tới 2ⁿ = ${2 ** nums.length} lá; cùng (i, rem) có thể bị giải lại nhiều lần.`);
      taken[i] = true;
      r = yield* go(i + 1, rem - nums[i]);
      taken[i] = false;
      if (!r) {
        yield frame(8, { i, 'nums[i]': nums[i], rem, 'số lời gọi': calls }, viz(i), `Lấy ${nums[i]} không thành ⇒ thử BỎ ${nums[i]}, vẫn còn thiếu ${rem}.`);
        r = yield* go(i + 1, rem);
      }
    }
    path.pop();
    return r;
  }
  const res = yield* go(0, total / 2);
  yield frame(10, { result: res, 'số lời gọi': calls }, viz(-1), `Kết quả ${res} sau ${calls} lời gọi. Không nhớ gì giữa các nhánh nên chi phí là hàm mũ theo n.`);
  return res;
}
