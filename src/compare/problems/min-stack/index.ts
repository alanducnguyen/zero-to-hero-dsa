import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { parseOps, type MSInput } from './ops';
import twoSrc from './solutions/two-stacks/impl.ts?raw';
import { minStackTwo } from './solutions/two-stacks/impl';
import { trace as twoTrace } from './solutions/two-stacks/trace';
import pairSrc from './solutions/pair-stack/impl.ts?raw';
import { minStackPairs } from './solutions/pair-stack/impl';
import { trace as pairTrace } from './solutions/pair-stack/trace';
import diffSrc from './solutions/diff-stack/impl.ts?raw';
import { minStackDiff } from './solutions/diff-stack/impl';
import { trace as diffTrace } from './solutions/diff-stack/trace';

const cast = (i: Record<string, unknown>) => i as unknown as MSInput;
const ops = (i: Record<string, unknown>) => parseOps(cast(i).ops);

const problem: CompareProblem = {
  id: 'min-stack',
  title: 'Min Stack',
  subtitle: 'getMin O(1): stack cặp, hai stack chỉ lưu kỷ lục min, hay mẹo độ lệch O(1) bộ nhớ phụ',
  difficulty: 'Medium',
  leetcode: { id: 155, slug: 'min-stack' },
  tags: ['stack', 'design', 'auxiliary-structure'],
  statement, comparison, interview,
  inputs: [{ key: 'ops', label: 'Thao tác: "push x", "pop", "top", "getMin"', type: 'string[]', default: ['push 5', 'push 3', 'push 7', 'getMin', 'pop', 'getMin', 'push 2', 'getMin', 'pop', 'pop', 'getMin'], maxLength: 20 }],
  presets: [
    { label: 'Ví dụ LeetCode', values: { ops: ['push -2', 'push 0', 'push -3', 'getMin', 'pop', 'top', 'getMin'] } },
    { label: 'Min trùng lặp', values: { ops: ['push 2', 'push 2', 'push 5', 'pop', 'pop', 'getMin', 'pop', 'getMin'] } },
    { label: 'Giảm dần', values: { ops: ['push 9', 'push 7', 'push 5', 'getMin', 'pop', 'getMin', 'top'] } },
  ],
  solutions: [
    { id: 'diff-stack', name: 'Stack độ lệch', rank: 3, approach: 'Lưu d = x − min và một biến min; d < 0 đánh dấu min mới, khôi phục min cũ = min − d khi pop.', complexity: { time: 'O(1) mỗi thao tác', space: 'O(n) + O(1) phụ' },
      pros: ['Chỉ n số + 1 biến – ít bộ nhớ nhất', 'Mẹo hay để thể hiện hiểu sâu'], cons: ['x − min có thể tràn int32/int64 ở Java/C++', 'Khó đọc, dễ sai khi tính top và khôi phục min'], whenToUse: 'Bộ nhớ cực chặt và miền giá trị đảm bảo không tràn.',
      source: diffSrc, run: (i) => minStackDiff(ops(i)), trace: (i) => diffTrace(cast(i)) },
    { id: 'pair-stack', name: 'Stack cặp [x, min]', rank: 2, approach: 'Mỗi mức lưu cặp [giá trị, min từ đáy tới đây]; getMin đọc đỉnh, pop bỏ cả cặp.', complexity: { time: 'O(1) mỗi thao tác', space: 'O(2n)' },
      pros: ['Ngắn nhất, gần như không thể sai', 'Mở rộng dễ sang [x, min, max]'], cons: ['Luôn 2n số kể cả khi min hiếm khi đổi'], whenToUse: 'Code trên bảng khi cần chắc chắn đúng ngay lần đầu.',
      source: pairSrc, run: (i) => minStackPairs(ops(i)), trace: (i) => pairTrace(cast(i)) },
    { id: 'two-stacks', name: 'Hai stack (kỷ lục min)', rank: 1, approach: 'Stack mins chỉ nhận x khi x ≤ min hiện tại; pop đúng min thì pop luôn mins.', complexity: { time: 'O(1) mỗi thao tác', space: 'O(n), thường ≪ 2n' },
      pros: ['Trung bình ít bộ nhớ hơn stack cặp', 'Không có phép trừ ⇒ không tràn số'], cons: ['Phải nhớ dùng ≤ cho min trùng lặp', 'Worst case (dãy giảm) vẫn 2n'], whenToUse: 'Mặc định khi chốt đáp án và được hỏi tối ưu bộ nhớ.',
      source: twoSrc, run: (i) => minStackTwo(ops(i)), trace: (i) => twoTrace(cast(i)) },
  ],
};
export default problem;
