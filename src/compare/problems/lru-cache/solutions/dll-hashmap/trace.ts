import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight, LinkedListVisual } from '@/engine/types';
import { clampCapacity, parseOps, type LRUInput } from '../../ops';

interface N { key: number; value: number; prev: N; next: N; id: string }

export function* trace(input: LRUInput): Generator<Frame, (number | null)[]> {
  const capacity = clampCapacity(input.capacity);
  const head = { key: 0, value: 0, id: 'head' } as N;
  head.prev = head.next = head;
  const map = new Map<number, N>();
  const unlink = (n: N) => { n.prev.next = n.next; n.next.prev = n.prev; };
  const pushFront = (n: N) => { n.next = head.next; n.prev = head; head.next.prev = n; head.next = n; };
  const out: (number | null)[] = [];
  const log: string[] = [];
  let seq = 0;
  const viz = (hl: Record<string, Highlight> = {}, mapHl?: Record<string, Highlight>) => {
    const nodes: LinkedListVisual['nodes'] = [];
    for (let n = head.next; n !== head; n = n.next) nodes.push({ id: n.id, value: `${n.key}:${n.value}`, next: n.next !== head ? n.next.id : null });
    const list: LinkedListVisual = { kind: 'linkedlist', title: `MRU (trái) → LRU (phải) · capacity = ${capacity}`, nodes, order: nodes.map((x) => x.id), highlights: hl,
      pointers: nodes.length ? [{ name: 'MRU', id: nodes[0].id }, { name: 'LRU', id: nodes[nodes.length - 1].id }] : [] };
    return composite([list, mapViz(Object.fromEntries([...map].map(([k, n]) => [String(k), n.value])), mapHl, 'map: key → node'), arr(log.length ? log : ['—'], { title: 'Kết quả' })]);
  };
  yield frame(8, { capacity }, viz(), 'Một sentinel head nối vòng: head.next là MRU, head.prev là LRU. Nhờ sentinel, unlink/pushFront không bao giờ gặp con trỏ null.');
  for (const o of parseOps(input.ops)) {
    const n = map.get(o.key);
    const label = o.op === 'get' ? `get(${o.key})` : `put(${o.key}, ${o.value})`;
    yield frame(14, { op: label, found: !!n }, viz(n ? { [n.id]: 'compare' } : {}, n ? { [String(o.key)]: 'compare' } : undefined), `${label}: map trả thẳng node trong O(1) – đây là lý do cần HashMap bên cạnh danh sách.`);
    if (o.op === 'get') {
      if (!n) { out.push(-1); log.push(`get ${o.key} → -1`); yield frame(16, { result: -1 }, viz(), 'Miss ⇒ -1.'); continue; }
      unlink(n); pushFront(n); out.push(n.value); log.push(`get ${o.key} → ${n.value}`);
      yield frame(17, { result: n.value }, viz({ [n.id]: 'swap' }), 'Danh sách ĐÔI cho phép tháo node khỏi giữa trong O(1) (biết cả prev lẫn next), rồi gắn lên đầu.');
      continue;
    }
    out.push(null);
    if (n) {
      n.value = o.value; unlink(n); pushFront(n);
      yield frame(22, { key: o.key, value: o.value }, viz({ [n.id]: 'swap' }, { [String(o.key)]: 'swap' }), 'Key đã có ⇒ sửa giá trị tại node và chuyển lên MRU; map không đổi vì vẫn trỏ cùng node.');
      continue;
    }
    if (map.size === capacity) {
      const lru = head.prev;
      yield frame(24, { evict: lru.key }, viz({ [lru.id]: 'swap' }, { [String(lru.key)]: 'swap' }), `Đầy ⇒ LRU là head.prev = key ${lru.key}, lấy ngay O(1). Node phải lưu key để còn xoá được khỏi map.`);
      unlink(lru); map.delete(lru.key);
    }
    const node = { key: o.key, value: o.value, id: `n${seq++}` } as N;
    pushFront(node); map.set(o.key, node);
    yield frame(28, { size: map.size }, viz({ [node.id]: 'done' }, { [String(o.key)]: 'done' }), `Tạo node ${o.key}:${o.value}, gắn lên đầu và ghi vào map. size = ${map.size}.`);
  }
  yield frame(30, { results: out.map((r) => r ?? '–') }, viz(), 'Xong. O(1) mỗi thao tác, không phụ thuộc đảm bảo nào của ngôn ngữ – viết lại được trong Java/C++/Go y hệt.');
  return out;
}
