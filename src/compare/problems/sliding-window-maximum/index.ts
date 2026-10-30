import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { maxSlidingWindow as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import heapSrc from './solutions/max-heap/impl.ts?raw';
import { maxSlidingWindow as heap } from './solutions/max-heap/impl';
import { trace as heapTrace } from './solutions/max-heap/trace';
import dequeSrc from './solutions/monotonic-deque/impl.ts?raw';
import { maxSlidingWindow as deque } from './solutions/monotonic-deque/impl';
import { trace as dequeTrace } from './solutions/monotonic-deque/trace';

type In = { nums: number[]; k: number };
/** Giới hạn input: tối đa 14 phần tử, 1 ≤ k ≤ n (đề đảm bảo). */
const norm = (i: Record<string, unknown>): In => {
  const nums = (Array.isArray(i.nums) ? i.nums : []).map(Number).filter((x) => Number.isFinite(x)).slice(0, 14);
  const k = Math.max(1, Math.min(Math.floor(Number(i.k) || 1), Math.max(1, nums.length)));
  return { nums, k };
};

const problem: CompareProblem = {
  id: 'sliding-window-maximum',
  title: 'Sliding Window Maximum',
  subtitle: 'Quét lại từng cửa sổ → max-heap xoá lười → monotonic deque O(n)',
  difficulty: 'Hard',
  leetcode: { id: 239, slug: 'sliding-window-maximum' },
  tags: ['sliding-window', 'deque', 'monotonic', 'heap'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [1, 3, -1, -3, 5, 3, 6, 7], min: -20, max: 20, maxLength: 14 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: 1, max: 14 },
  ],
  presets: [
    { label: 'Giảm dần (deque đầy)', values: { nums: [9, 8, 7, 6, 5, 4], k: 3 } },
    { label: 'Tăng dần (heap phình)', values: { nums: [1, 2, 3, 4, 5, 6], k: 2 } },
    { label: 'k = n', values: { nums: [4, 2, 8, 1], k: 4 } },
    { label: 'Có giá trị trùng', values: { nums: [5, 5, 1, 5, 2, 2, 2], k: 2 } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 3, approach: 'Mỗi cửa sổ quét lại cả k phần tử để lấy max.', complexity: { time: 'O(n·k)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng, code 6 dòng', 'Không bộ nhớ phụ, rất nhanh khi k nhỏ'], cons: ['Vứt bỏ k−1 phần tử chung giữa hai cửa sổ', 'n·k có thể tới 2.5·10⁹'], whenToUse: 'Mở đầu phỏng vấn, hoặc k rất nhỏ (≤ ~8).',
      source: bruteSrc, run: (i) => { const x = norm(i); return brute(x.nums, x.k); }, trace: (i) => bruteTrace(norm(i)) },
    { id: 'max-heap', name: 'Max-heap + lazy removal', rank: 2, approach: 'Đẩy [giá trị, chỉ số] vào max-heap; chỉ pop đỉnh khi chỉ số đã ra khỏi cửa sổ.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Dễ nghĩ ra từ "cần max nhanh"', 'Lazy removal tái dùng cho median cửa sổ (LC 480)'], cons: ['Heap phình tới n phần tử', 'Phải tự cài heap trong JS/TS', 'Chậm hơn deque một hệ số log n'], whenToUse: 'Khi không nghĩ ra deque, hoặc cửa sổ cần truy vấn phức tạp hơn max (dùng TreeMap/multiset O(n log k)).',
      source: heapSrc, run: (i) => { const x = norm(i); return heap(x.nums, x.k); }, trace: (i) => heapTrace(norm(i)) },
    { id: 'monotonic-deque', name: 'Monotonic deque', rank: 1, approach: 'Giữ deque chỉ số có giá trị giảm dần; bỏ đuôi bị số mới "đè", bỏ đầu khi hết hạn; đầu deque là max.', complexity: { time: 'O(n)', space: 'O(k)' },
      pros: ['O(n) amortized, độc lập với k', 'O(k) bộ nhớ – chạy được trên stream', 'Mỗi cửa sổ lấy max O(1)'], cons: ['Khó nghĩ ra nếu chưa gặp', 'Dễ nhầm lưu giá trị thay vì chỉ số', 'Chỉ trả lời max (hoặc min), không trả lời k-th'], whenToUse: 'Mặc định cho max/min cửa sổ trượt và DP tối ưu bằng cửa sổ (LC 1696, 862).',
      source: dequeSrc, run: (i) => { const x = norm(i); return deque(x.nums, x.k); }, trace: (i) => dequeTrace(norm(i)) },
  ],
};
export default problem;
