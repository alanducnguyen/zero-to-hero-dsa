import { arr, composite, frame, hl, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, number> {
  const s = input.s;
  const chars = [...s];
  const lastIndex = new Map<string, number>();
  let left = 0;
  let best = 0;
  let bestRange: [number, number] = [0, -1];
  const viz = (right: number, extra: Record<number, Highlight> = {}, mapHl?: Record<string, Highlight>) => {
    const base = right >= left ? hlRange(left, right, 'range') : {};
    const ranges = [] as { from: number; to: number; label: string; color?: Highlight }[];
    if (right >= left) ranges.push({ from: left, to: right, label: `cửa sổ (${right - left + 1})` });
    if (bestRange[1] >= bestRange[0]) ranges.push({ from: bestRange[0], to: bestRange[1], label: `best = ${best}`, color: 'done' });
    return composite([
      arr(chars, { title: 'Chuỗi s', highlights: { ...base, ...extra }, pointers: [{ name: 'left', index: left }, { name: 'right', index: right }], ranges }),
      mapViz(lastIndex, mapHl, 'lastIndex: ký tự → vị trí gần nhất'),
    ]);
  };
  yield frame(10, { left, best }, viz(-1), 'Cửa sổ [left, right] rỗng. Bất biến cần giữ: mọi ký tự trong cửa sổ đôi một khác nhau.');
  for (let right = 0; right < chars.length; right++) {
    const ch = chars[right];
    yield frame(12, { left, right, ch, best }, viz(right, hl([right, 'active'])), `Mở rộng cửa sổ sang phải: right = ${right}, ký tự '${ch}'.`);
    const prev = lastIndex.get(ch);
    yield frame(13, { left, right, ch, prev, best }, viz(right, hl([right, 'active']), prev !== undefined ? { [ch]: 'compare' } : undefined),
      prev === undefined ? `'${ch}' chưa từng xuất hiện ⇒ chắc chắn không lặp trong cửa sổ.` : `'${ch}' xuất hiện gần nhất ở vị trí ${prev}. ${prev >= left ? 'Vị trí đó NẰM TRONG cửa sổ ⇒ bị lặp!' : 'Vị trí đó đã nằm ngoài cửa sổ (trước left) ⇒ không sao.'}`);
    if (prev !== undefined && prev >= left) {
      const oldLeft = left;
      left = prev + 1;
      yield frame(15, { left, right, ch, prev, best }, viz(right, { ...hlRange(oldLeft, prev, 'muted'), [right]: 'active', [prev]: 'swap' }),
        `Nhảy left từ ${oldLeft} thẳng tới ${left} (ngay sau vị trí lặp). Không cần co từng bước: mọi vị trí ${oldLeft}..${prev} đều không thể là đầu của cửa sổ hợp lệ chứa right.`);
    }
    lastIndex.set(ch, right);
    yield frame(17, { left, right, ch, best }, viz(right, hl([right, 'active']), { [ch]: 'swap' }), `Cập nhật lastIndex['${ch}'] = ${right}.`);
    if (right - left + 1 > best) {
      best = right - left + 1;
      bestRange = [left, right];
    }
    yield frame(18, { left, right, windowSize: right - left + 1, best }, viz(right), `Cửa sổ hiện tại dài ${right - left + 1}. best = max(best, ${right - left + 1}) = ${best}.`);
  }
  yield frame(20, { best }, viz(chars.length - 1), `Đã duyệt hết chuỗi. Kết quả: ${best}${bestRange[1] >= bestRange[0] ? ` ("${s.slice(bestRange[0], bestRange[1] + 1)}")` : ''}.`);
  return best;
}
