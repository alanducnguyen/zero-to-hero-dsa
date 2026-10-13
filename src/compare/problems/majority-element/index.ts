import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import hashSrc from './solutions/hashmap/impl.ts?raw';
import { majorityElement as hashM } from './solutions/hashmap/impl';
import { trace as hashTrace } from './solutions/hashmap/trace';
import sortSrc from './solutions/sort/impl.ts?raw';
import { majorityElement as sortM } from './solutions/sort/impl';
import { trace as sortTrace } from './solutions/sort/trace';
import bmSrc from './solutions/boyer-moore/impl.ts?raw';
import { majorityElement as bmM } from './solutions/boyer-moore/impl';
import { trace as bmTrace } from './solutions/boyer-moore/trace';

type In = { nums: number[] };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'majority-element',
  title: 'Majority Element',
  subtitle: 'HashMap O(n) bộ nhớ → sort lấy giữa → Boyer-Moore O(1): bài mẫu về "đánh đổi bộ nhớ bằng một chứng minh"',
  difficulty: 'Easy',
  leetcode: { id: 169, slug: 'majority-element' },
  tags: ['array', 'hashmap', 'sorting', 'voting'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums (có phần tử > n/2 lần)', type: 'number[]', default: [2, 2, 1, 1, 1, 2, 2], min: 0, max: 9, maxLength: 12 }],
  presets: [
    { label: 'Đa số ở cuối', values: { nums: [1, 2, 3, 3, 3, 3, 3] } },
    { label: 'Đổi ứng viên nhiều lần', values: { nums: [1, 2, 1, 3, 1, 4, 1, 1] } },
    { label: 'Một phần tử', values: { nums: [5] } },
  ],
  solutions: [
    { id: 'hashmap', name: 'HashMap đếm', rank: 2, approach: 'Đếm tần suất từng giá trị, dừng khi một count vượt n/2.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Trực tiếp, không cần giả định', 'Biết tần suất thật, dừng sớm được'], cons: ['O(n) bộ nhớ khi nhiều giá trị phân biệt', 'Chi phí hash'], whenToUse: 'Khi không chắc đa số tồn tại hoặc cần tần suất.',
      source: hashSrc, run: (i) => hashM(cast(i).nums), trace: (i) => hashTrace(cast(i)) },
    { id: 'sort', name: 'Sort rồi lấy giữa', rank: 3, approach: 'Sắp xếp; dải dài hơn n/2 của phần tử đa số luôn phủ chỉ số n/2.', complexity: { time: 'O(n log n)', space: 'O(1)*' },
      pros: ['Hai dòng code', 'O(1) bộ nhớ nếu sort tại chỗ'], cons: ['O(n log n) – chậm nhất trong ba', 'Sửa mảng (hoặc tốn O(n) sao chép)'], whenToUse: 'Mảng đã sắp xếp sẵn, hoặc code phải tối giản.',
      source: sortSrc, run: (i) => sortM(cast(i).nums), trace: (i) => sortTrace(cast(i)) },
    { id: 'boyer-moore', name: 'Boyer-Moore Voting', rank: 1, approach: 'Ứng viên + bộ đếm; phần tử khác trừ phiếu; về 0 thì đổi ứng viên.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Một lượt, 2 biến', 'Chạy trên luồng', 'Mở rộng sang > n/k'], cons: ['Cần giả định đa số tồn tại (hoặc thêm lượt xác minh)', 'Chứng minh không hiển nhiên'], whenToUse: 'Đề đảm bảo đa số tồn tại – đáp án tối ưu.',
      source: bmSrc, run: (i) => bmM(cast(i).nums), trace: (i) => bmTrace(cast(i)) },
  ],
};
export default problem;
