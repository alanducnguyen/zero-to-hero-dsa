import { arr, composite, frame } from '@/engine/helpers';
import type { Frame } from '@/engine/types';

export function* trace(input: { lists: number[][] }): Generator<Frame, number[]> {
  const lists = input.lists;
  let result: number[] = [];
  let work = 0;
  const rows = (cur: number) => lists.map((l, i) => arr(l.length ? l : ['∅'], { title: `list ${i}`, highlights: i === cur ? Object.fromEntries(l.map((_, k) => [k, 'active' as const])) : i < cur ? Object.fromEntries(l.map((_, k) => [k, 'visited' as const])) : {} }));
  for (let idx = 0; idx < lists.length; idx++) {
    const a = result, b = lists[idx];
    const out: number[] = [];
    let i = 0, j = 0;
    yield frame(4, { idx, 'result.length': a.length, 'list.length': b.length }, composite([...rows(idx), arr(result.length ? result : ['—'], { title: 'result' })]), `Trộn result (${a.length} phần tử) với list ${idx} (${b.length}). Mỗi lần trộn duyệt lại toàn bộ result – đây là chỗ sinh ra O(N·k).`);
    while (i < a.length && j < b.length) { out.push(a[i] <= b[j] ? a[i++] : b[j++]); work++; }
    while (i < a.length) { out.push(a[i++]); work++; }
    while (j < b.length) { out.push(b[j++]); work++; }
    result = out;
    yield frame(5, { idx, result: [...result], 'tổng bước so sánh/chép': work }, composite([...rows(idx), arr(result.length ? result : ['—'], { title: 'result sau khi trộn', highlights: Object.fromEntries(result.map((_, k) => [k, 'done' as const])) })]), `result giờ có ${result.length} phần tử. Phần tử của list 0 đã bị chép lại ${idx + 1} lần.`);
  }
  yield frame(6, { result, 'tổng bước': work }, composite([...rows(lists.length), arr(result.length ? result : ['—'], { title: 'kết quả' })]), `Xong với ${work} bước. Với k list bằng nhau: N/k·(1+2+…+k) ≈ N·k/2.`);
  return result;
}
