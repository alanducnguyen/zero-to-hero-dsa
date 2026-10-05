export interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * Reverse Linked List – đảo ngược danh sách liên kết đơn bằng 3 con trỏ.
 * @param head đầu danh sách
 * @returns đầu danh sách sau khi đảo
 */
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;
  while (curr !== null) {
    const next: ListNode | null = curr.next; // lưu lại trước khi cắt liên kết
    curr.next = prev; // đảo chiều mũi tên
    prev = curr; // tiến prev
    curr = next; // tiến curr
  }
  return prev; // prev là đầu mới
}

/** Tiện ích: tạo danh sách từ mảng. */
export function fromArray(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  return head;
}

/** Tiện ích: chuyển danh sách về mảng. */
export function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}
