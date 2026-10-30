import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...input.nums];
  const n = nums.length;
  const seen = new Set(nums);
  const setViz = (hk?: number, h: Highlight = 'compare') => {
    const m: Record<string, string> = {};
    for (const x of [...seen].sort((a, b) => a - b)) m[String(x)] = '✓';
    return mapViz(m, hk !== undefined && seen.has(hk) ? { [String(hk)]: h } : {}, 'seen (HashSet)');
  };
  const view = (k?: number, h?: Highlight) =>
    composite([arr(nums, { mode: 'cells', title: 'nums' }), setViz(k, h)], 'row');
  yield frame(3, { n, '|seen|': seen.size }, view(),
    `Đổ ${n} số vào Set: O(n) thời gian, O(n) bộ nhớ. Đổi lại, câu hỏi "k có mặt không?" chỉ còn O(1) thay vì quét cả mảng.`);
  for (let k = 0; k <= n; k++) {
    const has = seen.has(k);
    yield frame(5, { k, 'seen.has(k)': has }, view(k, 'done'),
      has
        ? `${k} có trong Set ⇒ không phải số thiếu, hỏi số tiếp theo.`
        : `${k} KHÔNG có trong Set ⇒ đây là số thiếu. Duyệt k tới n (không phải n − 1) vì đáp án có thể là chính n.`);
    if (!has) return k;
  }
  yield frame(7, {}, view(), 'Không tìm thấy – chỉ xảy ra khi input sai đề.');
  return -1;
}
