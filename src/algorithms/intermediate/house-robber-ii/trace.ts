import { arr, frame, hlRange } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { nums: number[] }): Generator<Frame, number> {
  const nums = (input.nums ?? []).map(Number);
  const n = nums.length;
  type Phase = { label: string; lo: number; hi: number; excluded: number };
  const viz = (ph: Phase | null, i: number | null, extra: Record<number, Highlight> = {}) => {
    let h: Record<number, Highlight> = {};
    const ranges: { from: number; to: number; label?: string; color?: Highlight }[] = [];
    if (ph) {
      if (ph.hi >= ph.lo) {
        h = hlRange(ph.lo, ph.hi, 'range');
        ranges.push({ from: ph.lo, to: ph.hi, label: ph.label, color: 'range' });
      }
      h[ph.excluded] = 'visited';
    }
    if (i !== null) h[i] = 'active';
    return arr(nums, {
      mode: 'bars',
      title: ph ? `${ph.label} – nhà ${ph.excluded} bị loại (xám)` : 'nums – các nhà xếp thành vòng tròn (nhà đầu kề nhà cuối)',
      highlights: { ...h, ...extra },
      pointers: i !== null ? [{ name: 'i', index: i }] : [],
      ranges,
    });
  };

  if (n === 0) {
    yield frame(10, { n }, viz(null, null), 'Không có nhà ⇒ 0.');
    return 0;
  }
  if (n === 1) {
    yield frame(11, { n, result: nums[0] }, viz(null, null, { 0: 'done' }), 'Chỉ 1 nhà: nó không kề nhà nào khác (vòng tròn 1 phần tử không có cặp kề) ⇒ lấy luôn. Nếu không xử lý riêng, cả hai pha đều là đoạn rỗng và trả sai 0.');
    return nums[0];
  }

  function* robLine(ph: Phase): Generator<Frame, number> {
    let prev2 = 0;
    let prev1 = 0;
    yield frame(15, { lo: ph.lo, hi: ph.hi, prev2, prev1 }, viz(ph, null), `${ph.label}: chạy House Robber tuyến tính trên đoạn [${ph.lo}..${ph.hi}]. Nhà ${ph.excluded} bị loại hẳn nên đoạn này là một dãy thẳng – ràng buộc vòng tròn biến mất. prev2 = prev1 = 0.`, { callStack: [`robCircular`, `robLine(${ph.lo}, ${ph.hi})`] });
    for (let i = ph.lo; i <= ph.hi; i++) {
      const take = prev2 + nums[i];
      const cur = Math.max(prev1, take);
      yield frame(17, { i, 'nums[i]': nums[i], prev2, prev1, take, cur }, viz(ph, i), `Nhà ${i}: BỎ ⇒ giữ prev1 = ${prev1}; LẤY ⇒ prev2 + ${nums[i]} = ${take} (phải bỏ nhà i−1 nên cộng vào prev2). cur = ${cur} ⇒ ${take > prev1 ? 'lấy' : 'bỏ'} nhà ${i}.`, { callStack: [`robCircular`, `robLine(${ph.lo}, ${ph.hi})`] });
      prev2 = prev1;
      prev1 = cur;
      yield frame(19, { i, prev2, prev1 }, viz(ph, i, { [i]: 'swap' }), `Dịch cửa sổ 2 biến: prev2 ← ${prev2}, prev1 ← ${prev1}. Chỉ cần 2 giá trị trước vì công thức chỉ nhìn i−1 và i−2 ⇒ O(1) bộ nhớ.`, { callStack: [`robCircular`, `robLine(${ph.lo}, ${ph.hi})`] });
    }
    yield frame(21, { result: prev1 }, viz(ph, null), `${ph.label} cho ${prev1}.`, { callStack: [`robCircular`, `robLine(${ph.lo}, ${ph.hi})`] });
    return prev1;
  }

  const p1: Phase = { label: 'Pha 1 (bỏ nhà cuối)', lo: 0, hi: n - 2, excluded: n - 1 };
  const p2: Phase = { label: 'Pha 2 (bỏ nhà đầu)', lo: 1, hi: n - 1, excluded: 0 };
  yield frame(23, { n }, viz(p1, null), `Nhà 0 và nhà ${n - 1} kề nhau ⇒ một nghiệm tối ưu luôn thiếu ít nhất một trong hai. Vậy chia 2 trường hợp: loại nhà cuối hoặc loại nhà đầu, mỗi trường hợp là House Robber thẳng.`);
  const skipLast = yield* robLine(p1);
  yield frame(23, { skipLast }, viz(p1, null), `skipLast = ${skipLast}.`);
  yield frame(24, { skipLast }, viz(p2, null), 'Pha 2: loại nhà đầu, xét đoạn 1..n−1.');
  const skipFirst = yield* robLine(p2);
  yield frame(24, { skipLast, skipFirst }, viz(p2, null), `skipFirst = ${skipFirst}.`);
  const res = Math.max(skipLast, skipFirst);
  yield frame(25, { skipLast, skipFirst, result: res }, viz(null, null), `Kết quả = max(${skipLast}, ${skipFirst}) = ${res}. Hai trường hợp phủ mọi nghiệm hợp lệ (không nghiệm nào lấy cả nhà 0 lẫn nhà ${n - 1}), nên max của chúng là tối ưu.`);
  return res;
}
