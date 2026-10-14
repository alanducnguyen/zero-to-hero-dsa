import { arr, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, string> {
  const s = input.s;
  const ch = [...s];
  let start = 0, maxLen = 0;
  const bestRange = () => (maxLen ? [{ from: start, to: start + maxLen - 1, label: `best = "${s.slice(start, start + maxLen)}"`, color: 'done' as const }] : []);
  for (let c = 0; c < s.length; c++) {
    for (const [l0, r0] of [[c, c], [c, c + 1]]) {
      const odd = l0 === r0;
      let l = l0, r = r0;
      if (!odd && (r >= s.length || s[l] !== s[r])) continue; // tâm chẵn không khớp: bỏ qua cho gọn
      yield frame(6, { c, 'tâm': odd ? `ký tự ${c}` : `khe ${c}|${c + 1}`, l, r }, arr(ch, { highlights: odd ? { [c]: 'active' } : { [l]: 'active', [r]: 'active' }, ranges: bestRange() }), odd ? `Tâm lẻ tại ký tự ${c} ('${s[c]}'): mở rộng ra hai bên khi còn bằng nhau.` : `Tâm chẵn giữa ${c} và ${c + 1} ('${s[c]}${s[c + 1]}'): hai ký tự giữa bằng nhau, mở rộng.`);
      while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
      const len = r - l - 1;
      const improved = len > maxLen;
      if (improved) { start = l + 1; maxLen = len; }
      yield frame(8, { l: l + 1, r: r - 1, len, 'dừng vì': l < 0 || r >= s.length ? 'chạm biên' : `'${s[l]}' ≠ '${s[r]}'`, maxLen }, arr(ch, { highlights: l >= 0 && r < s.length ? { [l]: 'swap', [r]: 'swap' } : {}, ranges: [{ from: l + 1, to: r - 1, label: `palindrome dài ${len}`, color: improved ? 'done' : 'range' }, ...(improved ? [] : bestRange())] }), `Mở rộng tối đa được "${s.slice(l + 1, r)}" (dài ${len}).${improved ? ' Dài hơn best ⇒ cập nhật.' : ''} Tổng chi phí mọi tâm ≤ O(n²), nhưng thực tế dừng rất sớm.`);
    }
  }
  const best = s.slice(start, start + maxLen);
  yield frame(12, { best }, arr(ch, { ranges: bestRange() }), `Kết quả "${best}". O(n²) worst case (chuỗi "aaaa…"), O(1) bộ nhớ.`);
  return best;
}
