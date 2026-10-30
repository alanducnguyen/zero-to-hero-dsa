import type { Op } from '../../ops';

/** JS Map giữ thứ tự chèn (đặc tả ECMAScript): key đầu tiên = LRU, key cuối = MRU. Mỗi thao tác O(1). */
export function lruMap(capacity: number, ops: Op[]): (number | null)[] {
  const cache = new Map<number, number>();
  const out: (number | null)[] = [];
  for (const o of ops) {
    if (o.op === 'get') {
      if (!cache.has(o.key)) { out.push(-1); continue; }
      const v = cache.get(o.key)!;
      cache.delete(o.key);
      cache.set(o.key, v); // xoá + chèn lại ⇒ key chuyển xuống cuối (MRU)
      out.push(v);
      continue;
    }
    out.push(null);
    cache.delete(o.key); // key cũ (nếu có) phải xoá để set lại ở cuối
    cache.set(o.key, o.value);
    if (cache.size > capacity) cache.delete(cache.keys().next().value!); // key đầu tiên = LRU
  }
  return out;
}
