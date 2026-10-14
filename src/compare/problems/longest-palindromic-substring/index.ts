import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import bfSrc from './solutions/brute-force/impl.ts?raw';
import { longestPalindrome as bf } from './solutions/brute-force/impl';
import { trace as bfTrace } from './solutions/brute-force/trace';
import dpSrc from './solutions/dp/impl.ts?raw';
import { longestPalindrome as dp } from './solutions/dp/impl';
import { trace as dpTrace } from './solutions/dp/trace';
import ecSrc from './solutions/expand-center/impl.ts?raw';
import { longestPalindrome as ec } from './solutions/expand-center/impl';
import { trace as ecTrace } from './solutions/expand-center/trace';

/** Để ba cách cho cùng đáp án khi có nhiều palindrome cùng độ dài, so sánh theo (độ dài, vị trí đầu tiên). Mọi impl đều ưu tiên vị trí nhỏ hơn khi bằng độ dài. */
const norm = (i: Record<string, unknown>) => ({ s: String(i.s ?? '') });

const problem: CompareProblem = {
  id: 'longest-palindromic-substring',
  title: 'Longest Palindromic Substring',
  subtitle: 'Brute force O(n³) → DP 2D O(n²)/O(n²) → mở rộng từ tâm O(n²)/O(1), và vì sao Manacher hiếm khi cần',
  difficulty: 'Medium',
  leetcode: { id: 5, slug: 'longest-palindromic-substring' },
  tags: ['string', 'dp', 'two-pointers'],
  statement, comparison, interview,
  inputs: [{ key: 's', label: 's', type: 'string', default: 'babad', maxLength: 10 }],
  presets: [
    { label: 'Palindrome chẵn', values: { s: 'cbbd' } },
    { label: 'Toàn một ký tự (worst case)', values: { s: 'aaaaa' } },
    { label: 'Không có palindrome > 1', values: { s: 'abcdef' } },
  ],
  solutions: [
    { id: 'brute-force', name: 'Brute force', rank: 3, approach: 'Xét mọi đoạn [i, j], kiểm tra palindrome từ hai đầu.', complexity: { time: 'O(n³)', space: 'O(1)' },
      pros: ['Không cần ý tưởng gì'], cons: ['n = 1000 ⇒ ~10⁹ bước, sát TLE', 'Kiểm tra lại cùng đoạn con nhiều lần'], whenToUse: 'Chỉ để mở đầu.',
      source: bfSrc, run: (i) => bf(norm(i).s), trace: (i) => bfTrace(norm(i)) },
    { id: 'dp', name: 'DP 2D', rank: 2, approach: 'dp[i][j] = s[i] === s[j] && dp[i+1][j−1], điền theo độ dài tăng dần.', complexity: { time: 'O(n²)', space: 'O(n²)' },
      pros: ['Bảng tái dùng cho Palindrome Partitioning', 'Mẫu interval DP'], cons: ['O(n²) bộ nhớ', 'Nhiều ô "F" vô ích'], whenToUse: 'Bước sau cần biết mọi đoạn có phải palindrome không.',
      source: dpSrc, run: (i) => dp(norm(i).s), trace: (i) => dpTrace(norm(i)) },
    { id: 'expand-center', name: 'Mở rộng từ tâm', rank: 1, approach: '2n−1 tâm, mỗi tâm mở rộng hai bên khi còn bằng nhau.', complexity: { time: 'O(n²)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ, 10 dòng', 'Thực tế rất nhanh vì hầu hết tâm dừng sớm'], cons: ['Worst case O(n²) với chuỗi lặp', 'Phải xử lý cả tâm chẵn'], whenToUse: 'Mặc định cho n ≤ 10⁴.',
      source: ecSrc, run: (i) => ec(norm(i).s), trace: (i) => ecTrace(norm(i)) },
  ],
};
export default problem;
