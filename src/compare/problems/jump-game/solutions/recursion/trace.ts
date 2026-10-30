import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const last = nums.length - 1;
  const calls = nums.map(() => 0);
  const path: number[] = [];
  let total = 0;
  const viz = (cur: number, h: Highlight = 'active') => {
    const hlN: Record<number, Highlight> = { [last]: 'done' };
    for (const p of path) hlN[p] = 'pointer';
    if (cur <= last) hlN[cur] = h;
    const hlC: Record<number, Highlight> = {};
    calls.forEach((c, k) => { if (c > 1) hlC[k] = 'swap'; });
    return composite([
      arr(nums, { title: 'nums (xanh dương = các ô trên call stack)', highlights: hlN, pointers: cur <= last ? [{ name: 'i', index: cur }] : [] }),
      arr(calls, { title: 'số lần go(i) được gọi (đỏ = tính lại)', highlights: hlC }),
    ]);
  };
  const cs = () => path.map((p) => `go(${p})`);
  function* go(i: number): Generator<Frame, boolean> {
    total++;
    if (i <= last) calls[i]++;
    if (i >= last) {
      yield frame(5, { i, last, 'tổng lời gọi': total }, viz(Math.min(i, last), 'done'), `go(${i}): i ≥ ô cuối ${last} ⇒ true. Nhảy vượt quá ô cuối cũng tính là tới.`, { callStack: [...cs(), `go(${i})`] });
      return true;
    }
    path.push(i);
    for (let s = nums[i]; s >= 1; s--) {
      yield frame(6, { i, s, 'nums[i]': nums[i], 'tổng lời gọi': total }, viz(i), `Tại ô ${i}, thử bước ${s} tới ô ${i + s}${calls[i] > 1 ? ` – lần thứ ${calls[i]} ta đứng ở ô ${i}, toàn bộ cây con này đã từng được khám phá` : ''}. Thử bước dài trước để thoát sớm khi tới được.`, { callStack: cs() });
      if (yield* go(i + s)) {
        path.pop();
        return true;
      }
    }
    yield frame(9, { i, 'nums[i]': nums[i], 'tổng lời gọi': total }, viz(i, 'muted'), nums[i] === 0 ? `nums[${i}] = 0: đứng yên mãi ⇒ ngõ cụt, quay lui.` : `Mọi bước từ ô ${i} đều thất bại ⇒ false. Nhưng ta KHÔNG nhớ điều này, nên lần sau tới ô ${i} sẽ thử lại từ đầu.`, { callStack: cs() });
    path.pop();
    return false;
  }
  const r = yield* go(0);
  yield frame(11, { result: r, 'tổng lời gọi': total, n: nums.length }, viz(r ? last : 0, r ? 'done' : 'muted'), `Kết quả ${r} sau ${total} lời gọi cho n = ${nums.length} ô. Số ô đỏ ở hàng dưới chính là phần việc lặp lại mà memo sẽ loại bỏ.`);
  return r;
}
