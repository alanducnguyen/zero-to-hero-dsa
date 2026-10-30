import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { parse, type CSInput } from './shared';
import naiveSrc from './solutions/naive-removal/impl.ts?raw';
import { canFinish as naive } from './solutions/naive-removal/impl';
import { trace as naiveTrace } from './solutions/naive-removal/trace';
import dfsSrc from './solutions/dfs-3-color/impl.ts?raw';
import { canFinish as dfs } from './solutions/dfs-3-color/impl';
import { trace as dfsTrace } from './solutions/dfs-3-color/trace';
import kahnSrc from './solutions/kahn/impl.ts?raw';
import { canFinish as kahn } from './solutions/kahn/impl';
import { trace as kahnTrace } from './solutions/kahn/trace';

const cast = (i: Record<string, unknown>) => i as unknown as CSInput;
const call = (f: (n: number, p: number[][]) => boolean) => (i: Record<string, unknown>) => {
  const { numCourses, prerequisites } = parse(cast(i));
  return f(numCourses, prerequisites);
};

const problem: CompareProblem = {
  id: 'course-schedule',
  title: 'Course Schedule',
  subtitle: 'Phát hiện chu trình trong đồ thị có hướng: gỡ lặp ngây thơ → DFS 3 màu → Kahn BFS',
  difficulty: 'Medium',
  leetcode: { id: 207, slug: 'course-schedule' },
  tags: ['graph', 'topological-sort', 'dfs', 'bfs', 'cycle-detection'],
  statement, comparison, interview,
  inputs: [
    { key: 'numCourses', label: 'Số môn học', type: 'number', default: 6, min: 0, max: 8 },
    { key: 'prerequisites', label: 'Điều kiện "b->a" (học b trước a)', type: 'string[]', default: ['0->1', '0->2', '1->3', '2->3', '3->4', '5->4'], maxLength: 14 },
  ],
  presets: [
    { label: 'Có chu trình', values: { numCourses: 4, prerequisites: ['0->1', '1->2', '2->3', '3->1'] } },
    { label: 'LeetCode ví dụ 2', values: { numCourses: 2, prerequisites: ['0->1', '1->0'] } },
    { label: 'Tự vòng', values: { numCourses: 2, prerequisites: ['0->1', '1->1'] } },
    { label: 'Chuỗi ngược (naive tệ nhất)', values: { numCourses: 6, prerequisites: ['5->4', '4->3', '3->2', '2->1', '1->0'] } },
  ],
  solutions: [
    { id: 'naive-removal', name: 'Gỡ lặp ngây thơ', rank: 3, approach: 'Mỗi vòng tính lại in-degree bằng cách quét mọi cạnh, gỡ một môn có in-degree 0; kẹt khi còn môn ⇒ có vòng.', complexity: { time: 'O(V·(V + E))', space: 'O(V)' },
      pros: ['Trực giác nhất: đúng như cách người ta xếp lịch học', 'Không cần dựng danh sách kề'], cons: ['Tính lại toàn bộ in-degree mỗi vòng ⇒ O(V·(V + E))', 'V = E = 10⁵ là cỡ 10¹⁰ phép tính'], whenToUse: 'Chỉ để mở đầu, giải thích ý tưởng "gỡ dần môn không còn điều kiện" trước khi tối ưu thành Kahn.',
      source: naiveSrc, run: call(naive), trace: (i) => naiveTrace(cast(i)) },
    { id: 'dfs-3-color', name: 'DFS 3 màu', rank: 2, approach: 'DFS tô WHITE/GRAY/BLACK; cạnh trỏ vào đỉnh GRAY (đang trên stack) là back-edge ⇒ có chu trình.', complexity: { time: 'O(V + E)', space: 'O(V + E)' },
      pros: ['O(V + E), code ngắn', 'Chỉ ra được chính chu trình (các đỉnh GRAY trên stack)', 'Postorder đảo ngược cho luôn thứ tự topo'], cons: ['Đệ quy sâu tới V ⇒ stack overflow với chuỗi dài (V = 10⁵)', 'Dễ sai nếu chỉ dùng visited 2 trạng thái'], whenToUse: 'Khi cần tìm/in ra chu trình, hoặc đã quen DFS và V nhỏ đủ cho đệ quy.',
      source: dfsSrc, run: call(dfs), trace: (i) => dfsTrace(cast(i)) },
    { id: 'kahn', name: 'Kahn (BFS in-degree)', rank: 1, approach: 'Đếm in-degree, đưa môn in-degree 0 vào queue, học môn nào thì trừ in-degree hàng xóm; học đủ V môn ⇔ không có vòng.', complexity: { time: 'O(V + E)', space: 'O(V + E)' },
      pros: ['O(V + E), lặp – không lo tràn stack', 'Thứ tự lấy ra khỏi queue chính là lịch học (LeetCode 210)', 'Dễ mở rộng: học theo học kỳ (BFS theo tầng), song song hoá'], cons: ['Không chỉ ra chu trình cụ thể, chỉ biết là có', 'Cần thêm mảng in-degree'], whenToUse: 'Mặc định cho Course Schedule I/II và mọi bài sắp xếp topo / lập lịch phụ thuộc.',
      source: kahnSrc, run: call(kahn), trace: (i) => kahnTrace(cast(i)) },
  ],
};
export default problem;
