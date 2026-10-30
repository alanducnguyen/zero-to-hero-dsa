import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const letter = (x: number) => String.fromCharCode(64 + x);

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = String(input.s ?? '');
  const n = s.length;
  const chars = s.split('');
  const dp: (number | null)[] = new Array(n + 1).fill(null);
  const viz = (charHl: Record<number, Highlight> = {}, dpHl: Record<string, Highlight> = {}) =>
    composite([
      arr(chars, { mode: 'cells', title: 's – chuỗi chữ số', highlights: charHl }),
      matrix([dp], {
        title: 'dp[i] = số cách giải mã i ký tự đầu',
        colLabels: Array.from({ length: n + 1 }, (_, i) => `i=${i}`),
        highlights: dpHl,
      }),
    ]);

  if (n === 0) {
    yield frame(10, { n, result: 0 }, viz(), 'Chuỗi rỗng ⇒ theo đề không có thông điệp nào để giải mã, trả 0.');
    return 0;
  }
  dp[0] = 1;
  yield frame(12, { n, 'dp[0]': 1 }, viz({}, { '0,0': 'done' }), 'Cơ sở dp[0] = 1: tiền tố rỗng có đúng một cách "không giải mã gì". Đặt 1 (không phải 0) để các cách ghép phía sau được cộng dồn đúng – nếu là 0 thì mọi dp đều bằng 0.');

  for (let i = 1; i <= n; i++) {
    dp[i] = 0;
    const one = s[i - 1];
    yield frame(14, { i, one, 'dp[i]': 0 }, viz({ [i - 1]: 'active' }, { [`0,${i}`]: 'active' }), `Tính dp[${i}]: nhìn vào cách kết thúc tiền tố "${s.slice(0, i)}". Lựa chọn 1 – ký tự cuối '${one}' đứng một mình thành một chữ cái.`);
    if (one !== '0') {
      dp[i] = dp[i]! + dp[i - 1]!;
      yield frame(15, { i, one, 'dp[i-1]': dp[i - 1], 'dp[i]': dp[i] }, viz({ [i - 1]: 'done' }, { [`0,${i - 1}`]: 'compare', [`0,${i}`]: 'swap' }), `'${one}' → '${letter(Number(one))}' hợp lệ. Mỗi cách giải mã ${i - 1} ký tự đầu nối thêm '${letter(Number(one))}' cho một cách mới ⇒ cộng dp[${i - 1}] = ${dp[i - 1]}, dp[${i}] = ${dp[i]}.`);
    } else {
      yield frame(15, { i, one, 'dp[i]': dp[i] }, viz({ [i - 1]: 'muted' }, { [`0,${i}`]: 'active' }), `'0' không ứng với chữ cái nào ⇒ không thể đứng một mình, bỏ qua lựa chọn này. '0' chỉ sống được nếu ghép với ký tự trước thành "10" hoặc "20".`);
    }
    if (i >= 2) {
      const twoStr = s.slice(i - 2, i);
      const two = Number(twoStr);
      yield frame(17, { i, two }, viz({ [i - 2]: 'range', [i - 1]: 'range' }, { [`0,${i}`]: 'active' }), `Lựa chọn 2 – ghép hai ký tự cuối "${twoStr}" = ${two} thành một chữ cái. Chỉ hợp lệ khi 10 ≤ ${two} ≤ 26 (số có hai chữ số, không bắt đầu bằng 0).`);
      if (two >= 10 && two <= 26) {
        dp[i] = dp[i]! + dp[i - 2]!;
        yield frame(18, { i, two, 'dp[i-2]': dp[i - 2], 'dp[i]': dp[i] }, viz({ [i - 2]: 'done', [i - 1]: 'done' }, { [`0,${i - 2}`]: 'compare', [`0,${i}`]: 'swap' }), `"${twoStr}" → '${letter(two)}' hợp lệ ⇒ mọi cách giải mã ${i - 2} ký tự đầu nối thêm '${letter(two)}' ⇒ cộng dp[${i - 2}] = ${dp[i - 2]}. dp[${i}] = ${dp[i]}. Hai lựa chọn kết thúc khác nhau nên không đếm trùng.`);
      } else {
        yield frame(18, { i, two, 'dp[i]': dp[i] }, viz({ [i - 2]: 'muted', [i - 1]: 'muted' }, { [`0,${i}`]: 'swap' }), `"${twoStr}" ${two < 10 ? 'bắt đầu bằng 0' : 'lớn hơn 26'} ⇒ không phải chữ cái, không cộng gì. dp[${i}] = ${dp[i]}.`);
      }
    }
  }
  yield frame(21, { result: dp[n] }, viz({}, { [`0,${n}`]: 'done' }), `Kết quả dp[${n}] = ${dp[n]} cách giải mã "${s}". Mỗi dp[i] chỉ cần dp[i−1] và dp[i−2] ⇒ có thể rút bộ nhớ về O(1) như Fibonacci.`);
  return dp[n]!;
}
