import { frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';
import { count, view, type In } from '../../viz';

export function* trace({ s, t }: In): Generator<Frame, string> {
  if (t.length === 0) {
    yield frame(3, { t }, view(s, t, { map: {}, mapTitle: 'rem' }), 't rỗng ⇒ quy ước trả "".');
    return '';
  }
  const need = count(t);
  let bestI = -1;
  let bestLen = 0;
  const best = (): [number, number] | null => (bestI < 0 ? null : [bestI, bestLen]);
  yield frame(5, { t }, view(s, t, { map: Object.fromEntries(need), mapTitle: 'need: ký tự → số lần cần' }), 'need = tần suất của t, dùng làm khuôn cho mỗi left.');
  for (let left = 0; left < s.length; left++) {
    const rem = new Map(need);
    let missing = t.length;
    yield frame(9, { left, missing }, view(s, t, { lo: left, hi: left - 1, best: best(), pointers: [{ name: 'left', index: left }], map: Object.fromEntries(rem), mapTitle: `rem (missing = ${missing})` }),
      `left = ${left}: chép need sang rem, missing = ${missing}. Thay vì so cả bảng, chỉ cần biết missing = 0 ⇒ kiểm tra hợp lệ O(1).`);
    for (let right = left; right < s.length; right++) {
      const c = s[right];
      const k = rem.get(c);
      if (k !== undefined) {
        rem.set(c, k - 1);
        if (k > 0) missing--;
      }
      const pointers = [{ name: 'left', index: left }, { name: 'right', index: right }];
      const v = view(s, t, { lo: left, hi: right, best: best(), hl: { [right]: 'active' }, pointers, map: Object.fromEntries(rem), mapHl: k !== undefined ? { [c]: k > 0 ? 'done' : 'compare' } : {}, mapTitle: `rem (missing = ${missing})` });
      if (missing === 0) {
        const better = bestI < 0 || right - left + 1 < bestLen;
        if (better) [bestI, bestLen] = [left, right - left + 1];
        yield frame(17, { left, right, window: s.slice(left, right + 1), missing }, view(s, t, { lo: left, hi: right, best: best(), pointers, map: Object.fromEntries(rem), mapTitle: 'rem (missing = 0)' }),
          `missing = 0 ⇒ "${s.slice(left, right + 1)}" là cửa sổ NGẮN NHẤT bắt đầu tại ${left}. ${better ? 'Ngắn hơn kỷ lục ⇒ cập nhật best.' : `Không ngắn hơn best (${bestLen}).`} Break: right xa hơn chỉ dài thêm.`);
        break;
      }
      yield frame(k === undefined ? 11 : 14, { left, right, c, missing }, v,
        k === undefined ? `'${c}' không thuộc t ⇒ không đổi missing.` : k > 0 ? `'${c}' đang thiếu ⇒ missing giảm còn ${missing}.` : `'${c}' đã đủ (rem âm = dư) ⇒ missing giữ nguyên ${missing}.`);
    }
  }
  const res = bestI < 0 ? '' : s.slice(bestI, bestI + bestLen);
  yield frame(22, { result: res }, view(s, t, { best: best(), map: {}, mapTitle: 'Xong' }),
    res ? `Kết quả "${res}". Mỗi left vẫn có thể quét lại gần hết s ⇒ O(n²): thông tin từ left trước bị bỏ đi – sliding window sẽ giữ lại nó.` : 'Không cửa sổ nào hợp lệ ⇒ "".');
  return res;
}
