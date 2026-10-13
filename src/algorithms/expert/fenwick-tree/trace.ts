import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { parseOps, type BITInput } from './node';

export function* trace(input: BITInput): Generator<Frame, number[]> {
  const nums = [...input.nums];
  const n = nums.length;
  const tree: number[] = new Array<number>(n + 1).fill(0);
  const results: number[] = [];
  const lowbit = (i: number) => i & -i;
  const bin = (i: number) => i.toString(2).padStart(Math.max(1, n.toString(2).length), '0');

  const viz = (treeHl: Record<number, Highlight> = {}, numsHl: Record<number, Highlight> = {}, range?: { from: number; to: number; label: string }) =>
    composite([
      arr(tree.map((v, i) => (i === 0 ? '·' : v)), {
        title: 'tree[1..n] – tree[i] = tổng đoạn (i − lowbit(i), i]',
        highlights: { 0: 'muted', ...treeHl },
      }),
      arr(nums, { title: 'nums (0-indexed)', highlights: numsHl, ranges: range ? [{ ...range, color: 'range' }] : [] }),
      ...(results.length ? [arr(results, { title: 'Kết quả các truy vấn sum' })] : []),
    ]);
  const span = (i: number) => ({ from: i - lowbit(i), to: i - 1, label: `tree[${i}] = nums[${i - lowbit(i)}..${i - 1}]` });

  yield frame(11, { n }, viz(), `tree có n + 1 = ${n + 1} ô, bỏ ô 0 (1-indexed để phép i & -i hoạt động). Khởi tạo bằng cách add từng phần tử – O(n log n).`);
  function* add(idx: number, delta: number, cs: string[]): Generator<Frame> {
    for (let i = idx + 1; i <= n; i += lowbit(i)) {
      tree[i] += delta;
      yield frame(17, { idx, delta, i, 'bin(i)': bin(i), 'lowbit(i)': lowbit(i), 'tree[i]': tree[i], next: i + lowbit(i) }, viz({ [i]: 'swap' }, { [idx]: 'active' }, span(i)),
        `tree[${i}] bao đoạn ${span(i).label} nên nhận thêm ${delta}. Lên node cha: i += lowbit = ${i} + ${lowbit(i)} = ${i + lowbit(i)}${i + lowbit(i) > n ? ' > n ⇒ dừng.' : '.'}`, { callStack: cs });
    }
  }
  function* prefixSum(idx: number, cs: string[]): Generator<Frame, number> {
    let sum = 0;
    const used: Record<number, Highlight> = {};
    for (let i = idx + 1; i > 0; i -= lowbit(i)) {
      sum += tree[i];
      used[i] = 'done';
      yield frame(23, { idx, i, 'bin(i)': bin(i), 'lowbit(i)': lowbit(i), 'tree[i]': tree[i], sum, next: i - lowbit(i) }, viz({ ...used, [i]: 'compare' }, {}, span(i)),
        `Gom tree[${i}] (đoạn ${span(i).label}) = ${tree[i]} ⇒ sum = ${sum}. Xoá bit thấp nhất: i = ${i} − ${lowbit(i)} = ${i - lowbit(i)}${i - lowbit(i) === 0 ? ' ⇒ dừng.' : ' (đoạn kề bên trái).'}`, { callStack: cs });
    }
    return sum;
  }

  for (let i = 0; i < n; i++) {
    yield frame(12, { i, 'nums[i]': nums[i] }, viz({}, { [i]: 'active' }), `Build: add(${i}, ${nums[i]}).`, { callStack: ['constructor'] });
    yield* add(i, nums[i], ['constructor', `add(${i}, ${nums[i]})`]);
  }
  yield frame(13, { tree: tree.slice(1) }, viz(Object.fromEntries(tree.map((_, i) => [i, 'done' as Highlight]))), 'Build xong. Mỗi tree[i] là tổng một đoạn có độ dài lowbit(i): ô lẻ phủ 1 phần tử, ô chia hết cho 4 phủ 4, …');

  for (const o of parseOps(input.ops, n)) {
    if (o.op === 'add') {
      nums[o.idx] += o.delta;
      yield frame(16, { idx: o.idx, delta: o.delta }, viz({}, { [o.idx]: 'active' }), `add(${o.idx}, ${o.delta}): mọi tree[i] có đoạn chứa vị trí ${o.idx} đều phải cộng thêm ${o.delta} – có đúng O(log n) ô như vậy.`, { callStack: [`add(${o.idx}, ${o.delta})`] });
      yield* add(o.idx, o.delta, [`add(${o.idx}, ${o.delta})`]);
    } else {
      const cs = [`rangeSum(${o.l}, ${o.r})`];
      yield frame(29, { l: o.l, r: o.r }, viz({}, {}, { from: o.l, to: o.r, label: `[${o.l}, ${o.r}]` }), `rangeSum(${o.l}, ${o.r}) = prefixSum(${o.r}) − prefixSum(${o.l - 1}): hiệu hai tổng tiền tố.`, { callStack: cs });
      const right = yield* prefixSum(o.r, [...cs, `prefixSum(${o.r})`]);
      let left = 0;
      if (o.l > 0) left = yield* prefixSum(o.l - 1, [...cs, `prefixSum(${o.l - 1})`]);
      const res = right - left;
      results.push(res);
      yield frame(29, { 'prefixSum(r)': right, 'prefixSum(l-1)': left, result: res }, viz({}, {}, { from: o.l, to: o.r, label: `sum = ${res}` }), `Tổng [${o.l}, ${o.r}] = ${right} − ${left} = ${res}. Hai lần đi xuống, mỗi lần ≤ log n bước.`, { callStack: cs });
    }
  }
  yield frame(29, { results }, viz(), `Xong ${input.ops.length} thao tác. Fenwick ngắn hơn Segment Tree nhiều, nhưng chỉ cho phép toán có nghịch đảo (cộng/trừ, XOR).`);
  return results;
}
