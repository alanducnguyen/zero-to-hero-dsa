import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight, VisualState } from '@/engine/types';
import { parse, type CInput } from './node';

const WHITE = 0;
const GRAY = 1;
const BLACK = 2;
const NAME = ['WHITE', 'GRAY', 'BLACK'];

export function* trace(input: CInput): Generator<Frame, number[]> {
  const { numCourses: n, prerequisites } = parse(input);
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const color: number[] = new Array<number>(n).fill(WHITE);
  const postorder: number[] = [];
  const callStack: number[] = [];

  const R = n <= 1 ? 0 : 120;
  const nodes = Array.from({ length: n }, (_, k) => {
    const ang = -Math.PI / 2 + (2 * Math.PI * k) / Math.max(1, n);
    return { id: String(k), label: `Môn ${k}`, x: Math.round(260 + R * Math.cos(ang)), y: Math.round(150 + R * Math.sin(ang)) };
  });
  const edges = graph.flatMap((outs, b) => outs.map((a) => ({ from: String(b), to: String(a), directed: true })));
  const cs = () => ({ callStack: callStack.map((u) => `dfs(${u})`) });

  const viz = (extra: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}): VisualState => {
    const h: Record<string, Highlight> = {};
    color.forEach((c, k) => { if (c === GRAY) h[k] = 'visited'; else if (c === BLACK) h[k] = 'done'; });
    const top = callStack[callStack.length - 1];
    if (top !== undefined) h[top] = 'active';
    const gv: GraphVisual = {
      kind: 'graph',
      title: 'Đồ thị b → a (học b trước a)',
      nodes,
      edges,
      highlights: { ...h, ...extra },
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(color.map((c, k) => [String(k), NAME[c]])),
    };
    return composite([
      gv,
      composite([
        stack(callStack.length ? callStack.map((u) => `dfs(${u})`) : ['—'], undefined, 'Stack đệ quy (đỉnh GRAY)'),
        arr(postorder.length ? postorder : ['—'], { title: 'postorder (thứ tự hoàn tất)' }),
      ], 'row'),
    ]);
  };
  const colors = () => color.map((c) => NAME[c]);

  yield frame(11, { numCourses: n, graph: graph.map((o, b) => `${b}→[${o.join(',')}]`) }, viz(),
    `Dựng danh sách kề: cặp [a, b] nghĩa là "học b trước a" ⇒ cạnh b → a. Như vậy mọi cạnh đều trỏ từ môn tiên quyết sang môn phụ thuộc, và thứ tự topo là đáp án.`, cs());
  yield frame(15, { color: colors() }, viz(),
    'Tô mọi đỉnh màu WHITE (chưa thăm). Cần 3 màu chứ không phải visited true/false: phải phân biệt đỉnh "đang trên đường đi hiện tại" (GRAY) với đỉnh "đã xong hoàn toàn" (BLACK).', cs());

  function* dfs(u: number): Generator<Frame, boolean> {
    callStack.push(u);
    color[u] = GRAY;
    yield frame(19, { u, color: colors() }, viz(), `Vào dfs(${u}): tô ${u} màu GRAY – nó đang nằm trên stack đệ quy. Nếu sau này đi vòng lại gặp ${u} khi nó vẫn GRAY thì có chu trình.`, cs());
    for (const v of graph[u]) {
      const ek = `${u}->${v}`;
      if (color[v] === GRAY) {
        yield frame(21, { u, v, 'color[v]': 'GRAY' }, viz({ [v]: 'swap', [u]: 'swap' }, { [ek]: 'swap' }),
          `Cạnh ${u} → ${v} trỏ tới đỉnh GRAY ⇒ BACK-EDGE! ${v} là tổ tiên của ${u} trên đường đi hiện tại (${callStack.join(' → ')} → ${v}) ⇒ chu trình: ${v} phải học trước ${u} và ngược lại. Trả về false.`, cs());
        callStack.pop();
        return false;
      }
      if (color[v] === WHITE) {
        yield frame(22, { u, v, 'color[v]': 'WHITE' }, viz({ [v]: 'compare' }, { [ek]: 'compare' }),
          `Cạnh ${u} → ${v}: ${v} còn WHITE (chưa thăm) ⇒ đệ quy dfs(${v}). Phải xử lý xong ${v} (môn phụ thuộc ${u}) trước khi ${u} được coi là xong.`, cs());
        const ok: boolean = yield* dfs(v);
        if (!ok) {
          yield frame(22, { u, v, ok }, viz({ [u]: 'swap' }, { [ek]: 'swap' }), `dfs(${v}) báo chu trình ⇒ dfs(${u}) cũng trả false ngay, không cần duyệt tiếp.`, cs());
          callStack.pop();
          return false;
        }
      } else {
        yield frame(22, { u, v, 'color[v]': 'BLACK' }, viz({ [v]: 'done' }, { [ek]: 'visited' }),
          `Cạnh ${u} → ${v}: ${v} đã BLACK ⇒ đã xử lý xong và chắc chắn không dẫn ngược về đường đi hiện tại (nếu có, ta đã phát hiện lúc duyệt ${v}). Bỏ qua – đây là lý do DFS chỉ O(V + E).`, cs());
      }
    }
    color[u] = BLACK;
    yield frame(24, { u, color: colors() }, viz({ [u]: 'done' }), `Mọi môn phụ thuộc ${u} đã BLACK ⇒ tô ${u} màu BLACK.`, cs());
    postorder.push(u);
    yield frame(25, { u, postorder: [...postorder] }, viz({ [u]: 'done' }),
      `Thêm ${u} vào postorder. ${u} hoàn tất SAU tất cả môn phụ thuộc nó ⇒ trong postorder, ${u} đứng sau chúng; đảo ngược lại sẽ cho ${u} đứng trước.`, cs());
    callStack.pop();
    return true;
  }

  for (let u = 0; u < n; u++) {
    const white = color[u] === WHITE;
    yield frame(30, { u, 'color[u]': NAME[color[u]] }, viz(white ? { [u]: 'compare' } : {}),
      white ? `Môn ${u} còn WHITE ⇒ bắt đầu một lượt DFS mới từ ${u}.` : `Môn ${u} đã BLACK (được thăm trong lượt DFS trước) ⇒ bỏ qua.`, cs());
    if (white) {
      const ok: boolean = yield* dfs(u);
      if (!ok) {
        yield frame(30, { u, ok, postorder: [...postorder] }, viz(),
          'Phát hiện chu trình ⇒ không thể học hết các môn (LeetCode 207 trả false). Theo LeetCode 210 trả về [].', cs());
        return [];
      }
    }
  }
  const order = [...postorder].reverse();
  yield frame(32, { order }, composite([viz(), arr(order.length ? order : ['—'], { title: 'Thứ tự học (postorder đảo ngược)' })]),
    n === 0 ? 'Không có môn nào ⇒ thứ tự rỗng.' : `Không có back-edge ⇒ đồ thị là DAG. Đảo postorder: ${order.join(' → ')}. Mọi cạnh b → a đều có b đứng trước a.`, cs());
  return order;
}
