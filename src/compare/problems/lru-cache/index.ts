import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { clampCapacity, parseOps, type LRUInput } from './ops';
import arraySrc from './solutions/array-timestamp/impl.ts?raw';
import { lruArray } from './solutions/array-timestamp/impl';
import { trace as arrayTrace } from './solutions/array-timestamp/trace';
import mapSrc from './solutions/js-map/impl.ts?raw';
import { lruMap } from './solutions/js-map/impl';
import { trace as mapTrace } from './solutions/js-map/trace';
import dllSrc from './solutions/dll-hashmap/impl.ts?raw';
import { lruList } from './solutions/dll-hashmap/impl';
import { trace as dllTrace } from './solutions/dll-hashmap/trace';

const cast = (i: Record<string, unknown>) => i as unknown as LRUInput;
const args = (i: Record<string, unknown>) => [clampCapacity(cast(i).capacity), parseOps(cast(i).ops)] as const;

const problem: CompareProblem = {
  id: 'lru-cache',
  title: 'LRU Cache',
  subtitle: 'Từ quét timestamp O(n) tới O(1): tự cài DLL + HashMap hay tận dụng Map giữ thứ tự chèn',
  difficulty: 'Medium',
  leetcode: { id: 146, slug: 'lru-cache' },
  tags: ['design', 'hashmap', 'linked-list', 'cache'],
  statement, comparison, interview,
  inputs: [
    { key: 'capacity', label: 'capacity (1–6)', type: 'number', default: 2, min: 1, max: 6 },
    { key: 'ops', label: 'Thao tác: "put k v", "get k"', type: 'string[]', default: ['put 1 1', 'put 2 2', 'get 1', 'put 3 3', 'get 2', 'put 4 4', 'get 1', 'get 3', 'get 4'], maxLength: 20 },
  ],
  presets: [
    { label: 'Cập nhật key cũ', values: { capacity: 2, ops: ['put 2 1', 'put 2 2', 'get 2', 'put 1 1', 'put 4 1', 'get 2'] } },
    { label: 'capacity 1', values: { capacity: 1, ops: ['put 1 1', 'get 1', 'put 2 2', 'get 1', 'get 2'] } },
    { label: 'get làm mới thứ tự', values: { capacity: 3, ops: ['put 1 10', 'put 2 20', 'put 3 30', 'get 1', 'put 4 40', 'get 2', 'get 1', 'put 5 50', 'get 3', 'get 4'] } },
  ],
  solutions: [
    { id: 'array-timestamp', name: 'Mảng + timestamp', rank: 3, approach: 'Mỗi entry nhớ lần dùng cuối; evict bằng cách quét tìm timestamp nhỏ nhất.', complexity: { time: 'O(n) mỗi thao tác', space: 'O(capacity)' },
      pros: ['Hiển nhiên đúng, dễ giải thích', 'Không con trỏ; capacity rất nhỏ thì quét tuyến tính thân thiện cache CPU'], cons: ['Tìm key và evict đều O(n)', 'splice giữa mảng cũng O(n)'], whenToUse: 'Mở đầu phỏng vấn, hoặc capacity chỉ vài phần tử.',
      source: arraySrc, run: (i) => lruArray(...args(i)), trace: (i) => arrayTrace(cast(i)) },
    { id: 'dll-hashmap', name: 'DLL + HashMap', rank: 2, approach: 'HashMap key → node để tìm O(1); danh sách liên kết đôi sắp theo độ mới để đổi thứ tự và lấy LRU O(1).', complexity: { time: 'O(1) mỗi thao tác', space: 'O(capacity)' },
      pros: ['O(1) không phụ thuộc thư viện – viết được ở mọi ngôn ngữ', 'Đáp án chuẩn người phỏng vấn chờ, mở rộng tự nhiên sang LFU/TTL'], cons: ['Nhiều con trỏ, dễ bug khi unlink/pushFront', 'Mỗi node là một object ⇒ tốn bộ nhớ và GC hơn'], whenToUse: 'Phỏng vấn (nhất là khi bị yêu cầu tự cài) hoặc ngôn ngữ không có map giữ thứ tự.',
      source: dllSrc, run: (i) => lruList(...args(i)), trace: (i) => dllTrace(cast(i)) },
    { id: 'js-map', name: 'JS Map thứ tự chèn', rank: 1, approach: 'Map JS duyệt theo thứ tự chèn (đặc tả bảo đảm): xoá + chèn lại để làm mới, key đầu tiên là LRU.', complexity: { time: 'O(1) mỗi thao tác', space: 'O(capacity)' },
      pros: ['~15 dòng, gần như không thể sai', 'Hằng số nhỏ: thứ tự được engine duy trì bằng native code'], cons: ['Dựa vào đảm bảo của ngôn ngữ – không chuyển sang C++/Go được', 'Người phỏng vấn có thể coi là né bài và yêu cầu tự cài'], whenToUse: 'Code production JS/TS; trong phỏng vấn nêu ra rồi hỏi có được dùng không.',
      source: mapSrc, run: (i) => lruMap(...args(i)), trace: (i) => mapTrace(cast(i)) },
  ],
};
export default problem;
