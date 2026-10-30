import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { norm } from './viz';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { minWindow as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import expandSrc from './solutions/expand-right/impl.ts?raw';
import { minWindow as expand } from './solutions/expand-right/impl';
import { trace as expandTrace } from './solutions/expand-right/trace';
import slideSrc from './solutions/sliding-window/impl.ts?raw';
import { minWindow as slide } from './solutions/sliding-window/impl';
import { trace as slideTrace } from './solutions/sliding-window/trace';

const problem: CompareProblem = {
  id: 'minimum-window-substring',
  title: 'Minimum Window Substring',
  subtitle: 'Mọi substring O(n²·σ) → mở rộng từng left O(n²) → sliding window need/missing O(n): giữ lại công đã đếm',
  difficulty: 'Hard',
  leetcode: { id: 76, slug: 'minimum-window-substring' },
  tags: ['sliding-window', 'hashmap', 'string', 'two-pointers'],
  statement, comparison, interview,
  inputs: [
    { key: 's', label: 'Chuỗi s (≤ 20 ký tự)', type: 'string', default: 'ADOBECODEBANC', maxLength: 20 },
    { key: 't', label: 'Chuỗi t (≤ 8 ký tự)', type: 'string', default: 'ABC', maxLength: 8 },
  ],
  presets: [
    { label: 'Ký tự lặp trong t', values: { s: 'AABBCAB', t: 'AAB' } },
    { label: 'Không có lời giải', values: { s: 'ABCDE', t: 'XY' } },
    { label: 'Hoà độ dài – lấy trái nhất', values: { s: 'abxba', t: 'ab' } },
    { label: 't dài hơn s', values: { s: 'a', t: 'aa' } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force mọi substring', rank: 3, approach: 'Xét mọi cặp (i, j), đếm tần suất s[i..j] tăng dần theo j và so cả bảng với t.', complexity: { time: 'O(n²·σ)', space: 'O(σ)' },
      pros: ['Hiển nhiên đúng, dễ chứng minh', 'Tie-break trái nhất tự nhiên'], cons: ['n = 10⁵ ⇒ 5·10⁹ substring, mỗi cái còn so O(σ)', 'Vứt bỏ bảng đếm mỗi khi đổi i'], whenToUse: 'Chỉ để làm rõ đề và có đáp án đối chiếu khi test.',
      source: bruteSrc, run: (i) => brute(norm(i).s, norm(i).t), trace: (i) => bruteTrace(norm(i)) },
    { id: 'expand-right', name: 'Mở rộng right cho mỗi left', rank: 2, approach: 'Với mỗi left, mở right tới khi missing = 0 thì dừng – đó là cửa sổ ngắn nhất bắt đầu tại left.', complexity: { time: 'O(n²)', space: 'O(σ)' },
      pros: ['Kiểm tra hợp lệ O(1) nhờ bộ đếm missing', 'Break sớm: không xét cửa sổ dài hơn cần thiết'], cons: ['Vẫn O(n²) khi cửa sổ hợp lệ dài', 'Làm lại từ đầu cho mỗi left'], whenToUse: 'Bước đệm trong phỏng vấn để lộ ra ý "giữ lại trạng thái giữa các left".',
      source: expandSrc, run: (i) => expand(norm(i).s, norm(i).t), trace: (i) => expandTrace(norm(i)) },
    { id: 'sliding-window', name: 'Sliding window need/missing', rank: 1, approach: 'Một bảng need dùng suốt: right mở rộng tới khi đủ, left co tới khi sắp thiếu; ghi kỷ lục mỗi lần hợp lệ.', complexity: { time: 'O(|s| + |t|)', space: 'O(σ)' },
      pros: ['Tuyến tính: mỗi ký tự vào và ra cửa sổ tối đa một lần', 'Khuôn mẫu chung cho cả họ bài "substring thoả điều kiện đếm"'], cons: ['Dễ sai dấu need âm/dương và điều kiện missing++', 'Chỉ đúng khi điều kiện hợp lệ đơn điệu theo độ dài cửa sổ'], whenToUse: 'Đáp án mặc định cho mọi biến thể "cửa sổ ngắn nhất/dài nhất thoả điều kiện đếm".',
      source: slideSrc, run: (i) => slide(norm(i).s, norm(i).t), trace: (i) => slideTrace(norm(i)) },
  ],
};
export default problem;
