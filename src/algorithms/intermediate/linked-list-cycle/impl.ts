export interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * Linked List Cycle – thuật toán Floyd (rùa và thỏ).
 * slow đi 1 bước, fast đi 2 bước; nếu có vòng, chúng chắc chắn gặp nhau.
 * @returns node bắt đầu vòng, hoặc null nếu không có vòng
 */
export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next; // rùa: 1 bước
    fast = fast.next.next; // thỏ: 2 bước
    if (slow === fast) {
      // Giai đoạn 2: đưa một con trỏ về head, cả hai đi 1 bước ⇒ gặp nhau tại đầu vòng
      let p = head;
      while (p !== slow) {
        p = p!.next;
        slow = slow!.next;
      }
      return p;
    }
  }
  return null; // fast chạm null ⇒ không có vòng
}

/** Tiện ích: tạo danh sách từ mảng, nối node cuối về vị trí pos (-1 = không vòng). */
export function buildList(values: number[], pos: number): ListNode | null {
  const nodes = values.map((val) => ({ val, next: null }) as ListNode);
  for (let i = 0; i + 1 < nodes.length; i++) nodes[i].next = nodes[i + 1];
  if (nodes.length && pos >= 0 && pos < nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] ?? null;
}
