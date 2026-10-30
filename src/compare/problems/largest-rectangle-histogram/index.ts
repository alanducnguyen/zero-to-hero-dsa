import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bfSrc from './solutions/brute-force/impl.ts?raw';
import { largestRectangleArea as bf } from './solutions/brute-force/impl';
import { trace as bfTrace } from './solutions/brute-force/trace';
import dcSrc from './solutions/divide-conquer/impl.ts?raw';
import { largestRectangleArea as dc } from './solutions/divide-conquer/impl';
import { trace as dcTrace } from './solutions/divide-conquer/trace';
import nsSrc from './solutions/nearest-smaller/impl.ts?raw';
import { largestRectangleArea as ns } from './solutions/nearest-smaller/impl';
import { trace as nsTrace } from './solutions/nearest-smaller/trace';
import stSrc from './solutions/stack/impl.ts?raw';
import { largestRectangleArea as st } from './solutions/stack/impl';
import { trace as stTrace } from './solutions/stack/trace';

/** Chiều cao nguyên 0..20, tối đa 12 cột ⇒ brute force ≤ 78 frame. */
const norm = (i: Record<string, unknown>) => ({
  heights: ((i.heights as number[]) ?? []).map((x) => Math.floor(Number(x))).filter((x) => x >= 0 && x <= 20).slice(0, 12),
});

const problem: CompareProblem = {
  id: 'largest-rectangle-histogram',
  title: 'Largest Rectangle in Histogram',
  subtitle: 'Mọi cặp O(n²) → chia để trị tại cột thấp nhất → biên "cột thấp hơn gần nhất" → một lượt monotonic stack ★',
  difficulty: 'Hard',
  leetcode: { id: 84, slug: 'largest-rectangle-in-histogram' },
  tags: ['array', 'monotonic-stack', 'divide-and-conquer'],
  statement, comparison, interview,
  inputs: [{ key: 'heights', label: 'heights', type: 'number[]', default: [2, 1, 5, 6, 2, 3], min: 0, max: 20, maxLength: 12 }],
  presets: [
    { label: 'Tăng dần (D&C xấu nhất)', values: { heights: [1, 2, 3, 4, 5, 6] } },
    { label: 'Bằng nhau', values: { heights: [3, 3, 3, 3] } },
    { label: 'Có cột 0', values: { heights: [4, 0, 2, 2, 0, 3, 3, 3] } },
    { label: 'Một cột', values: { heights: [7] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force (mọi cặp)', rank: 4, approach: 'Cố định cột trái i, mở rộng j sang phải, duy trì chiều cao nhỏ nhất trong đoạn; diện tích = minH × rộng.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Đúng hiển nhiên, 8 dòng', 'O(1) bộ nhớ'], cons: ['n = 10⁵ ⇒ 5·10⁹ phép tính: TLE'], whenToUse: 'Đặt baseline và kiểm chứng lời giải nhanh.',
      source: bfSrc, run: (i) => bf(norm(i).heights), trace: (i) => bfTrace(norm(i)) },
    { id: 'divide-conquer', name: 'Chia để trị', rank: 3, approach: 'Hình tối ưu hoặc chứa cột thấp nhất (thì trải hết đoạn), hoặc nằm hẳn bên trái/phải nó ⇒ đệ quy hai nửa.', complexity: { time: 'O(n log n) TB, O(n²) xấu nhất', space: 'O(n) stack đệ quy' },
      pros: ['Lập luận đẹp, dễ chứng minh', 'Dùng segment tree tìm min ⇒ O(n log n) chắc chắn'], cons: ['Mảng đã sắp xếp ⇒ O(n²) và đệ quy sâu n', 'Bản O(n log n) chắc chắn cần segment tree – code dài'], whenToUse: 'Khi muốn thể hiện tư duy chia để trị, hoặc làm cầu nối sang stack.',
      source: dcSrc, run: (i) => dc(norm(i).heights), trace: (i) => dcTrace(norm(i)) },
    { id: 'nearest-smaller', name: 'Cột thấp hơn gần nhất (2 lượt)', rank: 2, approach: 'Mỗi cột i là chiều cao của một ứng viên; dùng monotonic stack tìm cột thấp hơn gần nhất bên trái và phải, diện tích = h[i] × (right − left − 1).', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['O(n), dễ giải thích nhất', 'left/right tái dùng cho bài khác (Maximal Rectangle, sum of subarray minimums)'], cons: ['Ba lượt, hai mảng phụ', 'Dễ sai > vs ≥ khi có cột bằng nhau'], whenToUse: 'Khi muốn lời giải tuyến tính mà mỗi bước đều chứng minh được rõ ràng.',
      source: nsSrc, run: (i) => ns(norm(i).heights), trace: (i) => nsTrace(norm(i)) },
    { id: 'stack', name: 'Monotonic stack một lượt', rank: 1, approach: 'Stack chỉ số chiều cao tăng dần; khi cột mới không cao hơn đỉnh, pop đỉnh và tính diện tích với biên phải = i, biên trái = phần tử dưới nó. Cột ảo 0 ở cuối xả stack.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Một lượt, ~12 dòng', 'Mỗi chỉ số push/pop đúng một lần', 'Là khuôn cho Maximal Rectangle'], cons: ['Biên trái "phần tử dưới trong stack" khó thấy ngay', 'Quên cột ảo cuối ⇒ sót hình'], whenToUse: 'Mặc định khi phỏng vấn.',
      source: stSrc, run: (i) => st(norm(i).heights), trace: (i) => stTrace(norm(i)) },
  ],
};
export default problem;
