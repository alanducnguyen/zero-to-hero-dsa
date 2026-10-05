import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';
import { parseOps, type LRUInput } from './node';

interface N { key: number; value: number; prev: N | null; next: N | null; id: string }

export function* trace(input: LRUInput): Generator<Frame, (number | null)[]> {
  const capacity = Math.max(1, Math.min(6, Math.floor(input.capacity)));
  const map = new Map<number, N>();
  const head: N = { key: -1, value: -1, prev: null, next: null, id: 'head' };
  const tail: N = { key: -1, value: -1, prev: head, next: null, id: 'tail' };
  head.next = tail;
  const results: (number | null)[] = [];
  const log: string[] = [];
  let seq = 0;
  const cs: string[] = [];
  const listViz = (hl: Record<string, Highlight> = {}): LinkedListVisual => {
    const nodes: LinkedListVisual['nodes'] = [];
    const order: string[] = [];
    for (let n = head.next; n && n !== tail; n = n.next) {
      nodes.push({ id: n.id, value: `${n.key}:${n.value}`, next: n.next && n.next !== tail ? n.next.id : null });
      order.push(n.id);
    }
    return { kind: 'linkedlist', title: `Thứ tự sử dụng: MỚI nhất (trái) → CŨ nhất (phải) · capacity = ${capacity}`, nodes, order, highlights: hl, pointers: nodes.length ? [{ name: 'MRU', id: order[0] }, { name: 'LRU', id: order[order.length - 1] }] : [] };
  };
  const viz = (hl: Record<string, Highlight> = {}, mapHl?: Record<string, Highlight>) =>
    composite([listViz(hl), mapViz(Object.fromEntries([...map.entries()].map(([k, n]) => [String(k), n.value])), mapHl, 'map: key → node'), arr(log.length ? log : ['—'], { title: 'Kết quả get' })]);
  const unlink = (n: N) => { n.prev!.next = n.next; n.next!.prev = n.prev; };
  const pushFront = (n: N) => { n.next = head.next; n.prev = head; head.next!.prev = n; head.next = n; };

  yield frame(20, { capacity }, viz(), `Cache rỗng. Hai sentinel head/tail (không vẽ) giúp unlink/pushFront không có trường hợp đặc biệt. Map cho O(1) tìm node; danh sách cho O(1) đổi thứ tự.`);
  for (const o of parseOps(input.ops)) {
    if (o.op === 'get') {
      cs.push(`get(${o.key})`);
      const n = map.get(o.key);
      yield frame(36, { key: o.key, found: !!n }, viz(n ? { [n.id]: 'compare' } : {}, n ? { [String(o.key)]: 'compare' } : undefined), n ? `get(${o.key}): map có key ⇒ node (${n.key}:${n.value}).` : `get(${o.key}): map không có ⇒ trả -1.`, { callStack: [...cs] });
      if (!n) { results.push(-1); log.push(`get ${o.key} → -1`); cs.pop(); continue; }
      unlink(n);
      pushFront(n);
      results.push(n.value);
      log.push(`get ${o.key} → ${n.value}`);
      yield frame(39, { key: o.key, value: n.value }, viz({ [n.id]: 'swap' }), `Vừa được dùng ⇒ unlink rồi pushFront: node chuyển lên đầu (MRU). Trả về ${n.value}.`, { callStack: [...cs] });
      cs.pop();
    } else {
      cs.push(`put(${o.key}, ${o.value})`);
      const existing = map.get(o.key);
      yield frame(44, { key: o.key, value: o.value, exists: !!existing, size: map.size }, viz(existing ? { [existing.id]: 'compare' } : {}), existing ? `put(${o.key}): key đã có ⇒ cập nhật giá trị và đưa lên đầu.` : `put(${o.key}): key mới. size = ${map.size}/${capacity}.`, { callStack: [...cs] });
      if (existing) {
        existing.value = o.value;
        unlink(existing);
        pushFront(existing);
        results.push(null);
        yield frame(48, { key: o.key, value: o.value }, viz({ [existing.id]: 'swap' }, { [String(o.key)]: 'swap' }), `Cập nhật ${o.key} → ${o.value}, chuyển lên MRU.`, { callStack: [...cs] });
        cs.pop();
        continue;
      }
      if (map.size === capacity) {
        const lru = tail.prev!;
        yield frame(52, { evict: lru.key, size: map.size }, viz({ [lru.id]: 'swap' }, { [String(lru.key)]: 'swap' }), `Đầy (${capacity}) ⇒ loại LRU = node trước tail: key ${lru.key}. O(1) vì danh sách cho ta ngay node cũ nhất.`, { callStack: [...cs] });
        unlink(lru);
        map.delete(lru.key);
        yield frame(54, { evicted: lru.key, size: map.size }, viz(), `Đã xoá ${lru.key} khỏi danh sách và map.`, { callStack: [...cs] });
      }
      const n: N = { key: o.key, value: o.value, prev: null, next: null, id: `n${seq++}` };
      pushFront(n);
      map.set(o.key, n);
      results.push(null);
      yield frame(58, { key: o.key, value: o.value, size: map.size }, viz({ [n.id]: 'done' }, { [String(o.key)]: 'done' }), `Tạo node (${o.key}:${o.value}), pushFront, ghi vào map. size = ${map.size}.`, { callStack: [...cs] });
      cs.pop();
    }
  }
  yield frame(59, { size: map.size, results: results.map((r) => r ?? '–') }, viz(), `Xong. Mọi get/put đều O(1): Map tìm node, danh sách đôi tháo/gắn node tại chỗ.`);
  return results;
}
