import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const nums = input.nums;
  const result: number[][] = [];
  const path: number[] = [];
  const cs: string[] = ['subsets()'];
  const viz = (start: number, hl: Record<number, Highlight> = {}) => {
    const chosen: Record<number, Highlight> = {};
    nums.forEach((_, i) => { if (i < start) chosen[i] = path.includes(nums[i]) ? 'done' : 'visited'; });
    return composite([
      arr(nums, { title: 'nums (xanh = đang chọn, xám = đã bỏ qua, chỉ xét từ start trở đi)', highlights: { ...chosen, ...hl }, pointers: start < nums.length ? [{ name: 'start', index: start }] : [] }),
      stack(path.length ? path : ['∅'], {}, 'path (tập con đang xây)'),
      arr(result.length ? result.map((s) => `[${s.join(',')}]`) : ['—'], { title: `Kết quả: ${result.length} tập con` }),
    ]);
  };

  function* backtrack(start: number): Generator<Frame, void> {
    cs.push(`backtrack(${start})`);
    result.push([...path]);
    yield frame(10, { start, path: [...path], count: result.length }, viz(start), `Ghi nhận path = [${path.join(', ')}] là một tập con. Mọi trạng thái trên cây đệ quy đều hợp lệ nên không cần điều kiện "đủ" – khác với Permutations.`, { callStack: [...cs] });
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      yield frame(12, { start, i, 'nums[i]': nums[i], path: [...path] }, viz(i + 1, { [i]: 'active' }), `Chọn nums[${i}] = ${nums[i]}. Đệ quy với start = ${i + 1}: chỉ xét phần tử phía sau để mỗi tập con sinh đúng một lần.`, { callStack: [...cs] });
      yield* backtrack(i + 1);
      path.pop();
      yield frame(14, { start, i, path: [...path] }, viz(start, { [i]: 'swap' }), `Bỏ chọn ${nums[i]} (quay lui) để thử phần tử kế tiếp ở cùng tầng.`, { callStack: [...cs] });
    }
    cs.pop();
  }
  yield frame(17, { n: nums.length, 'số tập con': 2 ** nums.length }, viz(0), `n = ${nums.length} ⇒ sẽ có 2^${nums.length} = ${2 ** nums.length} tập con. Bắt đầu backtrack(0) với path rỗng.`, { callStack: [...cs] });
  yield* backtrack(0);
  yield frame(18, { count: result.length }, viz(nums.length), `Xong: ${result.length} tập con, mỗi tập được sinh đúng một lần theo thứ tự DFS.`, { callStack: [...cs] });
  return result;
}
