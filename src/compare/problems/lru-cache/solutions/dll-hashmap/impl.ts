import type { Op } from '../../ops';

interface Node { key: number; value: number; prev: Node; next: Node }

/** HashMap key → node + danh sách liên kết đôi vòng (sentinel): head.next = MRU, head.prev = LRU. Mỗi thao tác O(1). */
export function lruList(capacity: number, ops: Op[]): (number | null)[] {
  const head = { key: 0, value: 0 } as Node;
  head.prev = head.next = head; // sentinel ⇒ không có ca đặc biệt khi danh sách rỗng
  const map = new Map<number, Node>();
  const unlink = (n: Node) => { n.prev.next = n.next; n.next.prev = n.prev; };
  const pushFront = (n: Node) => { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; };
  const out: (number | null)[] = [];
  for (const o of ops) {
    const n = map.get(o.key); // O(1) tìm node
    if (o.op === 'get') {
      if (!n) { out.push(-1); continue; }
      unlink(n); pushFront(n); // chạm ⇒ lên đầu (MRU)
      out.push(n.value);
      continue;
    }
    out.push(null);
    if (n) { n.value = o.value; unlink(n); pushFront(n); continue; }
    if (map.size === capacity) {
      const lru = head.prev; // cuối danh sách = ít dùng gần đây nhất
      unlink(lru); map.delete(lru.key);
    }
    const node = { key: o.key, value: o.value } as Node;
    pushFront(node); map.set(o.key, node);
  }
  return out;
}
