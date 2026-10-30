import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number> {
  const nums = [...input.nums];
  const k = input.k;
  const n = nums.length;
  const seen = new Map<number, number>();

  const viz = (j: number, from: number | null, mapHl: Record<string, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let x = 0; x < j && x < n; x++) h[x] = 'visited';
    if (j >= 0 && j < n) h[j] = 'active';
    const ranges = from !== null && j >= from ? [{ from, to: j, label: `tổng = ${k}`, color: 'done' as Highlight }] : [];
    return composite([
      arr(nums, { title: 'nums', highlights: h, pointers: j >= 0 && j < n ? [{ name: 'j', index: j }] : [], ranges }),
      mapViz(seen, mapHl, 'seen: prefix → số lần xuất hiện'),
    ]);
  };

  yield frame(9, { k }, viz(-1, null), 'Map seen đếm mỗi giá trị prefix sum đã xuất hiện bao nhiêu lần. Cần đếm (không chỉ đánh dấu có/không) vì số âm/số 0 khiến cùng một prefix lặp lại nhiều lần, mỗi lần là một điểm bắt đầu khác nhau.');
  seen.set(0, 1);
  yield frame(10, { k }, viz(-1, null, { '0': 'swap' }), 'Đặt seen[0] = 1: prefix của mảng rỗng (trước index 0). Thiếu dòng này sẽ bỏ sót mọi mảng con bắt đầu từ index 0.');
  let prefix = 0;
  let count = 0;
  yield frame(12, { k, prefix, count }, viz(-1, null, { '0': 'done' }), 'prefix = 0, count = 0. Ý tưởng: sum(i+1..j) = prefix[j] − prefix[i], nên sum = k ⇔ prefix[i] = prefix[j] − k.');
  // Lưu vị trí kết thúc của từng prefix để tô một mảng con minh hoạ
  const lastIdx = new Map<number, number>();
  lastIdx.set(0, -1);
  for (let j = 0; j < n; j++) {
    prefix += nums[j];
    yield frame(14, { k, j, 'nums[j]': nums[j], prefix, count }, viz(j, null), `Cộng nums[${j}] = ${nums[j]} ⇒ prefix = ${prefix} là tổng của nums[0..${j}].`);
    const need = prefix - k;
    yield frame(15, { k, j, prefix, need, count }, viz(j, null, seen.has(need) ? { [String(need)]: 'compare' } : {}), `Mảng con kết thúc tại j có tổng k ⇔ có prefix trước đó bằng prefix − k = ${prefix} − ${k} = ${need}. Tra map thay vì quét lại ⇒ O(1).`);
    const times = seen.get(need) ?? 0;
    const start = times > 0 ? (lastIdx.get(need) ?? -1) + 1 : null;
    yield frame(16, { k, j, prefix, need, times, count }, viz(j, start, times > 0 ? { [String(need)]: 'done' } : {}),
      times > 0
        ? `seen[${need}] = ${times} ⇒ có ${times} điểm bắt đầu khác nhau cho mảng con tổng ${k} kết thúc tại j = ${j} (vd. đoạn [${start}..${j}] được tô).`
        : `Chưa từng có prefix = ${need} ⇒ không mảng con nào kết thúc tại j = ${j} có tổng ${k}.`);
    count += times;
    yield frame(17, { k, j, prefix, times, count }, viz(j, start), `count += ${times} ⇒ count = ${count}. Cộng cả tần suất chứ không chỉ +1, vì mỗi lần prefix ${need} xuất hiện ứng với một mảng con riêng.`);
    seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
    lastIdx.set(prefix, j);
    yield frame(18, { k, j, prefix, count }, viz(j, null, { [String(prefix)]: 'swap' }), `Ghi nhận prefix ${prefix} (giờ xuất hiện ${seen.get(prefix)} lần). Phải ghi SAU khi tra cứu, nếu không với k = 0 ta sẽ đếm cả mảng con rỗng.`);
  }
  yield frame(20, { k, count }, viz(n, null), `Hết mảng: có ${count} mảng con tổng bằng ${k}. Một lượt duyệt O(n), map O(n) – sliding window không dùng được vì số âm phá tính đơn điệu.`);
  return count;
}
