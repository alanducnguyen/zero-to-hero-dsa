import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = input.s;
  const n = s.length;
  const dp: (number | null)[] = new Array(n + 1).fill(null);
  const viz = (charHl: Record<number, Highlight> = {}, dpHl: Record<string, Highlight> = {}) =>
    composite([
      arr(s.split(''), { mode: 'cells', title: 's (nhãn = chỉ số)', highlights: charHl }),
      matrix([dp], { title: 'dp[i] = số cách giải mã i ký tự đầu', colLabels: dp.map((_, i) => `i=${i}`), highlights: dpHl }),
    ]);
  dp[0] = 1;
  yield frame(5, { n, 'dp[0]': 1 }, viz({}, { '0,0': 'done' }), 'dp[0] = 1: tiền tố rỗng có đúng 1 cách "không làm gì". Đặt 0 thì mọi dp sau đều bằng 0.');
  for (let i = 1; i <= n; i++) {
    dp[i] = 0;
    const one = s[i - 1];
    if (one !== '0') {
      dp[i] = dp[i]! + dp[i - 1]!;
      yield frame(7, { i, one, 'dp[i-1]': dp[i - 1], 'dp[i]': dp[i] }, viz({ [i - 1]: 'active' }, { [`0,${i - 1}`]: 'compare', [`0,${i}`]: 'swap' }), `'${one}' đứng một mình hợp lệ ⇒ mỗi cách giải mã ${i - 1} ký tự đầu nối thêm 1 chữ cái: dp[${i}] += dp[${i - 1}] = ${dp[i - 1]}.`);
    } else {
      yield frame(7, { i, one, 'dp[i]': 0 }, viz({ [i - 1]: 'muted' }, { [`0,${i}`]: 'active' }), `Bẫy '0': không đứng một mình được ⇒ bỏ lựa chọn này. '0' chỉ sống nếu ghép thành "10" hoặc "20".`);
    }
    const two = i >= 2 ? Number(s.slice(i - 2, i)) : 0;
    if (two >= 10 && two <= 26) {
      dp[i] = dp[i]! + dp[i - 2]!;
      yield frame(9, { i, two, 'dp[i-2]': dp[i - 2], 'dp[i]': dp[i] }, viz({ [i - 2]: 'compare', [i - 1]: 'compare' }, { [`0,${i - 2}`]: 'compare', [`0,${i}`]: 'swap' }), `"${s.slice(i - 2, i)}" ∈ [10, 26] ⇒ cộng dp[${i - 2}] = ${dp[i - 2]}, dp[${i}] = ${dp[i]}.`);
    } else if (i >= 2) {
      yield frame(9, { i, two: s.slice(i - 2, i), 'dp[i]': dp[i] }, viz({ [i - 2]: 'muted', [i - 1]: 'muted' }, { [`0,${i}`]: dp[i] ? 'done' : 'active' }),
        s[i - 2] === '0' ? `"${s.slice(i - 2, i)}" có số 0 đứng đầu – không phải số ${two} ⇒ không ghép. Vì vậy phải kiểm tra two ≥ 10, không chỉ ≤ 26.` : `"${s.slice(i - 2, i)}" > 26 ⇒ không ghép.${dp[i] === 0 ? ' dp[i] = 0 ⇒ mọi tiền tố dài hơn cũng 0: chuỗi vô nghiệm.' : ''}`);
    }
  }
  yield frame(11, { result: dp[n] }, viz({}, { [`0,${n}`]: 'done' }), `Kết quả dp[${n}] = ${dp[n]}. O(n) thời gian, không đệ quy – nhưng chỉ dp[i−1], dp[i−2] được dùng ⇒ mảng là thừa.`);
  return dp[n]!;
}
