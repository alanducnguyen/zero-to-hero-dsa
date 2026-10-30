import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

export function* trace(input: { nums: number[]; k: number }): Generator<Frame, number[]> {
  const { nums, k } = input;
  const h: [number, number][] = [];
  const above = (a: [number, number], b: [number, number]) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);
  const swap = (i: number, j: number) => ([h[i], h[j]] = [h[j], h[i]]);
  const push = (x: [number, number]) => {
    h.push(x);
    for (let i = h.length - 1; i > 0 && above(h[i], h[(i - 1) >> 1]); i = (i - 1) >> 1) swap(i, (i - 1) >> 1);
  };
  const pop = () => {
    swap(0, h.length - 1);
    h.pop();
    for (let i = 0, c = 1; c < h.length; i = c, c = 2 * i + 1) {
      if (c + 1 < h.length && above(h[c + 1], h[c])) c++;
      if (!above(h[c], h[i])) break;
      swap(i, c);
    }
  };
  const res: number[] = [];
  const viz = (i: number, top: Highlight = 'active'): VisualState => {
    const hh: Record<number, Highlight> = {};
    h.forEach(([, idx], p) => { if (idx <= i - k) hh[p] = 'muted'; });
    if (h.length) hh[0] = top;
    const from = Math.max(0, i - k + 1);
    return composite([
      arr(nums, { title: 'nums', ranges: [{ from, to: i, label: 'cửa sổ', color: 'range' }], pointers: [{ name: 'i', index: i }] }),
      { kind: 'heap', title: 'max-heap (giá trị; xám = chỉ số đã ra khỏi cửa sổ nhưng chưa xoá)', items: h.map((x) => x[0]), highlights: hh },
      arr(res, { title: 'res' }),
    ]);
  };
  for (let i = 0; i < nums.length; i++) {
    push([nums[i], i]);
    yield frame(21, { i, 'nums[i]': nums[i], 'heap size': h.length, top: h[0] }, viz(i),
      `Đẩy [${nums[i]}, ${i}] vào heap – O(log n) sift-up. Không xoá phần tử cũ ngay vì tìm nó trong heap tốn O(n).`);
    if (i < k - 1) {
      yield frame(22, { i, k }, viz(i), `Mới có ${i + 1} < k = ${k} phần tử ⇒ chưa có cửa sổ đầy đủ, chưa ghi kết quả.`);
      continue;
    }
    while (h[0][1] <= i - k) {
      yield frame(23, { i, top: h[0], 'i − k': i - k }, viz(i, 'swap'), `Đỉnh [${h[0][0]}, ${h[0][1]}] có chỉ số ${h[0][1]} ≤ ${i - k} ⇒ đã ra khỏi cửa sổ. Chỉ lúc nó cản đường (nằm ở đỉnh) mới cần xoá – lazy removal.`);
      pop();
    }
    res.push(h[0][0]);
    yield frame(24, { i, top: h[0], res, 'heap size': h.length }, viz(i, 'done'),
      `Đỉnh [${h[0][0]}, ${h[0][1]}] nằm trong cửa sổ ⇒ là max. Phần tử cũ khác có thể còn trong heap (xám) nhưng không ảnh hưởng vì không ở đỉnh.`);
  }
  yield frame(26, { res }, arr(res, { title: 'res' }), `Xong. Heap có thể phình tới n phần tử (mảng tăng dần không bao giờ pop) ⇒ O(n log n) thời gian, O(n) bộ nhớ.`);
  return res;
}
