import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { numDecodings as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { numDecodings as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import dpSrc from './solutions/dp-array/impl.ts?raw';
import { numDecodings as dpArr } from './solutions/dp-array/impl';
import { trace as dpTrace } from './solutions/dp-array/trace';
import twoSrc from './solutions/two-vars/impl.ts?raw';
import { numDecodings as twoVars } from './solutions/two-vars/impl';
import { trace as twoTrace } from './solutions/two-vars/trace';

/** Chỉ giữ chữ số, tối đa 12 ký tự: đệ quy thuần trên "111111111111" ~465 lời gọi, dưới giới hạn 4000 frame. Rỗng ⇒ "1". */
const norm = (i: Record<string, unknown>) => ({ s: String(i.s ?? '').replace(/\D/g, '').slice(0, 12) || '1' });

const problem: CompareProblem = {
  id: 'decode-ways',
  title: 'Decode Ways',
  subtitle: 'Đệ quy O(2ⁿ) → memo → DP mảng → hai biến O(1) ★ – và những cái bẫy của ký tự 0',
  difficulty: 'Medium',
  leetcode: { id: 91, slug: 'decode-ways' },
  tags: ['dp', 'recursion', 'string', 'counting'],
  statement, comparison, interview,
  inputs: [{ key: 's', label: 'Chuỗi chữ số (tối đa 12)', type: 'string', default: '2263', maxLength: 12 }],
  presets: [
    { label: 'Có số 0 hợp lệ ("2101")', values: { s: '2101' } },
    { label: 'Không giải mã được ("1001")', values: { s: '1001' } },
    { label: 'Số 0 đứng đầu ("06")', values: { s: '06' } },
    { label: 'Toàn số 1 – cây nổ ("11111111")', values: { s: '11111111' } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'f(i) = f(i+1) nếu s[i] ≠ 0, cộng f(i+2) nếu cặp s[i..i+1] ∈ [10, 26].', complexity: { time: 'O(2ⁿ)', space: 'O(n) stack' },
      pros: ['Viết thẳng từ định nghĩa', 'Dễ chuyển thành liệt kê mọi cách'], cons: ['Bài con chồng lấn ⇒ hàm mũ', 'n = 40 toàn "1" đã > 10⁸ lời gọi'], whenToUse: 'Chỉ để trình bày công thức, hoặc khi phải liệt kê mọi kết quả.',
      source: recSrc, run: (i) => rec(norm(i).s), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Như đệ quy thuần nhưng cache kết quả theo chỉ số i.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Chỉ thêm 2 dòng so với đệ quy', 'Chỉ tính các trạng thái thực sự cần'], cons: ['Stack sâu n tầng', 'Hằng số Map + lời gọi hàm lớn'], whenToUse: 'Khi muốn đi từ đệ quy sang DP nhanh nhất, n vừa phải.',
      source: memoSrc, run: (i) => memo(norm(i).s), trace: (i) => memoTrace(norm(i)) },
    { id: 'dp-array', name: 'DP mảng (bottom-up)', rank: 2, approach: 'dp[i] = số cách giải mã i ký tự đầu, điền từ trái sang phải.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Không đệ quy, không tràn stack', 'Dễ debug từng ô, giữ được mọi tiền tố'], cons: ['Tốn O(n) bộ nhớ không cần thiết'], whenToUse: 'Khi cần dp của mọi tiền tố, hoặc biến thể phức tạp (Decode Ways II) cần debug.',
      source: dpSrc, run: (i) => dpArr(norm(i).s), trace: (i) => dpTrace(norm(i)) },
    { id: 'two-vars', name: 'Hai biến lăn', rank: 1, approach: 'Chỉ giữ dp[i−1] và dp[i−2], trượt sau mỗi ký tự.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(n) thời gian, O(1) bộ nhớ', 'Một vòng lặp, không đệ quy'], cons: ['Mất các giá trị dp trung gian', 'Dễ nhầm thứ tự cập nhật prev2/prev1'], whenToUse: 'Mặc định khi chỉ cần đếm.',
      source: twoSrc, run: (i) => twoVars(norm(i).s), trace: (i) => twoTrace(norm(i)) },
  ],
};
export default problem;
