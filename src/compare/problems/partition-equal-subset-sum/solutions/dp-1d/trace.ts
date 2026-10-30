import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const total = nums.reduce((a, b) => a + b, 0);
  yield frame(3, { total }, arr(nums, { title: 'nums' }), `Tổng = ${total}. Cần tập con tổng total/2.`);
  if (total % 2 !== 0) {
    yield frame(4, { total, result: false }, arr(nums, { title: 'nums' }), 'Tổng lẻ ⇒ false ngay.');
    return false;
  }
  const target = total / 2;
  const dp = new Array<boolean>(target + 1).fill(false);
  dp[0] = true;
  const viz = (k: number, hl: Record<number, Highlight> = {}, ptr: Pointer[] = []) => {
    const h: Record<number, Highlight> = {};
    dp.forEach((v, j) => { if (v) h[j] = 'done'; });
    const nh: Record<number, Highlight> = {};
    for (let t = 0; t < k; t++) nh[t] = 'visited';
    if (k >= 0 && k < nums.length) nh[k] = 'active';
    return composite([
      arr(nums, { title: 'nums (tím = đang xét)', highlights: nh }),
      arr(dp.map((v) => (v ? 'T' : 'F')), { title: `dp[j]: đạt được tổng j? (j = 0..${target})`, highlights: { ...h, ...hl }, pointers: ptr }),
    ]);
  };
  yield frame(7, { target }, viz(-1), `Chỉ giữ MỘT hàng của bảng 2 chiều: dp[0] = true (tập rỗng).`);
  for (let k = 0; k < nums.length; k++) {
    const num = nums[k];
    for (let j = target; j >= num; j--) {
      const before = dp[j];
      if (dp[j - num]) dp[j] = true;
      yield frame(10, { num, j, 'dp[j-num]': dp[j - num], 'dp[j]': dp[j] }, viz(k, { [j - num]: 'pointer', [j]: dp[j] && !before ? 'swap' : 'compare' }, [{ name: 'j', index: j }]),
        dp[j] && !before ? `dp[${j - num}] = true ⇒ bật dp[${j}]. Vì j đi GIẢM, ô ${j - num} bên trái chưa bị ${num} cập nhật trong lượt này ⇒ ${num} chỉ dùng 1 lần.` : before ? `dp[${j}] đã true từ trước, giữ nguyên.` : `dp[${j - num}] = false ⇒ thêm ${num} không đạt ${j}.`);
    }
    if (dp[target]) {
      yield frame(12, { num, result: true }, viz(k, { [target]: 'done' }), `dp[${target}] = true ⇒ dừng sớm, khỏi xét các số còn lại.`);
      return true;
    }
  }
  yield frame(14, { result: dp[target] }, viz(nums.length, { [target]: 'swap' }), `Xét hết mà dp[${target}] = false ⇒ không chia được. Bộ nhớ chỉ O(S).`);
  return dp[target];
}
