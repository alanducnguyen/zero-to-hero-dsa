import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { buildBST, type KthInput } from './shared';
import arraySrc from './solutions/inorder-array/impl.ts?raw';
import { kthSmallest as viaArray } from './solutions/inorder-array/impl';
import { trace as arrayTrace } from './solutions/inorder-array/trace';
import recSrc from './solutions/recursive-early-stop/impl.ts?raw';
import { kthSmallest as viaRec } from './solutions/recursive-early-stop/impl';
import { trace as recTrace } from './solutions/recursive-early-stop/trace';
import iterSrc from './solutions/iterative-stack/impl.ts?raw';
import { kthSmallest as viaIter } from './solutions/iterative-stack/impl';
import { trace as iterTrace } from './solutions/iterative-stack/trace';

const cast = (i: Record<string, unknown>) => i as unknown as KthInput;

const problem: CompareProblem = {
  id: 'kth-smallest-bst',
  title: 'Kth Smallest Element in a BST',
  subtitle: 'Inorder toàn bộ vào mảng → đệ quy dừng sớm → stack tường minh không sợ tràn call stack',
  difficulty: 'Medium',
  leetcode: { id: 230, slug: 'kth-smallest-element-in-a-bst' },
  tags: ['bst', 'tree', 'inorder', 'stack'],
  statement, comparison, interview,
  inputs: [
    { key: 'values', label: 'Giá trị chèn lần lượt vào BST', type: 'number[]', default: [5, 3, 6, 2, 4, 1], min: -99, max: 99, maxLength: 15 },
    { key: 'k', label: 'k (1-based)', type: 'number', default: 3, min: 1, max: 15 },
  ],
  presets: [
    { label: 'k = 1 (min)', values: { values: [5, 3, 6, 2, 4, 1], k: 1 } },
    { label: 'Cây cân bằng, k lớn', values: { values: [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7], k: 9 } },
    { label: 'Cây lệch phải', values: { values: [1, 2, 3, 4, 5], k: 4 } },
    { label: 'k vượt số node', values: { values: [3, 1, 4], k: 5 } },
  ],
  solutions: [
    { id: 'inorder-array', name: 'Inorder ra mảng', rank: 3, approach: 'Duyệt inorder toàn bộ cây vào mảng (tự tăng dần) rồi lấy phần tử k − 1.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Đơn giản nhất, gần như không thể sai', 'Mảng tái dùng được nếu hỏi nhiều k trên cây không đổi'], cons: ['Luôn duyệt hết n node dù k = 1', 'Tốn O(n) bộ nhớ cho mảng cộng O(h) call stack'], whenToUse: 'Mở đầu phỏng vấn, hoặc cây tĩnh và cần trả lời nhiều k (cache mảng một lần).',
      source: arraySrc, run: (i) => viaArray(buildBST(cast(i).values), cast(i).k), trace: (i) => arrayTrace(cast(i)) },
    { id: 'recursive-early-stop', name: 'Inorder đệ quy dừng sớm', rank: 2, approach: 'Inorder đệ quy chỉ đếm node; tới node thứ k thì ghi kết quả và trả true để cắt mọi nhánh còn lại.', complexity: { time: 'O(h + k)', space: 'O(h)' },
      pros: ['Chỉ thăm h + k node', 'Không cần mảng phụ', 'Code ngắn, dễ giải thích'], cons: ['Call stack sâu h – cây lệch 10⁵ node có thể tràn stack', 'Phải lan cờ "found" ngược lên qua mọi tầng'], whenToUse: 'Cây được đảm bảo cân bằng (h = O(log n)) và muốn code gọn.',
      source: recSrc, run: (i) => viaRec(buildBST(cast(i).values), cast(i).k), trace: (i) => recTrace(cast(i)) },
    { id: 'iterative-stack', name: 'Inorder lặp với stack', rank: 1, approach: 'Mô phỏng inorder bằng stack tường minh: đẩy hết nhánh trái, pop node nhỏ nhất, đếm, sang phải; pop thứ k là đáp án.', complexity: { time: 'O(h + k)', space: 'O(h)' },
      pros: ['O(h + k) như đệ quy nhưng không rủi ro tràn call stack', 'return ngay khi tìm thấy, không cần cờ', 'Chính là BST Iterator (LC 173) – tái dùng được'], cons: ['Dài hơn bản đệ quy, dễ sai điều kiện vòng lặp', 'Vẫn O(h) bộ nhớ (Morris mới O(1))'], whenToUse: 'Mặc định khi chốt đáp án, đặc biệt khi cây có thể lệch.',
      source: iterSrc, run: (i) => viaIter(buildBST(cast(i).values), cast(i).k), trace: (i) => iterTrace(cast(i)) },
  ],
};
export default problem;
