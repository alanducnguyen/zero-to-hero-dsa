import { arr, composite, frame, queue } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { coins: number[]; amount: number }): Generator<Frame, number> {
  const { coins, amount } = input;
  if (amount === 0) {
    yield frame(3, { amount }, arr([0], { title: 'amount' }), 'amount = 0 ⇒ không cần đồng nào.');
    return 0;
  }
  const seen = new Set<number>([0]);
  const dist: (number | string)[] = Array.from({ length: amount + 1 }, (_, i) => (i === 0 ? 0 : '·'));
  let level = [0];
  const viz = (next: number[], hl: Record<number, Highlight> = {}) =>
    composite([queue(level, {}, 'tầng hiện tại (tổng đã gom)'), queue(next, {}, 'tầng kế tiếp'), arr(dist, { title: 'tầng phát hiện tổng s (nhãn = s, · = chưa thấy)', highlights: hl })]);
  yield frame(5, { amount }, viz([], { 0: 'done' }), 'Bắt đầu từ tổng 0. Mỗi cạnh = thêm 1 đồng, mọi cạnh cùng trọng số ⇒ BFS theo tầng cho số đồng ít nhất.');
  for (let steps = 1; level.length > 0; steps++) {
    const next: number[] = [];
    for (const cur of level) {
      for (const c of coins) {
        const s = cur + c;
        if (s === amount) {
          dist[s] = steps;
          yield frame(11, { steps, cur, c, s }, viz(next, { [cur]: 'pointer', [s]: 'done' }), `${cur} + ${c} = ${amount} ở tầng ${steps}. BFS duyệt theo tầng nên đây chắc chắn là số đồng ít nhất ⇒ dừng sớm.`);
          return steps;
        }
        if (s > amount || seen.has(s)) continue;
        seen.add(s);
        next.push(s);
        dist[s] = steps;
        yield frame(14, { steps, cur, c, s }, viz(next, { [cur]: 'pointer', [s]: 'swap' }), `${cur} + ${c} = ${s} lần đầu xuất hiện ⇒ cần đúng ${steps} đồng. Đánh dấu seen để không ai đẩy ${s} vào lại (tránh nổ số đỉnh).`);
      }
    }
    level = next;
  }
  yield frame(19, { amount }, viz([]), `Hết đỉnh mà không chạm ${amount} ⇒ không thể đổi, trả −1.`);
  return -1;
}
