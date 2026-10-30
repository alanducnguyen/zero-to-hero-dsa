import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { longestCommonSubsequence as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { longestCommonSubsequence as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import tableSrc from './solutions/table/impl.ts?raw';
import { longestCommonSubsequence as table } from './solutions/table/impl';
import { trace as tableTrace } from './solutions/table/trace';
import rollSrc from './solutions/rolling-rows/impl.ts?raw';
import { longestCommonSubsequence as roll } from './solutions/rolling-rows/impl';
import { trace as rollTrace } from './solutions/rolling-rows/trace';

/** Mỗi chuỗi tối đa 6 ký tự: đệ quy thuần tệ nhất C(12, 6) = 924 nhánh ⇒ ~1850 lời gọi, vẫn dưới giới hạn 4000 frame. */
const norm = (i: Record<string, unknown>) => ({ a: String(i.a ?? '').slice(0, 6), b: String(i.b ?? '').slice(0, 6) });

const problem: CompareProblem = {
  id: 'longest-common-subsequence',
  title: 'Longest Common Subsequence',
  subtitle: 'Đệ quy hàm mũ → memo → bảng 2-D (dựng lại được chuỗi) → hai hàng lăn O(min(m,n)) ★',
  difficulty: 'Medium',
  leetcode: { id: 1143, slug: 'longest-common-subsequence' },
  tags: ['dp', '2d-dp', 'string', 'recursion'],
  statement, comparison, interview,
  inputs: [
    { key: 'a', label: 'Chuỗi a (≤ 6)', type: 'string', default: 'abcde', maxLength: 6 },
    { key: 'b', label: 'Chuỗi b (≤ 6)', type: 'string', default: 'ace', maxLength: 6 },
  ],
  presets: [
    { label: 'AGGTAB / GXTXAY', values: { a: 'AGGTAB', b: 'GXTXAY' } },
    { label: 'Không có chung', values: { a: 'abc', b: 'def' } },
    { label: 'Giống nhau', values: { a: 'abcd', b: 'abcd' } },
    { label: 'a ngắn hơn b', values: { a: 'ab', b: 'xaybz' } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'So sánh ký tự cuối: khớp thì ăn cả hai, không thì max của hai nhánh bỏ một bên.', complexity: { time: 'O(2^(m+n))', space: 'O(m+n) stack' },
      pros: ['Viết thẳng từ định nghĩa, dễ thuyết phục là đúng', 'Là bước để rút ra công thức truy hồi'], cons: ['Hàm mũ: cùng (i, j) bị tính lại vô số lần', 'm = n = 30 đã không chạy nổi'], whenToUse: 'Chỉ để mở đầu, rút ra công thức truy hồi.',
      source: recSrc, run: (i) => rec(norm(i).a, norm(i).b), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Giữ nguyên đệ quy, lưu kết quả mỗi (i, j) vào Map ⇒ mỗi trạng thái giải một lần.', complexity: { time: 'O(m·n)', space: 'O(m·n) + stack O(m+n)' },
      pros: ['Chuyển từ đệ quy chỉ thêm 3 dòng', 'Chỉ giải trạng thái thực sự cần'], cons: ['Overhead Map + lời gọi hàm', 'Stack sâu m + n ⇒ tràn với chuỗi 10⁴+'], whenToUse: 'Khi cần code nhanh, đúng ngay từ công thức truy hồi; chuỗi ngắn.',
      source: memoSrc, run: (i) => memo(norm(i).a, norm(i).b), trace: (i) => memoTrace(norm(i)) },
    { id: 'table', name: 'Bảng 2-D bottom-up', rank: 2, approach: 'Điền dp[i][j] theo hàng; giữ nguyên cả bảng.', complexity: { time: 'O(m·n)', space: 'O(m·n)' },
      pros: ['Không đệ quy, vòng lặp chặt, cache-friendly', 'Bảng còn nguyên ⇒ truy vết ngược in ra chính chuỗi LCS'], cons: ['O(m·n) bộ nhớ: 10⁴ × 10⁴ = 10⁸ ô ≈ 400 MB'], whenToUse: 'Khi cần dựng lại chuỗi LCS / diff, hoặc làm bản rõ ràng trước khi tối ưu bộ nhớ.',
      source: tableSrc, run: (i) => table(norm(i).a, norm(i).b), trace: (i) => tableTrace(norm(i)) },
    { id: 'rolling-rows', name: 'Hai hàng lăn', rank: 1, approach: 'Hàng i chỉ phụ thuộc hàng i−1 ⇒ giữ prev và cur, cột theo chuỗi ngắn hơn.', complexity: { time: 'O(m·n)', space: 'O(min(m,n))' },
      pros: ['Bộ nhớ O(min(m,n))', 'Cùng tốc độ với bảng, thường nhanh hơn nhờ cache'], cons: ['Mất bảng ⇒ không truy vết được chuỗi LCS', 'Dễ sai chỉ số ô chéo khi đổi hàng'], whenToUse: 'Mặc định khi đề chỉ hỏi độ dài (LC 1143).',
      source: rollSrc, run: (i) => roll(norm(i).a, norm(i).b), trace: (i) => rollTrace(norm(i)) },
  ],
};
export default problem;
