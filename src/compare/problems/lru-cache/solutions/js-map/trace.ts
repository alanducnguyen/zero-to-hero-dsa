import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';
import { clampCapacity, parseOps, type LRUInput } from '../../ops';

export function* trace(input: LRUInput): Generator<Frame, (number | null)[]> {
  const capacity = clampCapacity(input.capacity);
  const cache = new Map<number, number>();
  const out: (number | null)[] = [];
  const log: string[] = [];
  const viz = (hl: Record<string, Highlight> = {}) => composite([
    mapViz(cache, hl, `cache theo thứ tự chèn: trên = LRU, dưới = MRU · capacity = ${capacity}`),
    arr(log.length ? log : ['—'], { title: 'Kết quả' }),
  ]);
  yield frame(5, { capacity }, viz(), 'Map của JS duyệt theo thứ tự chèn (được đặc tả ECMAScript bảo đảm). Vậy thứ tự chèn chính là thứ tự "dùng gần đây" nếu mỗi lần chạm ta xoá rồi chèn lại.');
  for (const o of parseOps(input.ops)) {
    const k = String(o.key);
    if (o.op === 'get') {
      const has = cache.has(o.key);
      yield frame(9, { op: `get(${o.key})`, has }, viz(has ? { [k]: 'compare' } : {}), has ? `get(${o.key}): có trong Map (tra hash O(1)).` : `get(${o.key}): không có ⇒ -1.`);
      if (!has) { out.push(-1); log.push(`get ${o.key} → -1`); continue; }
      const v = cache.get(o.key)!;
      cache.delete(o.key); cache.set(o.key, v);
      out.push(v); log.push(`get ${o.key} → ${v}`);
      yield frame(12, { v }, viz({ [k]: 'swap' }), `delete + set ⇒ ${o.key} xuống cuối thành MRU. Không cần danh sách liên kết: engine JS đã tự duy trì thứ tự chèn bên trong Map.`);
      continue;
    }
    out.push(null);
    const had = cache.delete(o.key);
    cache.set(o.key, o.value);
    yield frame(18, { op: `put(${o.key}, ${o.value})`, 'đã có': had, size: cache.size }, viz({ [k]: 'done' }), had ? `Key đã có ⇒ xoá trước rồi set: nếu chỉ set, Map giữ vị trí CŨ và ${o.key} không thành MRU.` : `Key mới ⇒ chèn ở cuối (MRU). size = ${cache.size}.`);
    if (cache.size > capacity) {
      const lru = cache.keys().next().value!;
      yield frame(19, { lru, size: cache.size }, viz({ [String(lru)]: 'swap', [k]: 'done' }), `Vượt capacity ⇒ key đầu tiên trong thứ tự duyệt (${lru}) là LRU. keys().next() là O(1).`);
      cache.delete(lru);
    }
  }
  yield frame(21, { results: out.map((r) => r ?? '–') }, viz(), 'Xong. O(1) mỗi thao tác với ~15 dòng – nhưng chỉ đúng vì ngôn ngữ đảm bảo thứ tự chèn của Map.');
  return out;
}
