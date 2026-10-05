import { arr, composite, frame, hlRange, stack as stackViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { heights: number[] }): Generator<Frame, number> {
  const heights = input.heights.map((h) => Math.max(0, h));
  const n = heights.length;
  const stack: number[] = [];
  let best = 0;
  let bestRange: [number, number] = [0, -1];
  const viz = (i: number, extra: Record<number, Highlight> = {}, stackHl?: Record<number, Highlight>) => {
    const h: Record<number, Highlight> = {};
    for (const k of stack) h[k] = 'range';
    const ranges = bestRange[1] >= bestRange[0] ? [{ from: bestRange[0], to: bestRange[1], label: `best = ${best}`, color: 'done' as Highlight }] : [];
    return composite([
      arr(heights, { mode: 'bars', title: 'heights (cyan = đang trong stack)', highlights: { ...h, ...extra }, pointers: i <= n ? [{ name: 'i', index: i }] : [], ranges }),
      stackViz(stack.map((k) => `${k}:${heights[k]}`), stackHl, 'Stack chỉ số (idx:height), tăng dần từ đáy'),
    ]);
  };
  yield frame(10, { n, best }, viz(0), 'Stack rỗng. Bất biến: các cột trong stack có chiều cao tăng dần từ đáy lên đỉnh.');
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    yield frame(12, { i, h, stack: [...stack] }, viz(i, i < n ? { [i]: 'active' } : {}), i === n ? 'Cột ảo cao 0 ở cuối: ép mọi cột còn lại trong stack phải được tính diện tích.' : `Xét cột i = ${i}, cao ${h}.`);
    while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
      const topIdx = stack[stack.length - 1];
      yield frame(13, { i, h, top: topIdx, 'heights[top]': heights[topIdx] }, viz(i, { [topIdx]: 'compare', ...(i < n ? { [i]: 'active' as Highlight } : {}) }, { [stack.length - 1]: 'compare' }), `Đỉnh stack (cột ${topIdx}, cao ${heights[topIdx]}) CAO HƠN cột ${i} (${h}) ⇒ cột ${topIdx} không thể mở rộng qua ${i}. Biên phải của nó là ${i}. Pop và tính diện tích.`);
      const top = stack.pop()!;
      const height = heights[top];
      const left = stack.length === 0 ? -1 : stack[stack.length - 1];
      const width = i - left - 1;
      const area = height * width;
      if (area > best) {
        best = area;
        bestRange = [left + 1, i - 1];
      }
      yield frame(18, { i, top, height, left, width, area, best }, viz(i, { ...hlRange(left + 1, i - 1, 'compare'), [top]: 'swap' }), `Biên trái = ${left === -1 ? 'không có (−1)' : `cột ${left} (phần tử ngay dưới trong stack, thấp hơn)`}. Rộng = ${i} − ${left} − 1 = ${width}. Diện tích = ${height} × ${width} = ${area}. best = ${best}.`);
    }
    stack.push(i);
    if (i < n) yield frame(20, { i, h, stack: [...stack] }, viz(i, { [i]: 'range' }, { [stack.length - 1]: 'swap' }), `Push cột ${i}: mọi cột trong stack giờ đều ≤ ${h} ⇒ bất biến tăng dần được giữ.`);
  }
  stack.length = 0;
  yield frame(22, { best }, viz(n + 1, bestRange[1] >= bestRange[0] ? hlRange(bestRange[0], bestRange[1], 'done') : {}), `Kết quả: diện tích lớn nhất = ${best}${bestRange[1] >= bestRange[0] ? ` (cột ${bestRange[0]}..${bestRange[1]})` : ''}.`);
  return best;
}
