import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { rob as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { rob as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import buSrc from './solutions/bottom-up/impl.ts?raw';
import { rob as bu } from './solutions/bottom-up/impl';
import { trace as buTrace } from './solutions/bottom-up/trace';
import tvSrc from './solutions/two-vars/impl.ts?raw';
import { rob as tv } from './solutions/two-vars/impl';
import { trace as tvTrace } from './solutions/two-vars/trace';

/** Tối đa 10 nhà, tiền nguyên 0..99 – đủ nhỏ để cây đệ quy thuần (≈ φⁿ lời gọi) còn xem được. */
const norm = (i: Record<string, unknown>) => ({
  nums: ((i.nums as number[]) ?? []).slice(0, 10).map((x) => Math.max(0, Math.min(99, Math.floor(Number(x) || 0)))),
});

const problem: CompareProblem = {
  id: 'house-robber',
  title: 'House Robber',
  subtitle: 'Đệ quy chọn/bỏ O(φⁿ) → memo → mảng dp → hai biến O(1): khuôn mẫu DP "lấy hoặc bỏ" kinh điển',
  difficulty: 'Medium',
  leetcode: { id: 198, slug: 'house-robber' },
  tags: ['dp', 'recursion', 'array'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'Tiền ở mỗi nhà (≤ 10 nhà để xem cây đệ quy)', type: 'number[]', default: [2, 7, 9, 3, 1], min: 0, max: 99, maxLength: 10 }],
  presets: [
    { label: 'Lấy cách 2', values: { nums: [1, 2, 3, 1] } },
    { label: 'Nhà ở giữa to', values: { nums: [2, 1, 1, 9, 1, 1, 2] } },
    { label: 'Bỏ 2 nhà liền', values: { nums: [5, 1, 1, 5] } },
    { label: '1 nhà', values: { nums: [5] } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy thuần', rank: 4, approach: 'Ở nhà i: bỏ (sang i+1) hoặc cướp (nums[i] + nhảy sang i+2); lấy max.', complexity: { time: 'O(φⁿ)', space: 'O(n) stack' },
      pros: ['Dịch thẳng lựa chọn "lấy hoặc bỏ" thành code', 'Là bước đầu để tìm ra công thức truy hồi'], cons: ['Hàm mũ: 40 nhà đã mất hàng giây', 'Cùng rob(i) bị tính lại rất nhiều lần'], whenToUse: 'Chỉ để trình bày trực giác trước khi tối ưu.',
      source: recSrc, run: (i) => rec(norm(i).nums), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Đệ quy + memo', rank: 3, approach: 'best(i) chỉ phụ thuộc i ⇒ lưu vào Map, mỗi trạng thái tính một lần.', complexity: { time: 'O(n)', space: 'O(n) + O(n) stack' },
      pros: ['Thêm 3 dòng vào bản đệ quy là thành O(n)', 'Giữ nguyên tư duy top-down dễ giải thích'], cons: ['Đệ quy sâu n tầng ⇒ tràn stack khi n ≈ 10⁴–10⁵ trong JS', 'Map tốn bộ nhớ và chậm hơn mảng'], whenToUse: 'Khi công thức truy hồi phức tạp hoặc trạng thái thưa, khó sắp thứ tự bottom-up.',
      source: memoSrc, run: (i) => memo(norm(i).nums), trace: (i) => memoTrace(norm(i)) },
    { id: 'bottom-up', name: 'Bottom-up mảng dp', rank: 2, approach: 'dp[i] = max(dp[i−1], dp[i−2] + nums[i−1]) với i nhà đầu, điền từ trái sang phải.', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['Không đệ quy, không tràn stack', 'Bảng dp dễ debug, dễ truy vết để in ra các nhà được chọn'], cons: ['O(n) bộ nhớ dù chỉ cần 2 ô cuối'], whenToUse: 'Khi cần truy vết lời giải (nhà nào được cướp) hoặc đang trình bày trước bước tối ưu bộ nhớ.',
      source: buSrc, run: (i) => bu(norm(i).nums), trace: (i) => buTrace(norm(i)) },
    { id: 'two-vars', name: 'Hai biến O(1)', rank: 1, approach: 'Mỗi bước chỉ đọc dp[i−1], dp[i−2] ⇒ giữ prev, cur và trượt.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Tối ưu cả thời gian lẫn bộ nhớ', '5 dòng, không đệ quy, không cấp phát'], cons: ['Mất bảng dp ⇒ không truy vết được nhà nào được chọn', 'Khó hiểu nếu nhảy thẳng vào mà không đi qua mảng dp'], whenToUse: 'Đáp án mặc định khi chỉ cần giá trị lớn nhất.',
      source: tvSrc, run: (i) => tv(norm(i).nums), trace: (i) => tvTrace(norm(i)) },
  ],
};
export default problem;
