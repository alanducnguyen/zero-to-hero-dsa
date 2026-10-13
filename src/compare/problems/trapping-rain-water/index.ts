import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bfSrc from './solutions/brute-force/impl.ts?raw';
import { trap as bf } from './solutions/brute-force/impl';
import { trace as bfTrace } from './solutions/brute-force/trace';
import psSrc from './solutions/prefix-suffix/impl.ts?raw';
import { trap as ps } from './solutions/prefix-suffix/impl';
import { trace as psTrace } from './solutions/prefix-suffix/trace';
import stSrc from './solutions/stack/impl.ts?raw';
import { trap as st } from './solutions/stack/impl';
import { trace as stTrace } from './solutions/stack/trace';
import tpSrc from './solutions/two-pointers/impl.ts?raw';
import { trap as tp } from './solutions/two-pointers/impl';
import { trace as tpTrace } from './solutions/two-pointers/trace';

type In = { height: number[] };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'trapping-rain-water',
  title: 'Trapping Rain Water',
  subtitle: 'Một công thức, bốn cách tính: brute force → prefix/suffix → stack theo lớp → two pointers O(1)',
  difficulty: 'Hard',
  leetcode: { id: 42, slug: 'trapping-rain-water' },
  tags: ['array', 'two-pointers', 'monotonic-stack', 'prefix-sum'],
  statement, comparison, interview,
  inputs: [{ key: 'height', label: 'height', type: 'number[]', default: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], min: 0, max: 9, maxLength: 14 }],
  presets: [
    { label: 'Thung lũng lớn', values: { height: [4, 2, 0, 3, 2, 5] } },
    { label: 'Không đọng', values: { height: [1, 2, 3, 4] } },
    { label: 'Hố lồng nhau', values: { height: [5, 1, 3, 1, 2, 4, 0, 5] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 4, approach: 'Với mỗi cột quét sang trái và phải tìm tường cao nhất rồi áp công thức.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Trực tiếp từ công thức', 'O(1) bộ nhớ'], cons: ['Quét lại hai phía cho mỗi cột'], whenToUse: 'Chỉ để đặt công thức và kiểm chứng.',
      source: bfSrc, run: (i) => bf(cast(i).height), trace: (i) => bfTrace(cast(i)) },
    { id: 'prefix-suffix', name: 'Prefix/suffix max', rank: 2, approach: 'Tiền tính maxLeft và maxRight bằng hai lượt, lượt ba cộng nước từng cột.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Dễ giải thích và chứng minh nhất', 'Cho nước từng cột'], cons: ['Hai mảng phụ O(n)', 'Ba lượt'], whenToUse: 'Muốn lời giải tuyến tính chắc chắn đúng trong vài phút.',
      source: psSrc, run: (i) => ps(cast(i).height), trace: (i) => psTrace(cast(i)) },
    { id: 'stack', name: 'Monotonic stack', rank: 3, approach: 'Stack giảm dần; gặp cột cao hơn đỉnh thì pop đáy hố và cộng một lớp nước nằm ngang.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Hoạt động khi cột đến dần (online)', 'Cùng khung với Largest Rectangle'], cons: ['Tính theo lớp khó hình dung hơn', 'Dễ sai chiều rộng ±1'], whenToUse: 'Dữ liệu online hoặc cần thông tin theo từng hố.',
      source: stSrc, run: (i) => st(cast(i).height), trace: (i) => stTrace(cast(i)) },
    { id: 'two-pointers', name: 'Two pointers', rank: 1, approach: 'Di chuyển con trỏ ở bên có tường thấp hơn; mức nước bên đó chỉ phụ thuộc max của chính nó.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Một lượt, 3 biến', 'Code ngắn nhất'], cons: ['Chứng minh khó nhất', 'Cần toàn bộ mảng (hai đầu)'], whenToUse: 'Mặc định khi có toàn bộ mảng.',
      source: tpSrc, run: (i) => tp(cast(i).height), trace: (i) => tpTrace(cast(i)) },
  ],
};
export default problem;
