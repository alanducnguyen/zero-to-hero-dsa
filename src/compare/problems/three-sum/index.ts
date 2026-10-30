import type { CompareProblem } from '@/compare/types';
import type { Frame } from '@/engine/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bruteSrc from './solutions/brute-force/impl.ts?raw';
import { threeSum as brute } from './solutions/brute-force/impl';
import { trace as bruteTrace } from './solutions/brute-force/trace';
import hashSrc from './solutions/hashset/impl.ts?raw';
import { threeSum as hash } from './solutions/hashset/impl';
import { trace as hashTrace } from './solutions/hashset/trace';
import tpSrc from './solutions/sort-two-pointers/impl.ts?raw';
import { threeSum as tp } from './solutions/sort-two-pointers/impl';
import { trace as tpTrace } from './solutions/sort-two-pointers/trace';

type In = { nums: number[] };
const cast = (i: Record<string, unknown>) => i as unknown as In;
/** Đề cho phép trả bộ ba theo thứ tự bất kỳ ⇒ chuẩn hoá (mỗi bộ ba đã tăng dần) bằng cách sắp xếp danh sách để so sánh giữa các lời giải. */
const norm = (r: number[][]) => [...r].sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
function* normTrace(g: Generator<Frame, number[][]>): Generator<Frame, number[][]> {
  return norm(yield* g);
}

const problem: CompareProblem = {
  id: 'three-sum',
  title: '3Sum',
  subtitle: 'O(n³) → HashSet O(n²) → sort + two pointers O(n²): cùng độ phức tạp, nhưng khử trùng mới là chỗ phân hạng',
  difficulty: 'Medium',
  leetcode: { id: 15, slug: '3sum' },
  tags: ['array', 'two-pointers', 'sorting', 'hashset'],
  statement, comparison, interview,
  inputs: [
    { key: 'nums', label: 'nums', type: 'number[]', default: [-1, 0, 1, 2, -1, -4], min: -10, max: 10, maxLength: 9 },
  ],
  presets: [
    { label: 'Nhiều bản trùng', values: { nums: [-2, 0, 0, 2, 2, -2, 0] } },
    { label: 'Toàn số 0', values: { nums: [0, 0, 0, 0] } },
    { label: 'Không có đáp án', values: { nums: [1, 2, -2, -1] } },
    { label: 'Nhiều bộ ba', values: { nums: [-4, -1, -1, 0, 1, 2, 3, 5] } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force + Set', rank: 3, approach: 'Thử mọi bộ ba (i, j, k); bộ ba tổng 0 được sắp xếp thành khoá chuỗi để Set loại trùng.', complexity: { time: 'O(n³)', space: 'O(k) – k = số đáp án' },
      pros: ['Hiển nhiên đúng, dễ viết', 'Không cần sort mảng gốc'], cons: ['n = 3000 ⇒ ~4.5·10⁹ bộ ba: TLE', 'Khử trùng bằng chuỗi tốn thêm cấp phát'], whenToUse: 'Chỉ để mở đầu, hoặc làm oracle khi viết test cho lời giải nhanh.',
      source: bruteSrc, run: (i) => norm(brute(cast(i).nums)), trace: (i) => normTrace(bruteTrace(cast(i))) },
    { id: 'hashset', name: 'HashSet mỗi i', rank: 2, approach: 'Cố định nums[i], giải Two Sum với tổng −nums[i] trên đoạn sau bằng HashSet; Map khoá đã sắp xếp để khử trùng.', complexity: { time: 'O(n²)', space: 'O(n)' },
      pros: ['O(n²) mà không cần sort', 'Tái dùng trực tiếp lời giải Two Sum', 'Dễ mở rộng khi cần giữ chỉ số gốc'], cons: ['O(n) bộ nhớ, tạo Set mới mỗi i', 'Khử trùng vẫn phải nhờ Map khoá chuỗi', 'Hằng số hash lớn hơn so sánh mảng'], whenToUse: 'Khi không được thay đổi/sắp xếp thứ tự, hoặc đề hỏi chỉ số thay vì giá trị.',
      source: hashSrc, run: (i) => norm(hash(cast(i).nums)), trace: (i) => normTrace(hashTrace(cast(i))) },
    { id: 'sort-two-pointers', name: 'Sort + two pointers', rank: 1, approach: 'Sắp xếp; cố định a[i], hai con trỏ l/r co dần theo dấu của tổng; nhảy qua giá trị trùng để tự khử trùng.', complexity: { time: 'O(n²)', space: 'O(1) phụ (ngoài sort)' },
      pros: ['Không Set/Map: khử trùng bằng cách bỏ qua giá trị bằng nhau', 'Dừng sớm khi a[i] > 0', 'Thân thiện cache, hằng số nhỏ', 'Mở rộng thẳng sang 4Sum/kSum'], cons: ['Phải sort ⇒ mất chỉ số gốc', 'Dễ sai ở các vòng while nhảy trùng'], whenToUse: 'Mặc định cho 3Sum và mọi biến thể kSum trả về giá trị.',
      source: tpSrc, run: (i) => norm(tp(cast(i).nums)), trace: (i) => normTrace(tpTrace(cast(i))) },
  ],
};
export default problem;
