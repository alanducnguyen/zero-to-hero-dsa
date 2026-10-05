import { arr, composite, frame, hl, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = input.nums;
  const n = nums.length;
  const dp: (number | null)[] = new Array(n + 1).fill(null);
  const choice: ('take' | 'skip' | null)[] = new Array(n + 1).fill(null);
  const viz = (houseHl: Record<number, Highlight> = {}, dpHl: Record<string, Highlight> = {}) =>
    composite([
      arr(nums, { mode: 'bars', title: 'nums – tiền ở mỗi nhà', highlights: houseHl }),
      matrix([dp], { title: 'dp[i] = max tiền từ i nhà đầu tiên', colLabels: Array.from({ length: n + 1 }, (_, i) => `i=${i}`), highlights: dpHl }),
    ]);
  if (n === 0) {
    yield frame(10, { n, result: 0 }, viz(), 'Không có nhà ⇒ 0.');
    return 0;
  }
  dp[0] = 0;
  dp[1] = nums[0];
  yield frame(12, { 'dp[0]': 0, 'dp[1]': nums[0] }, viz(hl([0, 'done']), { '0,0': 'done', '0,1': 'done' }), `Cơ sở: dp[0] = 0 (không nhà), dp[1] = ${nums[0]} (một nhà thì lấy luôn).`);
  for (let i = 2; i <= n; i++) {
    const skip = dp[i - 1]!;
    const take = dp[i - 2]! + nums[i - 1];
    yield frame(14, { i, skip, 'dp[i-1]': dp[i - 1] }, viz(hl([i - 1, 'compare']), { [`0,${i - 1}`]: 'compare', [`0,${i}`]: 'active' }), `Xét nhà thứ ${i} (nums[${i - 1}] = ${nums[i - 1]}). Lựa chọn 1 – BỎ nhà này: giữ nguyên dp[${i - 1}] = ${skip}.`);
    yield frame(15, { i, take, 'dp[i-2]': dp[i - 2], 'nums[i-1]': nums[i - 1] }, viz({ [i - 1]: 'active', ...(i - 3 >= 0 ? {} : {}) }, { [`0,${i - 2}`]: 'compare', [`0,${i}`]: 'active' }), `Lựa chọn 2 – LẤY nhà này: không được lấy nhà kề trước nên cộng với dp[${i - 2}]: ${dp[i - 2]} + ${nums[i - 1]} = ${take}.`);
    dp[i] = Math.max(skip, take);
    choice[i] = take > skip ? 'take' : 'skip';
    yield frame(16, { i, skip, take, 'dp[i]': dp[i] }, viz(hl([i - 1, take > skip ? 'done' : 'muted']), { [`0,${i}`]: 'swap' }), `dp[${i}] = max(${skip}, ${take}) = ${dp[i]} ⇒ ${take > skip ? 'lấy' : 'bỏ'} nhà thứ ${i}.`);
  }
  // truy vết để tô các nhà được chọn
  const chosen: Record<number, Highlight> = {};
  for (let i = n; i >= 1; ) {
    if (i === 1) { chosen[0] = 'done'; break; }
    if (choice[i] === 'take') { chosen[i - 1] = 'done'; i -= 2; } else i -= 1;
  }
  yield frame(18, { result: dp[n] }, viz(chosen, { [`0,${n}`]: 'done' }), `Kết quả dp[${n}] = ${dp[n]}. Các nhà màu xanh là một cách chọn đạt tối đa (truy vết ngược từ dp). Chỉ cần 2 giá trị trước ⇒ có thể giảm bộ nhớ về O(1).`);
  return dp[n]!;
}
