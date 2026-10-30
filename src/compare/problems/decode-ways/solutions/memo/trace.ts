import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = input.s;
  const n = s.length;
  const memo = new Map<number, number>();
  const stack: string[] = [];
  let total = 0;
  const viz = (charHl: Record<number, Highlight> = {}, memoHl: Record<string, Highlight> = {}) =>
    composite([
      arr(s.split(''), { mode: 'cells', title: 's (nhãn = chỉ số)', highlights: charHl }),
      matrix([Array.from({ length: n + 1 }, (_, i) => (memo.has(i) ? memo.get(i)! : null))], { title: 'memo[i] = số cách giải mã hậu tố s[i..]', colLabels: Array.from({ length: n + 1 }, (_, i) => `i=${i}`), highlights: memoHl }),
    ]);
  function* f(i: number): Generator<Frame, number> {
    total++;
    stack.push(`f(${i})`);
    const cs = () => ({ callStack: [...stack] });
    if (i === n) {
      yield frame(3, { i, 'tổng lời gọi': total }, viz(), `f(${i}): hết chuỗi ⇒ 1 cách.`, cs());
      stack.pop();
      return 1;
    }
    if (s[i] === '0') {
      yield frame(4, { i, 's[i]': '0' }, viz({ [i]: 'muted' }), `Bẫy '0': hậu tố bắt đầu bằng '0' ⇒ 0 cách. Kiểm tra này phải đứng trước khi ghép cặp, nếu không "06" sẽ bị coi là 6.`, cs());
      stack.pop();
      return 0;
    }
    if (memo.has(i)) {
      yield frame(5, { i, 'memo[i]': memo.get(i), 'tổng lời gọi': total }, viz({ [i]: 'done' }, { [`0,${i}`]: 'done' }), `memo[${i}] = ${memo.get(i)} đã có ⇒ trả ngay, cắt cả cây con mà đệ quy thuần phải đi lại.`, cs());
      stack.pop();
      return memo.get(i)!;
    }
    yield frame(6, { i, 's[i]': s[i] }, viz({ [i]: 'active' }, { [`0,${i}`]: 'active' }), `Lần đầu gặp hậu tố s[${i}..]: lấy '${s[i]}' một mình, đếm f(${i + 1}).`, cs());
    let ways = yield* f(i + 1);
    const two = i + 1 < n ? s.slice(i, i + 2) : '';
    const ok = two !== '' && Number(two) <= 26;
    yield frame(7, { i, two: two || '–', ways }, viz({ [i]: ok ? 'compare' : 'muted', ...(two ? { [i + 1]: ok ? 'compare' : 'muted' } : {}) }), ok ? `Cặp "${two}" hợp lệ ⇒ cộng thêm f(${i + 2}) – thường đã nằm sẵn trong memo.` : two ? `Cặp "${two}" > 26 ⇒ không ghép.` : 'Không còn ký tự để ghép cặp.', cs());
    if (ok) ways += yield* f(i + 2);
    memo.set(i, ways);
    yield frame(8, { i, ways }, viz({ [i]: 'done' }, { [`0,${i}`]: 'swap' }), `Lưu memo[${i}] = ${ways}. Mỗi i chỉ tính một lần ⇒ tổng O(n).`, cs());
    stack.pop();
    return ways;
  }
  const r = yield* f(0);
  yield frame(9, { result: r, 'tổng lời gọi': total }, viz({}, { '0,0': 'done' }), `Kết quả ${r} với ${total} lời gọi (tuyến tính). Cái giá: stack sâu n tầng – n = 10⁵ có thể tràn stack.`);
  return r;
}
