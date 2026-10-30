import { arr, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

/** Vị trí các cặp `pat` mà replaceAll sẽ xoá (quét trái → phải, không chồng lấn). */
function hits(s: string, pat: string): Record<number, Highlight> {
  const h: Record<number, Highlight> = {};
  for (let i = s.indexOf(pat); i !== -1; i = s.indexOf(pat, i + 2)) { h[i] = 'swap'; h[i + 1] = 'swap'; }
  return h;
}

export function* trace(input: { s: string }): Generator<Frame, boolean> {
  let s = input.s;
  let prev = '';
  let round = 0;
  const viz = (h: Record<number, Highlight> = {}, title = `s (vòng ${round})`) => arr(s.length ? [...s] : ['∅'], { title, highlights: h });

  yield frame(3, { s, prev }, viz(), 'Ý tưởng: trong chuỗi hợp lệ luôn có ít nhất một cặp ngoặc kề nhau rỗng bên trong như "()". Xoá nó đi, phần còn lại vẫn hợp lệ ⇒ lặp đến khi không xoá được nữa.');
  for (;;) {
    const changed = s !== prev;
    yield frame(4, { s, prev, round }, viz(), changed ? `s ≠ prev ⇒ vòng trước còn xoá được, thử thêm một vòng.` : `s === prev ⇒ một vòng trọn vẹn không xoá được gì, dừng.`);
    if (!changed) break;
    round++;
    prev = s;
    yield frame(5, { s, prev, round }, viz(), 'Lưu chuỗi hiện tại để cuối vòng biết có thay đổi hay không.');
    for (const [line, pat] of [[6, '()'], [7, '[]'], [8, '{}']] as const) {
      const h = hits(s, pat);
      const n = Object.keys(h).length / 2;
      yield frame(line, { s, prev, round, pattern: pat }, viz(h), n ? `Xoá ${n} cặp "${pat}" (đỏ). Mỗi replaceAll quét cả chuỗi và cấp phát chuỗi mới – O(n) mỗi lần.` : `Không có "${pat}" kề nhau, chuỗi giữ nguyên nhưng vẫn tốn một lượt quét O(n).`);
      s = s.replaceAll(pat, '');
    }
  }
  const ok = s === '';
  yield frame(10, { s, result: ok }, viz(ok ? {} : Object.fromEntries([...s].map((_, k) => [k, 'swap' as Highlight])), `s cuối (${round} vòng)`),
    ok ? `Chuỗi rỗng ⇒ hợp lệ. Mỗi vòng chỉ chắc chắn bóc được một tầng lồng nhau, nên "((((…))))" sâu n/2 cần n/2 vòng × O(n) = O(n²).` : `Còn "${s}" không bóc được ⇒ không hợp lệ (ngoặc thừa hoặc sai loại chắn giữa).`);
  return ok;
}
