import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

const isAlnum = (c: string) => /[a-z0-9]/i.test(c);
const show = (c: string) => (c === ' ' ? '␣' : c);

export function* trace(input: { s: string }): Generator<Frame, boolean> {
  const s = String(input.s ?? '');
  const chars = [...s].map(show);
  const n = s.length;
  const status: Record<number, Highlight> = {};
  const viz = (l: number, r: number, extra: Record<number, Highlight> = {}) =>
    arr(chars, {
      mode: 'cells',
      highlights: { ...status, ...extra },
      pointers: n ? [{ name: 'l', index: Math.min(n - 1, Math.max(0, l)) }, { name: 'r', index: Math.max(0, Math.min(n - 1, r)) }] : [],
    });
  let l = 0;
  let r = n - 1;
  yield frame(10, { s, l, r }, viz(l, r),
    'Đặt l ở đầu, r ở cuối. Palindrome đối xứng quanh tâm nên chỉ cần so từng cặp từ ngoài vào trong – không cần tạo chuỗi đảo ngược (tiết kiệm O(n) bộ nhớ).');
  while (l < r) {
    if (!isAlnum(s[l])) {
      status[l] = 'visited';
      yield frame(13, { l, r, 's[l]': s[l] }, viz(l, r),
        `s[${l}] = "${s[l]}" không phải chữ/số ⇒ đề bài coi như không tồn tại. Bỏ qua bằng l++ và KHÔNG dịch r, vì r vẫn chưa có cặp hợp lệ.`);
      l++;
    } else if (!isAlnum(s[r])) {
      status[r] = 'visited';
      yield frame(15, { l, r, 's[r]': s[r] }, viz(l, r),
        `s[${r}] = "${s[r]}" không phải chữ/số ⇒ bỏ qua bằng r--. l giữ nguyên vì nó đang chờ một đối tác hợp lệ.`);
      r--;
    } else if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      yield frame(17, { l, r, 's[l]': s[l], 's[r]': s[r] }, viz(l, r, { [l]: 'swap', [r]: 'swap' }),
        `"${s[l]}" ≠ "${s[r]}" (kể cả khi bỏ qua hoa thường). Hai vị trí này phải bằng nhau trong mọi palindrome ⇒ kết luận false ngay, không cần xét tiếp.`);
      return false;
    } else {
      status[l] = 'done';
      status[r] = 'done';
      yield frame(19, { l, r, 's[l]': s[l], 's[r]': s[r] }, viz(l, r),
        `"${s[l]}" và "${s[r]}" khớp nhau (không phân biệt hoa thường). Cặp này đã thỏa ⇒ thu hẹp cả hai phía: l++, r--.`);
      l++;
      r--;
    }
  }
  if (l === r && n) status[l] = 'done';
  yield frame(23, { l, r, result: true }, viz(l, r),
    'l ≥ r: mọi cặp đối xứng đều đã khớp (ký tự ở giữa, nếu có, tự đối xứng với chính nó) ⇒ true. Mỗi ký tự được chạm tối đa một lần ⇒ O(n).');
  return true;
}
