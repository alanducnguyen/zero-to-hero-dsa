import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { wordBreak as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { wordBreak as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import dpSrc from './solutions/bottom-up-dp/impl.ts?raw';
import { wordBreak as dp } from './solutions/bottom-up-dp/impl';
import { trace as dpTrace } from './solutions/bottom-up-dp/trace';
import bfsSrc from './solutions/bfs/impl.ts?raw';
import { wordBreak as bfs } from './solutions/bfs/impl';
import { trace as bfsTrace } from './solutions/bfs/trace';

type In = { s: string; wordDict: string[] };
/** Giới hạn input để đệ quy thuần (O(2ⁿ)) không vượt 4000 frame: |s| ≤ 12, tối đa 6 từ khác rỗng. */
const norm = (i: Record<string, unknown>): In => ({
  s: String(i.s ?? '').slice(0, 12),
  wordDict: (Array.isArray(i.wordDict) ? i.wordDict : []).map(String).filter((w) => w.length > 0).slice(0, 6),
});
const call = (f: (s: string, d: string[]) => boolean) => (i: Record<string, unknown>) => {
  const { s, wordDict } = norm(i);
  return f(s, wordDict);
};

const problem: CompareProblem = {
  id: 'word-break',
  title: 'Word Break',
  subtitle: 'Đệ quy thử mọi tiền tố → memo → DP bottom-up, và góc nhìn BFS trên chỉ số',
  difficulty: 'Medium',
  leetcode: { id: 139, slug: 'word-break' },
  tags: ['dp', 'string', 'memoization', 'bfs', 'hashset'],
  statement, comparison, interview,
  inputs: [
    { key: 's', label: 's', type: 'string', default: 'leetcode', maxLength: 12 },
    { key: 'wordDict', label: 'wordDict', type: 'string[]', default: ['leet', 'code'], maxLength: 6 },
  ],
  presets: [
    { label: 'Không cắt được', values: { s: 'catsandog', wordDict: ['cats', 'dog', 'sand', 'and', 'cat'] } },
    { label: 'Nhiều cách cắt', values: { s: 'pineapplepen', wordDict: ['apple', 'pen', 'applepen', 'pine', 'pineapple'] } },
    { label: 'Bùng nổ hàm mũ', values: { s: 'aaaaaaab', wordDict: ['a', 'aa', 'aaa', 'aaaa'] } },
    { label: 'Chuỗi rỗng', values: { s: '', wordDict: ['a'] } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'Thử mọi tiền tố là từ trong dict, đệ quy phần còn lại.', complexity: { time: 'O(2ⁿ)', space: 'O(n)' },
      pros: ['Diễn đạt trực tiếp định nghĩa bài toán', 'Dừng sớm nếu may mắn tìm được cách cắt'], cons: ['Cùng start bị giải lại hàm mũ lần', 'TLE với "aaa…ab"'], whenToUse: 'Chỉ để mở đầu, hoặc làm khung cho Word Break II trước khi thêm memo.',
      source: recSrc, run: call(rec), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 2, approach: 'Như đệ quy thuần nhưng nhớ kết quả can(start) trong Map.', complexity: { time: 'O(n³)', space: 'O(n)' },
      pros: ['Sửa tối thiểu từ brute force', 'Chỉ thăm vị trí tới được, dừng sớm', 'Mở rộng thẳng sang Word Break II'], cons: ['Đệ quy sâu tới n – rủi ro tràn stack', 'Overhead lời gọi hàm'], whenToUse: 'Khi cần liệt kê lời giải (LC 140) hoặc muốn đi từ brute force lên nhanh nhất.',
      source: memoSrc, run: call(memo), trace: (i) => memoTrace(norm(i)) },
    { id: 'bottom-up-dp', name: 'DP bottom-up', rank: 1, approach: 'dp[i] = s[0..i) cắt được; dp[i] = ∃ j ∈ [i − maxLen, i): dp[j] && s[j..i) ∈ dict.', complexity: { time: 'O(n·L²)', space: 'O(n)' },
      pros: ['Không đệ quy, không tràn stack', 'Giới hạn maxLen cắt vòng trong còn O(L)', 'Dễ đổi sang đếm số cách / số từ ít nhất'], cons: ['Tính mọi dp[i] kể cả vị trí không tới được', 'Khó thấy hơn với người chưa quen DP'], whenToUse: 'Mặc định cho bài true/false hoặc đếm số cách.',
      source: dpSrc, run: call(dp), trace: (i) => dpTrace(norm(i)) },
    { id: 'bfs', name: 'BFS trên chỉ số', rank: 3, approach: 'Đỉnh 0..n, cạnh start → end nếu s[start..end) là từ; BFS tìm đường 0 → n với mảng seen.', complexity: { time: 'O(n³)', space: 'O(n)' },
      pros: ['Không đệ quy', 'Dừng ngay khi chạm n', 'BFS theo tầng cho luôn số từ ít nhất'], cons: ['Code dài hơn DP', 'Không giới hạn maxLen thì vòng trong O(n)'], whenToUse: 'Khi bài hỏi số từ ít nhất, hoặc người phỏng vấn dẫn theo hướng đồ thị.',
      source: bfsSrc, run: call(bfs), trace: (i) => bfsTrace(norm(i)) },
  ],
};
export default problem;
