import type { CompareProblem } from '@/compare/types';
import type { Frame } from '@/engine/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { norm } from './count';
import sortSrc from './solutions/sort/impl.ts?raw';
import { topKFrequent as sortK } from './solutions/sort/impl';
import { trace as sortTrace } from './solutions/sort/trace';
import heapSrc from './solutions/min-heap/impl.ts?raw';
import { topKFrequent as heapK } from './solutions/min-heap/impl';
import { trace as heapTrace } from './solutions/min-heap/trace';
import bucketSrc from './solutions/bucket-sort/impl.ts?raw';
import { topKFrequent as bucketK } from './solutions/bucket-sort/impl';
import { trace as bucketTrace } from './solutions/bucket-sort/trace';

/** Đề cho phép trả về theo thứ tự bất kỳ ⇒ sắp tăng dần để so sánh các lời giải. */
const asc = (r: number[]) => [...r].sort((a, b) => a - b);
function* sorted(g: Generator<Frame, number[]>): Generator<Frame, number[]> { return asc(yield* g); }

const problem: CompareProblem = {
  id: 'top-k-frequent',
  title: 'Top K Frequent Elements',
  subtitle: 'Sort O(n log n) → min-heap O(n log k) → bucket sort O(n): khi count bị chặn bởi n, đừng so sánh nữa',
  difficulty: 'Medium',
  leetcode: { id: 347, slug: 'top-k-frequent-elements' },
  tags: ['hashmap', 'heap', 'bucket-sort', 'top-k'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [1, 1, 1, 2, 2, 3, 4, 4, 4, 4], min: 0, max: 9, maxLength: 12 },
    { key: 'k', label: 'k', type: 'number', default: 2, min: 1, max: 5 },
  ],
  presets: [
    { label: 'k = số giá trị', values: { nums: [5, 5, 6], k: 2 } },
    { label: 'Hoà count nhưng ngoài ranh giới', values: { nums: [7, 1, 3, 3, 7, 2, 7, 3, 5], k: 2 } },
    { label: 'k = 3, count rải rác', values: { nums: [8, 2, 8, 6, 2, 8, 0, 6, 8, 2, 9], k: 3 } },
    { label: 'Một phần tử', values: { nums: [9], k: 1 } },
  ],
  solutions: [
    { id: 'sort', name: 'Đếm + sort toàn bộ', rank: 3, approach: 'HashMap đếm tần suất, sắp xếp mọi cặp (giá trị, count) giảm dần theo count, lấy k đầu.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['3 dòng code, gần như không thể sai', 'Có luôn thứ tự đầy đủ nếu sau đó cần'], cons: ['Sắp xếp m giá trị trong khi chỉ cần k', 'Không chạy được trên luồng'], whenToUse: 'n nhỏ, cần viết nhanh, hoặc cần cả bảng xếp hạng.',
      source: sortSrc, run: (i) => asc(sortK(norm(i).nums, norm(i).k)), trace: (i) => sorted(sortTrace(norm(i))) },
    { id: 'min-heap', name: 'Đếm + min-heap kích thước k', rank: 2, approach: 'Đẩy từng (giá trị, count) vào min-heap theo count; vượt k thì pop đỉnh. Còn lại đúng top-k.', complexity: { time: 'O(n log k)', space: 'O(n + k)' },
      pros: ['k ≪ m thì gần O(n)', 'Phần chọn chỉ tốn O(k) bộ nhớ, hợp với luồng / dữ liệu ngoài bộ nhớ', 'Tổng quát: dùng được khi "điểm" là số thực, không bị chặn'], cons: ['JS không có heap sẵn, phải tự cài', 'k ≈ m thì không hơn sort'], whenToUse: 'k nhỏ, dữ liệu đến dần, hoặc điểm xếp hạng không phải số nguyên nhỏ.',
      source: heapSrc, run: (i) => asc(heapK(norm(i).nums, norm(i).k)), trace: (i) => sorted(heapTrace(norm(i))) },
    { id: 'bucket-sort', name: 'Đếm + bucket theo count', rank: 1, approach: 'count ∈ [1, n] ⇒ buckets[count] chứa các giá trị; quét bucket từ n xuống 1 tới khi đủ k.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Tuyến tính, không phụ thuộc k', 'Không so sánh, không heap'], cons: ['Cần toàn bộ dữ liệu trước (offline)', 'O(n) bucket kể cả khi m nhỏ'], whenToUse: 'Mảng tĩnh trong bộ nhớ – đáp án tối ưu mặc định cho LeetCode 347.',
      source: bucketSrc, run: (i) => asc(bucketK(norm(i).nums, norm(i).k)), trace: (i) => sorted(bucketTrace(norm(i))) },
  ],
};
export default problem;
