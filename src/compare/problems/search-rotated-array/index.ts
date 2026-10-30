import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import linSrc from './solutions/linear/impl.ts?raw';
import { search as lin } from './solutions/linear/impl';
import { trace as linTrace } from './solutions/linear/trace';
import pivotSrc from './solutions/pivot-binary-search/impl.ts?raw';
import { search as pivotS } from './solutions/pivot-binary-search/impl';
import { trace as pivotTrace } from './solutions/pivot-binary-search/trace';
import oneSrc from './solutions/one-pass-binary-search/impl.ts?raw';
import { search as one } from './solutions/one-pass-binary-search/impl';
import { trace as oneTrace } from './solutions/one-pass-binary-search/trace';

type In = { nums: number[]; target: number };
/** Đề yêu cầu mảng tăng dần, phần tử phân biệt, đã xoay. Input tự nhập có thể sai ⇒ khử trùng + sắp xếp, rồi xoay sao cho phần tử đầu giữ nguyên như người dùng nhập. */
const norm = (i: Record<string, unknown>): In => {
  const x = i as unknown as In;
  const s = [...new Set(x.nums)].sort((a, b) => a - b);
  const k = Math.max(0, s.indexOf(x.nums[0]));
  return { nums: [...s.slice(k), ...s.slice(0, k)], target: x.target };
};

const problem: CompareProblem = {
  id: 'search-rotated-array',
  title: 'Search in Rotated Sorted Array',
  subtitle: 'Quét O(n) → tìm pivot rồi binary search → một lượt binary search: nhận ra "luôn có một nửa đã sắp xếp"',
  difficulty: 'Medium',
  leetcode: { id: 33, slug: 'search-in-rotated-sorted-array' },
  tags: ['array', 'binary-search'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [4, 5, 6, 7, 8, 9, 0, 1, 2], min: -20, max: 40, maxLength: 16 },
    { key: 'target', label: 'target', type: 'number', default: 1, min: -20, max: 40 },
  ],
  presets: [
    { label: 'Target ở nửa trái', values: { nums: [6, 7, 8, 9, 10, 1, 2, 3, 4], target: 8 } },
    { label: 'Không có target', values: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 } },
    { label: 'Không xoay', values: { nums: [1, 3, 5, 7, 9, 11], target: 9 } },
    { label: 'Xoay sát cuối', values: { nums: [2, 3, 4, 5, 6, 7, 8, 1], target: 1 } },
    { label: 'Một phần tử', values: { nums: [5], target: 5 } },
  ],
  solutions: [
    { id: 'linear', name: 'Quét tuyến tính', rank: 3, approach: 'Duyệt từ trái sang phải, trả về chỉ số đầu tiên bằng target.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Không thể sai', 'Vẫn đúng khi mảng có phần tử trùng hoặc không sắp xếp'], cons: ['Bỏ phí cấu trúc sắp xếp – đề yêu cầu O(log n)', 'n = 10⁹ phần tử trên đĩa thì không chấp nhận được'], whenToUse: 'Mảng rất nhỏ (vài chục phần tử) hoặc không có đảm bảo sắp xếp.',
      source: linSrc, run: (i) => lin(norm(i).nums, norm(i).target), trace: (i) => linTrace(norm(i)) },
    { id: 'pivot-binary-search', name: 'Tìm pivot + binary search', rank: 2, approach: 'Binary search so nums[mid] với nums[hi] để tìm chỉ số nhỏ nhất (pivot), rồi binary search thường trên đoạn tăng dần chứa target.', complexity: { time: 'O(log n)', space: 'O(1)' },
      pros: ['Tách bài khó thành hai bài quen thuộc', 'Pivot tái dùng được cho nhiều truy vấn / cho LC 153', 'Lượt 2 là binary search chuẩn, ít điều kiện'], cons: ['Hai lượt ⇒ ~2 log n bước', 'Hai vòng lặp có bất biến khác nhau (lo < hi vs lo <= hi) – dễ lẫn'], whenToUse: 'Khi cần pivot cho việc khác, hoặc có nhiều truy vấn trên cùng mảng (tìm pivot một lần).',
      source: pivotSrc, run: (i) => pivotS(norm(i).nums, norm(i).target), trace: (i) => pivotTrace(norm(i)) },
    { id: 'one-pass-binary-search', name: 'Binary search một lượt', rank: 1, approach: 'Ở mỗi mid, so nums[lo] với nums[mid] để biết nửa nào tăng dần, rồi kiểm tra target có nằm trong khoảng giá trị của nửa đó.', complexity: { time: 'O(log n)', space: 'O(1)' },
      pros: ['Một lượt, ~log n bước', 'Không cần biết pivot', 'Một vòng lặp duy nhất'], cons: ['Nhiều nhánh điều kiện, dễ sai dấu < / ≤', 'Khó mở rộng khi có phần tử trùng (LC 81)'], whenToUse: 'Mặc định cho một truy vấn trên mảng xoay có phần tử phân biệt.',
      source: oneSrc, run: (i) => one(norm(i).nums, norm(i).target), trace: (i) => oneTrace(norm(i)) },
  ],
};
export default problem;
