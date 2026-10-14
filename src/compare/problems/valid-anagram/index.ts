import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import sortSrc from './solutions/sort/impl.ts?raw';
import { isAnagram as sortA } from './solutions/sort/impl';
import { trace as sortTrace } from './solutions/sort/trace';
import hashSrc from './solutions/hashmap/impl.ts?raw';
import { isAnagram as hashA } from './solutions/hashmap/impl';
import { trace as hashTrace } from './solutions/hashmap/trace';
import arrSrc from './solutions/count-array/impl.ts?raw';
import { isAnagram as arrA } from './solutions/count-array/impl';
import { trace as arrTrace } from './solutions/count-array/trace';

type In = { s: string; t: string };
const norm = (i: Record<string, unknown>): In => { const x = i as unknown as In; const clean = (v: string) => v.toLowerCase().replace(/[^a-z]/g, ''); return { s: clean(x.s), t: clean(x.t) }; };

const problem: CompareProblem = {
  id: 'valid-anagram',
  title: 'Valid Anagram',
  subtitle: 'Sort → HashMap đếm → mảng 26: cùng một câu hỏi "cùng multiset?", ba mức tối ưu',
  difficulty: 'Easy',
  leetcode: { id: 242, slug: 'valid-anagram' },
  tags: ['string', 'hashmap', 'sorting', 'counting'],
  statement, comparison, interview,
  inputs: [
    { key: 's', label: 's (a–z)', type: 'string', default: 'anagram', maxLength: 12 },
    { key: 't', label: 't (a–z)', type: 'string', default: 'nagaram', maxLength: 12 },
  ],
  presets: [
    { label: 'Không phải anagram', values: { s: 'rat', t: 'car' } },
    { label: 'Độ dài khác', values: { s: 'ab', t: 'abc' } },
    { label: 'Ký tự lặp lệch', values: { s: 'aabb', t: 'abbb' } },
  ],
  solutions: [
    { id: 'sort', name: 'Sort rồi so sánh', rank: 3, approach: 'Sắp xếp ký tự của cả hai chuỗi; anagram ⟺ hai chuỗi sắp xếp giống nhau.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Một dòng, khó sai', 'Ý tưởng "khoá chuẩn hoá" tái dùng cho Group Anagrams'], cons: ['O(n log n) trong khi chỉ cần đếm', 'Tạo hai chuỗi mới'], whenToUse: 'Chuỗi ngắn, hoặc cần khoá để nhóm anagram.',
      source: sortSrc, run: (i) => sortA(norm(i).s, norm(i).t), trace: (i) => sortTrace(norm(i)) },
    { id: 'hashmap', name: 'HashMap đếm', rank: 2, approach: 'Cộng tần suất theo s, trừ theo t; gặp giá trị âm thì dừng.', complexity: { time: 'O(n)', space: 'O(k)' },
      pros: ['Tuyến tính', 'Tổng quát cho Unicode', 'Dừng sớm khi lệch'], cons: ['Chi phí hash và bộ nhớ theo số ký tự phân biệt'], whenToUse: 'Bảng chữ cái không cố định (Unicode, token).',
      source: hashSrc, run: (i) => hashA(norm(i).s, norm(i).t), trace: (i) => hashTrace(norm(i)) },
    { id: 'count-array', name: 'Mảng đếm 26', rank: 1, approach: 'Mảng 26 ô, +1 theo s và −1 theo t trong cùng một lượt; kiểm tra toàn 0.', complexity: { time: 'O(n)', space: 'O(1)' },
      pros: ['O(1) bộ nhớ thật sự', 'Không hash, rất nhanh', 'Một lượt duy nhất'], cons: ['Chỉ cho bảng chữ cái cố định (a–z)', 'Phải chuẩn hoá hoa/thường trước'], whenToUse: 'Đề nói rõ chỉ gồm chữ thường a–z – lựa chọn mặc định.',
      source: arrSrc, run: (i) => arrA(norm(i).s, norm(i).t), trace: (i) => arrTrace(norm(i)) },
  ],
};
export default problem;
