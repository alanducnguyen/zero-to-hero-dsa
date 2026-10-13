import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { twoSum as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import sortSrc from './solutions/sort-two-pointers/impl.ts?raw';
import { twoSum as sortTp } from './solutions/sort-two-pointers/impl';
import { trace as sortTrace } from './solutions/sort-two-pointers/trace';
import hashSrc from './solutions/hashmap/impl.ts?raw';
import { twoSum as hash } from './solutions/hashmap/impl';
import { trace as hashTrace } from './solutions/hashmap/trace';

type In = { nums: number[]; target: number };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'two-sum',
  title: 'Two Sum',
  subtitle: 'Bài phỏng vấn số 1: từ thử mọi cặp tới HashMap một lượt – và khi nào two pointers thắng',
  difficulty: 'Easy',
  leetcode: { id: 1, slug: 'two-sum' },
  tags: ['array', 'hashmap', 'two-pointers'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [2, 7, 11, 15, 4, 6], min: -20, max: 40, maxLength: 10 },
    { key: 'target', label: 'target', type: 'number', default: 10, min: -40, max: 80 },
  ],
  presets: [
    { label: 'Đáp án ở cuối', values: { nums: [1, 5, 9, 3, 8, 12], target: 20 } },
    { label: 'Phần tử trùng', values: { nums: [3, 3], target: 6 } },
    { label: 'Không có đáp án', values: { nums: [1, 2, 3], target: 100 } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 3, approach: 'Thử mọi cặp (i, j) với i < j, dừng khi tổng bằng target.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng, không cấu trúc phụ', 'O(1) bộ nhớ'], cons: ['n = 10⁵ là 5·10⁹ phép so sánh', 'Không tận dụng được gì từ dữ liệu'], whenToUse: 'Chỉ để mở đầu hoặc n rất nhỏ và cấm bộ nhớ phụ.',
      source: bruteSrc, run: (i) => brute(cast(i).nums, cast(i).target), trace: (i) => bruteTrace(cast(i)) },
    { id: 'sort-two-pointers', name: 'Sort + two pointers', rank: 2, approach: 'Sắp xếp theo giá trị (giữ chỉ số gốc), hai con trỏ hai đầu tiến/lùi theo tổng.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Không cần hash, worst case đảm bảo', 'Mở rộng tự nhiên sang 3Sum/4Sum'], cons: ['Sort làm mất chỉ số gốc, phải giữ thêm mảng', 'Chậm hơn HashMap'], whenToUse: 'Mảng đã sắp xếp sẵn, hoặc cần liệt kê mọi cặp không trùng.',
      source: sortSrc, run: (i) => sortTp(cast(i).nums, cast(i).target), trace: (i) => sortTrace(cast(i)) },
    { id: 'hashmap', name: 'HashMap một lượt', rank: 1, approach: 'Với mỗi x tra target − x trong map các giá trị đã gặp, rồi lưu x.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Một lượt, O(n)', 'Tự tránh dùng cùng phần tử hai lần', 'Giữ nguyên chỉ số gốc'], cons: ['O(n) bộ nhớ', 'Hash worst case O(n) (hiếm)'], whenToUse: 'Mặc định cho mảng chưa sắp xếp và cần chỉ số.',
      source: hashSrc, run: (i) => hash(cast(i).nums, cast(i).target), trace: (i) => hashTrace(cast(i)) },
  ],
};
export default problem;
