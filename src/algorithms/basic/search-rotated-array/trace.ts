import { arr, frame, hl } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[]; target: number }): Generator<Frame, number> {
  const nums = [...input.nums];
  const target = input.target;
  const n = nums.length;
  const viz = (
    lo: number,
    hi: number,
    opts: { mid?: number; sorted?: [number, number]; extra?: Record<number, Highlight> } = {},
  ) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < n; k++) if (k < lo || k > hi) h[k] = 'muted';
    if (opts.sorted) for (let k = opts.sorted[0]; k <= opts.sorted[1]; k++) h[k] = 'range';
    const pointers = n ? [{ name: 'lo', index: Math.min(n - 1, lo) }, { name: 'hi', index: Math.max(0, hi) }] : [];
    if (opts.mid !== undefined) pointers.push({ name: 'mid', index: opts.mid });
    const ranges: { from: number; to: number; label?: string; color?: Highlight }[] = [];
    if (opts.sorted) ranges.push({ from: opts.sorted[0], to: opts.sorted[1], label: 'nửa đã sắp xếp', color: 'range' });
    else if (lo <= hi) ranges.push({ from: lo, to: hi, label: `khoảng tìm kiếm (${hi - lo + 1})` });
    return arr(nums, { highlights: { ...h, ...(opts.extra ?? {}) }, pointers, ranges });
  };
  let lo = 0;
  let hi = n - 1;
  yield frame(11, { target, lo, hi }, viz(lo, hi),
    `Khoảng tìm kiếm là cả mảng [0, ${n - 1}]. Mảng bị xoay nên không sắp xếp toàn cục, nhưng bất biến vẫn là: nếu target có trong mảng thì nó nằm trong [lo, hi].`);
  while (lo <= hi) {
    yield frame(12, { target, lo, hi }, viz(lo, hi), `lo=${lo} ≤ hi=${hi} ⇒ khoảng còn phần tử, tiếp tục.`);
    const mid = lo + Math.floor((hi - lo) / 2);
    yield frame(13, { target, lo, hi, mid, 'nums[mid]': nums[mid] }, viz(lo, hi, { mid, extra: hl([mid, 'compare']) }),
      `mid = ${mid}, nums[mid] = ${nums[mid]}.`);
    if (nums[mid] === target) {
      yield frame(14, { target, lo, hi, mid, result: mid }, viz(lo, hi, { mid, extra: hl([mid, 'done']) }),
        `nums[mid] = ${nums[mid]} = target ⇒ tìm thấy tại chỉ số ${mid}.`);
      return mid;
    }
    if (nums[lo] <= nums[mid]) {
      yield frame(15, { target, lo, hi, mid, 'nums[lo]': nums[lo], 'nums[mid]': nums[mid] }, viz(lo, hi, { mid, sorted: [lo, mid], extra: hl([mid, 'compare']) }),
        `nums[lo] = ${nums[lo]} ≤ nums[mid] = ${nums[mid]} ⇒ điểm xoay không nằm trong (lo, mid], nên nửa trái [${lo}, ${mid}] tăng dần (vùng cyan). Chỉ với nửa đã sắp xếp ta mới kiểm tra "target có thuộc khoảng" bằng 2 phép so sánh.`);
      const inLeft = nums[lo] <= target && target < nums[mid];
      yield frame(17, { target, lo, hi, mid, inLeft }, viz(lo, hi, { mid, sorted: [lo, mid], extra: hl([mid, 'compare']) }),
        inLeft
          ? `${nums[lo]} ≤ ${target} < ${nums[mid]} ⇒ target chắc chắn nằm trong nửa trái đã sắp xếp ⇒ bỏ nửa phải, hi = ${mid - 1}.`
          : `target không thuộc [${nums[lo]}, ${nums[mid]}) – vì nửa trái tăng dần nên nó chắc chắn không ở đó ⇒ bỏ nửa trái, lo = ${mid + 1}.`);
      if (inLeft) hi = mid - 1;
      else {
        lo = mid + 1;
        yield frame(18, { target, lo, hi }, viz(lo, hi), `Chuyển sang nửa phải [${lo}, ${hi}] (có thể vẫn chứa điểm xoay – không sao, vòng sau sẽ lại tìm nửa đã sắp xếp).`);
      }
    } else {
      yield frame(19, { target, lo, hi, mid, 'nums[lo]': nums[lo], 'nums[mid]': nums[mid] }, viz(lo, hi, { mid, sorted: [mid, hi], extra: hl([mid, 'compare']) }),
        `nums[lo] = ${nums[lo]} > nums[mid] = ${nums[mid]} ⇒ điểm xoay nằm trong nửa trái, nên nửa phải [${mid}, ${hi}] chắc chắn tăng dần (vùng cyan).`);
      const inRight = nums[mid] < target && target <= nums[hi];
      yield frame(21, { target, lo, hi, mid, inRight }, viz(lo, hi, { mid, sorted: [mid, hi], extra: hl([mid, 'compare']) }),
        inRight
          ? `${nums[mid]} < ${target} ≤ ${nums[hi]} ⇒ target nằm trong nửa phải đã sắp xếp ⇒ bỏ nửa trái, lo = ${mid + 1}.`
          : `target không thuộc (${nums[mid]}, ${nums[hi]}] ⇒ không thể ở nửa phải tăng dần ⇒ bỏ nửa phải, hi = ${mid - 1}.`);
      if (inRight) lo = mid + 1;
      else {
        hi = mid - 1;
        yield frame(22, { target, lo, hi }, viz(lo, hi), `Chuyển sang nửa trái [${lo}, ${hi}] – nửa này chứa điểm xoay, vòng sau sẽ tách tiếp.`);
      }
    }
  }
  yield frame(25, { target, lo, hi, result: -1 }, viz(lo, hi),
    'lo > hi: khoảng tìm kiếm rỗng. Mỗi vòng loại ít nhất một nửa nên chỉ cần O(log n) bước ⇒ target không có trong mảng, trả về -1.');
  return -1;
}
