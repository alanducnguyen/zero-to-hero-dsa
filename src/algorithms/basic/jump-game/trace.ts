import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = [...input.nums];
  const n = nums.length;
  const last = n - 1;
  // range (cyan) = vùng chắc chắn tới được; muted = ngoài tầm với; active (tím) = i đang xét
  const view = (farthest: number, i: number | null, extra: Record<number, Highlight> = {}) => {
    const reach = Math.min(farthest, last);
    let h = hlRange(0, reach, 'range');
    if (reach + 1 <= last) h = hlRange(reach + 1, last, 'muted', h);
    if (i !== null && i <= last) h[i] = 'active';
    return arr(nums, {
      mode: 'cells',
      highlights: { ...h, ...extra },
      pointers: i !== null && i <= last ? [{ name: 'i', index: i }] : [],
      ranges: n > 0 ? [{ from: 0, to: reach, label: `tầm với ≤ ${farthest}`, color: 'range' }] : [],
    });
  };

  let farthest = 0;
  yield frame(8, { farthest, n }, view(farthest, null),
    'Ban đầu ta đang đứng ở chỉ số 0 nên chắc chắn tới được 0. farthest là "biên" của vùng tới được – mọi ô ≤ farthest đều tới được.');
  for (let i = 0; i < n; i++) {
    yield frame(10, { i, farthest, 'nums[i]': nums[i] }, view(farthest, i),
      i > farthest
        ? `i = ${i} > farthest = ${farthest}: không ô nào trước đó nhảy tới được i, nên mọi ô sau i cũng không tới được.`
        : `i = ${i} ≤ farthest = ${farthest}: ô này tới được, có thể dùng làm bàn đạp.`);
    if (i > farthest) {
      yield frame(10, { i, farthest, result: false }, view(farthest, i, { [i]: 'swap' }),
        `Kẹt tại ${i} (thường do một ô 0 chặn đường). Trả về false.`);
      return false;
    }
    const prev = farthest;
    farthest = Math.max(farthest, i + nums[i]);
    yield frame(11, { i, 'i + nums[i]': i + nums[i], farthest }, view(farthest, i),
      farthest > prev
        ? `Từ ${i} nhảy tối đa ${nums[i]} bước tới ${i + nums[i]} > ${prev} ⇒ mở rộng farthest = ${farthest}. Vì nhảy được "tối đa", mọi ô ở giữa cũng tới được – nên chỉ cần lưu biên.`
        : `i + nums[i] = ${i + nums[i]} không vượt ${prev} ⇒ farthest giữ nguyên. Tham lam: chỉ quan tâm biên xa nhất, không cần nhớ đường đi.`);
    yield frame(12, { i, farthest, last }, view(farthest, i),
      farthest >= last ? `farthest = ${farthest} ≥ ${last} (chỉ số cuối) ⇒ đích nằm trong vùng tới được, dừng sớm.` : `farthest = ${farthest} < ${last}: chưa chạm đích, xét ô tiếp theo.`);
    if (farthest >= last) {
      yield frame(12, { farthest, result: true }, arr(nums, { mode: 'cells', highlights: hlRange(0, last, 'done'), pointers: [{ name: 'i', index: i }] }),
        'Trả về true. Không cần duyệt hết mảng.');
      return true;
    }
  }
  yield frame(14, { result: true }, arr(nums, { mode: 'cells' }), 'Mảng rỗng: vòng lặp không chạy ⇒ trả về true (quy ước: không có gì phải nhảy).');
  return true;
}
