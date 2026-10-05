import { arr, composite, frame, hl, hlRange, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import type { PrefixInput } from './node';

export function* trace(input: PrefixInput): Generator<Frame, { prefix: number[]; rangeSum: number; countSubarraysSumK: number }> {
  const nums = input.nums;
  const n = nums.length;
  const l = Math.max(0, Math.min(n - 1, Math.floor(input.l)));
  const r = Math.max(l, Math.min(n - 1, Math.floor(input.r)));
  const k = input.k;
  const prefix: (number | string)[] = new Array(n + 1).fill('·');
  prefix[0] = 0;
  const pLabels = (hlp: Record<number, Highlight> = {}) => arr(prefix, { title: 'prefix[i] = tổng i phần tử đầu', highlights: hlp });
  const viz = (numsHl: Record<number, Highlight> = {}, pHl: Record<number, Highlight> = {}, extra?: ReturnType<typeof mapViz>) =>
    composite(extra ? [arr(nums, { title: 'nums', highlights: numsHl }), pLabels(pHl), extra] : [arr(nums, { title: 'nums', highlights: numsHl }), pLabels(pHl)]);

  yield frame(6, { n }, viz({}, hl([0, 'done'])), 'prefix có n+1 phần tử, prefix[0] = 0 (tổng của 0 phần tử). Quy ước này giúp công thức tổng đoạn không có trường hợp đặc biệt.');
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = (prefix[i] as number) + nums[i];
    yield frame(8, { i, 'nums[i]': nums[i], 'prefix[i]': prefix[i], 'prefix[i+1]': prefix[i + 1] }, viz({ ...hlRange(0, i - 1, 'visited'), [i]: 'active' }, hl([i, 'compare'], [i + 1, 'swap'])), `prefix[${i + 1}] = prefix[${i}] + nums[${i}] = ${prefix[i]} + ${nums[i]} = ${prefix[i + 1]}.`);
  }
  const pre = prefix as number[];
  yield frame(10, { prefix: [...pre] }, viz({}, hlRange(0, n, 'done')), 'Tiền xử lý xong O(n). Từ giờ mọi truy vấn tổng đoạn là O(1).');
  let rs = 0;
  if (n > 0) {
    rs = pre[r + 1] - pre[l];
    yield frame(15, { l, r, 'prefix[r+1]': pre[r + 1], 'prefix[l]': pre[l], sum: rs }, viz(hlRange(l, r, 'range'), hl([r + 1, 'compare'], [l, 'compare'])), `rangeSum(${l}, ${r}) = prefix[${r + 1}] − prefix[${l}] = ${pre[r + 1]} − ${pre[l]} = ${rs}. Tổng ${r - l + 1} phần tử trong O(1), không cần cộng lại.`);
  }
  // subarray sum equals k
  const seen = new Map<number, number>([[0, 1]]);
  let run = 0;
  let count = 0;
  const cs = ['subarraySumEqualsK()'];
  yield frame(20, { k, seen: { 0: 1 } }, viz({}, {}, mapViz(seen, undefined, 'seen: prefix → số lần gặp')), `Bonus: đếm subarray có tổng = ${k}. Subarray [l..r] có tổng k ⇔ prefix[r+1] − prefix[l] = k ⇔ prefix[l] = prefix[r+1] − k. Khởi tạo seen[0] = 1 cho đoạn rỗng.`, { callStack: cs });
  for (let i = 0; i < n; i++) {
    run += nums[i];
    const need = run - k;
    const hit = seen.get(need) ?? 0;
    yield frame(25, { i, prefix: run, need, 'seen[need]': hit, count: count + hit }, viz({ ...hlRange(0, i - 1, 'visited'), [i]: 'active' }, hl([i + 1, 'compare']), mapViz(seen, hit ? { [String(need)]: 'compare' } : undefined, 'seen: prefix → số lần gặp')), `prefix = ${run}; cần prefix cũ = ${run} − ${k} = ${need}: đã gặp ${hit} lần ⇒ có ${hit} subarray kết thúc tại ${i} với tổng ${k}.`, { callStack: cs });
    count += hit;
    seen.set(run, (seen.get(run) ?? 0) + 1);
    yield frame(26, { i, prefix: run, count }, viz({ ...hlRange(0, i, 'visited') }, hl([i + 1, 'swap']), mapViz(seen, { [String(run)]: 'swap' }, 'seen: prefix → số lần gặp')), `Ghi seen[${run}]++. count = ${count}.`, { callStack: cs });
  }
  yield frame(28, { rangeSum: rs, countSubarraysSumK: count }, viz({}, hlRange(0, n, 'done')), `Kết quả: rangeSum(${l},${r}) = ${rs}; số subarray tổng ${k} = ${count}. Cả hai đều O(n) tổng cộng nhờ prefix sum.`);
  return { prefix: [...pre], rangeSum: rs, countSubarraysSumK: count };
}
