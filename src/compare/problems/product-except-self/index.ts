import type { CompareProblem } from '@/compare/types';
import type { Frame } from '@/engine/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bfSrc from './solutions/brute-force/impl.ts?raw';
import { productExceptSelf as bf } from './solutions/brute-force/impl';
import { trace as bfTrace } from './solutions/brute-force/trace';
import divSrc from './solutions/division/impl.ts?raw';
import { productExceptSelf as div } from './solutions/division/impl';
import { trace as divTrace } from './solutions/division/trace';
import psSrc from './solutions/prefix-suffix/impl.ts?raw';
import { productExceptSelf as ps } from './solutions/prefix-suffix/impl';
import { trace as psTrace } from './solutions/prefix-suffix/trace';
import rsSrc from './solutions/prefix-running-suffix/impl.ts?raw';
import { productExceptSelf as rs } from './solutions/prefix-running-suffix/impl';
import { trace as rsTrace } from './solutions/prefix-running-suffix/trace';

type In = { nums: number[] };
const cast = (i: Record<string, unknown>) => i as unknown as In;
/** 0 × số âm = −0 trong JS; chuẩn hoá về 0 để mọi lời giải so sánh bằng nhau. */
const norm = (r: number[]) => r.map((v) => v + 0);
function* normed(g: Generator<Frame, number[]>): Generator<Frame, number[]> {
  return norm(yield* g);
}

const problem: CompareProblem = {
  id: 'product-except-self',
  title: 'Product of Array Except Self',
  subtitle: 'Trái × phải: từ O(n²) và phép chia bị cấm tới prefix/suffix với O(1) bộ nhớ phụ',
  difficulty: 'Medium',
  leetcode: { id: 238, slug: 'product-of-array-except-self' },
  tags: ['array', 'prefix-sum'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums', type: 'number[]', default: [1, 2, 3, 4, 5], min: -9, max: 9, maxLength: 8 }],
  presets: [
    { label: 'Một số 0', values: { nums: [-1, 1, 0, -3, 3] } },
    { label: 'Hai số 0', values: { nums: [0, 4, 0, 2] } },
    { label: 'Số âm', values: { nums: [-2, 3, -4, 5] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 4, approach: 'Với mỗi i nhân lại mọi nums[j], j ≠ i.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng', 'Không chia, số 0 tự đúng'], cons: ['n(n−1) phép nhân – n = 10⁵ là 10¹⁰', 'Không tái dùng tích đã tính'], whenToUse: 'Chỉ để mở đầu hoặc kiểm chứng kết quả trên input nhỏ.',
      source: bfSrc, run: (i) => norm(bf(cast(i).nums)), trace: (i) => normed(bfTrace(cast(i))) },
    { id: 'division', name: 'Tích toàn bộ rồi chia', rank: 3, approach: 'Tích các phần tử khác 0 + đếm số 0; chia cho nums[i] khi không có số 0.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(n), O(1), code ngắn', 'Trực giác nhất'], cons: ['Đề cấm phép chia', 'Phải xử lý 0, 1, ≥ 2 số 0', 'Sai số với số thực; không dùng được với modulo'], whenToUse: 'Khi được phép chia, dữ liệu nguyên, và bạn đã xử lý số 0.',
      source: divSrc, run: (i) => norm(div(cast(i).nums)), trace: (i) => normed(divTrace(cast(i))) },
    { id: 'prefix-suffix', name: 'Prefix + suffix (hai mảng)', rank: 2, approach: 'prefix[i] = tích bên trái, suffix[i] = tích bên phải, answer[i] = prefix[i] × suffix[i].', complexity: { time: 'O(n)', space: 'O(n)' },
      pros: ['O(n), không chia', 'Số 0 tự đúng', 'Dễ giải thích, dễ kiểm tra'], cons: ['Thêm 2 mảng O(n)', 'Ba lượt duyệt'], whenToUse: 'Bước đệm khi trình bày, hoặc khi cần giữ lại prefix/suffix cho truy vấn khác.',
      source: psSrc, run: (i) => norm(ps(cast(i).nums)), trace: (i) => normed(psTrace(cast(i))) },
    { id: 'prefix-running-suffix', name: 'Prefix trong output + suffix chạy', rank: 1, approach: 'Lượt xuôi ghi tích bên trái vào answer; lượt ngược nhân với biến suffix tích luỹ.', complexity: { time: 'O(n)', space: 'O(1) phụ' },
      pros: ['O(n), O(1) bộ nhớ phụ', 'Không chia, số 0 tự đúng', 'Chỉ hai lượt'], cons: ['Phải đúng thứ tự: dùng suffix rồi mới nhân nums[i]', 'Khó thấy ngay nếu chưa qua bước hai mảng'], whenToUse: 'Đáp án mặc định cho bài này.',
      source: rsSrc, run: (i) => norm(rs(cast(i).nums)), trace: (i) => normed(rsTrace(cast(i))) },
  ],
};
export default problem;
