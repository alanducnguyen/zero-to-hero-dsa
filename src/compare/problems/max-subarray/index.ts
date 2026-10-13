import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bfSrc from './solutions/brute-force/impl.ts?raw';
import { maxSubArray as bf } from './solutions/brute-force/impl';
import { trace as bfTrace } from './solutions/brute-force/trace';
import psSrc from './solutions/prefix-sum/impl.ts?raw';
import { maxSubArray as ps } from './solutions/prefix-sum/impl';
import { trace as psTrace } from './solutions/prefix-sum/trace';
import dcSrc from './solutions/divide-conquer/impl.ts?raw';
import { maxSubArray as dc } from './solutions/divide-conquer/impl';
import { trace as dcTrace } from './solutions/divide-conquer/trace';
import kSrc from './solutions/kadane/impl.ts?raw';
import { maxSubArray as kd } from './solutions/kadane/impl';
import { trace as kTrace } from './solutions/kadane/trace';

type In = { nums: number[] };
const norm = (i: Record<string, unknown>): In => { const x = i as unknown as In; return { nums: x.nums.length ? x.nums : [0] }; };

const problem: CompareProblem = {
  id: 'max-subarray',
  title: 'Maximum Subarray',
  subtitle: 'Brute force → prefix sum → chia để trị → Kadane: bốn góc nhìn cho cùng một bài DP kinh điển',
  difficulty: 'Medium',
  leetcode: { id: 53, slug: 'maximum-subarray' },
  tags: ['array', 'dp', 'prefix-sum', 'divide-conquer'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums', type: 'number[]', default: [-2, 1, -3, 4, -1, 2, 1, -5, 4], min: -9, max: 9, maxLength: 10 }],
  presets: [
    { label: 'Toàn số âm', values: { nums: [-3, -1, -2] } },
    { label: 'Toàn dương', values: { nums: [1, 2, 3, 4] } },
    { label: 'Một phần tử', values: { nums: [-7] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 4, approach: 'Với mỗi điểm bắt đầu, cộng dồn tới từng điểm kết thúc và giữ max.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['Hiển nhiên đúng', 'Không cần nhận xét gì'], cons: ['n = 10⁵ ⇒ 5·10⁹ bước'], whenToUse: 'Chỉ để kiểm chứng kết quả hoặc làm rõ đề.',
      source: bfSrc, run: (i) => bf(norm(i).nums), trace: (i) => bfTrace(norm(i)) },
    { id: 'prefix-sum', name: 'Prefix sum + min prefix', rank: 2, approach: 'Tổng đoạn = P[j+1] − P[i]; với mỗi j trừ đi prefix nhỏ nhất trước đó.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['Tuyến tính', 'Khung tổng quát cho "tổng = k", "độ dài ≤ k", 2D'], cons: ['Khó thấy ngay bằng Kadane', 'Cẩn thận P[0] = 0'], whenToUse: 'Khi bài biến thể có thêm ràng buộc về tổng hoặc độ dài đoạn.',
      source: psSrc, run: (i) => ps(norm(i).nums), trace: (i) => psTrace(norm(i)) },
    { id: 'divide-conquer', name: 'Chia để trị', rank: 3, approach: 'Đáp án = max(trái, phải, hậu tố tốt nhất trái + tiền tố tốt nhất phải).', complexity: { time: 'O(n log n)', space: 'O(log n)' },
      pros: ['Song song hoá được', 'Nền của Segment Tree cho truy vấn đoạn'], cons: ['Chậm hơn O(n)', 'Code dài hơn, dễ sai ở đoạn vắt qua giữa'], whenToUse: 'Cần truy vấn max subarray trên đoạn bất kỳ có cập nhật, hoặc tính phân tán.',
      source: dcSrc, run: (i) => dc(norm(i).nums), trace: (i) => dcTrace(norm(i)) },
    { id: 'kadane', name: 'Kadane (DP)', rank: 1, approach: 'cur = max(x, cur + x): kéo dài đoạn hay bắt đầu lại; best = max(best, cur).', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['4 dòng, O(n)/O(1)', 'Tư duy tái dùng cho nhiều bài DP 1D'], cons: ['Khởi tạo sai (0) ⇒ sai với mảng toàn âm', 'Không mở rộng trực tiếp sang truy vấn đoạn'], whenToUse: 'Mặc định cho câu hỏi gốc.',
      source: kSrc, run: (i) => kd(norm(i).nums), trace: (i) => kTrace(norm(i)) },
  ],
};
export default problem;
