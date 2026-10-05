import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, TreeVisual } from '@/engine/types';
import { parseOps, type STInput } from './node';

export function* trace(input: STInput): Generator<Frame, number[]> {
  const nums = [...input.nums];
  const n = nums.length;
  const tree: (number | null)[] = new Array(4 * Math.max(1, n)).fill(null);
  const range = new Map<number, [number, number]>();
  const results: number[] = [];
  const cs: string[] = [];
  const treeViz = (hl: Record<string, Highlight> = {}): TreeVisual => {
    const nodes: TreeVisual['nodes'] = [];
    const build = (node: number): string | null => {
      if (!range.has(node)) return null;
      const [lo, hi] = range.get(node)!;
      const children: string[] = [];
      if (lo !== hi) { const l = build(2 * node + 1), r = build(2 * node + 2); if (l) children.push(l); if (r) children.push(r); }
      nodes.push({ id: String(node), label: tree[node] === null ? '?' : String(tree[node]), children });
      return String(node);
    };
    const rootId = n ? build(0) : null;
    const marks: Record<string, string> = {};
    for (const [node, [lo, hi]] of range) marks[String(node)] = lo === hi ? `[${lo}]` : `[${lo}..${hi}]`;
    return { kind: 'tree', title: 'Segment tree: mỗi node = tổng đoạn [lo..hi]', nodes, rootId, highlights: hl, marks };
  };
  const viz = (hl: Record<string, Highlight> = {}, arrHl: Record<number, Highlight> = {}) =>
    composite([treeViz(hl), composite([arr(nums, { title: 'nums', highlights: arrHl }), arr(results.length ? results : ['—'], { title: 'Kết quả query' })], 'row')]);

  function* build(node: number, lo: number, hi: number): Generator<Frame, void> {
    cs.push(`build(${node}, ${lo}, ${hi})`);
    range.set(node, [lo, hi]);
    if (lo === hi) {
      tree[node] = nums[lo];
      yield frame(17, { node, lo, value: nums[lo] }, viz({ [String(node)]: 'done' }, { [lo]: 'active' }), `Lá: node ${node} quản lý [${lo}] = ${nums[lo]}.`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    const mid = (lo + hi) >> 1;
    yield frame(20, { node, lo, hi, mid }, viz({ [String(node)]: 'active' }), `Node ${node} quản lý [${lo}..${hi}] ⇒ chia đôi tại mid = ${mid}: con trái [${lo}..${mid}], con phải [${mid + 1}..${hi}].`, { callStack: [...cs] });
    yield* build(2 * node + 1, lo, mid);
    yield* build(2 * node + 2, mid + 1, hi);
    tree[node] = (tree[2 * node + 1] as number) + (tree[2 * node + 2] as number);
    yield frame(23, { node, left: tree[2 * node + 1], right: tree[2 * node + 2], sum: tree[node] }, viz({ [String(node)]: 'swap', [String(2 * node + 1)]: 'compare', [String(2 * node + 2)]: 'compare' }), `tree[${node}] = ${tree[2 * node + 1]} + ${tree[2 * node + 2]} = ${tree[node]}.`, { callStack: [...cs] });
    cs.pop();
  }
  function* update(node: number, lo: number, hi: number, idx: number, val: number): Generator<Frame, void> {
    cs.push(`update(${node}, ${lo}..${hi})`);
    if (lo === hi) {
      tree[node] = val;
      nums[idx] = val;
      yield frame(33, { node, idx, val }, viz({ [String(node)]: 'swap' }, { [idx]: 'swap' }), `Lá [${idx}] = ${val}.`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    const mid = (lo + hi) >> 1;
    yield frame(37, { node, lo, hi, mid, idx }, viz({ [String(node)]: 'active' }), `idx ${idx} ${idx <= mid ? '≤' : '>'} mid ${mid} ⇒ đi ${idx <= mid ? 'trái' : 'phải'}. Chỉ một nhánh bị ảnh hưởng ⇒ O(log n).`, { callStack: [...cs] });
    if (idx <= mid) yield* update(2 * node + 1, lo, mid, idx, val);
    else yield* update(2 * node + 2, mid + 1, hi, idx, val);
    tree[node] = (tree[2 * node + 1] as number) + (tree[2 * node + 2] as number);
    yield frame(39, { node, sum: tree[node] }, viz({ [String(node)]: 'swap' }), `Tính lại tree[${node}] = ${tree[node]} trên đường lên.`, { callStack: [...cs] });
    cs.pop();
  }
  function* query(node: number, lo: number, hi: number, l: number, r: number): Generator<Frame, number> {
    cs.push(`query(${node}, ${lo}..${hi})`);
    if (r < lo || hi < l) {
      yield frame(48, { node, lo, hi, l, r }, viz({ [String(node)]: 'muted' }), `[${lo}..${hi}] không giao [${l}..${r}] ⇒ đóng góp 0.`, { callStack: [...cs] });
      cs.pop();
      return 0;
    }
    if (l <= lo && hi <= r) {
      yield frame(49, { node, lo, hi, value: tree[node] }, viz({ [String(node)]: 'done' }), `[${lo}..${hi}] nằm trọn trong [${l}..${r}] ⇒ lấy ngay tree[${node}] = ${tree[node]}, không xuống sâu hơn.`, { callStack: [...cs] });
      cs.pop();
      return tree[node] as number;
    }
    const mid = (lo + hi) >> 1;
    yield frame(51, { node, lo, hi, mid, l, r }, viz({ [String(node)]: 'compare' }), `[${lo}..${hi}] giao một phần ⇒ hỏi cả hai con.`, { callStack: [...cs] });
    const a = yield* query(2 * node + 1, lo, mid, l, r);
    const b = yield* query(2 * node + 2, mid + 1, hi, l, r);
    yield frame(51, { node, left: a, right: b, sum: a + b }, viz({ [String(node)]: 'compare' }), `Node ${node}: ${a} + ${b} = ${a + b}.`, { callStack: [...cs] });
    cs.pop();
    return a + b;
  }

  if (n === 0) {
    yield frame(12, { n }, viz(), 'Mảng rỗng.');
    return [];
  }
  yield frame(12, { n }, viz(), `Xây cây cho ${n} phần tử: mỗi node lưu tổng một đoạn; gốc = tổng cả mảng; lá = từng phần tử. Mảng tree kích thước 4n là đủ.`);
  cs.push('constructor');
  yield* build(0, 0, n - 1);
  cs.pop();
  yield frame(12, { root: tree[0] }, viz({ '0': 'done' }), `Xây xong O(n). Giờ query và update đều O(log n).`);
  for (const o of parseOps(input.ops, n)) {
    if (o.op === 'query') {
      const hlArr: Record<number, Highlight> = {};
      for (let k = o.l; k <= o.r; k++) hlArr[k] = 'range';
      yield frame(44, { l: o.l, r: o.r }, viz({}, hlArr), `query(${o.l}, ${o.r}): đi từ gốc, chỉ xuống các node giao với đoạn; node nằm trọn thì lấy ngay.`, { callStack: ['query'] });
      cs.push('query');
      const s = yield* query(0, 0, n - 1, o.l, o.r);
      cs.pop();
      results.push(s);
      yield frame(44, { l: o.l, r: o.r, sum: s }, viz({}, hlArr), `Tổng [${o.l}..${o.r}] = ${s}. Số node thăm ≤ 4·log n.`);
    } else {
      yield frame(28, { idx: o.idx, val: o.val }, viz({}, { [o.idx]: 'active' }), `update(${o.idx}, ${o.val}): đi theo một đường từ gốc tới lá, rồi tính lại tổng trên đường về.`, { callStack: ['update'] });
      cs.push('update');
      yield* update(0, 0, n - 1, o.idx, o.val);
      cs.pop();
    }
  }
  yield frame(44, { results: [...results] }, viz(), `Xong. Prefix sum cho query O(1) nhưng update O(n); segment tree cân bằng cả hai ở O(log n).`);
  return results;
}
