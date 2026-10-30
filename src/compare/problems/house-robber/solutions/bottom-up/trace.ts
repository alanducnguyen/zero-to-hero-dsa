import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  const n = nums.length;
  const dp = new Array<number>(n + 1).fill(0);
  const viz = (dpHl: Record<number, Highlight> = {}, numHl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums (nhãn = chỉ số nhà)', highlights: numHl }),
      arr(dp, { title: 'dp[i] = tốt nhất với i nhà đầu', highlights: dpHl }),
    ]);
  yield frame(4, { n }, viz({ 0: 'done' }), 'dp có n+1 ô: dp[0] = 0 (chưa có nhà) giúp công thức không cần if cho i = 1, 2.');
  if (n > 0) {
    dp[1] = nums[0];
    yield frame(5, { 'dp[1]': dp[1] }, viz({ 1: 'done' }, { 0: 'pointer' }), `Chỉ có 1 nhà ⇒ cướp luôn: dp[1] = ${dp[1]}.`);
  }
  for (let i = 2; i <= n; i++) {
    const skip = dp[i - 1];
    const take = dp[i - 2] + nums[i - 1];
    dp[i] = Math.max(skip, take);
    yield frame(7, { i, 'bỏ (dp[i-1])': skip, 'cướp (dp[i-2]+nums[i-1])': take, 'dp[i]': dp[i] }, viz({ [i - 1]: 'compare', [i - 2]: 'compare', [i]: 'swap' }, { [i - 1]: 'active' }),
      `Nhà ${i - 1}: bỏ ⇒ giữ dp[${i - 1}] = ${skip}; cướp ⇒ dp[${i - 2}] + ${nums[i - 1]} = ${take} (nhà ${i - 2} phải bỏ). Chọn ${dp[i]}. Mọi giá trị cần dùng đã có sẵn ⇒ không đệ quy.`);
  }
  yield frame(9, { result: dp[n] }, viz({ [n]: 'done' }), `Đáp án dp[${n}] = ${dp[n]}. Để ý mỗi bước chỉ đọc 2 ô ngay trước ⇒ có thể bỏ mảng, chỉ giữ 2 biến.`);
  return dp[n];
}
