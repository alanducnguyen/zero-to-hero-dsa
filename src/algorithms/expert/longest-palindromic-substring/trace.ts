import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, string> {
  const s = String(input.s ?? '');
  const chars = s.split('');
  const n = s.length;

  const viz = (start: number, maxLen: number, l?: number, r?: number, cmp = false) => {
    let highlights: Record<number, Highlight> = hlRange(start, start + maxLen - 1, 'done');
    if (l !== undefined && r !== undefined) {
      // đoạn palindrome hiện tại là (l, r) – không gồm l, r
      highlights = hlRange(l + 1, r - 1, 'range', highlights);
      if (cmp) {
        if (l >= 0) highlights[l] = 'compare';
        if (r < n) highlights[r] = 'compare';
      }
    }
    const pointers: Pointer[] = [];
    if (l !== undefined && l >= 0 && l < n) pointers.push({ name: 'l', index: l });
    if (r !== undefined && r >= 0 && r < n) pointers.push({ name: 'r', index: r });
    return arr(chars, {
      mode: 'cells',
      title: 'xanh lá = palindrome dài nhất hiện tại, cyan = đoạn đang mở rộng, vàng = cặp đang so sánh',
      highlights,
      pointers,
    });
  };

  let start = 0;
  let maxLen = n > 0 ? 1 : 0;
  yield frame(13, { n, start, maxLen }, viz(start, maxLen),
    n > 0
      ? 'Mọi ký tự đơn đều là palindrome ⇒ khởi tạo kết quả = s[0] (độ dài 1). Nhờ vậy chỉ cần cập nhật khi tìm thấy đoạn DÀI HƠN.'
      : 'Chuỗi rỗng ⇒ kết quả là chuỗi rỗng.');
  for (let c = 0; c < 2 * n - 1; c++) {
    let l = Math.floor(c / 2);
    let r = l + (c % 2);
    yield frame(17, { c, l, r, start, maxLen }, viz(start, maxLen, l, r),
      c % 2 === 0
        ? `Tâm #${c}: ký tự s[${l}] = '${s[l]}' (palindrome độ dài lẻ). l = r = ${l}.`
        : `Tâm #${c}: khe giữa s[${l}] và s[${r}] (palindrome độ dài chẵn). Nếu bỏ tâm chẵn sẽ sót các đáp án như "bb".`);
    while (l >= 0 && r < n && s[l] === s[r]) {
      yield frame(18, { c, l, r, 's[l]': s[l], 's[r]': s[r], start, maxLen }, viz(start, maxLen, l, r, true),
        `s[${l}] = '${s[l]}' = s[${r}] ⇒ đoạn s[${l}..${r}] vẫn đối xứng, thử mở rộng thêm.`);
      l--;
      r++;
      yield frame(20, { c, l, r, start, maxLen }, viz(start, maxLen, l, r),
        `Mở rộng: l = ${l}, r = ${r}. Đoạn palindrome đã xác nhận là s[${l + 1}..${r - 1}] (cyan).`);
    }
    const why = l < 0 ? 'l chạy ra khỏi biên trái' : r >= n ? 'r chạy ra khỏi biên phải' : `s[${l}] = '${s[l]}' ≠ s[${r}] = '${s[r]}'`;
    yield frame(18, { c, l, r, start, maxLen }, viz(start, maxLen, l, r, true),
      `Dừng mở rộng vì ${why}. Một palindrome bỏ hai đầu vẫn là palindrome ⇒ khi đã hỏng ở bước này thì mở rộng xa hơn cũng vô ích.`);
    const len = r - l - 1;
    yield frame(22, { c, l, r, len, start, maxLen }, viz(start, maxLen, l, r),
      `Palindrome dài nhất quanh tâm này là s[${l + 1}..${r - 1}] = "${s.slice(l + 1, r)}", độ dài r − l − 1 = ${len}.`);
    if (len > maxLen) {
      start = l + 1;
      maxLen = len;
      yield frame(25, { c, len, start, maxLen }, viz(start, maxLen),
        `${len} > độ dài tốt nhất cũ ⇒ cập nhật start = ${start}, maxLen = ${maxLen}. Dùng ">" (không phải "≥") để giữ đáp án xuất hiện ĐẦU TIÊN.`);
    }
  }
  const result = s.slice(start, start + maxLen);
  yield frame(28, { start, maxLen, result }, viz(start, maxLen),
    `Đã thử đủ 2n − 1 = ${Math.max(0, 2 * n - 1)} tâm ⇒ mọi palindrome đều được xét qua tâm của nó. Kết quả: "${result}".`);
  return result;
}
