import { arr, composite, frame, matrix, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, boolean> {
  const nums = input.nums;
  const total = nums.reduce((a, b) => a + b, 0);
  const target = total / 2;
  const memo = new Map<string, boolean>();
  const path: string[] = [];
  let calls = 0;
  let hits = 0;
  const viz = (i: number, rem = -1, mark: Highlight = 'active') => {
    const cols = Math.floor(target) + 1;
    const cells = nums.map((_, r) => Array.from({ length: cols }, (_, c) => (memo.has(`${r},${c}`) ? (memo.get(`${r},${c}`) ? 'T' : 'F') : null)));
    const mh: Record<string, Highlight> = {};
    for (const [k, v] of memo) mh[k] = v ? 'done' : 'visited';
    if (i >= 0 && i < nums.length && rem >= 0 && rem < cols) mh[`${i},${rem}`] = mark;
    return composite([
      arr(nums, { title: 'nums', highlights: i >= 0 && i < nums.length ? { [i]: 'active' } : {}, pointers: i >= 0 && i < nums.length ? [{ name: 'i', index: i }] : [] }),
      matrix(cells, { title: 'memo[i][rem] (hàng = i, cột = rem; T/F = đã giải)', highlights: mh, rowLabels: nums.map((x, r) => `i=${r} (${x})`), colLabels: Array.from({ length: cols }, (_, c) => String(c)) }),
      stack([...path], undefined, 'call stack go(i, rem)'),
    ]);
  };
  yield frame(3, { total }, viz(-1), `Tổng = ${total}, cần tập con tổng total/2.`);
  if (total % 2 !== 0) {
    yield frame(4, { total, result: false }, viz(-1), `Tổng lẻ ⇒ trả false ngay.`);
    return false;
  }
  function* go(i: number, rem: number): Generator<Frame, boolean> {
    calls++;
    if (rem === 0) {
      yield frame(7, { i, rem }, viz(i), `rem = 0 ⇒ đã đủ ${target}. Trả true.`);
      return true;
    }
    if (i === nums.length || rem < 0) {
      yield frame(8, { i, rem }, viz(i), rem < 0 ? `rem = ${rem} < 0 ⇒ vượt quá, false.` : `Hết số mà còn thiếu ${rem} ⇒ false.`);
      return false;
    }
    const key = `${i},${rem}`;
    if (memo.has(key)) {
      hits++;
      yield frame(10, { i, rem, 'memo hit': memo.get(key)!, 'số lần hit': hits }, viz(i, rem, 'compare'), `(${i}, ${rem}) đã giải rồi = ${memo.get(key)} ⇒ trả ngay, cắt cả cây con. Đây là chỗ đệ quy thuần lãng phí: chỉ có n·(S+1) trạng thái khác nhau.`);
      return memo.get(key)!;
    }
    path.push(`go(${i}, ${rem})`);
    yield frame(11, { i, 'nums[i]': nums[i], rem, 'số lời gọi': calls }, viz(i, rem), `Trạng thái mới (${i}, ${rem}): thử lấy ${nums[i]} rồi mới thử bỏ. Kết quả chỉ phụ thuộc (i, rem), không phụ thuộc đã lấy những số nào ⇒ nhớ được.`);
    const res = (yield* go(i + 1, rem - nums[i])) || (yield* go(i + 1, rem));
    memo.set(key, res);
    path.pop();
    yield frame(12, { i, rem, res, 'kích thước memo': memo.size }, viz(i, rem, 'swap'), `Ghi memo[${i}][${rem}] = ${res}. Lần sau gặp lại trạng thái này chỉ tốn O(1).`);
    return res;
  }
  const res = yield* go(0, target);
  yield frame(15, { result: res, 'số lời gọi': calls, 'số lần hit': hits, 'kích thước memo': memo.size }, viz(-1), `Kết quả ${res}. Tối đa n·S trạng thái, mỗi cái O(1) ⇒ O(n·S) – đổi hàm mũ lấy giả đa thức (phụ thuộc giá trị S).`);
  return res;
}
