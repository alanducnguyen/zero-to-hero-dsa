import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { maxProfit as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import sufSrc from './solutions/suffix-max/impl.ts?raw';
import { maxProfit as suffix } from './solutions/suffix-max/impl';
import { trace as sufTrace } from './solutions/suffix-max/trace';
import oneSrc from './solutions/one-pass/impl.ts?raw';
import { maxProfit as onePass } from './solutions/one-pass/impl';
import { trace as oneTrace } from './solutions/one-pass/trace';

type In = { prices: number[] };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'best-time-to-buy-sell-stock',
  title: 'Best Time to Buy and Sell Stock',
  subtitle: 'Từ thử mọi cặp O(n²) tới mảng max hậu tố, rồi một lượt giữ giá thấp nhất O(n)/O(1)',
  difficulty: 'Easy',
  leetcode: { id: 121, slug: 'best-time-to-buy-and-sell-stock' },
  tags: ['array', 'greedy', 'prefix-suffix', 'kadane'],
  statement, comparison, interview,
  inputs: [{ key: 'prices', label: 'Giá theo ngày', type: 'number[]', default: [7, 1, 5, 3, 6, 4], min: 0, max: 99, maxLength: 16 }],
  presets: [
    { label: 'Giảm dần (lời 0)', values: { prices: [7, 6, 4, 3, 1] } },
    { label: 'Đáy mới sau đỉnh', values: { prices: [3, 8, 2, 5, 1, 4, 9] } },
    { label: 'Tăng dần', values: { prices: [1, 2, 3, 4, 5] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force mọi cặp', rank: 3, approach: 'Thử mọi cặp (mua i, bán j) với i < j, giữ chênh lệch lớn nhất.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng', 'O(1) bộ nhớ'], cons: ['n = 10⁵ ⇒ 5·10⁹ cặp, TLE', 'Lặp lại cùng truy vấn min tiền tố'], whenToUse: 'Chỉ để mở đầu hoặc kiểm tra chéo lời giải tối ưu.',
      source: bruteSrc, run: (i) => brute(cast(i).prices), trace: (i) => bruteTrace(cast(i)) },
    { id: 'suffix-max', name: 'Mảng max hậu tố', rank: 2, approach: 'Tính sufMax[i] = giá cao nhất từ ngày i trở đi (duyệt ngược), rồi lấy max(sufMax[i] − prices[i]).', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['O(n), dễ chứng minh', 'Kỹ thuật prefix/suffix tái dùng cho bài 123, Trapping Rain Water'], cons: ['Thừa O(n) bộ nhớ', 'Hai lượt duyệt, không chạy được trên stream'], whenToUse: 'Khi cần trả lời nhiều truy vấn theo ngày mua, hoặc làm bước đệm trước lời giải O(1).',
      source: sufSrc, run: (i) => suffix(cast(i).prices), trace: (i) => sufTrace(cast(i)) },
    { id: 'one-pass', name: 'Một lượt giữ min', rank: 1, approach: 'Duyệt xuôi, nhớ giá thấp nhất đã thấy; mỗi ngày thử bán với giá mua là min đó.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Một lượt, O(1) bộ nhớ', 'Chạy được trên stream giá real-time', 'Liên hệ trực tiếp Kadane'], cons: ['Không trực tiếp mở rộng cho k giao dịch (cần DP)'], whenToUse: 'Đáp án mặc định cho bài một giao dịch.',
      source: oneSrc, run: (i) => onePass(cast(i).prices), trace: (i) => oneTrace(cast(i)) },
  ],
};
export default problem;
