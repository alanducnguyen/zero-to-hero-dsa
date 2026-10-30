import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import recSrc from './solutions/recursion/impl.ts?raw';
import { canPartition as rec } from './solutions/recursion/impl';
import { trace as recTrace } from './solutions/recursion/trace';
import memoSrc from './solutions/memo/impl.ts?raw';
import { canPartition as memo } from './solutions/memo/impl';
import { trace as memoTrace } from './solutions/memo/trace';
import d2Src from './solutions/dp-2d/impl.ts?raw';
import { canPartition as d2 } from './solutions/dp-2d/impl';
import { trace as d2Trace } from './solutions/dp-2d/trace';
import d1Src from './solutions/dp-1d/impl.ts?raw';
import { canPartition as d1 } from './solutions/dp-1d/impl';
import { trace as d1Trace } from './solutions/dp-1d/trace';

/** Số nguyên 1..20, tối đa 8 số: đệ quy thuần ≤ 2⁹ lời gọi (~1000 frame), bảng ≤ 9 × 81 ô – đều dưới giới hạn 4000 frame. */
const norm = (i: Record<string, unknown>) => {
  const nums = ((i.nums as number[]) ?? []).map((x) => Math.floor(Number(x))).filter((x) => x >= 1 && x <= 20).slice(0, 8);
  return { nums: nums.length ? nums : [1] };
};

const problem: CompareProblem = {
  id: 'partition-equal-subset-sum',
  title: 'Partition Equal Subset Sum',
  subtitle: 'Lấy/bỏ O(2ⁿ) → memo (i, rem) → bảng 2 chiều → mảng 1 chiều duyệt ngược ★ (và mẹo bitset)',
  difficulty: 'Medium',
  leetcode: { id: 416, slug: 'partition-equal-subset-sum' },
  tags: ['dp', 'knapsack', 'subset-sum', 'recursion'],
  statement, comparison, interview,
  inputs: [{ key: 'nums', label: 'nums (1–20, tối đa 8 số)', type: 'number[]', default: [1, 5, 11, 5], min: 1, max: 20, maxLength: 8 }],
  presets: [
    { label: 'Không chia được', values: { nums: [1, 2, 3, 5] } },
    { label: 'Tổng lẻ', values: { nums: [1, 2, 4] } },
    { label: 'Có lời giải ở cuối', values: { nums: [3, 3, 3, 4, 5] } },
    { label: 'Đệ quy nổ (8 số, false)', values: { nums: [2, 4, 6, 8, 10, 12, 14, 20] } },
  ],
  solutions: [
    { id: 'recursion', name: 'Đệ quy lấy/bỏ', rank: 4, approach: 'Với mỗi số, thử lấy vào tập tổng total/2 hoặc bỏ qua; dừng khi rem = 0.', complexity: { time: 'O(2ⁿ)', space: 'O(n) stack' },
      pros: ['Phản ánh trực tiếp định nghĩa bài toán', 'Không phụ thuộc độ lớn giá trị – tốt khi n rất nhỏ nhưng số rất lớn'], cons: ['Hàm mũ: n = 200 là bất khả', 'Giải lại cùng trạng thái (i, rem) nhiều lần'], whenToUse: 'Chỉ để mở đầu, hoặc n ≤ ~20 mà tổng lên tới 10⁹ (DP theo tổng không khả thi).',
      source: recSrc, run: (i) => rec(norm(i).nums), trace: (i) => recTrace(norm(i)) },
    { id: 'memo', name: 'Memo (i, rem)', rank: 3, approach: 'Đệ quy như trên nhưng nhớ kết quả theo cặp (i, rem) – chỉ có n·(S+1) trạng thái.', complexity: { time: 'O(n·S)', space: 'O(n·S) + O(n) stack' },
      pros: ['Chuyển từ brute force sang chỉ thêm vài dòng', 'Chỉ thăm trạng thái thực sự đạt tới, có ngắt mạch khi tìm thấy'], cons: ['Map với key chuỗi tốn hằng số lớn', 'Đệ quy sâu n tầng, có thể tràn stack'], whenToUse: 'Khi cần lời giải đúng nhanh từ brute force, hoặc trạng thái thưa (ít tổng đạt được).',
      source: memoSrc, run: (i) => memo(norm(i).nums), trace: (i) => memoTrace(norm(i)) },
    { id: 'dp-2d', name: 'Bảng 2 chiều', rank: 2, approach: 'dp[i][j] = dp[i−1][j] || dp[i−1][j−num]: bỏ hoặc lấy số thứ i.', complexity: { time: 'O(n·S)', space: 'O(n·S)' },
      pros: ['Vòng lặp, không đệ quy', 'Giữ đủ bảng để truy vết tập con được chọn'], cons: ['Bộ nhớ n·S (200 × 10⁴ = 2·10⁶ ô)', 'Luôn lấp hết bảng, không dừng sớm'], whenToUse: 'Khi đề hỏi thêm "in ra tập con" – cần bảng đầy đủ để truy vết.',
      source: d2Src, run: (i) => d2(norm(i).nums), trace: (i) => d2Trace(norm(i)) },
    { id: 'dp-1d', name: 'Mảng 1 chiều duyệt ngược', rank: 1, approach: 'Chỉ giữ một hàng dp[j]; duyệt j từ S về num để mỗi số chỉ dùng một lần.', complexity: { time: 'O(n·S)', space: 'O(S)' },
      pros: ['Bộ nhớ O(S)', 'Code ngắn nhất, cache-friendly', 'Dừng sớm khi dp[S] bật'], cons: ['Dễ sai chiều duyệt (tăng dần = unbounded knapsack)', 'Mất khả năng truy vết tập con'], whenToUse: 'Mặc định khi chỉ cần true/false.',
      source: d1Src, run: (i) => d1(norm(i).nums), trace: (i) => d1Trace(norm(i)) },
  ],
};
export default problem;
