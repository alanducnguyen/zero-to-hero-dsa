import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { parse } from './viz';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { mergeIntervals as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import sortSrc from './solutions/sort-sweep/impl.ts?raw';
import { mergeIntervals as sortSweep } from './solutions/sort-sweep/impl';
import { trace as sortTrace } from './solutions/sort-sweep/trace';
import lineSrc from './solutions/line-sweep/impl.ts?raw';
import { mergeIntervals as lineSweep } from './solutions/line-sweep/impl';
import { trace as lineTrace } from './solutions/line-sweep/trace';

const norm = (i: Record<string, unknown>) => ({ intervals: parse(i.intervals) });

const problem: CompareProblem = {
  id: 'merge-intervals',
  title: 'Merge Intervals',
  subtitle: 'Gộp mọi cặp O(n³) → sort + quét O(n log n) → đếm trên trục O(n + R): khi nào miền toạ độ nhỏ thắng sort',
  difficulty: 'Medium',
  leetcode: { id: 56, slug: 'merge-intervals' },
  tags: ['intervals', 'sorting', 'sweep-line', 'prefix-sum'],
  statement, comparison, interview,
  inputs: [{ key: 'intervals', label: 'Các khoảng "a-b"', type: 'string[]', default: ['1-3', '8-10', '2-6', '15-18', '9-12', '16-17'], maxLength: 10 }],
  presets: [
    { label: 'Chạm đầu mút', values: { intervals: ['1-4', '4-5', '7-8'] } },
    { label: 'Liền kề nhưng không chạm', values: { intervals: ['1-2', '3-4', '6-6', '5-5'] } },
    { label: 'Lồng nhau', values: { intervals: ['1-10', '2-3', '4-5', '11-12'] } },
    { label: 'Chuỗi gộp dây chuyền', values: { intervals: ['9-10', '7-8', '5-7', '3-5', '1-3', '8-9'] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Gộp cặp tới khi ổn định', rank: 3, approach: 'Lặp: tìm bất kỳ cặp nào chồng lấn, gộp thành một, quét lại từ đầu; dừng khi một lượt không gộp được gì.', complexity: { time: 'O(n³)', space: 'O(n)' },
      pros: ['Trực giác nhất: "còn chồng thì còn gộp"', 'Không cần sort hay giả định gì về toạ độ'], cons: ['O(n³): mỗi lần gộp quét lại O(n²) cặp', 'splice giữa mảng tốn thêm O(n)'], whenToUse: 'Chỉ để khởi động trong phỏng vấn hoặc n vài chục.',
      source: bruteSrc, run: (i) => brute(norm(i).intervals), trace: (i) => bruteTrace(norm(i)) },
    { id: 'line-sweep', name: 'Đếm trên trục (line sweep +1/−1)', rank: 2, approach: '+1 tại start, −1 ngay sau end trên mảng đếm theo toạ độ (nhân đôi), prefix sum; vùng phủ > 0 liên tục là một khoảng gộp.', complexity: { time: 'O(n + R)', space: 'O(R)' },
      pros: ['Không sort: tuyến tính khi R = max − min nhỏ', 'Cùng khung với Meeting Rooms II, Car Pooling, "đếm độ phủ"'], cons: ['R = 10⁹ ⇒ không cấp nổi mảng', 'Dễ sai biên: phải xử lý khoảng chạm đầu mút và khoảng một điểm'], whenToUse: 'Toạ độ nguyên trong miền nhỏ (giờ trong ngày, phút, ô lịch), hoặc cần thêm độ phủ tại mọi điểm.',
      source: lineSrc, run: (i) => lineSweep(norm(i).intervals), trace: (i) => lineTrace(norm(i)) },
    { id: 'sort-sweep', name: 'Sort + quét một lượt', rank: 1, approach: 'Sắp xếp theo start; mỗi khoảng chỉ cần so với khoảng cuối của kết quả – chồng thì kéo dài end, không thì mở khoảng mới.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Không phụ thuộc miền toạ độ (số thực, 10⁹ đều được)', 'Code 10 dòng, dễ chứng minh', 'Là đáp án mong đợi'], cons: ['Sort là nút cổ chai O(n log n)', 'Cần O(n) cho bản sao / kết quả'], whenToUse: 'Mặc định cho mọi input tổng quát.',
      source: sortSrc, run: (i) => sortSweep(norm(i).intervals), trace: (i) => sortTrace(norm(i)) },
  ],
};
export default problem;
