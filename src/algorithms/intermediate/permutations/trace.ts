import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number[][]> {
  const nums = input.nums;
  const n = nums.length;
  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array<boolean>(n).fill(false);
  const cs: string[] = ['permute()'];

  const viz = (extra: Record<number, Highlight> = {}, resHl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    used.forEach((u, i) => {
      if (u) h[i] = 'visited';
    });
    return composite([
      arr(n ? nums : ['∅'], { title: 'nums (xám = đã dùng trong path, tím = đang xét)', highlights: n ? { ...h, ...extra } : {} }),
      stack(path.length ? path : ['∅'], {}, `path (${path.length}/${n} vị trí đã điền)`),
      arr(result.length ? result.map((s) => `[${s.join(',')}]`) : ['—'], { title: `Kết quả: ${result.length} hoán vị`, highlights: resHl }),
    ]);
  };
  const v = () => ({ path: [...path], used: [...used], count: result.length });

  yield frame(9, { n, used: [...used] }, viz(),
    `Mảng used[] dài ${n}, ban đầu toàn false. Khác Subsets (dùng start), hoán vị cho phép phần tử đứng trước xuất hiện ở vị trí sau, nên cần đánh dấu "đã dùng" thay vì chỉ nhìn về phía trước.`, { callStack: [...cs] });

  function* backtrack(): Generator<Frame, void> {
    cs.push(`backtrack([${path.join(',')}])`);
    yield frame(11, v(), viz(),
      path.length === n
        ? `path đủ ${n} phần tử ⇒ đây là một lá của cây đệ quy.`
        : `path có ${path.length}/${n} phần tử, chưa đủ ⇒ thử điền vị trí ${path.length}.`, { callStack: [...cs] });
    if (path.length === n) {
      result.push([...path]);
      yield frame(12, v(), viz({}, { [result.length - 1]: 'done' }),
        `Ghi nhận bản sao [${path.join(', ')}] (sao chép vì path sẽ còn bị pop/push tiếp). Return để quay lui.`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) {
        yield frame(16, { ...v(), i }, viz({ [i]: 'muted' }),
          `nums[${i}] = ${nums[i]} đã có trong path ⇒ bỏ qua; mỗi phần tử chỉ xuất hiện đúng một lần trong hoán vị.`, { callStack: [...cs] });
        continue;
      }
      used[i] = true;
      path.push(nums[i]);
      yield frame(18, { ...v(), i }, viz({ [i]: 'active' }),
        `Chọn nums[${i}] = ${nums[i]} cho vị trí ${path.length - 1}, đánh dấu used[${i}] = true rồi đệ quy điền vị trí kế tiếp.`, { callStack: [...cs] });
      yield* backtrack();
      path.pop();
      used[i] = false;
      yield frame(21, { ...v(), i }, viz({ [i]: 'swap' }),
        `Quay lui: bỏ ${nums[i]} khỏi path và đặt used[${i}] = false để các nhánh khác (thứ tự khác) còn dùng được ${nums[i]}.`, { callStack: [...cs] });
    }
    cs.pop();
  }

  yield* backtrack();
  yield frame(25, { count: result.length }, viz(),
    `Xong: ${result.length} = ${n}! hoán vị, sinh theo thứ tự DFS (thứ tự từ điển theo chỉ số).`, { callStack: [...cs] });
  return result;
}
