import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { fmt, timeline, type Iv } from '../../viz';

export function* trace(input: { intervals: Iv[] }): Generator<Frame, Iv[]> {
  const all = input.intervals;
  const list: Iv[] = all.map(([a, b]) => [a, b]);
  const viz = (hl: Record<number, Highlight> = {}) =>
    composite([
      timeline(list.map((iv, k) => ({ label: fmt(iv), iv, hl: hl[k] ?? 'range' })), all, 'Danh sách hiện tại trên trục'),
      arr(list.length ? list.map(fmt) : ['—'], { title: 'list (chưa sắp xếp)', highlights: hl }),
    ]);
  let changed = true;
  let pass = 0;
  while (changed) {
    changed = false;
    pass++;
    yield frame(6, { pass, size: list.length }, viz(), `Lượt quét thứ ${pass}: tìm bất kỳ cặp nào chồng lấn. Không sắp xếp nên không biết cặp nào "gần" nhau ⇒ phải thử mọi cặp.`);
    for (let i = 0; i < list.length && !changed; i++) {
      for (let j = i + 1; j < list.length && !changed; j++) {
        const a = list[i];
        const b = list[j];
        const overlap = a[0] <= b[1] && b[0] <= a[1];
        yield frame(11, { i, j, a: fmt(a), b: fmt(b), overlap }, viz({ [i]: 'compare', [j]: 'compare' }),
          overlap
            ? `${fmt(a)} và ${fmt(b)} chồng lấn: ${a[0]} ≤ ${b[1]} và ${b[0]} ≤ ${a[1]} (dấu ≤ ⇒ chạm đầu mút cũng tính).`
            : `${fmt(a)} và ${fmt(b)} rời nhau: một khoảng kết thúc trước khi khoảng kia bắt đầu.`);
        if (overlap) {
          list[i] = [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
          list.splice(j, 1);
          changed = true;
          yield frame(13, { merged: fmt(list[i]), size: list.length }, viz({ [i]: 'swap' }), `Gộp thành ${fmt(list[i])} và xoá phần tử j. Danh sách đã đổi nên khoảng mới có thể chồng với khoảng đã xét trước đó ⇒ bắt đầu lại từ đầu – đây là nguồn gốc O(n³).`);
        }
      }
    }
  }
  list.sort((x, y) => x[0] - y[0]);
  yield frame(19, { result: list.map(fmt), passes: pass }, viz(Object.fromEntries(list.map((_, k) => [k, 'done' as Highlight]))), `Một lượt trọn vẹn không gộp được gì ⇒ ổn định. Sắp xếp kết quả theo start. Tối đa n − 1 lần gộp, mỗi lần tốn tới O(n²) phép so ⇒ O(n³).`);
  return list;
}
