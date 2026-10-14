## Cách trình bày trong phỏng vấn

1. Nêu ý tưởng merge hai con trỏ; giới thiệu dummy node và lý do.
2. Viết lặp ~12 dòng; chạy tay với một bên rỗng và với phần tử bằng nhau.
3. O(n + m), O(1). Nêu đệ quy như cách khác và nhược điểm stack.
4. Chủ động nói mở rộng k danh sách bằng heap.

## Câu hỏi follow-up thường gặp

- **Đệ quy?** `if (!a) return b; if (!b) return a; if (a.val <= b.val) { a.next = merge(a.next, b); return a; } else { b.next = merge(a, b.next); return b; }`
- **k danh sách?** Min-heap các đầu, O(N log k); hoặc gộp cặp chia để trị, cùng độ phức tạp, O(1) bộ nhớ phụ.
- **Sắp xếp linked list O(n log n) O(1) phụ?** Merge sort: cắt giữa (slow/fast), đệ quy, merge bằng hàm này. Bottom-up để O(1) stack.
- **Không được sửa input?** Tạo node mới khi lấy.
- **Danh sách giảm dần?** Đổi so sánh, hoặc đảo trước.
- **Loại trùng khi merge?** Khi `a.val === b.val`, lấy một và tiến cả hai.

## Checklist nhận diện pattern

- "Hai (hay k) dãy đã sắp xếp" ⇒ hai con trỏ (hoặc heap).
- "Xây danh sách mới từ đầu" ⇒ dummy node + tail.
- "Sắp xếp linked list" ⇒ merge sort + hàm này.

## Bài luyện tập liên quan

- 21 Merge Two Sorted Lists → 88 Merge Sorted Array → 23 Merge k Sorted Lists → 148 Sort List → 1669 Merge In Between.
