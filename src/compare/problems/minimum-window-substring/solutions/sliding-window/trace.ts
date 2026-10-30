import { frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';
import { count, view, type In } from '../../viz';

export function* trace({ s, t }: In): Generator<Frame, string> {
  if (t.length === 0) {
    yield frame(3, { t }, view(s, t, { map: {}, mapTitle: 'need' }), 't rỗng ⇒ quy ước trả "".');
    return '';
  }
  const need = count(t);
  let missing = t.length;
  let left = 0;
  let bestL = 0;
  let bestLen = Infinity;
  const best = (): [number, number] | null => (bestLen === Infinity ? null : [bestL, bestLen]);
  const title = () => `need: còn thiếu (âm = dư), missing = ${missing}`;
  yield frame(9, { missing, left, bestLen: '∞' }, view(s, t, { map: Object.fromEntries(need), mapTitle: title() }),
    `need = tần suất t, missing = ${missing}. Chỉ MỘT bảng đếm dùng suốt – không bao giờ dựng lại như hai cách kia.`);
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    const k = need.get(c);
    if (k !== undefined) {
      need.set(c, k - 1);
      if (k > 0) missing--;
    }
    const ptr = () => [{ name: 'left', index: Math.min(left, s.length - 1) }, { name: 'right', index: right }];
    yield frame(k === undefined ? 11 : 14, { left, right, c, missing }, view(s, t, { lo: left, hi: right, best: best(), hl: { [right]: 'active' }, pointers: ptr(), map: Object.fromEntries(need), mapHl: k !== undefined ? { [c]: k > 0 ? 'done' : 'compare' } : {}, mapTitle: title() }),
      k === undefined ? `Thêm '${c}': không thuộc t ⇒ chỉ làm cửa sổ dài thêm.` : k > 0 ? `Thêm '${c}': đang thiếu ⇒ missing = ${missing}.${missing === 0 ? ' Đủ rồi ⇒ bắt đầu co trái.' : ''}` : `Thêm '${c}': đã đủ, need['${c}'] = ${k - 1} < 0 nghĩa là dư – phần dư sẽ được nhả khi co trái.`);
    while (missing === 0) {
      const better = right - left + 1 < bestLen;
      if (better) [bestL, bestLen] = [left, right - left + 1];
      const o = s[left];
      const out = need.get(o);
      if (out !== undefined) {
        need.set(o, out + 1);
        if (out + 1 > 0) missing++;
      }
      yield frame(out !== undefined && out + 1 > 0 ? 21 : 17, { left, right, window: s.slice(left, right + 1), best: s.slice(bestL, bestL + bestLen), missing },
        view(s, t, { lo: left, hi: right, best: best(), hl: { [left]: out !== undefined && out + 1 > 0 ? 'swap' : 'muted' }, pointers: ptr(), map: Object.fromEntries(need), mapHl: out !== undefined ? { [o]: 'swap' } : {}, mapTitle: title() }),
        `[${left}, ${right}] hợp lệ${better ? ` và ngắn hơn kỷ lục ⇒ best = "${s.slice(bestL, bestL + bestLen)}"` : ''}. Nhả '${o}': ${out === undefined ? 'không thuộc t ⇒ bỏ miễn phí.' : out + 1 > 0 ? `giờ thiếu '${o}' ⇒ missing = ${missing}, dừng co. Cửa sổ hợp lệ ngắn nhất kết thúc tại ${right} đã được ghi.` : 'đang dư nên vẫn đủ ⇒ co tiếp.'}`);
      left++;
    }
  }
  const res = bestLen === Infinity ? '' : s.slice(bestL, bestL + bestLen);
  yield frame(26, { result: res }, view(s, t, { best: best(), map: Object.fromEntries(need), mapTitle: title() }),
    res ? `Kết quả "${res}". left và right đều chỉ tiến ⇒ tổng ≤ 2n bước: O(n). Cập nhật chỉ khi ngắn HƠN ⇒ cửa sổ trái nhất thắng khi hoà.` : 'Không cửa sổ nào hợp lệ ⇒ "".');
  return res;
}
