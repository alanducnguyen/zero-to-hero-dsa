import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { norm, type WLInput } from './shared';
import dfsSrc from './solutions/dfs-backtracking/impl.ts?raw';
import { ladderLength as dfs } from './solutions/dfs-backtracking/impl';
import { trace as dfsTrace } from './solutions/dfs-backtracking/trace';
import pairSrc from './solutions/bfs-pairwise/impl.ts?raw';
import { ladderLength as pair } from './solutions/bfs-pairwise/impl';
import { trace as pairTrace } from './solutions/bfs-pairwise/trace';
import biSrc from './solutions/bidirectional-bfs/impl.ts?raw';
import { ladderLength as bi } from './solutions/bidirectional-bfs/impl';
import { trace as biTrace } from './solutions/bidirectional-bfs/trace';

const cast = (i: Record<string, unknown>) => norm(i as unknown as WLInput);
const call = (f: (b: string, e: string, l: string[]) => number) => (i: Record<string, unknown>) => {
  const { beginWord, endWord, wordList } = cast(i);
  return f(beginWord, endWord, wordList);
};

const problem: CompareProblem = {
  id: 'word-ladder',
  title: 'Word Ladder',
  subtitle: 'Đường ngắn nhất trên đồ thị ngầm: DFS thử mọi đường → BFS so từng cặp → bidirectional BFS sinh hàng xóm',
  difficulty: 'Hard',
  leetcode: { id: 127, slug: 'word-ladder' },
  tags: ['bfs', 'graph', 'shortest-path', 'implicit-graph', 'string'],
  statement, comparison, interview,
  inputs: [
    { key: 'beginWord', label: 'Từ bắt đầu', type: 'string', default: 'hit', maxLength: 6 },
    { key: 'endWord', label: 'Từ đích', type: 'string', default: 'cog', maxLength: 6 },
    { key: 'wordList', label: 'Danh sách từ', type: 'string[]', default: ['hot', 'dot', 'dog', 'lot', 'log', 'cog'], maxLength: 8 },
  ],
  presets: [
    { label: 'Đích không có trong list', values: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'dog', 'lot', 'log'] } },
    { label: 'Không liên thông', values: { beginWord: 'hit', endWord: 'cog', wordList: ['hot', 'dot', 'cog'] } },
    { label: 'Có ngõ cụt dig', values: { beginWord: 'cat', endWord: 'dog', wordList: ['cot', 'cog', 'dig', 'dog'] } },
    { label: 'Nhiều đường cùng độ dài', values: { beginWord: 'cold', endWord: 'warm', wordList: ['cord', 'card', 'ward', 'warm', 'wold', 'word', 'worm', 'corm'] } },
    { label: 'Một bước', values: { beginWord: 'a', endWord: 'c', wordList: ['a', 'b', 'c'] } },
  ],
  solutions: [
    { id: 'dfs-backtracking', name: 'DFS / backtracking', rank: 3, approach: 'Thử mọi đường đi đơn bằng DFS + quay lui, giữ độ dài ngắn nhất, cắt nhánh khi đã dài hơn best.', complexity: { time: 'O(n!·L) worst case', space: 'O(n)' },
      pros: ['Code ngắn, tự nhiên nếu chỉ nghĩ "tìm đường"', 'Dễ sửa để liệt kê mọi đường (ý tưởng của Word Ladder II)'], cons: ['Số đường đi đơn là hàm mũ ⇒ TLE ngay cả với n vài chục', 'Không biết đường đầu tiên tìm được có ngắn nhất không – phải thử hết'], whenToUse: 'Gần như không bao giờ cho bài đường ngắn nhất; chỉ để cho thấy vì sao cần BFS.',
      source: dfsSrc, run: call(dfs), trace: (i) => dfsTrace(cast(i)) },
    { id: 'bfs-pairwise', name: 'BFS so từng cặp', rank: 2, approach: 'BFS từ beginWord; hàng xóm của một từ tìm bằng cách so với mọi từ trong list (khác đúng 1 ký tự).', complexity: { time: 'O(n²·L)', space: 'O(n)' },
      pros: ['Đúng và tối ưu về số bước (BFS trên đồ thị không trọng số)', 'Không phụ thuộc bảng chữ cái'], cons: ['O(n²·L): n = 5000 là ~1,25·10⁸ phép so ký tự', 'Phí công so với các từ không liên quan'], whenToUse: 'n nhỏ (vài trăm) hoặc bảng chữ cái rất lớn (Unicode) khiến sinh biến thể đắt hơn so cặp.',
      source: pairSrc, run: call(pair), trace: (i) => pairTrace(cast(i)) },
    { id: 'bidirectional-bfs', name: 'Bidirectional BFS', rank: 1, approach: 'BFS đồng thời từ hai đầu, luôn mở rộng frontier nhỏ hơn; hàng xóm sinh bằng cách đổi từng ký tự rồi tra Set.', complexity: { time: 'O(n·L²·|Σ|) worst, thực tế ~b^(d/2)', space: 'O(n·L)' },
      pros: ['Hàng xóm sinh trong O(L·|Σ|·L), không phụ thuộc n', 'Hai phía gặp nhau ở giữa ⇒ thăm ít đỉnh hơn hẳn BFS một phía', 'Tra Set O(1), không cần tiền xử lý'], cons: ['Code dài hơn, dễ sai điều kiện dừng / đếm độ dài', 'Cần biết trước đích (không dùng cho "khoảng cách tới mọi đỉnh")'], whenToUse: 'Mặc định cho LeetCode 127 và các bài "đường ngắn nhất giữa hai trạng thái" (Open the Lock, Genetic Mutation).',
      source: biSrc, run: call(bi), trace: (i) => biTrace(cast(i)) },
  ],
};
export default problem;
