import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const last = nums.length - 1;
  const memo = new Map<number, boolean>();
  const path: number[] = [];
  let total = 0;
  const viz = (cur: number, h: Highlight = 'active') => {
    const hlN: Record<number, Highlight> = { [last]: 'done' };
    for (const p of path) hlN[p] = 'pointer';
    hlN[cur] = h;
    const hlM: Record<number, Highlight> = {};
    memo.forEach((v, k) => { hlM[k] = v ? 'done' : 'muted'; });
    return composite([
      arr(nums, { title: 'nums (xanh dương = trên call stack)', highlights: hlN, pointers: [{ name: 'i', index: cur }] }),
      arr(nums.map((_, k) => (memo.has(k) ? (memo.get(k) ? '✓' : '✗') : '?')), { title: 'memo[i]: ✓ tới được cuối, ✗ ngõ cụt, ? chưa biết', highlights: hlM }),
    ]);
  };
  const cs = () => path.map((p) => `go(${p})`);
  function* go(i: number): Generator<Frame, boolean> {
    total++;
    const c = Math.min(i, last);
    if (i >= last) {
      yield frame(6, { i, 'tổng lời gọi': total }, viz(c, 'done'), `go(${i}): đã tới/vượt ô cuối ⇒ true.`, { callStack: [...cs(), `go(${i})`] });
      return true;
    }
    if (memo.has(i)) {
      yield frame(7, { i, 'memo[i]': memo.get(i), 'tổng lời gọi': total }, viz(i, 'compare'), `memo[${i}] = ${memo.get(i)} đã có ⇒ trả ngay O(1). Đây là chỗ đệ quy thuần phải khám phá lại cả cây con.`, { callStack: [...cs(), `go(${i})`] });
      return memo.get(i)!;
    }
    path.push(i);
    let ok = false;
    for (let s = nums[i]; s >= 1 && !ok; s--) {
      yield frame(9, { i, s, ok, 'tổng lời gọi': total }, viz(i), `Ô ${i} chưa biết ⇒ thử bước ${s} tới ô ${i + s}.`, { callStack: cs() });
      ok = yield* go(i + s);
    }
    memo.set(i, ok);
    yield frame(10, { i, ok, 'số ô đã lưu': memo.size }, viz(i, ok ? 'done' : 'muted'), `Lưu memo[${i}] = ${ok}. Kết quả go(${i}) không phụ thuộc đường đi tới ${i} ⇒ dùng lại an toàn.`, { callStack: cs() });
    path.pop();
    return ok;
  }
  const r = yield* go(0);
  yield frame(13, { result: r, 'tổng lời gọi': total }, viz(r ? last : 0, r ? 'done' : 'muted'), `Kết quả ${r} sau ${total} lời gọi. Mỗi ô tính ≤ 1 lần, mỗi lần quét ≤ n bước ⇒ O(n²); stack đệ quy sâu tới n.`);
  return r;
}
