import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { toItems, type KInput } from './node';

export function* trace(input: KInput): Generator<Frame, number> {
  const items = toItems(input);
  const capacity = Math.max(0, Math.min(12, Math.floor(input.capacity)));
  const n = items.length;
  const dp: (number | null)[][] = Array.from({ length: n + 1 }, () => new Array<number | null>(capacity + 1).fill(null));
  const rowLabels = ['∅', ...items.map((it, i) => `#${i + 1} w${it.weight} v${it.value}`)];
  const colLabels = Array.from({ length: capacity + 1 }, (_, w) => String(w));
  const viz = (hl: Record<string, Highlight> = {}, itemHl: Record<number, Highlight> = {}) =>
    composite([
      composite([arr(items.map((it) => it.weight), { title: 'weight', highlights: itemHl }), arr(items.map((it) => it.value), { title: 'value', highlights: itemHl })], 'row'),
      matrix(dp, { title: `dp[i][w] = giá trị lớn nhất với i món đầu, sức chứa w (capacity = ${capacity})`, rowLabels, colLabels, highlights: hl }),
    ]);
  for (let w = 0; w <= capacity; w++) dp[0][w] = 0;
  yield frame(12, { n, capacity }, viz(Object.fromEntries(colLabels.map((_, w) => [`0,${w}`, 'done']))), 'Hàng 0: không có món nào ⇒ giá trị 0 với mọi sức chứa. Mỗi hàng tiếp theo chỉ phụ thuộc hàng ngay trên.');
  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    yield frame(14, { i, weight, value }, viz({}, { [i - 1]: 'active' }), `Xét món #${i} (w = ${weight}, v = ${value}). Với mỗi sức chứa w, quyết định: KHÔNG lấy (giữ dp[${i - 1}][w]) hay LẤY (v + dp[${i - 1}][w − ${weight}]).`);
    for (let w = 0; w <= capacity; w++) {
      const skip = dp[i - 1][w]!;
      dp[i][w] = skip;
      if (weight <= w) {
        const take = dp[i - 1][w - weight]! + value;
        const better = take > skip;
        yield frame(18, { i, w, skip, take, 'dp[i][w]': Math.max(skip, take) }, viz({ [`${i},${w}`]: 'active', [`${i - 1},${w}`]: 'compare', [`${i - 1},${w - weight}`]: 'range' }, { [i - 1]: 'active' }), `w = ${w}: không lấy = ${skip} (ô vàng phía trên); lấy = ${value} + dp[${i - 1}][${w - weight}] = ${value} + ${dp[i - 1][w - weight]} = ${take} (ô cyan). ${better ? 'Lấy tốt hơn.' : 'Không lấy tốt hơn (hoặc bằng).'}`);
        dp[i][w] = Math.max(skip, take);
      } else {
        yield frame(16, { i, w, weight, 'dp[i][w]': skip }, viz({ [`${i},${w}`]: 'muted', [`${i - 1},${w}`]: 'compare' }, { [i - 1]: 'active' }), `w = ${w} < ${weight}: món không vừa ⇒ chép dp[${i - 1}][${w}] = ${skip}.`);
      }
    }
  }
  // truy vết
  const chosen: Record<number, Highlight> = {};
  let w = capacity;
  for (let i = n; i >= 1; i--) {
    if (dp[i][w] !== dp[i - 1][w]) { chosen[i - 1] = 'done'; w -= items[i - 1].weight; }
  }
  const result = dp[n][capacity]!;
  yield frame(22, { result, chosenItems: Object.keys(chosen).map((k) => `#${Number(k) + 1}`) }, viz({ [`${n},${capacity}`]: 'done' }, chosen), `Kết quả dp[${n}][${capacity}] = ${result}. Truy vết từ góc dưới phải: ô khác ô phía trên ⇒ món đó được lấy (màu xanh).`);
  return result;
}
