/**
 * Middle of the Linked List (LeetCode 876) – con trỏ nhanh/chậm (fast/slow).
 * Dựng danh sách liên kết từ mảng, rồi tìm node giữa chỉ trong một lần duyệt.
 * Khi số node chẵn, trả về node giữa thứ hai.
 * @param values giá trị các node theo thứ tự từ head
 * @returns giá trị node giữa, hoặc null nếu danh sách rỗng
 */
export function middleOfLinkedList(values: number[]): number | null {
  type ListNode = { val: number; next: ListNode | null };
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) {
    head = { val: values[i], next: head };
  }
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast !== null && fast.next !== null) {
    slow = (slow as ListNode).next; // slow đi 1 bước
    fast = fast.next.next; // fast đi 2 bước
  }
  return slow ? slow.val : null;
}
