## Cách trình bày trong phỏng vấn

1. **Vẽ hình** 3 node với mũi tên, đặt `prev`, `curr`, `next`. Đây là bước quan trọng nhất – nhiều ứng viên code ngay và sai thứ tự gán.
2. Nêu bất biến: "prev là head phần đã đảo, curr là head phần còn lại."
3. Viết 4 phép gán theo thứ tự, giải thích tại sao phải lưu `next` trước.
4. Chạy tay với 2 node, rồi nói rõ trường hợp rỗng và 1 node vẫn đúng.
5. O(n)/O(1); đề cập phiên bản đệ quy và nhược điểm stack.

## Câu hỏi follow-up thường gặp

- **Viết đệ quy?**
  ```ts
  function reverse(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    const newHead = reverse(head.next);
    head.next.next = head; // node sau trỏ ngược về head
    head.next = null;
    return newHead;
  }
  ```
  O(n) thời gian, O(n) stack.
- **Đảo đoạn từ vị trí left đến right (92)?** Dummy node trước head; đi tới node trước `left`; đảo `right-left+1` node bằng kỹ thuật "head insertion"; nối lại.
- **Đảo từng k node (25)?** Đếm đủ k node mới đảo; dùng hàm đảo đoạn + nối; phần dư giữ nguyên.
- **Phát hiện vòng trong danh sách?** Floyd (slow/fast). Nếu có vòng, đảo sẽ lặp vô hạn – hỏi người phỏng vấn trước.
- **Đảo danh sách liên kết đôi?** Mỗi node hoán đổi `prev`/`next`; head mới là node cuối.
- **Đảo mà không thay đổi input?** Tạo node mới khi duyệt, chèn vào đầu danh sách mới (O(n) bộ nhớ).
- **Tại sao linked list vẫn quan trọng khi mảng nhanh hơn nhờ cache?** O(1) chèn/xoá giữa khi đã có con trỏ, không cần dịch chuyển; dùng trong LRU cache, allocator, hàng đợi lớn.

## Checklist nhận diện pattern

- "Đảo", "xoay", "sắp xếp lại" linked list ⇒ 3 con trỏ + dummy node.
- Cần node giữa ⇒ slow/fast pointer.
- Cần nối lại sau khi thao tác ⇒ luôn dùng **dummy head** để tránh case đặc biệt ở đầu.

## Bài luyện tập liên quan

- 206 Reverse Linked List → 92 Reverse Linked List II → 25 Reverse Nodes in k-Group (Hard).
- 234 Palindrome Linked List, 143 Reorder List, 2 Add Two Numbers.
- 141/142 Linked List Cycle, 19 Remove Nth Node From End, 21 Merge Two Sorted Lists.
