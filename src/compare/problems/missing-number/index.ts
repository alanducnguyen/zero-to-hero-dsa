import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import sortSrc from './solutions/sort-scan/impl.ts?raw';
import { missingNumber as sortScan } from './solutions/sort-scan/impl';
import { trace as sortTrace } from './solutions/sort-scan/trace';
import hashSrc from './solutions/hash-set/impl.ts?raw';
import { missingNumber as hashSet } from './solutions/hash-set/impl';
import { trace as hashTrace } from './solutions/hash-set/trace';
import gaussSrc from './solutions/gauss-sum/impl.ts?raw';
import { missingNumber as gauss } from './solutions/gauss-sum/impl';
import { trace as gaussTrace } from './solutions/gauss-sum/trace';
import xorSrc from './solutions/xor/impl.ts?raw';
import { missingNumber as xor } from './solutions/xor/impl';
import { trace as xorTrace } from './solutions/xor/trace';

/** Ép input về dạng hợp lệ: số nguyên phân biệt trong [0, n], đúng một số thiếu. */
const norm = (i: Record<string, unknown>) => {
  const raw = Array.isArray(i.nums) ? (i.nums as unknown[]) : [];
  const ints = raw.map(Number).filter((x) => Number.isInteger(x) && x >= 0);
  const n = new Set(ints).size;
  const kept = [...new Set(ints.filter((x) => x <= n))];
  if (kept.length === n) return { nums: kept };
  // Thay các số không hợp lệ bằng các giá trị còn trống trong [0, n], chừa lại đúng một số thiếu.
  const free: number[] = [];
  for (let k = 0; k <= n; k++) if (!kept.includes(k)) free.push(k);
  return { nums: [...kept, ...free.slice(1, 1 + n - kept.length)] };
};

const problem: CompareProblem = {
  id: 'missing-number',
  title: 'Missing Number',
  subtitle: 'Bốn cách tìm số thiếu: sort, HashSet, tổng Gauss và XOR – từ O(n log n) tới O(n)/O(1) không tràn số',
  difficulty: 'Easy',
  leetcode: { id: 268, slug: 'missing-number' },
  tags: ['array', 'math', 'bit', 'xor', 'hashset'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums (n số phân biệt trong [0, n])', type: 'number[]', default: [3, 0, 1, 5, 2], min: 0, max: 30, maxLength: 20 },
  ],
  presets: [
    { label: 'Thiếu số cuối (n)', values: { nums: [0, 1, 2, 3] } },
    { label: 'Thiếu số 0', values: { nums: [1, 2] } },
    { label: 'LeetCode ví dụ 3', values: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] } },
  ],
  solutions: [
    { id: 'sort-scan', name: 'Sort + quét', rank: 4, approach: 'Sắp xếp rồi tìm vị trí đầu tiên có sorted[i] ≠ i; không có thì đáp án là n.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Trực quan, dễ chứng minh', 'Mảng đã sắp xếp thì nâng cấp thành binary search O(log n)'], cons: ['O(n log n) cho bài chỉ cần O(n)', 'Sort tại chỗ phá input, sort bản sao tốn O(n)'], whenToUse: 'Mở đầu buổi phỏng vấn, hoặc khi input đã sắp xếp sẵn.',
      source: sortSrc, run: (i) => sortScan(norm(i).nums), trace: (i) => sortTrace(norm(i)) },
    { id: 'hash-set', name: 'HashSet', rank: 3, approach: 'Cho mọi số vào Set, rồi hỏi lần lượt 0..n số nào vắng mặt.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['O(n), không phụ thuộc cấu trúc toán học', 'Mở rộng được cho nhiều số thiếu'], cons: ['O(n) bộ nhớ – trái follow-up', 'Hằng số hash lớn hơn phép cộng/XOR'], whenToUse: 'Khi đề tổng quát hơn: nhiều số thiếu, hoặc giá trị không phải 0..n liên tiếp.',
      source: hashSrc, run: (i) => hashSet(norm(i).nums), trace: (i) => hashTrace(norm(i)) },
    { id: 'gauss-sum', name: 'Tổng Gauss', rank: 2, approach: 'Số thiếu = n(n+1)/2 − tổng mảng.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Một lượt, O(1) bộ nhớ', 'Dễ giải thích nhất'], cons: ['Tràn số với int 32-bit khi n lớn (cần long hoặc trừ dần)', 'Chỉ giải được một ẩn'], whenToUse: 'Ngôn ngữ có số lớn / long, hoặc khi dùng biến thể sum += i − nums[i].',
      source: gaussSrc, run: (i) => gauss(norm(i).nums), trace: (i) => gaussTrace(norm(i)) },
    { id: 'xor', name: 'XOR', rank: 1, approach: 'XOR mọi chỉ số 0..n với mọi giá trị: số có mặt xuất hiện 2 lần nên tự hủy, còn lại số thiếu.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(n)/O(1), không bao giờ tràn số', 'Không sửa input, chạy được trên stream'], cons: ['Khó nghĩ ra nếu chưa quen bit manipulation', 'Chỉ giải trực tiếp được một số thiếu'], whenToUse: 'Đáp án mặc định khi follow-up yêu cầu O(1) bộ nhớ.',
      source: xorSrc, run: (i) => xor(norm(i).nums), trace: (i) => xorTrace(norm(i)) },
  ],
};
export default problem;
