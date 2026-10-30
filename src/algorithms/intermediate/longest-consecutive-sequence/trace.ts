import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = [...input.nums];
  const set = new Set<number>();
  /** vai trò của từng giá trị trong set (hiển thị ở map) */
  const role = new Map<number, string>();
  let best = 0;
  let bestRun: [number, number] | null = null;

  /**
   * run = [start, len] dãy đang xét; probe = giá trị vừa tra cứu.
   */
  const viz = (x: number | null, run: [number, number] | null, probe: number | null = null, probeHl: Highlight = 'compare') => {
    const inRun = (v: number) => run !== null && v >= run[0] && v < run[0] + run[1];
    const ah: Record<number, Highlight> = {};
    nums.forEach((v, i) => {
      if (inRun(v)) ah[i] = 'range';
      if (v === probe) ah[i] = probeHl;
      if (v === x) ah[i] = 'active';
    });
    const sorted = [...set].sort((a, b) => a - b);
    const mh: Record<string, Highlight> = {};
    const entries: Record<string, string> = {};
    for (const v of sorted) {
      entries[String(v)] = role.get(v) ?? '?';
      if (bestRun && v >= bestRun[0] && v < bestRun[0] + bestRun[1]) mh[String(v)] = 'done';
      if (role.get(v) === 'giữa dãy') mh[String(v)] = 'muted';
      if (inRun(v)) mh[String(v)] = 'range';
      if (v === probe) mh[String(v)] = probeHl;
      if (v === x) mh[String(v)] = 'active';
    }
    return composite([
      arr(nums.length ? nums : ['—'], { title: 'nums', highlights: ah }),
      mapViz(entries, mh, 'set (sắp xếp để dễ nhìn): giá trị → vai trò'),
    ]);
  };

  for (const v of nums) set.add(v);
  yield frame(9, { n: nums.length, 'set.size': set.size }, viz(null, null),
    `Đưa ${nums.length} phần tử vào HashSet (còn ${set.size} giá trị khác nhau). Set cho phép hỏi "v có tồn tại không?" trong O(1) và loại trùng – không cần sắp xếp O(n log n).`);
  yield frame(10, { best }, viz(null, null), 'best = 0 – độ dài dãy dài nhất tìm được. Mảng rỗng thì đáp án chính là 0.');

  for (const x of set) {
    yield frame(11, { x, best }, viz(x, null), `Xét x = ${x}. Duyệt trên set (không phải nums) để giá trị trùng chỉ được xét một lần.`);
    if (set.has(x - 1)) {
      role.set(x, 'giữa dãy');
      yield frame(12, { x, 'x-1': x - 1, best }, viz(x, null, x - 1, 'visited'),
        `${x - 1} có trong set ⇒ ${x} nằm giữa (hoặc cuối) một dãy bắt đầu sớm hơn. Bỏ qua: dãy đó sẽ được đếm trọn vẹn khi ta gặp đầu dãy của nó. Đây chính là mẹo biến O(n²) thành O(n).`);
      continue;
    }
    role.set(x, 'đầu dãy');
    yield frame(12, { x, 'x-1': x - 1, best }, viz(x, [x, 1]),
      `${x - 1} KHÔNG có trong set ⇒ ${x} là đầu dãy. Chỉ đầu dãy mới được phép đi tiếp, nên mỗi dãy được đếm đúng một lần.`);
    let len = 1;
    yield frame(13, { x, len, best }, viz(x, [x, len]), `len = 1: dãy hiện tại mới có ${x}.`);
    while (set.has(x + len)) {
      role.set(x + len, 'giữa dãy');
      yield frame(14, { x, len, 'x+len': x + len, best }, viz(x, [x, len], x + len, 'compare'),
        `${x + len} có trong set ⇒ dãy kéo dài thêm 1. Mỗi giá trị chỉ bị "đi qua" ở đây đúng một lần, vì nó chỉ thuộc về dãy của một đầu dãy duy nhất.`);
      len++;
    }
    yield frame(14, { x, len, 'x+len': x + len, best }, viz(x, [x, len], null),
      `${x + len} không có trong set ⇒ dãy dừng: ${x}..${x + len - 1}, độ dài ${len}.`);
    if (len > best) bestRun = [x, len];
    best = Math.max(best, len);
    yield frame(15, { x, len, best }, viz(x, [x, len]),
      `best = max(best, ${len}) = ${best}.${bestRun ? ` Dãy dài nhất hiện tại: ${bestRun[0]}..${bestRun[0] + bestRun[1] - 1}.` : ''}`);
  }
  yield frame(17, { best }, viz(null, null),
    `Kết quả: ${best}. Tổng số lần tra set ≤ 2n (mỗi x một lần kiểm tra x − 1, mỗi giá trị bị while đi qua tối đa một lần) ⇒ O(n) thời gian, O(n) bộ nhớ.`);
  return best;
}
