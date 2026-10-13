import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import sortSrc from './solutions/sort/impl.ts?raw';
import { findDuplicate as sortD } from './solutions/sort/impl';
import { trace as sortTrace } from './solutions/sort/trace';
import setSrc from './solutions/hashset/impl.ts?raw';
import { findDuplicate as setD } from './solutions/hashset/impl';
import { trace as setTrace } from './solutions/hashset/trace';
import bsSrc from './solutions/binary-search/impl.ts?raw';
import { findDuplicate as bsD } from './solutions/binary-search/impl';
import { trace as bsTrace } from './solutions/binary-search/trace';
import flSrc from './solutions/floyd/impl.ts?raw';
import { findDuplicate as flD } from './solutions/floyd/impl';
import { trace as flTrace } from './solutions/floyd/trace';

type In = { nums: number[] };
/** Chuẩn hoá về dạng hợp lệ: n+1 số trong [1, n], có trùng. Nếu input người dùng không hợp lệ thì sửa phần tử vi phạm về 1. */
const norm = (i: Record<string, unknown>): In => {
  const raw = (i as unknown as In).nums;
  const n = Math.max(1, raw.length - 1);
  const nums = raw.length >= 2 ? raw.map((x) => (Number.isInteger(x) && x >= 1 && x <= n ? x : 1)) : [1, 1];
  return { nums };
};

const problem: CompareProblem = {
  id: 'find-duplicate',
  title: 'Find the Duplicate Number',
  subtitle: 'Ràng buộc "không sửa mảng, O(1) bộ nhớ" loại dần từng cách: sort → set → nhị phân giá trị → Floyd',
  difficulty: 'Medium',
  leetcode: { id: 287, slug: 'find-the-duplicate-number' },
  tags: ['array', 'binary-search', 'fast-slow', 'hashmap'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums (n+1 số trong [1, n])', type: 'number[]', default: [1, 3, 4, 2, 2], min: 1, max: 9, maxLength: 10 }],
  presets: [
    { label: 'Trùng nhiều lần', values: { nums: [3, 1, 3, 4, 2, 3] } },
    { label: 'Trùng ở đầu và cuối', values: { nums: [2, 5, 9, 6, 9, 3, 8, 9, 7, 1] } },
    { label: 'n = 1', values: { nums: [1, 1] } },
  ],
  solutions: [
    { id: 'sort', name: 'Sort', rank: 4, approach: 'Sắp xếp; số trùng đứng cạnh nhau.', complexity: { time: 'O(n log n)', space: 'O(1)*' },
      pros: ['Code 3 dòng'], cons: ['Sửa mảng (vi phạm đề) hoặc O(n) sao chép', 'Không tuyến tính'], whenToUse: 'Được sửa mảng và không cần tối ưu.',
      source: sortSrc, run: (i) => sortD(norm(i).nums), trace: (i) => sortTrace(norm(i)) },
    { id: 'hashset', name: 'HashSet', rank: 3, approach: 'Duyệt, phần tử đầu tiên đã thấy là đáp án.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Tuyến tính, không sửa mảng', 'Không cần giả định giá trị trong [1, n]'], cons: ['O(n) bộ nhớ (vi phạm đề)'], whenToUse: 'Bộ nhớ không giới hạn, hoặc giá trị không trong [1, n].',
      source: setSrc, run: (i) => setD(norm(i).nums), trace: (i) => setTrace(norm(i)) },
    { id: 'binary-search', name: 'Nhị phân trên giá trị', rank: 2, approach: 'Đếm phần tử ≤ mid; nếu > mid thì số trùng ở nửa dưới (Dirichlet).', complexity: { time: 'O(n log n)', space: 'O(1)' },
      pros: ['Không sửa mảng, O(1) bộ nhớ', 'Kỹ thuật "binary search on answer" tổng quát'], cons: ['log n lượt đếm O(n)'], whenToUse: 'Thoả ràng buộc nhưng không nhớ/không muốn chứng minh Floyd.',
      source: bsSrc, run: (i) => bsD(norm(i).nums), trace: (i) => bsTrace(norm(i)) },
    { id: 'floyd', name: 'Floyd tortoise & hare', rank: 1, approach: 'Coi i → nums[i] là linked list; số trùng là điểm vào chu trình.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Thoả mọi ràng buộc: O(n), O(1), không sửa', '10 dòng'], cons: ['Phép biến đổi sang đồ thị không hiển nhiên', 'Chỉ đúng khi giá trị trong [1, n]'], whenToUse: 'Mặc định cho đề gốc.',
      source: flSrc, run: (i) => flD(norm(i).nums), trace: (i) => flTrace(norm(i)) },
  ],
};
export default problem;
