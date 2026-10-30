import type { Op } from '../../ops';

/** Mảng + timestamp: mỗi entry nhớ lần dùng cuối; evict = quét tìm timestamp nhỏ nhất. Mỗi thao tác O(n). */
export function lruArray(capacity: number, ops: Op[]): (number | null)[] {
  const items: { key: number; value: number; used: number }[] = [];
  const out: (number | null)[] = [];
  let clock = 0; // đồng hồ logic, tăng mỗi lần "chạm" một key
  for (const o of ops) {
    const i = items.findIndex((e) => e.key === o.key); // O(n) tìm key
    if (o.op === 'get') {
      if (i === -1) { out.push(-1); continue; }
      items[i].used = ++clock; // chạm ⇒ thành mới nhất
      out.push(items[i].value);
      continue;
    }
    out.push(null);
    if (i !== -1) { items[i].value = o.value; items[i].used = ++clock; continue; }
    if (items.length === capacity) {
      let lru = 0;
      for (let j = 1; j < items.length; j++) if (items[j].used < items[lru].used) lru = j;
      items.splice(lru, 1); // O(n): quét tìm timestamp nhỏ nhất rồi xoá
    }
    items.push({ key: o.key, value: o.value, used: ++clock });
  }
  return out;
}
