import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, HeapVisual, Highlight, VisualState } from '@/engine/types';

export interface SWMInput { nums: number[]; k: number }

const fmt = (x: number) => (Number.isInteger(x) ? x : Number(x.toFixed(1)));

export function* trace(input: SWMInput): Generator<Frame, number[]> {
  const nums = [...(input.nums ?? [])];
  const k = Math.floor(input.k);
  const result: number[] = [];
  if (k <= 0 || k > nums.length) {
    yield frame(51, { n: nums.length, k }, arr(nums.length ? nums : ['—'], { title: 'nums' }), `k = ${k} không hợp lệ (cần 1 ≤ k ≤ n = ${nums.length}) ⇒ không có cửa sổ nào, trả mảng rỗng.`);
    return result;
  }
  const low: number[] = []; // max-heap
  const high: number[] = []; // min-heap
  const delayed = new Map<number, number>();
  let lowSize = 0;
  let highSize = 0;
  let cur = -1;
  let outIdx = -1;

  const push = (h: number[], x: number, before: (a: number, b: number) => boolean) => {
    h.push(x);
    let i = h.length - 1;
    while (i > 0 && before(h[i], h[(i - 1) >> 1])) {
      const p = (i - 1) >> 1;
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  };
  const pop = (h: number[], before: (a: number, b: number) => boolean): number => {
    const top = h[0];
    const last = h.pop()!;
    if (h.length > 0) {
      h[0] = last;
      let i = 0;
      for (;;) {
        let best = i;
        for (const c of [2 * i + 1, 2 * i + 2]) if (c < h.length && before(h[c], h[best])) best = c;
        if (best === i) break;
        [h[i], h[best]] = [h[best], h[i]];
        i = best;
      }
    }
    return top;
  };
  const gt = (a: number, b: number) => a > b;
  const lt = (a: number, b: number) => a < b;

  const heapViz = (h: number[], title: string, top?: Highlight): HeapVisual => {
    const highlights: Record<number, Highlight> = {};
    h.forEach((v, idx) => {
      if ((delayed.get(v) ?? 0) > 0) highlights[idx] = 'muted';
    });
    if (top && h.length) highlights[0] = top;
    return { kind: 'heap', items: [...h], highlights, title };
  };
  const viz = (opts: { lowTop?: Highlight; highTop?: Highlight; delayedKey?: number } = {}): VisualState => {
    const highlights: Record<number, Highlight> = {};
    if (outIdx >= 0) highlights[outIdx] = 'muted';
    if (cur >= 0) highlights[cur] = 'active';
    const from = Math.max(0, cur - k + 1);
    const pending = new Map([...delayed.entries()].filter(([, c]) => c > 0));
    return composite([
      arr(nums, { title: `nums · cửa sổ k = ${k}`, highlights, ranges: cur >= 0 ? [{ from, to: cur, label: 'cửa sổ', color: 'range' }] : [], pointers: cur >= 0 ? [{ name: 'i', index: cur }] : [] }),
      composite([
        heapViz(low, `low – max-heap nửa nhỏ (hợp lệ: ${lowSize})`, opts.lowTop),
        heapViz(high, `high – min-heap nửa lớn (hợp lệ: ${highSize})`, opts.highTop),
      ], 'row'),
      mapViz(pending.size ? pending : { '—': '—' }, opts.delayedKey !== undefined ? { [String(opts.delayedKey)]: 'swap' } : undefined, 'delayed: giá trị → số bản chờ xoá'),
      arr(result.length ? result.map(fmt) : ['—'], { title: 'Trung vị các cửa sổ' }),
    ]);
  };
  const vars = (extra: Record<string, unknown> = {}) => ({ i: cur, lowSize, highSize, ...extra });

  function* prune(h: number[], name: 'low' | 'high', before: (a: number, b: number) => boolean) {
    while (h.length > 0 && (delayed.get(h[0]) ?? 0) > 0) {
      const x = pop(h, before);
      delayed.set(x, delayed.get(x)! - 1);
      yield frame(62, vars({ popped: x, heap: name }), viz({ delayedKey: x }), `Đỉnh ${name} là ${x} – đã rời cửa sổ (có trong delayed) ⇒ giờ mới thật sự pop. Chỉ cần dọn ĐỈNH vì trung vị chỉ đọc đỉnh; phần tử cũ nằm sâu bên trong vô hại cho tới khi nổi lên.`, { callStack: ['medianSlidingWindow()', `prune(${name})`] });
    }
  }

  yield frame(57, vars(), viz(), `Hai heap chia cửa sổ thành nửa nhỏ (low, max-heap) và nửa lớn (high, min-heap). Trung vị luôn nằm ở đỉnh ⇒ đọc O(1). Heap không xoá được phần tử ở giữa, nên dùng map delayed để xoá trễ.`);
  for (let i = 0; i < nums.length; i++) {
    cur = i;
    outIdx = -1;
    const x = nums[i];
    if (lowSize === 0 || x <= low[0]) {
      const reason = lowSize === 0 ? 'low rỗng' : `${x} ≤ đỉnh low (${low[0]})`;
      push(low, x, gt);
      lowSize++;
      yield frame(85, vars({ 'nums[i]': x }), viz({ lowTop: 'swap' }), `Thêm ${x}: ${reason} ⇒ thuộc nửa nhỏ, push vào low. So với đỉnh low để mọi phần tử low ≤ mọi phần tử high.`);
    } else {
      push(high, x, lt);
      highSize++;
      yield frame(88, vars({ 'nums[i]': x }), viz({ highTop: 'swap' }), `Thêm ${x}: ${x} > đỉnh low (${low[0]}) ⇒ thuộc nửa lớn, push vào high.`);
    }
    if (i >= k) {
      const out = nums[i - k];
      outIdx = i - k;
      delayed.set(out, (delayed.get(out) ?? 0) + 1);
      yield frame(94, vars({ out }), viz({ delayedKey: out }), `nums[${i - k}] = ${out} rời cửa sổ. Tìm nó trong heap mất O(k) ⇒ thay vào đó ghi delayed[${out}]++ (O(1)) và xoá khi nó lên đỉnh.`);
      const inLow = out <= low[0];
      if (inLow) lowSize--;
      else highSize--;
      yield frame(inLow ? 95 : 96, vars({ out }), viz(inLow ? { lowTop: 'compare' } : { highTop: 'compare' }), inLow ? `${out} ≤ đỉnh low (${low[0]}) ⇒ nó nằm (logic) ở nửa nhỏ: lowSize--. Ta đếm kích thước HỢP LỆ riêng vì heap vẫn còn bản sao vật lý.` : `${out} > đỉnh low (${low[0]}) ⇒ nó thuộc nửa lớn: highSize--. Kích thước hợp lệ mới là thứ quyết định cân bằng.`);
      yield* prune(low, 'low', gt);
      yield* prune(high, 'high', lt);
    }
    if (lowSize > highSize + 1) {
      const v = pop(low, gt);
      push(high, v, lt);
      lowSize--;
      highSize++;
      yield frame(70, vars({ moved: v }), viz({ highTop: 'swap' }), `lowSize lớn hơn highSize + 1 ⇒ chuyển đỉnh low (${v}) sang high. Lấy đúng ĐỈNH nên thứ tự "low ≤ high" vẫn giữ.`, { callStack: ['medianSlidingWindow()', 'rebalance()'] });
      yield* prune(low, 'low', gt);
    } else if (lowSize < highSize) {
      const v = pop(high, lt);
      push(low, v, gt);
      highSize--;
      lowSize++;
      yield frame(75, vars({ moved: v }), viz({ lowTop: 'swap' }), `highSize > lowSize ⇒ chuyển đỉnh high (${v}) sang low để low luôn giữ phần tử giữa khi k lẻ.`, { callStack: ['medianSlidingWindow()', 'rebalance()'] });
      yield* prune(high, 'high', lt);
    }
    if (i >= k - 1) {
      const m = k % 2 === 1 ? low[0] : (low[0] + high[0]) / 2;
      result.push(m);
      yield frame(103, vars({ median: fmt(m) }), viz({ lowTop: 'done', highTop: k % 2 === 0 ? 'done' : undefined }), k % 2 === 1 ? `k lẻ, lowSize = highSize + 1 ⇒ trung vị là đỉnh low = ${m}.` : `k chẵn, hai nửa bằng nhau ⇒ trung vị = (đỉnh low + đỉnh high)/2 = (${low[0]} + ${high[0]})/2 = ${fmt(m)}.`);
    }
  }
  cur = -1;
  outIdx = -1;
  yield frame(106, { result: result.map(fmt) }, viz(), `Xong: ${result.length} cửa sổ, mỗi bước O(log n) (push/pop heap); tổng O(n log n). Phần tử chờ xoá còn sót trong heap không ảnh hưởng vì không bao giờ ở đỉnh khi đọc.`);
  return result;
}
