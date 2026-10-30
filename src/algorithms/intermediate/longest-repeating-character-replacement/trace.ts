import { arr, composite, frame, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string; k: number }): Generator<Frame, number> {
  const s = String(input.s ?? '');
  const k = Number(input.k ?? 0);
  const chars = [...s];
  const count = new Map<string, number>();
  let maxFreq = 0;
  let left = 0;
  let best = 0;
  let bestStart = 0;

  const viz = (right: number, extra: Record<number, Highlight> = {}, mapHl?: Record<string, Highlight>) => {
    const base = right >= left ? hlRange(left, right, 'range') : {};
    const ranges: { from: number; to: number; label?: string; color?: Highlight }[] = [];
    if (right >= left) ranges.push({ from: left, to: right, label: `cửa sổ (${right - left + 1})`, color: 'range' });
    if (best > 0) ranges.push({ from: bestStart, to: bestStart + best - 1, label: `best = ${best}`, color: 'done' });
    const pointers = [{ name: 'left', index: left }];
    if (right >= 0 && right < chars.length) pointers.push({ name: 'right', index: right });
    return composite([
      arr(chars, { title: `Chuỗi s (k = ${k} lần thay)`, highlights: { ...base, ...extra }, pointers, ranges }),
      mapViz(count, mapHl, `count: ký tự → tần suất trong cửa sổ (maxFreq = ${maxFreq})`),
    ]);
  };

  yield frame(13, { k, maxFreq, left, best }, viz(-1), 'Khởi tạo cửa sổ rỗng. Ý tưởng: trong một cửa sổ, giữ nguyên ký tự xuất hiện nhiều nhất và thay hết phần còn lại ⇒ cần (độ dài − maxFreq) lần thay.');

  for (let right = 0; right < chars.length; right++) {
    const ch = chars[right];
    count.set(ch, (count.get(ch) ?? 0) + 1);
    yield frame(16, { right, ch, [`count[${ch}]`]: count.get(ch) }, viz(right, { [right]: 'active' }, { [ch]: 'active' }), `Mở rộng: đưa s[${right}] = '${ch}' vào cửa sổ, count[${ch}] = ${count.get(ch)}.`);
    const old = maxFreq;
    maxFreq = Math.max(maxFreq, count.get(ch)!);
    yield frame(17, { right, maxFreq, len: right - left + 1 }, viz(right, { [right]: 'active' }, maxFreq > old ? { [ch]: 'swap' } : undefined),
      maxFreq > old
        ? `maxFreq tăng lên ${maxFreq} nhờ '${ch}'. Chỉ ký tự VỪA thêm mới có thể làm maxFreq tăng, nên so với count[${ch}] là đủ – O(1).`
        : `maxFreq giữ ${maxFreq}. Ta chỉ quan tâm khi maxFreq TĂNG, vì chỉ khi đó mới có thể có đáp án dài hơn.`);
    const len = right - left + 1;
    const need = len - maxFreq;
    if (need > k) {
      yield frame(18, { len, maxFreq, 'len − maxFreq': need, k }, viz(right, { [right]: 'compare' }), `Cần ${len} − ${maxFreq} = ${need} lần thay > k = ${k} ⇒ cửa sổ không hợp lệ. Chỉ cần trượt left lên 1 (không co hẳn): cửa sổ giữ nguyên độ dài ${len - 1} = best hiện có, ta chỉ tìm cửa sổ DÀI HƠN.`);
      const out = chars[left];
      count.set(out, count.get(out)! - 1);
      yield frame(20, { left, out, [`count[${out}]`]: count.get(out), maxFreq }, viz(right, { [left]: 'muted' }, { [out]: 'swap' }), `Bỏ '${out}' ở left = ${left}. KHÔNG giảm maxFreq dù có thể nó đã lỗi thời: maxFreq cũ chỉ làm cửa sổ "trông hợp lệ" ở độ dài ≤ best, không bao giờ tạo ra đáp án sai lớn hơn; đáp án chỉ tăng khi tìm được maxFreq thật sự lớn hơn.`);
      left++;
      yield frame(21, { left, right, len: right - left + 1 }, viz(right), `left = ${left}. Cửa sổ trượt (dịch cả hai đầu) – độ dài không giảm.`);
    } else {
      yield frame(18, { len, maxFreq, 'len − maxFreq': need, k }, viz(right, { [right]: 'done' }), `Cần ${need} lần thay ≤ k = ${k} ⇒ cửa sổ hợp lệ, giữ nguyên left.`);
    }
    const curLen = right - left + 1;
    if (curLen > best) {
      best = curLen;
      bestStart = left;
      yield frame(23, { best, left, right }, viz(right), `Kỷ lục mới: best = ${best} (s[${left}..${right}] = "${s.slice(left, right + 1)}").`);
    } else {
      yield frame(23, { best, len: curLen }, viz(right), `Độ dài ${curLen} không vượt best = ${best}.`);
    }
  }
  yield frame(25, { result: best }, viz(chars.length - 1), `Kết quả: ${best}. Mỗi ký tự vào/ra cửa sổ tối đa 1 lần ⇒ O(n), bảng đếm tối đa 26 khóa ⇒ O(1) bộ nhớ.`);
  return best;
}
