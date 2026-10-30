import { arr, composite, frame, stack } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { candidates: number[]; target: number }): Generator<Frame, number[][]> {
  const nums = [...input.candidates].sort((a, b) => a - b);
  const target = input.target;
  const result: number[][] = [];
  const path: number[] = [];
  const cs: string[] = ['combinationSum()'];

  const viz = (start: number, extra: Record<number, Highlight> = {}, resHl: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let j = 0; j < Math.min(start, nums.length); j++) h[j] = 'visited';
    return composite([
      arr(nums.length ? nums : ['∅'], {
        title: `nums đã sort (xám = trước start, không được chọn lại để tránh trùng)`,
        highlights: nums.length ? { ...h, ...extra } : {},
        pointers: start < nums.length ? [{ name: 'start', index: start }] : [],
      }),
      stack(path.length ? path : ['∅'], {}, `path (tổng ${path.reduce((s, x) => s + x, 0)}/${target})`),
      arr(result.length ? result.map((s) => `[${s.join(',')}]`) : ['—'], { title: `Kết quả: ${result.length} tổ hợp`, highlights: resHl }),
    ]);
  };
  const v = (start: number, remain: number) => ({ start, remain, path: [...path], count: result.length });

  yield frame(6, { nums: [...nums], target }, viz(0),
    `Sort candidates thành [${nums.join(', ')}]. Lý do: khi duyệt tăng dần, gặp số đầu tiên > remain thì mọi số sau cũng > remain ⇒ có thể break thay vì continue.`, { callStack: [...cs] });

  function* backtrack(start: number, remain: number): Generator<Frame, void> {
    cs.push(`backtrack(${start}, ${remain})`);
    yield frame(10, v(start, remain), viz(start),
      remain === 0
        ? `remain = 0 ⇒ tổng path đúng bằng target ${target}.`
        : `remain = ${remain} > 0 ⇒ cần thêm số. Chỉ xét từ chỉ số start = ${start} trở đi để mỗi tổ hợp chỉ sinh theo một thứ tự (không đếm [2,3,2] và [2,2,3] hai lần).`, { callStack: [...cs] });
    if (remain === 0) {
      result.push([...path]);
      yield frame(11, v(start, remain), viz(start, {}, { [result.length - 1]: 'done' }),
        `Ghi nhận bản sao [${path.join(', ')}] (sao chép vì path còn bị pop/push tiếp). Return để quay lui.`, { callStack: [...cs] });
      cs.pop();
      return;
    }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remain) {
        yield frame(15, { ...v(start, remain), i }, viz(start, { [i]: 'muted' }),
          `nums[${i}] = ${nums[i]} > remain = ${remain} ⇒ cắt tỉa. Mảng đã sort nên các số sau còn lớn hơn ⇒ break cả vòng lặp, không thử tiếp.`, { callStack: [...cs] });
        break;
      }
      path.push(nums[i]);
      yield frame(16, { ...v(start, remain), i }, viz(start, { [i]: 'active' }),
        `Chọn nums[${i}] = ${nums[i]} (≤ remain = ${remain}). Đẩy vào path.`, { callStack: [...cs] });
      yield frame(17, { ...v(start, remain), i }, viz(start, { [i]: 'active' }),
        `Đệ quy backtrack(${i}, ${remain - nums[i]}): truyền i chứ không phải i + 1 vì ${nums[i]} được phép dùng lại nhiều lần.`, { callStack: [...cs] });
      yield* backtrack(i, remain - nums[i]);
      path.pop();
      yield frame(18, { ...v(start, remain), i }, viz(start, { [i]: 'swap' }),
        `Quay lui: bỏ ${nums[i]} khỏi path để thử số lớn hơn ở cùng vị trí.`, { callStack: [...cs] });
    }
    cs.pop();
  }

  yield* backtrack(0, target);
  yield frame(22, { count: result.length }, viz(nums.length),
    `Xong: ${result.length} tổ hợp có tổng ${target}, theo thứ tự DFS (mỗi tổ hợp không giảm).`, { callStack: [...cs] });
  return result;
}
