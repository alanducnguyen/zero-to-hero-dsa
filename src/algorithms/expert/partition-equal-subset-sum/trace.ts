import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = [...(input.nums ?? [])];
  const numsViz = (k: number | null, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    if (k !== null) {
      for (let i = 0; i < k; i++) h[i] = 'visited';
      h[k] = 'active';
    }
    return arr(nums, { title: 'nums (tím = số đang xét, xám = đã xét)', highlights: { ...h, ...extra } });
  };

  let total = 0;
  for (const x of nums) total += x;
  yield frame(10, { total }, numsViz(null), `Tổng = ${total}. Hai tập bằng nhau thì mỗi tập phải có tổng đúng total / 2 ⇒ bài toán quy về: có tập con nào tổng = total / 2 không?`);
  if (total % 2 !== 0) {
    yield frame(11, { total, result: false }, numsViz(null), `Tổng ${total} lẻ ⇒ không thể chia thành hai phần nguyên bằng nhau. Trả về false ngay, khỏi cần DP.`);
    return false;
  }
  const target = total / 2;
  const dp: boolean[] = new Array<boolean>(target + 1).fill(false);
  dp[0] = true;
  const dpViz = (hlj: Record<number, Highlight> = {}, pointers: Pointer[] = []) => {
    const h: Record<number, Highlight> = {};
    dp.forEach((v, j) => { if (v) h[j] = 'done'; });
    return arr(dp.map((v) => (v ? 'T' : 'F')), { title: `dp[j]: chọn được tập con tổng j? (j = 0..${target}, xanh = true)`, highlights: { ...h, ...hlj }, pointers });
  };
  const viz = (k: number | null, hlj: Record<number, Highlight> = {}, pointers: Pointer[] = []) => composite([numsViz(k), dpViz(hlj, pointers)]);

  yield frame(14, { target }, viz(null, { 0: 'done' }),
    `target = ${target}. dp[0] = true vì tập rỗng có tổng 0; mọi dp[j > 0] ban đầu false (chưa chọn số nào). Mảng 1 chiều thay cho bảng 2 chiều n × (target+1).`);

  for (let k = 0; k < nums.length; k++) {
    const num = nums[k];
    yield frame(15, { num, target }, viz(k),
      num > target
        ? `Xét num = ${num} > target = ${target}: không thể nằm trong tập có tổng ${target}, vòng j không chạy.`
        : `Xét num = ${num}. Với mỗi tổng j, ta có thêm lựa chọn: lấy num nếu tổng j − ${num} đã đạt được bằng các số TRƯỚC. Duyệt j từ ${target} giảm về ${num}.`);
    for (let j = target; j >= num; j--) {
      const prev = dp[j - num];
      const before = dp[j];
      if (prev) dp[j] = true;
      const pointers: Pointer[] = j - num === j ? [{ name: 'j', index: j }] : [{ name: 'j', index: j }, { name: 'j-num', index: j - num }];
      const hlj: Record<number, Highlight> = { [j - num]: 'pointer', [j]: prev && !before ? 'swap' : 'compare' };
      yield frame(18, { num, j, 'j-num': j - num, 'dp[j-num]': prev, 'dp[j]': dp[j] }, viz(k, hlj, pointers),
        prev
          ? before
            ? `dp[${j}] đã true từ trước (không cần num). Giữ nguyên.`
            : `dp[${j - num}] = true ⇒ lấy thêm ${num} được tổng ${j}. dp[${j}] = true. Vì j đi GIẢM, ô dp[${j - num}] bên trái chưa bị cập nhật trong lượt này nên nó vẫn phản ánh các số trước ⇒ ${num} chỉ được dùng 1 lần.`
          : `dp[${j - num}] = false ⇒ không thể đạt tổng ${j} bằng cách thêm ${num}. dp[${j}] giữ ${before ? 'true' : 'false'}.${j === target ? ' (Nếu duyệt j TĂNG dần, ô j − num có thể vừa được bật bởi chính num ⇒ dùng num 2 lần, sai với 0/1 knapsack.)' : ''}`);
    }
    if (dp[target]) {
      yield frame(20, { num, result: true }, viz(k, { [target]: 'done' }),
        `dp[${target}] = true ⇒ đã tìm được tập con tổng ${target}; phần còn lại cũng có tổng ${target}. Dừng sớm, trả về true.`);
      return true;
    }
  }
  yield frame(22, { result: dp[target] }, viz(null, { [target]: dp[target] ? 'done' : 'swap' }),
    dp[target]
      ? `Hết các số, dp[${target}] = true ⇒ trả về true.`
      : `Đã xét hết mọi số mà dp[${target}] vẫn false ⇒ không có tập con tổng ${target}. Trả về false.`);
  return dp[target];
}
