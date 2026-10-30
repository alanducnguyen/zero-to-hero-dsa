import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { minDistance as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { minDistance as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import tableSrc from './solutions/table/impl.ts?raw';
import { minDistance as table } from './solutions/table/impl';
import { trace as tableTrace } from './solutions/table/trace';
import rollSrc from './solutions/rolling-row/impl.ts?raw';
import { minDistance as roll } from './solutions/rolling-row/impl';
import { trace as rollTrace } from './solutions/rolling-row/trace';

/** Mỗi chuỗi tối đa 5 ký tự: đệ quy thuần phân nhánh 3, tệ nhất (5×5 không khớp) ≈ 2500 lời gọi – dưới giới hạn 4000 frame. */
const norm = (i: Record<string, unknown>) => ({ a: String(i.a ?? '').slice(0, 5), b: String(i.b ?? '').slice(0, 5) });

const problem: CompareProblem = {
  id: 'edit-distance',
  title: 'Edit Distance',
  subtitle: 'Levenshtein: đệ quy phân nhánh 3 → memo → bảng 2-D (in được alignment) → một hàng + biến chéo ★',
  difficulty: 'Medium',
  leetcode: { id: 72, slug: 'edit-distance' },
  tags: ['dp', '2d-dp', 'string', 'recursion'],
  statement, comparison, interview,
  inputs: [
    { key: 'a', label: 'Chuỗi a (≤ 5)', type: 'string', default: 'horse', maxLength: 5 },
    { key: 'b', label: 'Chuỗi b (≤ 5)', type: 'string', default: 'ros', maxLength: 5 },
  ],
  presets: [
    { label: 'flaw → lawn', values: { a: 'flaw', b: 'lawn' } },
    { label: 'Giống nhau', values: { a: 'abc', b: 'abc' } },
    { label: 'Rỗng', values: { a: '', b: 'abc' } },
    { label: 'a ngắn hơn b', values: { a: 'ab', b: 'cabd' } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'Ký tự cuối khớp thì bỏ qua; không thì 1 + min(thay, xoá, chèn) – ba nhánh đệ quy.', complexity: { time: 'O(3^(m+n))', space: 'O(m+n) stack' },
      pros: ['Bám sát định nghĩa ba thao tác', 'Là cách rút ra công thức truy hồi'], cons: ['Phân nhánh 3 ⇒ bùng nổ còn nhanh hơn LCS', 'Chuỗi 10 ký tự đã chậm rõ rệt'], whenToUse: 'Chỉ để mở đầu, giải thích ba lựa chọn.',
      source: recSrc, run: (i) => rec(norm(i).a, norm(i).b), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Lưu kết quả d(i, j) vào Map; base case gộp thành i + j.', complexity: { time: 'O(m·n)', space: 'O(m·n) + stack O(m+n)' },
      pros: ['Chuyển từ đệ quy rất ít sửa', 'Bỏ qua trạng thái không cần (vd chuỗi khớp nhiều)'], cons: ['Overhead Map và lời gọi hàm', 'Tràn stack với chuỗi dài'], whenToUse: 'Code nhanh trong phỏng vấn khi chuỗi ngắn.',
      source: memoSrc, run: (i) => memo(norm(i).a, norm(i).b), trace: (i) => memoTrace(norm(i)) },
    { id: 'table', name: 'Bảng 2-D bottom-up', rank: 2, approach: 'Hàng 0 = j, cột 0 = i; điền dp[i][j] từ chéo, trên, trái.', complexity: { time: 'O(m·n)', space: 'O(m·n)' },
      pros: ['Không đệ quy, dễ kiểm chứng bằng tay', 'Lần ngược bảng ra dãy thao tác cụ thể (alignment/diff)'], cons: ['O(m·n) bộ nhớ – không dùng được cho file/genome dài'], whenToUse: 'Khi cần in dãy thao tác, hoặc làm bản rõ ràng trước khi tối ưu.',
      source: tableSrc, run: (i) => table(norm(i).a, norm(i).b), trace: (i) => tableTrace(norm(i)) },
    { id: 'rolling-row', name: 'Một hàng + biến chéo', rank: 1, approach: 'Ghi đè một hàng tại chỗ; biến prev giữ dp[i-1][j-1] trước khi nó bị ghi đè.', complexity: { time: 'O(m·n)', space: 'O(min(m,n))' },
      pros: ['Bộ nhớ O(min(m,n)), chỉ một mảng', 'Nhanh nhất trên thực tế nhờ cache'], cons: ['Không in được dãy thao tác', 'Dễ quên lưu ô chéo trước khi ghi đè'], whenToUse: 'Mặc định khi chỉ cần con số khoảng cách (LC 72).',
      source: rollSrc, run: (i) => roll(norm(i).a, norm(i).b), trace: (i) => rollTrace(norm(i)) },
  ],
};
export default problem;
