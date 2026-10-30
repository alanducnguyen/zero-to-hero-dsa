import type { CompareProblem } from '@/compare/types';
import statement from './problem.md?raw';
import comparison from './comparison.md?raw';
import interview from './interview.md?raw';
import { norm } from './viz';
import heapSrc from './solutions/min-heap/impl.ts?raw';
import { minMeetingRooms as heap } from './solutions/min-heap/impl';
import { trace as heapTrace } from './solutions/min-heap/trace';
import tpSrc from './solutions/two-pointers/impl.ts?raw';
import { minMeetingRooms as tp } from './solutions/two-pointers/impl';
import { trace as tpTrace } from './solutions/two-pointers/trace';
import sweepSrc from './solutions/line-sweep/impl.ts?raw';
import { minMeetingRooms as sweep } from './solutions/line-sweep/impl';
import { trace as sweepTrace } from './solutions/line-sweep/trace';

const problem: CompareProblem = {
  id: 'meeting-rooms-ii',
  title: 'Meeting Rooms II',
  subtitle: 'Min-heap giờ kết thúc → hai mảng sort riêng + hai con trỏ ★ → line sweep O(n + R): cùng đếm độ chồng lấn lớn nhất',
  difficulty: 'Medium',
  leetcode: { id: 253, slug: 'meeting-rooms-ii' },
  tags: ['intervals', 'heap', 'two-pointers', 'sweep-line', 'sorting'],
  statement, comparison, interview,
  inputs: [{ key: 'intervals', label: 'Các cuộc họp "start-end" (0–100)', type: 'string[]', default: ['9-10', '0-4', '2-6', '5-8', '7-12', '4-7'], maxLength: 12 }],
  presets: [
    { label: 'LeetCode ví dụ 1 (2 phòng)', values: { intervals: ['0-30', '5-10', '15-20'] } },
    { label: 'Nối tiếp nhau (1 phòng)', values: { intervals: ['1-3', '3-5', '5-7'] } },
    { label: 'Tất cả trùng nhau', values: { intervals: ['1-5', '2-6', '3-7', '4-8'] } },
    { label: 'Miền thời gian rộng', values: { intervals: ['0-100', '40-60', '90-95'] } },
  ],
  solutions: [
    { id: 'min-heap', name: 'Sort + min-heap giờ kết thúc', rank: 2, approach: 'Xét cuộc họp theo giờ bắt đầu; heap giữ giờ kết thúc các phòng, đỉnh là phòng rảnh sớm nhất – rảnh thì giao lại, không thì mở phòng mới.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Mô phỏng đúng việc xếp phòng – biết được cuộc họp nào vào phòng nào', 'Mở rộng thẳng sang Meeting Rooms III / gán tài nguyên'], cons: ['Cần cài hoặc import heap', 'Hằng số lớn hơn two pointers (sort + n thao tác log n)'], whenToUse: 'Khi cần gán cụ thể phòng cho từng cuộc họp, hoặc dữ liệu đến dạng stream theo giờ bắt đầu.',
      source: heapSrc, run: (i) => heap(norm(i).intervals), trace: (i) => heapTrace(norm(i)) },
    { id: 'two-pointers', name: 'Sort starts/ends riêng + hai con trỏ', rank: 1, approach: 'Sort giờ bắt đầu và giờ kết thúc thành hai mảng; với mỗi start, nếu chưa có cuộc họp nào kết thúc trước nó thì mở phòng, ngược lại tái dùng và tiến con trỏ ends.', complexity: { time: 'O(n log n)', space: 'O(n)' },
      pros: ['Ngắn nhất, không cần heap', 'Vòng quét O(n) với hai biến, hằng số nhỏ'], cons: ['Mất liên kết start ↔ end nên không biết cuộc họp nào ở phòng nào', 'Khó thấy vì sao đúng nếu chưa nghĩ theo "sự kiện"'], whenToUse: 'Mặc định khi chỉ cần SỐ phòng.',
      source: tpSrc, run: (i) => tp(norm(i).intervals), trace: (i) => tpTrace(norm(i)) },
    { id: 'line-sweep', name: 'Line sweep trên trục thời gian', rank: 3, approach: 'Mảng diff theo toạ độ: +1 tại start, −1 tại end; cộng dồn cho số cuộc họp đang diễn ra tại mỗi thời điểm, lấy max.', complexity: { time: 'O(n + R)', space: 'O(R)' },
      pros: ['Không sort: tuyến tính khi miền thời gian R nhỏ', 'Trả lời luôn "lúc nào đông nhất", dễ mở rộng sang Car Pooling'], cons: ['R = 10⁹ thì không khả thi về bộ nhớ lẫn thời gian', 'Toạ độ thực/âm phải nén (coordinate compression) ⇒ lại cần sort'], whenToUse: 'Khi giờ là số nguyên trong miền nhỏ (phút trong ngày ≤ 1440) và n rất lớn.',
      source: sweepSrc, run: (i) => sweep(norm(i).intervals), trace: (i) => sweepTrace(norm(i)) },
  ],
};
export default problem;
