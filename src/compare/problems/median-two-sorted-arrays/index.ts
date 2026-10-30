import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import csSrc from './solutions/concat-sort/impl.ts?raw';
import { findMedianSortedArrays as cs } from './solutions/concat-sort/impl';
import { trace as csTrace } from './solutions/concat-sort/trace';
import mgSrc from './solutions/merge/impl.ts?raw';
import { findMedianSortedArrays as mg } from './solutions/merge/impl';
import { trace as mgTrace } from './solutions/merge/trace';
import hwSrc from './solutions/half-walk/impl.ts?raw';
import { findMedianSortedArrays as hw } from './solutions/half-walk/impl';
import { trace as hwTrace } from './solutions/half-walk/trace';
import bpSrc from './solutions/binary-partition/impl.ts?raw';
import { findMedianSortedArrays as bp } from './solutions/binary-partition/impl';
import { trace as bpTrace } from './solutions/binary-partition/trace';

/** Giá trị nguyên 0..30, tối đa 8 phần tử mỗi mảng, tự sắp xếp; hai mảng không cùng rỗng. */
const norm = (i: Record<string, unknown>) => {
  const clean = (x: unknown) => ((x as number[]) ?? []).map((v) => Math.floor(Number(v))).filter((v) => v >= 0 && v <= 30).slice(0, 8).sort((p, q) => p - q);
  const nums1 = clean(i.nums1);
  const nums2 = clean(i.nums2);
  return nums1.length + nums2.length ? { nums1, nums2 } : { nums1: [0], nums2 };
};

const problem: CompareProblem = {
  id: 'median-two-sorted-arrays',
  title: 'Median of Two Sorted Arrays',
  subtitle: 'Sort lại O((m+n) log) → merge O(m+n) → đi nửa đường O(1) bộ nhớ → binary search vị trí cắt O(log min(m,n)) ★',
  difficulty: 'Hard',
  leetcode: { id: 4, slug: 'median-of-two-sorted-arrays' },
  tags: ['array', 'binary-search', 'divide-and-conquer'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums1', label: 'nums1 (tự sắp xếp)', type: 'number[]', default: [1, 3, 8, 9, 15], min: 0, max: 30, maxLength: 8 },
    { key: 'nums2', label: 'nums2 (tự sắp xếp)', type: 'number[]', default: [7, 11, 18, 19, 21, 25], min: 0, max: 30, maxLength: 8 },
  ],
  presets: [
    { label: 'Tổng chẵn', values: { nums1: [1, 2], nums2: [3, 4] } },
    { label: 'Một mảng rỗng', values: { nums1: [], nums2: [2, 4, 6] } },
    { label: 'Không chồng lấn', values: { nums1: [1, 2, 3], nums2: [10, 20, 30, 40] } },
    { label: 'Mảng dài ở nums1', values: { nums1: [2, 5, 6, 9, 12, 14, 20], nums2: [4, 10] } },
    { label: 'Trùng giá trị', values: { nums1: [3, 3, 3], nums2: [3, 3] } },
  ],
  solutions: [
    { id: 'concat-sort', name: 'Nối rồi sort', rank: 4, approach: 'Nối hai mảng, sort lại, lấy phần tử giữa – bỏ qua việc đầu vào đã sắp xếp.', complexity: { time: 'O((m+n) log(m+n))', space: 'O(m+n)' },
      pros: ['3 dòng, không thể sai', 'Dùng làm oracle khi test'], cons: ['Lãng phí thông tin đã sắp xếp', 'Chậm hơn cả merge'], whenToUse: 'Kiểm chứng, hoặc khi đầu vào không chắc đã sắp xếp.',
      source: csSrc, run: (i) => { const x = norm(i); return cs(x.nums1, x.nums2); }, trace: (i) => csTrace(norm(i)) },
    { id: 'merge', name: 'Merge hai mảng', rank: 3, approach: 'Trộn như bước merge của merge sort thành một mảng đã sắp xếp rồi lấy giữa.', complexity: { time: 'O(m+n)', space: 'O(m+n)' },
      pros: ['Tận dụng tính sắp xếp', 'Mở rộng dễ sang k mảng (heap)'], cons: ['Trộn cả nửa sau vô ích', 'Bộ nhớ O(m+n)'], whenToUse: 'Khi cần cả mảng gộp cho việc khác.',
      source: mgSrc, run: (i) => { const x = norm(i); return mg(x.nums1, x.nums2); }, trace: (i) => mgTrace(norm(i)) },
    { id: 'half-walk', name: 'Đi nửa đường (2 biến)', rank: 2, approach: 'Mô phỏng merge nhưng dừng ở vị trí ⌊(m+n)/2⌋ và chỉ nhớ hai giá trị cuối.', complexity: { time: 'O(m+n)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ, code ngắn', 'Ít lỗi biên hơn binary search', 'Hoạt động với hai stream đã sắp xếp'], cons: ['Vẫn tuyến tính – đề yêu cầu O(log(m+n))'], whenToUse: 'Khi dữ liệu là stream/iterator không truy cập ngẫu nhiên được.',
      source: hwSrc, run: (i) => { const x = norm(i); return hw(x.nums1, x.nums2); }, trace: (i) => hwTrace(norm(i)) },
    { id: 'binary-partition', name: 'Binary search vị trí cắt', rank: 1, approach: 'Chọn i phần tử của mảng ngắn và half − i của mảng dài vào nửa trái; binary search i đến khi aL ≤ bR và bL ≤ aR.', complexity: { time: 'O(log min(m,n))', space: 'O(1)' },
      pros: ['Đạt yêu cầu O(log) của đề', 'Không cấp phát gì'], cons: ['Rất dễ sai biên (±∞, half lẻ/chẵn)', 'Cần truy cập ngẫu nhiên', 'Khó giải thích dưới áp lực'], whenToUse: 'Mặc định khi đề yêu cầu O(log(m+n)) – tức là luôn luôn ở phỏng vấn.',
      source: bpSrc, run: (i) => { const x = norm(i); return bp(x.nums1, x.nums2); }, trace: (i) => bpTrace(norm(i)) },
  ],
};
export default problem;
