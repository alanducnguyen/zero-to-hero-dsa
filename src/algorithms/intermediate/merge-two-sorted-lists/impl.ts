export interface ListNode {
  val: number;
  next: ListNode | null;
}

/**
 * Merge Two Sorted Lists – trộn hai danh sách đã sắp xếp bằng dummy node + hai con trỏ.
 * Không tạo node mới: chỉ nối lại con trỏ.
 */
export function mergeTwoLists(a: ListNode | null, b: ListNode | null): ListNode | null {
  const dummy: ListNode = { val: 0, next: null }; // sentinel: tránh case đặc biệt ở đầu
  let tail = dummy;
  while (a !== null && b !== null) {
    if (a.val <= b.val) {
      tail.next = a; // lấy a (<= giữ stable)
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }
  tail.next = a ?? b; // phần còn lại đã sắp xếp, nối thẳng
  return dummy.next;
}

export function fromArray(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = { val: values[i], next: head };
  return head;
}

export function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  for (let n = head; n; n = n.next) out.push(n.val);
  return out;
}
