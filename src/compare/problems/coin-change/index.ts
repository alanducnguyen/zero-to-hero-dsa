import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { coinChange as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { coinChange as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import buSrc from './solutions/bottom-up/impl.ts?raw';
import { coinChange as bu } from './solutions/bottom-up/impl';
import { trace as buTrace } from './solutions/bottom-up/trace';
import bfsSrc from './solutions/bfs/impl.ts?raw';
import { coinChange as bfs } from './solutions/bfs/impl';
import { trace as bfsTrace } from './solutions/bfs/trace';

/** Mệnh giá nguyên dương 1..10, không trùng (trùng làm đệ quy thuần nổ), tối đa 5 đồng; amount ≤ 10 để cây đệ quy còn xem được. */
const norm = (i: Record<string, unknown>) => {
  const coins = [...new Set(((i.coins as number[]) ?? []).map((c) => Math.floor(Number(c))).filter((c) => c >= 1 && c <= 10))].slice(0, 5);
  const amount = Math.max(0, Math.min(10, Math.floor(Number(i.amount) || 0)));
  return { coins, amount };
};

const problem: CompareProblem = {
  id: 'coin-change',
  title: 'Coin Change',
  subtitle: 'Đệ quy hàm mũ → memo → bottom-up DP ★ → BFS theo tầng; và vì sao tham lam (greedy) sai',
  difficulty: 'Medium',
  leetcode: { id: 322, slug: 'coin-change' },
  tags: ['dp', 'recursion', 'bfs'],
  statement, comparison, interview,
  inputs: [
    { key: 'coins', label: 'coins (mệnh giá 1–10, tối đa 5)', type: 'number[]', default: [1, 3, 4], min: 1, max: 10, maxLength: 5 },
    { key: 'amount', label: 'amount (≤ 10)', type: 'number', default: 6, min: 0, max: 10 },
  ],
  presets: [
    { label: 'Kinh điển [1,2,5], 10', values: { coins: [1, 2, 5], amount: 10 } },
    { label: 'Không đổi được', values: { coins: [2], amount: 3 } },
    { label: 'amount = 0', values: { coins: [1], amount: 0 } },
    { label: 'Không có đồng 1', values: { coins: [3, 7], amount: 10 } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'best(rem) = 1 + min best(rem − c) với mọi đồng c ≤ rem; thử mọi đồng làm đồng cuối.', complexity: { time: 'O(k^(amount/min c))', space: 'O(amount) stack' },
      pros: ['Dịch thẳng công thức truy hồi, dễ chứng minh đúng', 'Là bước đệm tự nhiên sang memo'], cons: ['Hàm mũ: amount = 30 với [1,2,5] đã hàng triệu lời gọi', 'Cùng một rem bị giải lại vô số lần'], whenToUse: 'Chỉ để mở đầu phỏng vấn và chỉ ra overlapping subproblems.',
      source: recSrc, run: (i) => rec(norm(i).coins, norm(i).amount), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'Như đệ quy nhưng lưu best(rem) vào Map; mỗi rem chỉ giải một lần.', complexity: { time: 'O(amount·k)', space: 'O(amount) memo + stack' },
      pros: ['Thêm 2 dòng vào bản đệ quy là xong', 'Chỉ giải các rem thực sự chạm tới'], cons: ['Stack đệ quy sâu tới amount ⇒ tràn với amount = 10⁴ trong JS', 'Overhead Map + lời gọi hàm'], whenToUse: 'Khi bạn nghĩ ra công thức đệ quy trước và amount nhỏ/vừa.',
      source: memoSrc, run: (i) => memo(norm(i).coins, norm(i).amount), trace: (i) => memoTrace(norm(i)) },
    { id: 'bottom-up', name: 'Bottom-up DP', rank: 1, approach: 'dp[a] = min(dp[a − c] + 1), điền mảng từ a = 1 tới amount.', complexity: { time: 'O(amount·k)', space: 'O(amount)' },
      pros: ['Không đệ quy, không tràn stack', 'Hai vòng lặp, hằng số nhỏ, cache-friendly', 'Dễ thêm mảng cha để truy ra các đồng đã dùng'], cons: ['Luôn tính đủ mọi a ≤ amount kể cả không cần', 'O(amount) bộ nhớ – amount 10⁹ không khả thi'], whenToUse: 'Mặc định khi phỏng vấn và trong thực tế với amount ≤ ~10⁷.',
      source: buSrc, run: (i) => bu(norm(i).coins, norm(i).amount), trace: (i) => buTrace(norm(i)) },
    { id: 'bfs', name: 'BFS theo số tiền', rank: 2, approach: 'Đỉnh = tổng đã gom, cạnh = thêm một đồng; BFS từ 0, tầng đầu chạm amount là đáp án.', complexity: { time: 'O(amount·k)', space: 'O(amount)' },
      pros: ['Dừng sớm khi đáp án nhỏ (ít đồng mệnh giá lớn)', 'Góc nhìn đồ thị: shortest path trọng số đơn vị'], cons: ['Cần Set + queue, code dài hơn DP', 'Worst case (−1) vẫn duyệt mọi tổng', 'Khó mở rộng sang biến thể đếm số cách'], whenToUse: 'Khi đáp án thường nhỏ so với amount, hoặc khi muốn trình bày dưới dạng shortest path.',
      source: bfsSrc, run: (i) => bfs(norm(i).coins, norm(i).amount), trace: (i) => bfsTrace(norm(i)) },
  ],
};
export default problem;
