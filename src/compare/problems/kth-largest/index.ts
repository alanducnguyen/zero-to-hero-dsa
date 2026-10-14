import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import sortSrc from './solutions/sort/impl.ts?raw';
import { kthLargest as sortK } from './solutions/sort/impl';
import { trace as sortTrace } from './solutions/sort/trace';
import heapSrc from './solutions/min-heap/impl.ts?raw';
import { kthLargest as heapK } from './solutions/min-heap/impl';
import { trace as heapTrace } from './solutions/min-heap/trace';
import qsSrc from './solutions/quickselect/impl.ts?raw';
import { kthLargest as qsK } from './solutions/quickselect/impl';
import { trace as qsTrace } from './solutions/quickselect/trace';

type In = { nums: number[]; k: number };
const norm = (i: Record<string, unknown>): In => { const x = i as unknown as In; return { nums: x.nums, k: Math.max(1, Math.min(Math.floor(x.k), x.nums.length)) }; };

const problem: CompareProblem = {
  id: 'kth-largest',
  title: 'Kth Largest Element',
  subtitle: 'Sort O(n log n) → heap O(n log k) → quickselect O(n): bài mẫu về "đừng làm thừa việc"',
  difficulty: 'Medium',
  leetcode: { id: 215, slug: 'kth-largest-element-in-an-array' },
  tags: ['array', 'heap', 'quickselect', 'sorting'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [3, 2, 1, 5, 6, 4, 9, 7], min: 1, max: 20, maxLength: 10 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: 1, max: 10 },
  ],
  presets: [
    { label: 'Nhiều phần tử trùng', values: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 } },
    { label: 'k = 1 (max)', values: { nums: [7, 1, 9, 4], k: 1 } },
    { label: 'Đã sắp xếp (worst case quickselect)', values: { nums: [1, 2, 3, 4, 5, 6, 7], k: 6 } },
  ],
  solutions: [
    { id: 'sort', name: 'Sort rồi lấy', rank: 3, approach: 'Sắp xếp giảm dần, trả về phần tử ở chỉ số k − 1.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Một dòng code, khó sai', 'Có luôn toàn bộ thứ tự nếu cần'], cons: ['Làm thừa việc: sắp xếp n phần tử để lấy 1', 'Không chạy trên luồng'], whenToUse: 'n nhỏ, cần nhanh gọn, hoặc sau đó còn cần thứ tự đầy đủ.',
      source: sortSrc, run: (i) => sortK(norm(i).nums, norm(i).k), trace: (i) => sortTrace(norm(i)) },
    { id: 'min-heap', name: 'Min-heap kích thước k', rank: 2, approach: 'Giữ k phần tử lớn nhất trong min-heap; vượt k thì pop đỉnh. Đỉnh cuối cùng là đáp án.', complexity: { time: 'O(n log k)', space: 'O(k)' },
      pros: ['Chạy được trên luồng dữ liệu', 'Không sửa mảng gốc', 'Gần O(n) khi k nhỏ'], cons: ['k ≈ n/2 thì O(n log n)', 'JS không có heap sẵn, phải tự cài'], whenToUse: 'k ≪ n, dữ liệu đến dần, hoặc cấm sửa input.',
      source: heapSrc, run: (i) => heapK(norm(i).nums, norm(i).k), trace: (i) => heapTrace(norm(i)) },
    { id: 'quickselect', name: 'Quickselect', rank: 1, approach: 'Partition quanh pivot, chỉ tiếp tục ở bên chứa chỉ số n − k.', complexity: { time: 'O(n) trung bình', space: 'O(1)' },
      pros: ['Tuyến tính trung bình, không phụ thuộc k', 'O(1) bộ nhớ phụ'], cons: ['Worst case O(n²) nếu pivot tệ (cần random)', 'Xáo trộn mảng', 'Không dùng cho luồng'], whenToUse: 'Mảng tĩnh, được sửa, k bất kỳ – đáp án tối ưu mặc định.',
      source: qsSrc, run: (i) => qsK(norm(i).nums, norm(i).k), trace: (i) => qsTrace(norm(i)) },
  ],
};
export default problem;
