import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { maxArea as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import prunedSrc from './solutions/brute-pruned/impl.ts?raw';
import { maxArea as pruned } from './solutions/brute-pruned/impl';
import { trace as prunedTrace } from './solutions/brute-pruned/trace';
import tpSrc from './solutions/two-pointers/impl.ts?raw';
import { maxArea as tp } from './solutions/two-pointers/impl';
import { trace as tpTrace } from './solutions/two-pointers/trace';

/** n ≤ 16, 0 ≤ height[i] ≤ 99: brute force tối đa 120 cặp ⇒ ~120 frame. */
const norm = (i: Record<string, unknown>) => {
  const raw = Array.isArray(i.height) ? (i.height as unknown[]) : [];
  return { height: raw.slice(0, 16).map((x) => Math.max(0, Math.min(99, Math.floor(Number(x) || 0)))) };
};

const problem: CompareProblem = {
  id: 'container-with-most-water',
  title: 'Container With Most Water',
  subtitle: 'Thử mọi cặp O(n²) → cắt tỉa theo cận trên → hai con trỏ dịch tường thấp O(n) ★',
  difficulty: 'Medium',
  leetcode: { id: 11, slug: 'container-with-most-water' },
  tags: ['two-pointers', 'array', 'greedy'],
  statement, comparison, interview,
  inputs: [{ key: 'height', label: 'Chiều cao các tường', type: 'number[]', default: [1, 8, 6, 2, 5, 4, 8, 3, 7], min: 0, max: 99, maxLength: 16 }],
  presets: [
    { label: 'Tăng dần (cắt tỉa tốt)', values: { height: [1, 2, 3, 4, 5, 6, 7, 8] } },
    { label: 'Giảm dần (cắt tỉa kém)', values: { height: [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1] } },
    { label: 'Hai tường cao ở giữa', values: { height: [2, 3, 10, 5, 7, 8, 9] } },
    { label: 'Bằng nhau', values: { height: [4, 4, 4, 4] } },
    { label: 'Hai tường', values: { height: [1, 1] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force mọi cặp', rank: 3, approach: 'Thử mọi cặp (i, j), diện tích = min(height[i], height[j]) × (j − i).', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng', 'Làm rõ công thức diện tích'], cons: ['Luôn đúng n(n−1)/2 cặp, kể cả khi đáp án rõ ràng', 'n = 10⁵ ⇒ TLE'], whenToUse: 'Mở đầu phỏng vấn, hoặc làm oracle để test lời giải tối ưu.',
      source: bruteSrc, run: (i) => brute(norm(i).height), trace: (i) => bruteTrace(norm(i)) },
    { id: 'brute-pruned', name: 'Brute force + cắt tỉa', rank: 2, approach: 'Cố định i, duyệt j từ xa về gần; dừng khi height[i] × (j − i) ≤ best vì không thể vượt.', complexity: { time: 'O(n²) worst', space: 'O(1)' },
      pros: ['Vẫn đơn giản như brute force', 'Trên dữ liệu ngẫu nhiên cắt được rất nhiều cặp'], cons: ['Worst case vẫn Θ(n²) (vd mảng giảm dần: ~40% số cặp)', 'Tốc độ phụ thuộc dữ liệu, khó cam kết'], whenToUse: 'Khi chưa nghĩ ra two pointers và cần một bước cải tiến có lập luận cận trên.',
      source: prunedSrc, run: (i) => pruned(norm(i).height), trace: (i) => prunedTrace(norm(i)) },
    { id: 'two-pointers', name: 'Hai con trỏ', rank: 1, approach: 'Bắt đầu hai đầu, tính diện tích, luôn dịch con trỏ ở tường thấp hơn vào trong.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(n) đảm bảo, một lượt', 'Code 8 dòng'], cons: ['Cần chứng minh vì sao bỏ tường thấp không mất đáp án', 'Không trả về được mọi cặp tốt'], whenToUse: 'Mặc định cho LC 11.',
      source: tpSrc, run: (i) => tp(norm(i).height), trace: (i) => tpTrace(norm(i)) },
  ],
};
export default problem;
