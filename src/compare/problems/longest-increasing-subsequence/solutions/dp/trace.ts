import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const { nums } = input;
  const dp = new Array<number>(nums.length).fill(1);
  let best = 0;
  const viz = (i: number, j?: number, dpHl: Record<number, Highlight> = {}) =>
    composite([
      arr(nums, { title: 'nums', highlights: j !== undefined ? { [j]: 'compare', [i]: 'active' } : i < nums.length ? { [i]: 'active' } : {}, pointers: [...(i < nums.length ? [{ name: 'i', index: i }] : []), ...(j !== undefined ? [{ name: 'j', index: j }] : [])] }),
      arr(dp, { title: 'dp[i] = LIS kết thúc tại i', highlights: dpHl }),
    ]);
  yield frame(3, { n: nums.length }, viz(nums.length), 'Mọi dp[i] = 1: một phần tử tự nó là dãy tăng. Định nghĩa "kết thúc đúng tại i" giúp biết phần tử cuối để so sánh khi nối.');
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      const ok = nums[j] < nums[i];
      const better = ok && dp[j] + 1 > dp[i];
      if (better) dp[i] = dp[j] + 1;
      yield frame(7, { i, j, 'nums[j]': nums[j], 'nums[i]': nums[i], 'dp[j]': dp[j], 'dp[i]': dp[i] }, viz(i, j, { [j]: 'compare', [i]: better ? 'swap' : 'active' }),
        !ok ? `${nums[j]} ≥ ${nums[i]} ⇒ không nối ${nums[i]} sau dãy kết thúc tại ${j} được (phải tăng ngặt).`
          : better ? `${nums[j]} < ${nums[i]}: nối vào dãy dài ${dp[j]} kết thúc tại ${j} ⇒ dp[${i}] = ${dp[i]}.` : `${nums[j]} < ${nums[i]} nhưng dp[${j}] + 1 = ${dp[j] + 1} không hơn ${dp[i]} hiện có.`);
    }
    best = Math.max(best, dp[i]);
    yield frame(9, { i, 'dp[i]': dp[i], best }, viz(i, undefined, { [i]: 'done' }), `Chốt dp[${i}] = ${dp[i]} sau khi xét mọi j < ${i}. LIS có thể kết thúc ở bất kỳ đâu nên lấy max ⇒ best = ${best}.`);
  }
  yield frame(11, { result: best }, viz(nums.length), `LIS = ${best}. O(n²) vì mỗi i quét lại mọi j < i – nhưng đổi lại dễ truy vết dãy thật bằng mảng cha.`);
  return best;
}
