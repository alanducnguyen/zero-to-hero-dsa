import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import removeSrc from './solutions/remove-pairs/impl.ts?raw';
import { isValid as viaRemove } from './solutions/remove-pairs/impl';
import { trace as removeTrace } from './solutions/remove-pairs/trace';
import rdSrc from './solutions/recursive-descent/impl.ts?raw';
import { isValid as viaRd } from './solutions/recursive-descent/impl';
import { trace as rdTrace } from './solutions/recursive-descent/trace';
import stackSrc from './solutions/stack-map/impl.ts?raw';
import { isValid as viaStack } from './solutions/stack-map/impl';
import { trace as stackTrace } from './solutions/stack-map/trace';

type In = { s: string };
const cast = (i: Record<string, unknown>) => i as unknown as In;

const problem: CompareProblem = {
  id: 'valid-parentheses',
  title: 'Valid Parentheses',
  subtitle: 'Xoá cặp lặp lại O(n²) → recursive descent → stack + map O(n): cùng một cấu trúc LIFO, ba cách hiện thực',
  difficulty: 'Easy',
  leetcode: { id: 20, slug: 'valid-parentheses' },
  tags: ['stack', 'string', 'recursion'],
  statement, comparison, interview,
  inputs: [{ key: 's', label: 'Chuỗi ngoặc', type: 'string', default: '{[()]}()', maxLength: 24 }],
  presets: [
    { label: 'Sai loại', values: { s: '([)]' } },
    { label: 'Đóng thừa', values: { s: '())' } },
    { label: 'Mở thừa', values: { s: '((()' } },
    { label: 'Lồng sâu', values: { s: '(((([]))))' } },
    { label: 'Chuỗi rỗng', values: { s: '' } },
  ],
  solutions: [
    { id: 'remove-pairs', name: 'Xoá cặp lặp lại', rank: 3, approach: 'Lặp xoá mọi "()", "[]", "{}" kề nhau đến khi chuỗi không đổi; hợp lệ ⇔ còn chuỗi rỗng.', complexity: { time: 'O(n²)', space: 'O(n)' },
      pros: ['Ý tưởng trực quan, code 6 dòng', 'Không cần nghĩ về stack'], cons: ['O(n²) với chuỗi lồng sâu: mỗi vòng chỉ bóc một tầng', 'Mỗi replace cấp phát chuỗi mới – áp lực GC', 'Không cho biết vị trí lỗi'], whenToUse: 'Chỉ để khởi động hoặc viết nhanh trong script với chuỗi rất ngắn.',
      source: removeSrc, run: (i) => viaRemove(cast(i).s), trace: (i) => removeTrace(cast(i)) },
    { id: 'recursive-descent', name: 'Recursive descent', rank: 2, approach: 'Parse theo văn phạm S → (mở S đóng)*: mỗi ngoặc mở gọi đệ quy đọc phần bên trong rồi đòi đúng ngoặc đóng.', complexity: { time: 'O(n)', space: 'O(n) call stack' },
      pros: ['O(n), mỗi ký tự đọc một lần', 'Mở rộng tự nhiên thành parser thật (biểu thức, JSON)', 'Biến want cục bộ thay cho stack tường minh'], cons: ['Độ sâu đệ quy = độ lồng, tệ nhất n/2 – tràn call stack với n = 10⁵', 'Khó đọc hơn stack, dễ sai việc quản lý con trỏ dùng chung'], whenToUse: 'Khi bài mở rộng thành parse/evaluate biểu thức có cấu trúc lồng nhau và độ sâu nhỏ.',
      source: rdSrc, run: (i) => viaRd(cast(i).s), trace: (i) => rdTrace(cast(i)) },
    { id: 'stack-map', name: 'Stack + map cặp', rank: 1, approach: 'Push ngoặc mở; gặp ngoặc đóng thì pop và so với map đóng → mở; cuối cùng stack phải rỗng.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['O(n) một lượt, dừng ngay tại lỗi đầu tiên', 'Stack trên heap – không giới hạn độ sâu', 'Thêm loại ngoặc chỉ cần thêm một mục map'], cons: ['O(n) bộ nhớ khi toàn ngoặc mở', 'Ba điều kiện biên (stack rỗng, sai loại, còn dư) dễ quên một'], whenToUse: 'Mặc định – đáp án chuẩn cho mọi biến thể khớp ngoặc nhiều loại.',
      source: stackSrc, run: (i) => viaStack(cast(i).s), trace: (i) => stackTrace(cast(i)) },
  ],
};
export default problem;
