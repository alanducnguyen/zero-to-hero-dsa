import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight, Pointer } from '@/engine/types';

export function* trace(input: { gas: number[]; cost: number[] }): Generator<Frame, number> {
  const gas = [...input.gas];
  const cost = [...input.cost];
  const n = gas.length;
  const diffs: (number | string)[] = new Array(n).fill('?');

  // muted = trạm đã bị loại; range (cyan) = đoạn [start, i) đang thử; active = i; pointer = start
  const view = (start: number, i: number | null, extra: Record<number, Highlight> = {}) => {
    const h: Record<number, Highlight> = {};
    for (let k = 0; k < Math.min(start, n); k++) h[k] = 'muted';
    if (i !== null) for (let k = start; k < i && k < n; k++) h[k] = 'range';
    if (start < n) h[start] = 'pointer';
    if (i !== null && i < n) h[i] = 'active';
    const hs = { ...h, ...extra };
    const ptrs: Pointer[] = [];
    if (i !== null && i < n) ptrs.push({ name: 'i', index: i });
    if (start < n) ptrs.push({ name: 'start', index: start });
    return composite([
      arr(gas, { title: 'gas[i] – xăng nhận ở trạm i', mode: 'cells', highlights: hs, pointers: ptrs }),
      arr(cost, { title: 'cost[i] – xăng để đi i → i+1', mode: 'cells', highlights: hs }),
      arr(diffs, { title: 'diff = gas − cost', mode: 'cells', highlights: hs }),
    ]);
  };

  let total = 0;
  let tank = 0;
  let start = 0;
  yield frame(11, { total, tank, start, n }, view(start, null),
    'Khởi tạo: total đo "cả vòng có đủ xăng không", tank đo "xăng còn lại khi xuất phát từ start". Thử start = 0 trước.');
  for (let i = 0; i < n; i++) {
    yield frame(12, { i, start, tank, total }, view(start, i), `Xét trạm i = ${i}. Đoạn đang thử là [start=${start} … ${i}].`);
    const diff = gas[i] - cost[i];
    diffs[i] = diff;
    yield frame(13, { i, 'gas[i]': gas[i], 'cost[i]': cost[i], diff }, view(start, i),
      `diff = ${gas[i]} − ${cost[i]} = ${diff}: ${diff >= 0 ? 'trạm này "dư" xăng' : 'trạm này "lỗ" xăng'} – đi qua trạm i chỉ làm tank thay đổi đúng một lượng diff.`);
    total += diff;
    yield frame(14, { i, diff, total }, view(start, i),
      `total = ${total}. total chỉ dùng ở cuối: nếu tổng cả vòng < 0 thì không trạm nào đi trọn vòng được.`);
    tank += diff;
    yield frame(15, { i, diff, tank, start }, view(start, i),
      `tank = ${tank}: lượng xăng khi tới trạm ${i + 1 < n ? i + 1 : 0} nếu xuất phát ở ${start}.`);
    yield frame(16, { i, tank, start }, view(start, i, tank < 0 ? { [i]: 'swap' } : {}),
      tank < 0
        ? `tank = ${tank} < 0 ⇒ từ ${start} không tới nổi trạm ${i + 1}.`
        : `tank = ${tank} ≥ 0 ⇒ vẫn đi tiếp được, giữ start = ${start}.`);
    if (tank < 0) {
      const old = start;
      start = i + 1;
      yield frame(18, { i, oldStart: old, start, tank }, view(start, null),
        `Bỏ luôn cả đoạn [${old}, ${i}] chứ không chỉ trạm ${old}. Vì sao? Với mọi k trong (${old}, ${i}], ta tới k từ ${old} với tank ≥ 0 (nếu không đã reset sớm hơn). Xuất phát thẳng từ k nghĩa là bắt đầu với 0 ≤ tank đó, nên còn tệ hơn – mà ngay cả có thêm phần dư ấy vẫn hụt ở ${i}. Vậy start mới = ${start}.`);
      tank = 0;
      yield frame(19, { i, start, tank }, view(start, null), 'Đổ hết bình (tank = 0) để bắt đầu lại từ start mới.');
    }
  }
  const result = total < 0 ? -1 : start;
  const done: Record<number, Highlight> = {};
  if (result >= 0) for (let k = 0; k < n; k++) done[k] = 'done';
  yield frame(22, { total, start, result }, view(start, null, done),
    total < 0
      ? `total = ${total} < 0: tổng xăng ít hơn tổng chi phí ⇒ không có lời giải, trả về -1.`
      : `total = ${total} ≥ 0 ⇒ chắc chắn có lời giải, và nó phải là start = ${start}: mọi trạm trước đó đã bị loại có chứng minh, còn từ ${start} tới cuối mảng tank không âm; phần dư total bù đủ cho đoạn [0, ${start}) ở vòng sau.`);
  return result;
}
