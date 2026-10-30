import { arr, composite, frame } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { clampCapacity, parseOps, type LRUInput } from '../../ops';

export function* trace(input: LRUInput): Generator<Frame, (number | null)[]> {
  const capacity = clampCapacity(input.capacity);
  const items: { key: number; value: number; used: number }[] = [];
  const out: (number | null)[] = [];
  const log: string[] = [];
  let clock = 0;
  const viz = (hl: Record<number, Highlight> = {}) => composite([
    arr(items.length ? items.map((e) => `${e.key}:${e.value} @${e.used}`) : ['∅'], { title: `items (key:value @lần dùng cuối) · capacity = ${capacity}`, highlights: items.length ? hl : {} }),
    arr(log.length ? log : ['—'], { title: 'Kết quả' }),
  ]);
  yield frame(7, { capacity, clock }, viz(), 'Mảng thường + đồng hồ logic. Mỗi entry nhớ "lần dùng cuối"; muốn biết ai cũ nhất thì phải quét – đó là cái giá của cách ngây thơ này.');
  for (const o of parseOps(input.ops)) {
    const i = items.findIndex((e) => e.key === o.key);
    const label = o.op === 'get' ? `get(${o.key})` : `put(${o.key}, ${o.value})`;
    yield frame(9, { op: label, i, n: items.length }, viz(i === -1 ? {} : { [i]: 'compare' }), `${label}: findIndex quét tuần tự ${items.length} phần tử để tìm key ⇒ O(n). ${i === -1 ? 'Không thấy.' : `Thấy ở vị trí ${i}.`}`);
    if (o.op === 'get') {
      if (i === -1) { out.push(-1); log.push(`get ${o.key} → -1`); yield frame(11, { result: -1 }, viz(), 'Không có key ⇒ trả -1 (miss).'); continue; }
      items[i].used = ++clock; out.push(items[i].value); log.push(`get ${o.key} → ${items[i].value}`);
      yield frame(12, { clock, result: items[i].value }, viz({ [i]: 'swap' }), `Hit ⇒ cập nhật timestamp = ${clock}. Entry KHÔNG đổi vị trí; "độ mới" chỉ nằm trong con số, nên lúc evict phải quét lại.`);
      continue;
    }
    out.push(null);
    if (i !== -1) {
      items[i].value = o.value; items[i].used = ++clock;
      yield frame(17, { clock }, viz({ [i]: 'swap' }), `Key đã có ⇒ ghi đè giá trị và làm mới timestamp = ${clock}. Không cần evict vì số entry không đổi.`);
      continue;
    }
    if (items.length === capacity) {
      let lru = 0;
      for (let j = 1; j < items.length; j++) if (items[j].used < items[lru].used) lru = j;
      yield frame(20, { lru, 'used nhỏ nhất': items[lru].used }, viz({ [lru]: 'swap' }), `Đầy ⇒ quét toàn bộ tìm timestamp nhỏ nhất: key ${items[lru].key} (@${items[lru].used}) là ít dùng gần đây nhất. Quét này là O(n) mỗi lần put.`);
      items.splice(lru, 1);
      yield frame(21, { n: items.length }, viz(), 'splice xoá phần tử giữa mảng – cũng O(n) vì phải dồn các phần tử phía sau.');
    }
    items.push({ key: o.key, value: o.value, used: ++clock });
    yield frame(23, { clock, n: items.length }, viz({ [items.length - 1]: 'done' }), `Thêm ${o.key}:${o.value} với timestamp ${clock}.`);
  }
  yield frame(25, { results: out.map((r) => r ?? '–') }, viz(), 'Xong. Đúng nhưng mỗi thao tác O(n) – với capacity 10⁴ và 2·10⁵ lệnh là ~10⁹ bước, quá chậm.');
  return out;
}
