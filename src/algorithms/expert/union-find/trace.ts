import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, GraphVisual, Highlight } from '@/engine/types';
import { parseOps, type UFInput } from './node';

export function* trace(input: UFInput): Generator<Frame, { parent: number[]; count: number; results: string[] }> {
  const n = Math.max(1, Math.min(12, Math.floor(input.n)));
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array<number>(n).fill(0);
  let count = n;
  const results: string[] = [];
  const stack: string[] = [];
  const cs = () => [...stack];
  // vị trí node: xếp theo lưới để cây dễ nhìn
  const cols = Math.min(n, 6);
  const pos = (i: number) => ({ x: 50 + (i % cols) * 80, y: 40 + Math.floor(i / cols) * 90 });
  const viz = (hl: Record<string, Highlight> = {}, edgeHl: Record<string, Highlight> = {}, arrHl: Record<number, Highlight> = {}) => {
    const g: GraphVisual = {
      kind: 'graph',
      title: 'Rừng cây: mũi tên con → cha (gốc trỏ vào chính nó, không vẽ)',
      nodes: Array.from({ length: n }, (_, i) => ({ id: String(i), ...pos(i) })),
      edges: Array.from({ length: n }, (_, i) => i).filter((i) => parent[i] !== i).map((i) => ({ from: String(i), to: String(parent[i]), directed: true })),
      highlights: hl,
      edgeHighlights: edgeHl,
      marks: Object.fromEntries(Array.from({ length: n }, (_, i) => [String(i), parent[i] === i ? `gốc r=${rank[i]}` : ''])),
    };
    return composite([
      g,
      composite([
        arr(parent, { title: 'parent[]', highlights: arrHl }),
        arr(rank, { title: 'rank[]' }),
      ], 'row'),
      mapViz(Object.fromEntries(results.map((r, k) => { const [op, val] = r.split(' = '); return [`#${k + 1} ${op}`, val]; })), undefined, `Kết quả (số nhóm hiện tại: ${count})`),
    ]);
  };

  function* find(x: number): Generator<Frame, number> {
    stack.push(`find(${x})`);
    yield frame(18, { x, 'parent[x]': parent[x] }, viz({ [String(x)]: 'active' }, {}, { [x]: 'compare' }), parent[x] === x ? `find(${x}): parent[${x}] = ${x} ⇒ ${x} là gốc.` : `find(${x}): parent[${x}] = ${parent[x]} ≠ ${x} ⇒ chưa phải gốc, đi tiếp lên cha.`, { callStack: cs() });
    if (parent[x] !== x) {
      const root = yield* find(parent[x]);
      const old = parent[x];
      parent[x] = root;
      yield frame(19, { x, root, oldParent: old }, viz({ [String(x)]: 'swap', [String(root)]: 'done' }, { [`${x}->${root}`]: 'swap' }, { [x]: 'swap' }), old === root ? `Path compression: parent[${x}] đã trỏ thẳng gốc ${root}, không đổi.` : `Path compression: nối thẳng ${x} → gốc ${root} (bỏ qua ${old}). Lần find sau chỉ tốn 1 bước.`, { callStack: cs() });
    }
    stack.pop();
    return parent[x];
  }

  yield frame(11, { n, parent: [...parent] }, viz(), `Khởi tạo: ${n} phần tử, mỗi phần tử là gốc của nhóm riêng (parent[i] = i, rank = 0). count = ${n}.`);
  for (const op of parseOps(n, input.ops)) {
    if (op.kind === 'union') {
      stack.push(`union(${op.a},${op.b})`);
      yield frame(25, { a: op.a, b: op.b }, viz({ [String(op.a)]: 'compare', [String(op.b)]: 'compare' }), `union(${op.a}, ${op.b}): tìm gốc của mỗi bên.`, { callStack: cs() });
      let ra = yield* find(op.a);
      let rb = yield* find(op.b);
      if (ra === rb) {
        yield frame(28, { a: op.a, b: op.b, ra, rb, result: false }, viz({ [String(ra)]: 'done', [String(op.a)]: 'muted', [String(op.b)]: 'muted' }), `Cùng gốc ${ra} ⇒ ${op.a} và ${op.b} đã cùng nhóm. Trả về false (nếu đây là cạnh đồ thị thì nó tạo chu trình).`, { callStack: cs() });
        results.push(`union(${op.a},${op.b}) = false`);
        stack.pop();
        continue;
      }
      yield frame(29, { ra, rb, 'rank[ra]': rank[ra], 'rank[rb]': rank[rb] }, viz({ [String(ra)]: 'compare', [String(rb)]: 'compare' }), `Gốc khác nhau: ${ra} (rank ${rank[ra]}) và ${rb} (rank ${rank[rb]}). Union by rank: treo cây THẤP dưới cây CAO để chiều cao không tăng.${rank[ra] < rank[rb] ? ` rank[${ra}] < rank[${rb}] ⇒ đổi vai.` : ''}`, { callStack: cs() });
      if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
      parent[rb] = ra;
      count--;
      yield frame(30, { ra, rb, count }, viz({ [String(rb)]: 'swap', [String(ra)]: 'done' }, { [`${rb}->${ra}`]: 'swap' }, { [rb]: 'swap' }), `parent[${rb}] = ${ra}. Hai nhóm thành một, count = ${count}.`, { callStack: cs() });
      if (rank[ra] === rank[rb]) {
        rank[ra]++;
        yield frame(31, { ra, 'rank[ra]': rank[ra] }, viz({ [String(ra)]: 'done' }), `Hai cây cùng rank ⇒ cây gộp cao thêm 1: rank[${ra}] = ${rank[ra]}.`, { callStack: cs() });
      }
      results.push(`union(${op.a},${op.b}) = true`);
      stack.pop();
    } else {
      stack.push(`connected(${op.a},${op.b})`);
      yield frame(37, { a: op.a, b: op.b }, viz({ [String(op.a)]: 'compare', [String(op.b)]: 'compare' }), `connected(${op.a}, ${op.b}): so sánh gốc của hai bên.`, { callStack: cs() });
      const ra = yield* find(op.a);
      const rb = yield* find(op.b);
      const ok = ra === rb;
      results.push(`connected(${op.a},${op.b}) = ${ok}`);
      yield frame(37, { a: op.a, b: op.b, ra, rb, result: ok }, viz({ [String(ra)]: ok ? 'done' : 'swap', [String(rb)]: ok ? 'done' : 'swap' }), ok ? `Cùng gốc ${ra} ⇒ cùng nhóm.` : `Gốc khác nhau (${ra} ≠ ${rb}) ⇒ khác nhóm.`, { callStack: cs() });
      stack.pop();
    }
  }
  yield frame(38, { parent: [...parent], count }, viz(), `Xong. Còn ${count} nhóm. Nhờ path compression, hầu hết node trỏ thẳng về gốc.`);
  return { parent: [...parent], count, results };
}
