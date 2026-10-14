import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { fib as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { fib as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import itSrc from './solutions/iterative/impl.ts?raw';
import { fib as it } from './solutions/iterative/impl';
import { trace as itTrace } from './solutions/iterative/trace';
import matSrc from './solutions/matrix/impl.ts?raw';
import { fib as mat } from './solutions/matrix/impl';
import { trace as matTrace } from './solutions/matrix/trace';

const norm = (i: Record<string, unknown>) => ({ n: Math.max(0, Math.min(12, Math.floor(Number(i.n)))) });

const problem: CompareProblem = {
  id: 'fibonacci',
  title: 'Fibonacci Number',
  subtitle: 'Đệ quy O(φⁿ) → memo O(n) → hai biến O(1) → ma trận O(log n): thang tối ưu đầy đủ của DP',
  difficulty: 'Easy',
  leetcode: { id: 509, slug: 'fibonacci-number' },
  tags: ['dp', 'recursion', 'math'],
  statement, comparison, interview,
  inputs: [{ key: 'n', label: 'n (≤ 12 để xem cây đệ quy)', type: 'number', default: 6, min: 0, max: 12 }],
  presets: [
    { label: 'n = 0', values: { n: 0 } },
    { label: 'n = 1', values: { n: 1 } },
    { label: 'n = 10', values: { n: 10 } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'Dịch thẳng định nghĩa: fib(n) = fib(n−1) + fib(n−2).', complexity: { time: 'O(φⁿ)', space: 'O(n) stack' },
      pros: ['2 dòng, đúng theo định nghĩa'], cons: ['Hàm mũ: n = 40 đã mất vài giây', 'Tính lại cùng bài con hàng triệu lần'], whenToUse: 'Không bao giờ trong thực tế; chỉ để minh hoạ vì sao cần DP.',
      source: recSrc, run: (i) => rec(norm(i).n), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Giữ Map kết quả; bài con đã tính thì trả ngay.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Viết thẳng từ công thức đệ quy', 'Chỉ tính bài con thực sự cần'], cons: ['Vẫn đệ quy ⇒ tràn stack với n lớn', 'O(n) bộ nhớ'], whenToUse: 'DP có công thức phức tạp hoặc không gian trạng thái thưa.',
      source: memoSrc, run: (i) => memo(norm(i).n), trace: (i) => memoTrace(norm(i)) },
    { id: 'iterative', name: 'Bottom-up 2 biến', rank: 1, approach: 'Lăn từ F(0), F(1) lên, chỉ giữ hai giá trị cuối.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ, không đệ quy', '6 dòng, không thể tràn stack'], cons: ['Vẫn O(n): n = 10⁹ không chạy nổi'], whenToUse: 'Mặc định cho n ≤ 10⁷.',
      source: itSrc, run: (i) => it(norm(i).n), trace: (i) => itTrace(norm(i)) },
    { id: 'matrix', name: 'Luỹ thừa ma trận', rank: 2, approach: 'Qⁿ với Q = [[1,1],[1,0]] bằng bình phương liên tiếp; F(n) = Qⁿ[0][1].', complexity: { time: 'O(log n)', space: 'O(1)' },
      pros: ['Logarit – n = 10¹⁸ vẫn tức thời', 'Khung chung cho mọi hồi quy tuyến tính'], cons: ['Code dài hơn, dễ nhầm chỉ số', 'Tràn số khi nhân – cần modulo/BigInt'], whenToUse: 'n cực lớn, thường kèm modulo.',
      source: matSrc, run: (i) => mat(norm(i).n), trace: (i) => matTrace(norm(i)) },
  ],
};
export default problem;
