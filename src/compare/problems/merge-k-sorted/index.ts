import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import csSrc from './solutions/concat-sort/impl.ts?raw';
import { mergeK as cs } from './solutions/concat-sort/impl';
import { trace as csTrace } from './solutions/concat-sort/trace';
import sqSrc from './solutions/sequential/impl.ts?raw';
import { mergeK as sq } from './solutions/sequential/impl';
import { trace as sqTrace } from './solutions/sequential/trace';
import hpSrc from './solutions/min-heap/impl.ts?raw';
import { mergeK as hp } from './solutions/min-heap/impl';
import { trace as hpTrace } from './solutions/min-heap/trace';
import dcSrc from './solutions/divide-conquer/impl.ts?raw';
import { mergeK as dc } from './solutions/divide-conquer/impl';
import { trace as dcTrace } from './solutions/divide-conquer/trace';

const norm = (i: Record<string, unknown>) => ({ lists: ((i.lists as number[][]) ?? []).map((l) => [...l].sort((a, b) => a - b)) });

const problem: CompareProblem = {
  id: 'merge-k-sorted',
  title: 'Merge k Sorted Lists',
  subtitle: 'Gộp + sort → trộn lần lượt O(N·k) → heap O(N log k) → chia để trị: khi nào heap thắng và khi nào không cần',
  difficulty: 'Hard',
  leetcode: { id: 23, slug: 'merge-k-sorted-lists' },
  tags: ['heap', 'divide-conquer', 'linked-list', 'sorting'],
  statement, comparison, interview,
  inputs: [{ key: 'lists', label: 'k list (mỗi hàng một list, tự sắp xếp)', type: 'grid', default: [[1, 4, 5], [1, 3, 4], [2, 6]] }],
  presets: [
    { label: 'Có list rỗng', values: { lists: [[], [2, 3], [], [1]] } },
    { label: 'k = 4 lệch độ dài', values: { lists: [[9], [1, 2, 3, 4], [5, 6], [0, 7]] } },
    { label: 'Một list', values: { lists: [[1, 2, 3]] } },
  ],
  solutions: [
    { id: 'concat-sort', name: 'Gộp + sort', rank: 3, approach: 'Nối tất cả vào một mảng rồi sort.', complexity: { time: 'O(N log N)', space: 'O(N)' },
      pros: ['Một dòng, không thể sai', 'Nhanh trên thực tế với N nhỏ'], cons: ['Bỏ phí việc từng list đã sắp xếp', 'Không dùng cho luồng'], whenToUse: 'N nhỏ, cần code nhanh và chắc.',
      source: csSrc, run: (i) => cs(norm(i).lists), trace: (i) => csTrace(norm(i)) },
    { id: 'sequential', name: 'Trộn lần lượt', rank: 4, approach: 'result = mergeTwo(result, list i) cho từng list.', complexity: { time: 'O(N·k)', space: 'O(N)' },
      pros: ['Chỉ cần mergeTwo', 'Dễ hiểu'], cons: ['Kết quả tích luỹ bị duyệt lại k lần', 'Tệ hơn cả sort khi k lớn'], whenToUse: 'k ≤ 3.',
      source: sqSrc, run: (i) => sq(norm(i).lists), trace: (i) => sqTrace(norm(i)) },
    { id: 'min-heap', name: 'Min-heap k phần tử', rank: 1, approach: 'Heap giữ đầu chưa lấy của mỗi list; pop min, nạp phần tử kế của list đó.', complexity: { time: 'O(N log k)', space: 'O(k)' },
      pros: ['Chạy với iterator/luồng', 'Bộ nhớ phụ chỉ O(k)', 'Nền của external sort'], cons: ['Phải tự cài heap trong JS', 'Quản lý tuple (giá trị, list, vị trí)'], whenToUse: 'Mặc định; bắt buộc khi dữ liệu là luồng hoặc k rất lớn.',
      source: hpSrc, run: (i) => hp(norm(i).lists), trace: (i) => hpTrace(norm(i)) },
    { id: 'divide-conquer', name: 'Chia để trị', rank: 2, approach: 'Trộn cặp đôi, số list giảm nửa mỗi tầng; log k tầng × O(N).', complexity: { time: 'O(N log k)', space: 'O(N) mảng / O(log k) linked list' },
      pros: ['Không cần heap', 'Tái dùng mergeTwo', 'Song song hoá được'], cons: ['Cần toàn bộ dữ liệu', 'Bộ nhớ trung gian O(N) với mảng'], whenToUse: 'Dữ liệu tĩnh, đã có mergeTwo, hoặc linked list cần O(1) bộ nhớ phụ.',
      source: dcSrc, run: (i) => dc(norm(i).lists), trace: (i) => dcTrace(norm(i)) },
  ],
};
export default problem;
