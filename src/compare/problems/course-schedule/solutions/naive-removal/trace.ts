import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { graphViz, parse, type CSInput } from '../../shared';

export function* trace(input: CSInput): Generator<Frame, boolean> {
  const { numCourses: n, prerequisites } = parse(input);
  const removed = new Array<boolean>(n).fill(false);
  let indeg = new Array<number>(n).fill(0);
  let scanned = 0;
  const viz = (extra: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    removed.forEach((r, k) => { if (r) h[k] = 'muted'; });
    const eh: Record<string, Highlight> = {};
    for (const [a, b] of prerequisites) if (removed[b]) eh[`${b}->${a}`] = 'muted';
    return composite([
      graphViz(n, prerequisites, { ...h, ...extra }, { edgeHighlights: eh, title: 'Đồ thị b → a (mờ = đã gỡ)' }),
      arr(n ? indeg : ['—'], { title: 'indeg tính lại vòng này', highlights: Object.fromEntries(removed.map((r, k) => [k, r ? 'muted' : indeg[k] === 0 ? 'done' : 'compare'])) }),
    ], 'row');
  };

  yield frame(3, { numCourses: n, edges: prerequisites.length }, viz(),
    'Ý tưởng trực quan nhất: cứ tìm một môn không còn điều kiện, học nó, gỡ khỏi đồ thị, lặp lại. Nếu kẹt khi còn môn ⇒ có vòng.');
  for (let round = 0; round < n; round++) {
    indeg = new Array<number>(n).fill(0);
    for (const [a, b] of prerequisites) if (!removed[b]) indeg[a]++;
    scanned += prerequisites.length;
    yield frame(6, { round, indeg: [...indeg], 'cạnh đã quét': scanned }, viz(),
      `Vòng ${round}: quét lại toàn bộ ${prerequisites.length} cạnh để tính in-degree (tổng đã quét ${scanned}). Lãng phí: mỗi vòng chỉ gỡ một đỉnh nhưng tính lại mọi thứ ⇒ O(V·(V + E)). Kahn chỉ trừ in-degree của hàng xóm.`);
    const pick = indeg.findIndex((d, u) => d === 0 && !removed[u]);
    if (pick < 0) {
      yield frame(8, { round, pick, result: false }, viz(),
        'Không còn môn chưa gỡ nào có in-degree 0: các môn còn lại chặn lẫn nhau theo vòng ⇒ không thể học hết, trả về false.');
      return false;
    }
    yield frame(7, { round, pick }, viz({ [pick]: 'swap' }),
      `Quét tuyến tính tìm môn đầu tiên có in-degree 0 và chưa gỡ ⇒ môn ${pick}. Thêm O(V) cho mỗi vòng.`);
    removed[pick] = true;
    yield frame(9, { round, pick, removed: removed.map((r, k) => (r ? k : null)).filter((x) => x !== null) }, viz(),
      `Gỡ môn ${pick}: các cạnh ra từ ${pick} không còn tính ở vòng sau.`);
  }
  yield frame(11, { result: true, 'cạnh đã quét': scanned }, viz(),
    `Gỡ được cả ${n} môn ⇒ không có chu trình, trả về true. Tổng đã quét ${scanned} cạnh, trong khi Kahn chỉ chạm mỗi cạnh một lần.`);
  return true;
}
