import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

export function* trace(input: { s: string; wordDict: string[] }): Generator<Frame, boolean> {
  const { s, wordDict } = input;
  const dict = new Set(wordDict);
  const n = s.length;
  const memo = new Map<number, boolean>();
  const stack: string[] = [];
  let calls = 0;
  const viz = (start: number, end?: number, hl: Highlight = 'active'): VisualState => {
    const mh: Record<number, Highlight> = {};
    memo.forEach((v, k) => { mh[k] = v ? 'done' : 'muted'; });
    mh[start] = hl;
    return composite([
      arr(s.split(''), { title: 's', ranges: end !== undefined ? [{ from: start, to: end - 1, label: `s[${start}..${end})`, color: 'range' }] : [], pointers: start < n ? [{ name: 'start', index: start }] : [] }),
      arr(Array.from({ length: n + 1 }, (_, k) => (memo.has(k) ? (memo.get(k) ? 'T' : 'F') : '?')), { title: 'memo[start] (T/F = đã giải, ? = chưa)', highlights: mh }),
    ]);
  };
  function* can(start: number): Generator<Frame, boolean> {
    calls++;
    stack.push(`can(${start})`);
    if (start === n) {
      yield frame(6, { start }, viz(start, undefined, 'done'), 'start = n ⇒ đã cắt hết chuỗi, trả true.', { callStack: [...stack] });
      stack.pop();
      return true;
    }
    if (memo.has(start)) {
      yield frame(7, { start, 'memo[start]': memo.get(start) }, viz(start, undefined, 'compare'), `can(${start}) đã giải = ${memo.get(start)} ⇒ trả ngay O(1). Đây là chỗ memo cắt cả nhánh đệ quy mà bản thuần phải đi lại.`, { callStack: [...stack] });
      stack.pop();
      return memo.get(start)!;
    }
    let ok = false;
    for (let end = start + 1; end <= n && !ok; end++) {
      const piece = s.slice(start, end);
      const inDict = dict.has(piece);
      yield frame(10, { start, end, piece, inDict }, viz(start, end), inDict ? `"${piece}" là từ ⇒ hỏi tiếp can(${end}).` : `"${piece}" không có trong dict ⇒ thử tiền tố dài hơn.`, { callStack: [...stack] });
      ok = inDict && (yield* can(end));
    }
    memo.set(start, ok);
    yield frame(12, { start, ok }, viz(start, undefined, ok ? 'done' : 'swap'), `Ghi memo[${start}] = ${ok}. Mỗi start chỉ tới dòng này một lần ⇒ tối đa n+1 bài con, mỗi bài O(n) tiền tố.`, { callStack: [...stack] });
    stack.pop();
    return ok;
  }
  const r = yield* can(0);
  yield frame(15, { result: r, 'tổng lời gọi': calls }, viz(0, undefined, r ? 'done' : 'swap'), `Kết quả ${r} sau ${calls} lời gọi – tuyến tính theo số cặp (start, end) chứ không còn hàm mũ.`);
  return r;
}
