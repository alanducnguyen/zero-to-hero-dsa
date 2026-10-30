import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; t: string }): Generator<Frame, string> {
  const s = String(input.s ?? '');
  const t = String(input.t ?? '');
  const chars = [...s];
  const need = new Map<string, number>();
  let have = 0;
  let required = 0;
  let left = 0;
  let bestStart = 0;
  let bestLen = Infinity;

  const viz = (right: number, extra: Record<number, Highlight> = {}, mapHl?: Record<string, Highlight>) => {
    const base = right >= left ? hlRange(left, right, 'range') : {};
    const ranges: { from: number; to: number; label?: string; color?: Highlight }[] = [];
    if (right >= left) ranges.push({ from: left, to: right, label: `cửa sổ (${right - left + 1})`, color: 'range' });
    if (bestLen !== Infinity) ranges.push({ from: bestStart, to: bestStart + bestLen - 1, label: `best = ${bestLen}`, color: 'done' });
    const pointers = [{ name: 'left', index: left }];
    if (right >= 0 && right < chars.length) pointers.push({ name: 'right', index: right });
    return composite([
      arr(chars, { title: `Chuỗi s (cần phủ t = "${t}")`, highlights: { ...base, ...extra }, pointers, ranges }),
      mapViz(need, mapHl, `need: ký tự → còn thiếu (have = ${have}/${required})`),
    ]);
  };
  const best = () => (bestLen === Infinity ? '∞' : `"${s.slice(bestStart, bestStart + bestLen)}"`);

  if (t.length === 0 || s.length < t.length) {
    yield frame(9, { s, t }, viz(-1), t.length === 0 ? 't rỗng ⇒ quy ước trả về "".' : 's ngắn hơn t ⇒ không cửa sổ nào đủ chỗ chứa t, trả "".');
    return '';
  }
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  yield frame(11, { t }, viz(-1), 'Đếm tần suất mỗi ký tự của t vào need. need[c] > 0 nghĩa là cửa sổ còn THIẾU need[c] ký tự c; âm nghĩa là đang dư.');
  required = need.size;
  yield frame(12, { required }, viz(-1), `required = ${required} ký tự khác nhau. Thay vì so sánh cả bảng đếm mỗi bước (O(k)), ta chỉ theo dõi have = số ký tự đã đủ ⇒ kiểm tra hợp lệ O(1).`);
  yield frame(16, { have, left, bestLen: '∞' }, viz(-1), 'Cửa sổ rỗng, chưa có đáp án (bestLen = ∞).');

  for (let right = 0; right < chars.length; right++) {
    const ch = chars[right];
    yield frame(18, { left, right, ch, have }, viz(right, { [right]: 'active' }), `Mở rộng phải: thêm '${ch}' vào cửa sổ.`);
    if (need.has(ch)) {
      need.set(ch, need.get(ch)! - 1);
      const v = need.get(ch)!;
      yield frame(20, { left, right, ch, [`need[${ch}]`]: v, have }, viz(right, { [right]: 'active' }, { [ch]: 'swap' }),
        `'${ch}' có trong t ⇒ giảm need['${ch}'] còn ${v}.${v < 0 ? ' Âm nghĩa là dư – thừa ra này sau có thể bỏ đi khi co trái.' : ''}`);
      if (v === 0) {
        have++;
        yield frame(21, { left, right, ch, have, required }, viz(right, { [right]: 'done' }, { [ch]: 'done' }),
          `need['${ch}'] chạm đúng 0 ⇒ ký tự '${ch}' vừa đủ, have = ${have}/${required}. Chỉ tăng đúng lúc chạm 0 nên không đếm trùng khi dư.`);
      }
    } else {
      yield frame(19, { left, right, ch }, viz(right, { [right]: 'muted' }), `'${ch}' không có trong t ⇒ không ảnh hưởng tính hợp lệ, chỉ làm cửa sổ dài thêm.`);
    }
    while (have === required) {
      yield frame(23, { left, right, have, required }, viz(right), `have = required ⇒ cửa sổ [${left}, ${right}] chứa đủ t. Giờ thử co trái để tìm cửa sổ ngắn hơn kết thúc tại right.`);
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
        yield frame(26, { left, right, bestStart, bestLen }, viz(right), `Độ dài ${bestLen} ngắn hơn kỷ lục ⇒ cập nhật best = ${best()}.`);
      } else {
        yield frame(24, { left, right, bestLen }, viz(right), `Độ dài ${right - left + 1} không ngắn hơn best (${bestLen}) ⇒ giữ nguyên.`);
      }
      const out = chars[left];
      if (need.has(out)) {
        need.set(out, need.get(out)! + 1);
        const v = need.get(out)!;
        if (v > 0) {
          have--;
          yield frame(31, { left, out, [`need[${out}]`]: v, have }, viz(right, { [left]: 'swap' }, { [out]: 'swap' }),
            `Bỏ '${out}' ⇒ need['${out}'] = ${v} > 0: cửa sổ giờ THIẾU '${out}', have giảm còn ${have}. Vòng while sẽ dừng sau bước này.`);
        } else {
          yield frame(30, { left, out, [`need[${out}]`]: v, have }, viz(right, { [left]: 'compare' }, { [out]: 'compare' }),
            `Bỏ '${out}' ⇒ need['${out}'] = ${v} ≤ 0: trước đó đang dư nên vẫn đủ, cửa sổ còn hợp lệ.`);
        }
      } else {
        yield frame(29, { left, out }, viz(right, { [left]: 'muted' }), `'${out}' không thuộc t ⇒ bỏ đi miễn phí, cửa sổ vẫn hợp lệ mà ngắn hơn.`);
      }
      left++;
      yield frame(33, { left, right, have }, viz(right), `left tiến lên ${left}. left không bao giờ lùi ⇒ mỗi ký tự vào/ra cửa sổ tối đa 1 lần, tổng O(n).`);
    }
  }
  const res = bestLen === Infinity ? '' : s.slice(bestStart, bestStart + bestLen);
  yield frame(36, { bestStart, bestLen: bestLen === Infinity ? '∞' : bestLen, result: res }, viz(chars.length - 1),
    res === '' ? 'Không cửa sổ nào chứa đủ t ⇒ trả "".' : `Kết quả: "${res}" (vị trí ${bestStart}, dài ${bestLen}).`);
  return res;
}
