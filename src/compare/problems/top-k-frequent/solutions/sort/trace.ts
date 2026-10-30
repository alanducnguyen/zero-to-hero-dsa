import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { countPhase, freqViz, type TkInput } from '../../count';

export function* trace(input: TkInput): Generator<Frame, number[]> {
  const { nums, k } = input;
  const freq = new Map<number, number>();
  yield* countPhase(nums, freq);
  const entries = [...freq].sort((a, b) => b[1] - a[1]);
  const show = (hl: Record<number, Highlight> = {}) => arr(entries.length ? entries.map(([v, c]) => `${v}×${c}`) : ['rỗng'], { title: 'entries sắp giảm dần theo count', highlights: hl });
  yield frame(5, { m: entries.length, k }, composite([freqViz(freq), show()]), `Sắp xếp cả m = ${entries.length} giá trị khác nhau theo count – O(m log m). Lãng phí: ta chỉ cần biết k = ${k} phần tử đầu, không cần thứ tự của phần còn lại.`);
  const result = entries.slice(0, k).map(([value]) => value);
  yield frame(6, { result }, composite([freqViz(freq), show(Object.fromEntries(entries.map((_, i) => [i, (i < k ? 'done' : 'muted') as Highlight])))]), `Lấy k = ${k} phần tử đầu: [${result.join(', ')}]. Đơn giản và đúng, nhưng m ≈ n thì tốn O(n log n).`);
  return result;
}
