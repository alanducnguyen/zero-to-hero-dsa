import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { lengthOfLIS as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import dpSrc from './solutions/dp/impl.ts?raw';
import { lengthOfLIS as dp } from './solutions/dp/impl';
import { trace as dpTrace } from './solutions/dp/trace';
import patSrc from './solutions/patience/impl.ts?raw';
import { lengthOfLIS as pat } from './solutions/patience/impl';
import { trace as patTrace } from './solutions/patience/trace';

/** Tối đa 9 phần tử: brute force O(2ⁿ) vẫn nằm trong giới hạn frame. */
const norm = (i: Record<string, unknown>) => ({ nums: ((i.nums as number[]) ?? []).map((x) => Math.floor(Number(x)) || 0).slice(0, 9) });

const problem: CompareProblem = {
  id: 'longest-increasing-subsequence',
  title: 'Longest Increasing Subsequence',
  subtitle: 'Lấy/bỏ O(2ⁿ) → DP O(n²) → patience sorting + tìm nhị phân O(n log n) ★',
  difficulty: 'Medium',
  leetcode: { id: 300, slug: 'longest-increasing-subsequence' },
  tags: ['dp', 'binary-search', 'recursion'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums (tối đa 9 phần tử)', type: 'number[]', default: [10, 9, 2, 5, 3, 7, 101, 18], min: -50, max: 200, maxLength: 9 }],
  presets: [
    { label: 'Có phần tử trùng', values: { nums: [0, 1, 0, 3, 2, 3] } },
    { label: 'Toàn bằng nhau', values: { nums: [7, 7, 7, 7, 7] } },
    { label: 'Tăng dần (worst case brute)', values: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9] } },
    { label: 'tails ≠ dãy thật', values: { nums: [3, 4, 5, 1] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Đệ quy lấy/bỏ', rank: 3, approach: 'go(i, prev): bỏ nums[i], hoặc lấy nếu lớn hơn phần tử lấy trước; lấy max.', complexity: { time: 'O(2ⁿ)', space: 'O(n) stack' },
      pros: ['Hiển nhiên đúng: duyệt mọi dãy con', 'Trạng thái (i, prev) dẫn thẳng tới memo O(n²)'], cons: ['Hàm mũ: n = 30 đã ~10⁹ lời gọi', 'Cùng (i, prev) bị giải lại nhiều lần'], whenToUse: 'Chỉ để mở đầu và tìm ra trạng thái DP.',
      source: bruteSrc, run: (i) => brute(norm(i).nums), trace: (i) => bruteTrace(norm(i)) },
    { id: 'dp', name: 'DP O(n²)', rank: 2, approach: 'dp[i] = 1 + max dp[j] với j < i và nums[j] < nums[i]; đáp án là max dp.', complexity: { time: 'O(n²)', space: 'O(n)' },
      pros: ['Ngắn, dễ giải thích', 'Thêm mảng cha là truy được dãy thật', 'Mở rộng sang đếm số LIS, LIS có trọng số, so sánh 2 chiều'], cons: ['n = 10⁵ là 5·10⁹ phép so sánh'], whenToUse: 'n ≤ ~5000, hoặc khi cần đếm/khôi phục dãy hay điều kiện so sánh phức tạp.',
      source: dpSrc, run: (i) => dp(norm(i).nums), trace: (i) => dpTrace(norm(i)) },
    { id: 'patience', name: 'Patience sorting + nhị phân', rank: 1, approach: 'Giữ tails[k] = đuôi nhỏ nhất của dãy tăng dài k+1; mỗi x thay vào vị trí lower_bound.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['O(n log n): n = 10⁵ tức thời', 'Code chỉ ~12 dòng'], cons: ['tails không phải dãy LIS thật – khôi phục cần thêm mảng chỉ số + cha', 'Khó chứng minh hơn, dễ nhầm < với ≤ (tăng ngặt vs không giảm)'], whenToUse: 'Mặc định khi chỉ cần độ dài và n lớn; nền cho Russian Doll Envelopes.',
      source: patSrc, run: (i) => pat(norm(i).nums), trace: (i) => patTrace(norm(i)) },
  ],
};
export default problem;
