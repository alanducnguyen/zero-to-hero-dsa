import { composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';
import { graphViz, parse, type CSInput } from '../../shared';

const NAME = ['WHITE', 'GRAY', 'BLACK'];

export function* trace(input: CSInput): Generator<Frame, boolean> {
  const { numCourses: n, prerequisites } = parse(input);
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const color = new Array<number>(n).fill(0);
  const path: number[] = [];
  const cs = () => ({ callStack: path.map((u) => `dfs(${u})`) });
  const viz = (extra: Record<string, Highlight> = {}, eh: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    color.forEach((c, k) => { if (c === 1) h[k] = 'visited'; else if (c === 2) h[k] = 'done'; });
    if (path.length) h[path[path.length - 1]] = 'active';
    return composite([
      graphViz(n, prerequisites, { ...h, ...extra }, { edgeHighlights: eh, marks: Object.fromEntries(color.map((c, k) => [String(k), NAME[c]])) }),
      stack(path.length ? path.map((u) => `dfs(${u})`) : ['—'], undefined, 'Stack đệ quy = các đỉnh GRAY'),
    ], 'row');
  };
  const colors = () => color.map((c) => NAME[c]);

  yield frame(4, { numCourses: n, graph: graph.map((o, b) => `${b}→[${o.join(',')}]`) }, viz(),
    'Dựng danh sách kề: "b->a" nghĩa là học b trước a ⇒ cạnh b → a. Học được hết ⇔ đồ thị không có chu trình (là DAG).', cs());
  yield frame(5, { color: colors() }, viz(),
    'Mọi đỉnh WHITE. Cần 3 màu chứ không chỉ visited true/false: phải phân biệt đỉnh "đang trên đường đi hiện tại" (GRAY) với đỉnh "đã xong, an toàn" (BLACK).', cs());

  function* dfs(u: number): Generator<Frame, boolean> {
    path.push(u);
    color[u] = 1;
    yield frame(7, { u, color: colors() }, viz(), `Vào dfs(${u}), tô GRAY: ${u} đang nằm trên stack đệ quy. Nếu đi tiếp mà quay lại ${u} khi nó còn GRAY ⇒ có vòng.`, cs());
    for (const v of graph[u]) {
      const ek = `${u}->${v}`;
      if (color[v] === 1) {
        yield frame(9, { u, v, 'color[v]': 'GRAY' }, viz({ [u]: 'swap', [v]: 'swap' }, { [ek]: 'swap' }),
          `Cạnh ${u} → ${v} trỏ vào đỉnh GRAY ⇒ back-edge: ${path.join(' → ')} → ${v} là một chu trình. Không môn nào trong vòng được học trước ⇒ false.`, cs());
        path.pop();
        return false;
      }
      if (color[v] === 0) {
        yield frame(10, { u, v, 'color[v]': 'WHITE' }, viz({ [v]: 'compare' }, { [ek]: 'compare' }),
          `${v} còn WHITE ⇒ đệ quy dfs(${v}). Mỗi đỉnh chỉ được vào một lần nên tổng chi phí là O(V + E).`, cs());
        const ok: boolean = yield* dfs(v);
        if (!ok) { path.pop(); return false; }
      } else {
        yield frame(10, { u, v, 'color[v]': 'BLACK' }, viz({ [v]: 'done' }, { [ek]: 'visited' }),
          `${v} đã BLACK: đã chứng minh mọi đường từ ${v} không có vòng ⇒ bỏ qua, không duyệt lại. Đây chính là chỗ tiết kiệm so với thử mọi đường.`, cs());
      }
    }
    color[u] = 2;
    yield frame(12, { u, color: colors() }, viz({ [u]: 'done' }), `Mọi cạnh ra từ ${u} đều an toàn ⇒ tô BLACK và rời stack. Lần sau ai trỏ tới ${u} đều biết ngay không có vòng qua ${u}.`, cs());
    path.pop();
    return true;
  }

  for (let u = 0; u < n; u++) {
    if (color[u] !== 0) {
      yield frame(16, { u, 'color[u]': NAME[color[u]] }, viz(), `Môn ${u} đã BLACK từ lượt DFS trước ⇒ bỏ qua.`, cs());
      continue;
    }
    yield frame(16, { u, 'color[u]': 'WHITE' }, viz({ [u]: 'compare' }), `Môn ${u} còn WHITE ⇒ bắt đầu lượt DFS mới. Phải thử từ mọi đỉnh vì đồ thị có thể không liên thông.`, cs());
    const ok: boolean = yield* dfs(u);
    if (!ok) {
      yield frame(16, { u, result: false }, viz(), 'dfs báo chu trình ⇒ dừng ngay, trả về false.', cs());
      return false;
    }
  }
  yield frame(18, { result: true, color: colors() }, viz(), 'Không gặp back-edge nào ⇒ đồ thị là DAG ⇒ học được hết, trả về true.', cs());
  return true;
}
