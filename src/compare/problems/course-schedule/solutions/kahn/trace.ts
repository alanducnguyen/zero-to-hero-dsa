import { arr, composite, frame, queue as queueViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { graphViz, parse, type CSInput } from '../../shared';

export function* trace(input: CSInput): Generator<Frame, boolean> {
  const { numCourses: n, prerequisites } = parse(input);
  const graph: number[][] = Array.from({ length: n }, () => []);
  const indeg = new Array<number>(n).fill(0);
  for (const [a, b] of prerequisites) { graph[b].push(a); indeg[a]++; }
  const queue: number[] = [];
  let head = 0;
  let taken = 0;
  const viz = (extra: Record<string, Highlight> = {}, eh: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    for (let i = 0; i < head; i++) h[queue[i]] = 'done';
    for (let i = head; i < queue.length; i++) h[queue[i]] = 'active';
    return composite([
      graphViz(n, prerequisites, { ...h, ...extra }, { edgeHighlights: eh, marks: Object.fromEntries(indeg.map((d, k) => [String(k), `in=${d}`])) }),
      composite([
        queueViz(queue.slice(head).length ? queue.slice(head) : ['—'], undefined, 'queue: môn in-degree 0'),
        arr(n ? indeg : ['—'], { title: 'indeg[u]' }),
      ], 'column'),
    ], 'row');
  };

  yield frame(7, { indeg: [...indeg] }, viz(),
    'Dựng đồ thị b → a và đếm in-degree = số điều kiện tiên quyết còn thiếu của mỗi môn. Môn có in-degree 0 học được ngay.');
  for (let u = 0; u < n; u++) if (indeg[u] === 0) queue.push(u);
  yield frame(10, { queue: queue.slice(head) }, viz(),
    queue.length ? `Đưa mọi môn in-degree 0 (${queue.join(', ')}) vào queue: đây là các môn không phụ thuộc ai.` : 'Không môn nào có in-degree 0 ⇒ mọi môn đều bị chặn, chắc chắn có chu trình.');
  while (head < queue.length) {
    const u = queue[head++];
    taken++;
    yield frame(14, { u, taken }, viz({ [u]: 'pointer' }),
      `Học môn ${u} (taken = ${taken}). Môn này đã hết điều kiện nên thứ tự học luôn hợp lệ.`);
    for (const v of graph[u]) {
      indeg[v]--;
      const ready = indeg[v] === 0;
      if (ready) queue.push(v);
      yield frame(16, { u, v, 'indeg[v]': indeg[v] }, viz({ [u]: 'pointer', [v]: ready ? 'swap' : 'compare' }, { [`${u}->${v}`]: ready ? 'swap' : 'compare' }),
        ready ? `Học xong ${u} gỡ điều kiện cuối cùng của ${v} ⇒ in-degree về 0, đẩy ${v} vào queue. Mỗi cạnh chỉ bị "gỡ" đúng một lần ⇒ O(V + E).`
          : `Gỡ cạnh ${u} → ${v}: ${v} còn ${indeg[v]} điều kiện chưa học ⇒ chưa vào queue.`);
    }
  }
  const ok = taken === n;
  yield frame(19, { taken, numCourses: n, result: ok }, viz(),
    ok ? `Học được ${taken}/${n} môn ⇒ không có chu trình, trả về true.`
      : `Queue cạn khi mới học ${taken}/${n} môn: các môn còn lại chờ nhau thành vòng nên in-degree không bao giờ về 0 ⇒ false.`);
  return ok;
}
