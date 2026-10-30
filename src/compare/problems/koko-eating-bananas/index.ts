import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import linSrc from './solutions/linear/impl.ts?raw';
import { minEatingSpeed as lin } from './solutions/linear/impl';
import { trace as linTrace } from './solutions/linear/trace';
import bsSrc from './solutions/binary-search/impl.ts?raw';
import { minEatingSpeed as bs } from './solutions/binary-search/impl';
import { trace as bsTrace } from './solutions/binary-search/trace';
import tightSrc from './solutions/tight-bounds/impl.ts?raw';
import { minEatingSpeed as tight } from './solutions/tight-bounds/impl';
import { trace as tightTrace } from './solutions/tight-bounds/trace';

/** Đống 1..30, tối đa 8 đống (không rỗng); h kẹp vào [n, 100] vì h < n thì vô nghiệm. Quét tuyến tính ≤ 30 frame. */
const norm = (i: Record<string, unknown>) => {
  const raw = ((i.piles as number[]) ?? []).map((x) => Math.floor(Number(x))).filter((x) => x >= 1 && x <= 30).slice(0, 8);
  const piles = raw.length ? raw : [1];
  const h = Math.max(piles.length, Math.min(100, Math.floor(Number(i.h) || 0)));
  return { piles, h };
};

const problem: CompareProblem = {
  id: 'koko-eating-bananas',
  title: 'Koko Eating Bananas',
  subtitle: 'Thử từng tốc độ O(n·max) → binary search trên đáp án O(n·log max) ★ → cận chặt bằng toán: nhanh hơn bao nhiêu?',
  difficulty: 'Medium',
  leetcode: { id: 875, slug: 'koko-eating-bananas' },
  tags: ['binary-search', 'binary-search-on-answer', 'monotonic-predicate'],
  statement, comparison, interview,
  inputs: [
    { key: 'piles', label: 'piles (1–30, tối đa 8 đống)', type: 'number[]', default: [3, 6, 7, 11], min: 1, max: 30, maxLength: 8 },
    { key: 'h', label: 'h (số giờ, ≥ số đống)', type: 'number', default: 8, min: 1, max: 100 },
  ],
  presets: [
    { label: 'h = số đống', values: { piles: [30, 11, 23, 4, 20], h: 5 } },
    { label: 'Dư 1 giờ', values: { piles: [30, 11, 23, 4, 20], h: 6 } },
    { label: 'Rất nhiều giờ', values: { piles: [5, 9, 2], h: 30 } },
    { label: 'Đống lớn, đáp án cao', values: { piles: [29, 30, 28, 27], h: 5 } },
  ],
  solutions: [
    { id: 'linear', name: 'Quét tuyến tính k = 1..max', rank: 3, approach: 'Thử lần lượt k = 1, 2, …; tốc độ đầu tiên ăn kịp là đáp án.', complexity: { time: 'O(n · max)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng', 'Nhanh khi đáp án nhỏ (h rất lớn)'], cons: ['max = 10⁹ ⇒ 10⁹ · n phép tính, TLE', 'Bỏ phí tính đơn điệu của vị từ'], whenToUse: 'Chỉ để mở đầu, hoặc biết chắc đáp án rất nhỏ.',
      source: linSrc, run: (i) => lin(norm(i).piles, norm(i).h), trace: (i) => linTrace(norm(i)) },
    { id: 'binary-search', name: 'Binary search trên [1, max]', rank: 1, approach: 'Vị từ "kịp với k" đơn điệu ⇒ binary search tìm k nhỏ nhất làm vị từ đúng.', complexity: { time: 'O(n · log max)', space: 'O(1)' },
      pros: ['log₂(10⁹) ≈ 30 lần thử', 'Khung chuẩn dùng lại cho cả họ bài "binary search on answer"', 'Cận đơn giản, khó sai'], cons: ['Phải chứng minh tính đơn điệu', 'Dễ lỗi off-by-one nếu trộn hai kiểu cập nhật'], whenToUse: 'Mặc định trong phỏng vấn.',
      source: bsSrc, run: (i) => bs(norm(i).piles, norm(i).h), trace: (i) => bsTrace(norm(i)) },
    { id: 'tight-bounds', name: 'Binary search cận chặt', rank: 2, approach: 'Thu hẹp khoảng trước khi tìm: lo = ⌈sum/h⌉, hi = min(max, ⌈sum/(h−n)⌉) khi h > n.', complexity: { time: 'O(n · log max) worst case', space: 'O(1)' },
      pros: ['Ít vòng hơn khi h ≫ n (khoảng có thể co về vài giá trị)', 'Thể hiện tư duy chặn cận bằng toán'], cons: ['Cùng Big-O worst case (h = n ⇒ hi vẫn là max)', 'Thêm một O(n) tính sum và công thức cần chứng minh', 'Nguy cơ tràn số / chia cho 0 nếu viết ẩu'], whenToUse: 'Follow-up "có tối ưu thêm được không?" hoặc khi mỗi lần thử vị từ rất đắt.',
      source: tightSrc, run: (i) => tight(norm(i).piles, norm(i).h), trace: (i) => tightTrace(norm(i)) },
  ],
};
export default problem;
