import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { subarraySum as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import runSrc from './solutions/running-sum/impl.ts?raw';
import { subarraySum as running } from './solutions/running-sum/impl';
import { trace as runTrace } from './solutions/running-sum/trace';
import preSrc from './solutions/prefix-array/impl.ts?raw';
import { subarraySum as preArr } from './solutions/prefix-array/impl';
import { trace as preTrace } from './solutions/prefix-array/trace';
import hashSrc from './solutions/prefix-hashmap/impl.ts?raw';
import { subarraySum as hash } from './solutions/prefix-hashmap/impl';
import { trace as hashTrace } from './solutions/prefix-hashmap/trace';

/** Tối đa 10 phần tử: brute force O(n³) vẫn chỉ 55 frame. */
const norm = (i: Record<string, unknown>) => ({
  nums: (Array.isArray(i.nums) ? i.nums : []).slice(0, 10).map((x) => Math.trunc(Number(x) || 0)),
  k: Math.trunc(Number(i.k) || 0),
});

const problem: CompareProblem = {
  id: 'subarray-sum-equals-k',
  title: 'Subarray Sum Equals K',
  subtitle: 'O(n³) → cộng dồn O(n²) → mảng prefix → prefix sum + HashMap O(n) ★ – và vì sao sliding window gãy với số âm',
  difficulty: 'Medium',
  leetcode: { id: 560, slug: 'subarray-sum-equals-k' },
  tags: ['prefix-sum', 'hashmap', 'array', 'counting'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums (tối đa 10 phần tử)', type: 'number[]', default: [1, 2, 1, -1, 2, 3], min: -99, max: 99, maxLength: 10 },
    { key: 'k', label: 'k', type: 'number', default: 3, min: -999, max: 999 },
  ],
  presets: [
    { label: 'Số âm (sliding window sai)', values: { nums: [3, 4, -7, 1, 3, 3, 1, -4], k: 7 } },
    { label: 'Toàn số 0 (k = 0)', values: { nums: [0, 0, 0, 0], k: 0 } },
    { label: 'Không có', values: { nums: [1, 2, 3], k: 100 } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force O(n³)', rank: 4, approach: 'Thử mọi mảng con [i..j] và cộng lại tổng từ đầu.', complexity: { time: 'O(n³)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng, kể cả số âm', 'Không bộ nhớ phụ'], cons: ['Tính lại tổng đã có ⇒ thừa một vòng lặp', 'n = 2·10⁴ là ~10¹² phép cộng'], whenToUse: 'Chỉ để làm rõ đề.',
      source: bruteSrc, run: (i) => brute(norm(i).nums, norm(i).k), trace: (i) => bruteTrace(norm(i)) },
    { id: 'running-sum', name: 'Cộng dồn từ mỗi i', rank: 3, approach: 'Cố định i, kéo dài j và cộng dồn sum += nums[j].', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ', 'Đúng với số âm, code 6 dòng'], cons: ['Vẫn liệt kê O(n²) cặp', 'n = 2·10⁴ ≈ 2·10⁸ bước – sát giới hạn'], whenToUse: 'Cấm bộ nhớ phụ và n ≤ vài nghìn.',
      source: runSrc, run: (i) => running(norm(i).nums, norm(i).k), trace: (i) => runTrace(norm(i)) },
    { id: 'prefix-array', name: 'Mảng prefix + 2 vòng', rank: 2, approach: 'Dựng prefix, tổng nums[i..j−1] = prefix[j] − prefix[i], thử mọi cặp.', complexity: { time: 'O(n²)', space: 'O(n)' },
      pros: ['Tổng đoạn O(1) – dùng lại cho nhiều truy vấn', 'Lộ ra phương trình prefix[i] = prefix[j] − k dẫn tới HashMap'], cons: ['Vẫn O(n²) mà tốn thêm O(n) bộ nhớ'], whenToUse: 'Nhiều truy vấn tổng đoạn trên mảng cố định; hoặc làm bước đệm khi trình bày.',
      source: preSrc, run: (i) => preArr(norm(i).nums, norm(i).k), trace: (i) => preTrace(norm(i)) },
    { id: 'prefix-hashmap', name: 'Prefix sum + HashMap', rank: 1, approach: 'Một lượt: với tổng tiền tố sum, cộng số lần tiền tố sum − k đã xuất hiện.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Một lượt O(n)', 'Đúng với số âm và số 0', 'Mở rộng sang 974, 525, 437, 1074'], cons: ['O(n) bộ nhớ', 'Dễ sai {0: 1} và thứ tự tra/ghi'], whenToUse: 'Mặc định khi mảng có số âm/0.',
      source: hashSrc, run: (i) => hash(norm(i).nums, norm(i).k), trace: (i) => hashTrace(norm(i)) },
  ],
};
export default problem;
