import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { canJump as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { canJump as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import buSrc from './solutions/bottom-up/impl.ts?raw';
import { canJump as bu } from './solutions/bottom-up/impl';
import { trace as buTrace } from './solutions/bottom-up/trace';
import greedySrc from './solutions/greedy/impl.ts?raw';
import { canJump as greedy } from './solutions/greedy/impl';
import { trace as greedyTrace } from './solutions/greedy/trace';

/** 1 ≤ n ≤ 10, 0 ≤ nums[i] ≤ 9: backtracking worst case ~2⁸ lời gọi, vẫn dưới giới hạn 4000 frame. */
const norm = (i: Record<string, unknown>) => {
  const raw = Array.isArray(i.nums) ? (i.nums as unknown[]) : [];
  const nums = raw.slice(0, 10).map((x) => Math.max(0, Math.min(9, Math.floor(Number(x) || 0))));
  return { nums: nums.length ? nums : [0] };
};

const problem: CompareProblem = {
  id: 'jump-game',
  title: 'Jump Game',
  subtitle: 'Backtracking O(2ⁿ) → memo → DP "ô tốt" O(n²) → greedy tầm với xa nhất O(n) ★',
  difficulty: 'Medium',
  leetcode: { id: 55, slug: 'jump-game' },
  tags: ['greedy', 'dynamic-programming', 'backtracking', 'array'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'Độ dài bước nhảy tối đa', type: 'number[]', default: [2, 3, 1, 1, 0, 4], min: 0, max: 9, maxLength: 10 }],
  presets: [
    { label: 'Tới được', values: { nums: [2, 3, 1, 1, 4] } },
    { label: 'Kẹt ở số 0', values: { nums: [3, 2, 1, 0, 4] } },
    { label: 'Backtracking bùng nổ', values: { nums: [6, 5, 4, 3, 2, 1, 0, 1] } },
    { label: 'Một phần tử', values: { nums: [0] } },
  ],
  solutions: [
    { id: 'recursion', name: 'Backtracking', rank: 4, approach: 'Từ ô i thử mọi bước 1..nums[i] bằng đệ quy, quay lui khi gặp ngõ cụt.', complexity: { time: 'O(2ⁿ)', space: 'O(n) stack' },
      pros: ['Dịch trực tiếp từ đề bài', 'Dễ mở rộng để in ra đường đi'], cons: ['Cùng một ô bị khám phá lại nhiều lần ⇒ hàm mũ', 'Stack sâu tới n'], whenToUse: 'Chỉ để mở đầu, cho thấy cấu trúc bài con chồng lấp.',
      source: recSrc, run: (i) => rec(norm(i).nums), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Top-down + memo', rank: 3, approach: 'Như backtracking nhưng lưu go(i) vào Map; mỗi ô chỉ tính một lần.', complexity: { time: 'O(n²)', space: 'O(n) + stack' },
      pros: ['Sửa backtracking chỉ bằng 3 dòng', 'Hết hàm mũ'], cons: ['Vẫn quét cả tầm nhảy ⇒ O(n²)', 'Đệ quy sâu n tầng – n = 10⁴ dễ tràn stack trong JS'], whenToUse: 'Khi đã có lời giải đệ quy và cần nhanh chóng hết TLE.',
      source: memoSrc, run: (i) => memo(norm(i).nums), trace: (i) => memoTrace(norm(i)) },
    { id: 'bottom-up', name: 'DP "ô tốt" từ cuối', rank: 2, approach: 'Đi từ phải sang trái: good[i] = true nếu có ô tốt trong i+1..i+nums[i].', complexity: { time: 'O(n²)', space: 'O(n)' },
      pros: ['Không đệ quy, không lo tràn stack', 'Lộ ra nhận xét dẫn tới greedy'], cons: ['Vẫn O(n²) worst case', 'O(n) bộ nhớ thừa'], whenToUse: 'Khi cần good[i] cho MỌI ô (vd truy vấn nhiều điểm xuất phát).',
      source: buSrc, run: (i) => bu(norm(i).nums), trace: (i) => buTrace(norm(i)) },
    { id: 'greedy', name: 'Greedy tầm với xa nhất', rank: 1, approach: 'Một lượt trái → phải, giữ farthest; nếu i > farthest thì kẹt.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Tối ưu cả thời gian lẫn bộ nhớ', '5 dòng, thoát sớm cả hai phía'], cons: ['Cần chứng minh bất biến "vùng tới được là đoạn liền"', 'Chỉ trả lời có/không, không cho đường đi'], whenToUse: 'Mặc định cho LC 55 và là nền cho Jump Game II.',
      source: greedySrc, run: (i) => greedy(norm(i).nums), trace: (i) => greedyTrace(norm(i)) },
  ],
};
export default problem;
