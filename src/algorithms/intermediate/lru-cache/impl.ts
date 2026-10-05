/**
 * LRU Cache – HashMap + doubly linked list.
 * Map cho O(1) tra cứu; danh sách giữ thứ tự sử dụng (head = mới nhất, tail = cũ nhất).
 */
interface Node {
  key: number;
  value: number;
  prev: Node | null;
  next: Node | null;
}

export class LRUCache {
  private map = new Map<number, Node>();
  private head: Node; // sentinel: sau head là node MỚI nhất
  private tail: Node; // sentinel: trước tail là node CŨ nhất

  constructor(readonly capacity: number) {
    this.head = { key: -1, value: -1, prev: null, next: null };
    this.tail = { key: -1, value: -1, prev: this.head, next: null };
    this.head.next = this.tail;
  }

  private unlink(node: Node): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private pushFront(node: Node): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) return -1;
    this.unlink(node); // vừa dùng ⇒ chuyển lên đầu
    this.pushFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.unlink(existing);
      this.pushFront(existing);
      return;
    }
    if (this.map.size === this.capacity) {
      const lru = this.tail.prev!; // cũ nhất
      this.unlink(lru);
      this.map.delete(lru.key); // loại bỏ
    }
    const node: Node = { key, value, prev: null, next: null };
    this.pushFront(node);
    this.map.set(key, node);
  }
}
