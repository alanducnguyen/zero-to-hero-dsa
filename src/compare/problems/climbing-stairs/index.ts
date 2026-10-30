import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { climbStairs as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { climbStairs as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import itSrc from './solutions/iterative/impl.ts?raw';
import { climbStairs as it } from './solutions/iterative/impl';
import { trace as itTrace } from './solutions/iterative/trace';
import matSrc from './solutions/matrix/impl.ts?raw';
import { climbStairs as mat } from './solutions/matrix/impl';
import { trace as matTrace } from './solutions/matrix/trace';

/** 1 ≤ n ≤ 15: đệ quy thuần với n = 15 đã ~1200 lời gọi, vẫn dưới giới hạn 4000 frame. */
const norm = (i: Record<string, unknown>) => ({ n: Math.max(1, Math.min(15, Math.floor(Number(i.n) || 1))) });

const problem: CompareProblem = {
  id: 'climbing-stairs',
  title: 'Climbing Stairs',
  subtitle: 'Đệ quy O(φⁿ) → memo → hai biến O(1) ★ → luỹ thừa ma trận O(log n): Fibonacci trá hình',
  difficulty: 'Easy',
  leetcode: { id: 70, slug: 'climbing-stairs' },
  tags: ['dp', 'recursion', 'math'],
  statement, comparison, interview,
  inputs: [{ key: 'n', label: 'n bậc (1–15 để xem cây đệ quy)', type: 'number', default: 5, min: 1, max: 15 }],
  presets: [
    { label: 'n = 1', values: { n: 1 } },
    { label: 'n = 2', values: { n: 2 } },
    { label: 'n = 8', values: { n: 8 } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'Bước cuối là 1 hoặc 2 bậc ⇒ ways(n) = ways(n−1) + ways(n−2).', complexity: { time: 'O(φⁿ)', space: 'O(n) stack' },
      pros: ['3 dòng, nói lên đúng trực giác "bước cuối từ đâu tới"'], cons: ['Hàm mũ: n = 45 mất hàng chục giây', 'Bài con bị tính lại rất nhiều lần'], whenToUse: 'Chỉ để dẫn dắt tới công thức truy hồi.',
      source: recSrc, run: (i) => rec(norm(i).n), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Thêm Map: mỗi ways(i) tính một lần.', complexity: { time: 'O(n)', space: 'O(n) + O(n) stack' },
      pros: ['Từ bản đệ quy thêm 2 dòng là thành O(n)', 'Dễ mở rộng khi tập bước nhảy phức tạp'], cons: ['Đệ quy sâu n tầng ⇒ có thể tràn stack', 'O(n) bộ nhớ không cần thiết'], whenToUse: 'Khi biến thể có tập bước tuỳ ý hoặc ràng buộc làm thứ tự bottom-up khó thấy.',
      source: memoSrc, run: (i) => memo(norm(i).n), trace: (i) => memoTrace(norm(i)) },
    { id: 'iterative', name: 'Bottom-up 2 biến', rank: 1, approach: 'Lăn từ ways(1) = 1, ways(2) = 2 lên, chỉ giữ hai giá trị cuối.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ, không đệ quy', '8 dòng, gần như không thể sai'], cons: ['Vẫn O(n): n = 10¹⁸ không chạy nổi'], whenToUse: 'Đáp án mặc định – ràng buộc LeetCode n ≤ 45.',
      source: itSrc, run: (i) => it(norm(i).n), trace: (i) => itTrace(norm(i)) },
    { id: 'matrix', name: 'Luỹ thừa ma trận', rank: 2, approach: 'ways(n) = F(n+1) = Qⁿ[0][0] với Q = [[1,1],[1,0]], tính Qⁿ bằng bình phương liên tiếp.', complexity: { time: 'O(log n)', space: 'O(1)' },
      pros: ['O(log n): n = 10¹⁸ (mod p) vẫn tức thời', 'Khung chung cho mọi hồi quy tuyến tính (tập bước {1..k})'], cons: ['Với n ≤ 45 không nhanh hơn thực tế, code dài và dễ nhầm chỉ số', 'Tràn số khi nhân – cần modulo/BigInt'], whenToUse: 'n cực lớn kèm modulo, hoặc khi được hỏi follow-up "n = 10⁹".',
      source: matSrc, run: (i) => mat(norm(i).n), trace: (i) => matTrace(norm(i)) },
  ],
};
export default problem;
