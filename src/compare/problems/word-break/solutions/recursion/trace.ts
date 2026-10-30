import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, VisualState } from '@/engine/types';

export function* trace(input: { s: string; wordDict: string[] }): Generator<Frame, boolean> {
  const { s, wordDict } = input;
  const dict = new Set(wordDict);
  const n = s.length;
  const calls = new Array<number>(n + 1).fill(0);
  const stack: string[] = [];
  const viz = (start: number): VisualState =>
    composite([
      arr(s.split(''), { title: 's (cyan = phần còn phải cắt)', ranges: start < n ? [{ from: start, to: n - 1, label: `s[${start}..)`, color: 'range' }] : [] }),
      arr(calls, { title: 'số lần gọi can(start) (nhãn = số lần; vị trí = start) – bài con bị giải lại', highlights: { [start]: calls[start] > 1 ? 'swap' : 'active' } }),
    ]);
  function* can(start: number, via: string): Generator<Frame, boolean> {
    calls[start]++;
    stack.push(`can(${start})`);
    const again = calls[start] > 1 ? ` Lần thứ ${calls[start]} giải cùng bài con này – lãng phí, không ai nhớ kết quả.` : '';
    yield frame(5, { start, 'lần gọi': calls[start] }, viz(start),
      (via ? `Tiền tố "${via}" là từ ⇒ đệ quy phần còn lại. ` : 'Bắt đầu từ chỉ số 0. ') + (start === n ? 'start = n ⇒ đã cắt hết, trả true.' : `Thử mọi tiền tố của "${s.slice(start)}".`) + again,
      { callStack: [...stack] });
    if (start === n) { stack.pop(); return true; }
    for (let end = start + 1; end <= n; end++) {
      const piece = s.slice(start, end);
      if (dict.has(piece) && (yield* can(end, piece))) {
        yield frame(7, { start, end, piece }, viz(start), `can(${end}) = true và "${piece}" là từ ⇒ can(${start}) = true, dừng ngay (short-circuit).`, { callStack: [...stack] });
        stack.pop();
        return true;
      }
    }
    // lần gọi lặp lại chỉ hiện frame vào hàm (đã ghi chú lãng phí) để giữ trace dưới 4000 frame
    if (calls[start] === 1) yield frame(9, { start, 'can(start)': false }, viz(start), `Không tiền tố nào của "${s.slice(start)}" dẫn tới lời giải ⇒ false. Kết quả này sẽ bị tính lại nếu tới start = ${start} bằng đường khác.`, { callStack: [...stack] });
    stack.pop();
    return false;
  }
  const r = yield* can(0, '');
  const total = calls.reduce((a, c) => a + c, 0);
  yield frame(11, { result: r, 'tổng lời gọi': total, 'bài con khác nhau': calls.filter((c) => c > 0).length }, viz(0),
    `Kết quả ${r} sau ${total} lời gọi cho tối đa ${n + 1} bài con khác nhau. Worst case (s = "aaa…ab", dict = {a, aa, aaa…}) là O(2ⁿ).`);
  return r;
}
