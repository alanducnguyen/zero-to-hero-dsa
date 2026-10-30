import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import dfsSrc from './solutions/dfs/impl.ts?raw';
import { numIslands as dfs } from './solutions/dfs/impl';
import { trace as dfsTrace } from './solutions/dfs/trace';
import bfsSrc from './solutions/bfs/impl.ts?raw';
import { numIslands as bfs } from './solutions/bfs/impl';
import { trace as bfsTrace } from './solutions/bfs/trace';
import ufSrc from './solutions/union-find/impl.ts?raw';
import { numIslands as uf } from './solutions/union-find/impl';
import { trace as ufTrace } from './solutions/union-find/trace';

type In = { grid: number[][] };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'number-of-islands',
  title: 'Number of Islands',
  subtitle: 'Đếm thành phần liên thông trên lưới: DFS đệ quy, BFS an toàn với stack, và Union-Find cho lưới động',
  difficulty: 'Medium',
  leetcode: { id: 200, slug: 'number-of-islands' },
  tags: ['grid', 'dfs', 'bfs', 'union-find', 'connected-components'],
  statement, comparison, interview,
  inputs: [
    {
      key: 'grid',
      label: 'Lưới (1 = đất, 0 = nước), mỗi dòng một hàng',
      type: 'grid',
      default: [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 0, 1, 0, 1],
        [0, 0, 0, 1, 1],
      ],
    },
  ],
  presets: [
    { label: 'Hình chữ U (hợp hai nhánh)', values: { grid: [[1, 0, 1], [1, 0, 1], [1, 1, 1]] } },
    { label: 'Chéo không nối', values: { grid: [[1, 0, 1], [0, 1, 0], [1, 0, 1]] } },
    { label: 'Toàn đất (DFS sâu nhất)', values: { grid: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]] } },
    { label: 'Toàn nước', values: { grid: [[0, 0], [0, 0]] } },
  ],
  solutions: [
    { id: 'dfs', name: 'DFS đệ quy (flood fill)', rank: 1, approach: 'Quét lưới; gặp ô đất ⇒ count++ rồi đệ quy 4 hướng nhấn chìm cả đảo trên bản sao lưới.', complexity: { time: 'O(m·n)', space: 'O(m·n)' },
      pros: ['Code ngắn nhất, khó sai', 'Mỗi ô chạm O(1) lần', 'Dễ mở rộng: diện tích, chu vi, chữ ký hình dạng'], cons: ['Độ sâu đệ quy tới m·n ⇒ stack overflow với đảo lớn', 'Cần bản sao hoặc visited nếu không được sửa input'], whenToUse: 'Mặc định trong phỏng vấn với lưới cỡ LeetCode (≤ 300×300).',
      source: dfsSrc, run: (i) => dfs(cast(i).grid), trace: (i) => dfsTrace(cast(i)) },
    { id: 'bfs', name: 'BFS với queue', rank: 2, approach: 'Như DFS nhưng duyệt đảo bằng hàng đợi: đánh dấu khi enqueue, dequeue bằng con trỏ head.', complexity: { time: 'O(m·n)', space: 'O(m·n)' },
      pros: ['Không đệ quy ⇒ không tràn call stack', 'Queue thường chỉ O(min(m,n))', 'Cùng khung dùng được cho bài khoảng cách ngắn nhất'], cons: ['Dài hơn DFS vài dòng', 'Dễ sai: đánh dấu khi dequeue, dùng shift() O(n)'], whenToUse: 'Lưới lớn / có thể toàn đất, code production, hoặc ngôn ngữ có stack nhỏ (Python).',
      source: bfsSrc, run: (i) => bfs(cast(i).grid), trace: (i) => bfsTrace(cast(i)) },
    { id: 'union-find', name: 'Union-Find', rank: 3, approach: 'Mỗi ô đất là một tập; union với hàng xóm dưới/phải, mỗi union thành công giảm số đảo 1.', complexity: { time: '≈ O(m·n)', space: 'O(m·n)' },
      pros: ['Không sửa lưới, không đệ quy sâu', 'Hỗ trợ thêm ô đất động gần O(1) mỗi lần (Islands II)', 'Xử lý được lưới đọc theo từng hàng'], cons: ['Mảng parent m·n cấp phát sẵn, hằng số lớn', 'Code dài nhất, thừa với lưới tĩnh'], whenToUse: 'Lưới thay đổi theo thời gian (thêm đất, hỏi số đảo liên tục) hoặc cần hợp nhóm theo luồng dữ liệu.',
      source: ufSrc, run: (i) => uf(cast(i).grid), trace: (i) => ufTrace(cast(i)) },
  ],
};
export default problem;
