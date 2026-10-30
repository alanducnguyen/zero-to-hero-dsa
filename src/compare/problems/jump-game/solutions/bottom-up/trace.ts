import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const n = nums.length;
  const good = new Array<boolean>(n).fill(false);
  good[n - 1] = true;
  let checks = 0;
  const viz = (i: number, j?: number, far?: number, hj: Highlight = 'compare') => {
    const hlG: Record<number, Highlight> = {};
    for (let k = i + 1; k < n; k++) hlG[k] = good[k] ? 'done' : 'muted';
    if (j !== undefined) hlG[j] = hj;
    if (i >= 0) hlG[i] = good[i] ? 'done' : 'active';
    return composite([
      arr(nums, { title: 'nums', highlights: i >= 0 ? { [i]: 'active' } : {}, pointers: i >= 0 ? [{ name: 'i', index: i }] : [], ranges: far !== undefined && far > i ? [{ from: i + 1, to: far, label: 'tầm nhảy của i', color: 'range' }] : [] }),
      arr(good.map((g) => (g ? 'T' : 'F')), { title: 'good[i]: từ i tới được ô cuối?', highlights: hlG, pointers: j !== undefined ? [{ name: 'j', index: j }] : [] }),
    ]);
  };
  yield frame(5, { n }, viz(n - 1), `good[${n - 1}] = true: đứng ở ô cuối là đã tới. Đi ngược vì good[i] chỉ phụ thuộc các ô sau i – đã tính xong.`);
  for (let i = n - 2; i >= 0; i--) {
    const far = Math.min(i + nums[i], n - 1);
    yield frame(7, { i, 'nums[i]': nums[i], far }, viz(i, undefined, far), nums[i] === 0 ? `nums[${i}] = 0 ⇒ không nhảy được đâu, good[${i}] giữ false.` : `Ô ${i} nhảy được tới các ô ${i + 1}..${far}. Chỉ cần MỘT ô trong đó tốt.`);
    for (let j = i + 1; j <= far; j++) {
      checks++;
      if (good[j]) {
        good[i] = true;
        yield frame(10, { i, j, 'good[j]': true, 'số lần kiểm tra': checks }, viz(i, j, far, 'done'), `good[${j}] = true ⇒ good[${i}] = true, dừng quét (break).`);
        break;
      }
      yield frame(9, { i, j, 'good[j]': false, 'số lần kiểm tra': checks }, viz(i, j, far), `good[${j}] = false ⇒ thử ô kế. Quét cả tầm nhảy là lý do worst case O(n²).`);
    }
  }
  yield frame(15, { 'good[0]': good[0], 'số lần kiểm tra': checks }, viz(0), `good[0] = ${good[0]}. Nhận xét: luôn chỉ cần ô tốt GẦN NHẤT bên phải – đó là ý tưởng của greedy O(n).`);
  return good[0];
}
