import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = input.s;
  const n = s.length;
  const calls = new Array<number>(n + 1).fill(0);
  const stack: string[] = [];
  let total = 0;
  const viz = (charHl: Record<number, Highlight> = {}, at?: number) =>
    composite([
      arr(s.split(''), { mode: 'cells', title: 's (nhãn = chỉ số)', highlights: charHl }),
      matrix([calls], { title: 'số lần gọi f(i) – bài con bị tính lại', colLabels: calls.map((_, i) => `i=${i}`), highlights: at === undefined ? {} : { [`0,${at}`]: calls[at] > 1 ? 'swap' : 'active' } }),
    ]);
  function* f(i: number): Generator<Frame, number> {
    calls[i]++;
    total++;
    stack.push(`f(${i})`);
    const cs = () => ({ callStack: [...stack] });
    if (i === n) {
      yield frame(3, { i, 'tổng lời gọi': total }, viz({}, i), `f(${i}): đã dùng hết chuỗi ⇒ tìm được trọn 1 cách giải mã, trả 1.${calls[i] > 1 ? ` (Lần thứ ${calls[i]} tới đây!)` : ''}`, cs());
      stack.pop();
      return 1;
    }
    if (s[i] === '0') {
      yield frame(4, { i, 's[i]': '0', 'tổng lời gọi': total }, viz({ [i]: 'muted' }, i), `Bẫy '0': hậu tố bắt đầu bằng '0' không giải mã được ("0", "06" đều vô nghĩa) ⇒ trả 0, nhánh này chết.`, cs());
      stack.pop();
      return 0;
    }
    yield frame(5, { i, 's[i]': s[i], 'tổng lời gọi': total }, viz({ [i]: 'active' }, i), `f(${i}) lần thứ ${calls[i]}: lấy '${s[i]}' đứng một mình rồi đếm hậu tố từ ${i + 1}.${calls[i] > 1 ? ' Hậu tố này đã được đếm trước đó – lãng phí, không ai nhớ kết quả.' : ''}`, cs());
    let ways = yield* f(i + 1);
    const two = i + 1 < n ? s.slice(i, i + 2) : '';
    const ok = two !== '' && Number(two) <= 26;
    yield frame(6, { i, two: two || '–', ways }, viz({ [i]: ok ? 'compare' : 'muted', ...(two ? { [i + 1]: ok ? 'compare' : 'muted' } : {}) }, i),
      ok ? `Cặp "${two}" ∈ [10, 26] (s[i] ≠ '0' nên ≥ 10) ⇒ thêm nhánh f(${i + 2}). Hai nhánh ⇒ cây nhân đôi.` : two ? `Cặp "${two}" > 26 ⇒ không ghép được, chỉ một nhánh.` : 'Không còn ký tự thứ hai để ghép.', cs());
    if (ok) ways += yield* f(i + 2);
    yield frame(7, { i, ways, 'tổng lời gọi': total }, viz({ [i]: 'done' }, i), `f(${i}) = ${ways}.`, cs());
    stack.pop();
    return ways;
  }
  const r = yield* f(0);
  yield frame(7, { result: r, 'tổng lời gọi': total, n }, viz(), `Kết quả ${r} sau ${total} lời gọi cho chỉ ${n + 1} hậu tố khác nhau – đó là dấu hiệu bài con chồng lấn ⇒ memo.`);
  return r;
}
