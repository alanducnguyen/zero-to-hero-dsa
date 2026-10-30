## Cách trình bày trong phỏng vấn

Đây là câu khởi động phổ biến, thường dẫn sang bài khó hơn (palindrome, reorder list, sort list). Trình bày theo thứ tự:

1. Nêu cách đếm hai lượt trước để chứng tỏ bạn hiểu bài, rồi hỏi: "Tôi có thể làm trong một lượt với O(1) bộ nhớ bằng fast/slow pointers."
2. Giải thích trực giác: fast đi gấp đôi slow ⇒ khi fast tới cuối, slow ở giữa.
3. Nói rõ điều kiện `while (fast && fast.next)` và vì sao nó cho node giữa **thứ hai** khi n chẵn.
4. Chạy tay với n = 1, 2, 5, 6 để chứng minh không lệch một.
5. Nêu độ phức tạp: O(n) thời gian, O(1) bộ nhớ.

## Câu hỏi follow-up thường gặp

- **Muốn lấy node giữa thứ nhất thì sao?** Đổi điều kiện thành `fast.next && fast.next.next`, hoặc khởi tạo `fast = head.next`.
- **Tại sao không chuyển sang mảng?** Được, nhưng tốn O(n) bộ nhớ; người phỏng vấn thường muốn O(1).
- **Nếu danh sách có vòng thì sao?** Fast không bao giờ gặp null ⇒ vòng lặp vô hạn. Cần phát hiện vòng trước (Floyd).
- **Có nhanh hơn cách đếm hai lượt không?** Số lần truy cập node gần như bằng nhau (~1.5n); lợi thế là chỉ một lượt, hữu ích với stream và khi kết hợp thêm bước khác.
- **Dùng trong Merge Sort trên linked list thế nào?** Tìm node giữa thứ nhất, cắt `mid.next = null`, sắp xếp hai nửa rồi trộn.

## Checklist nhận diện pattern

- Linked list + "giữa", "nửa", "chia đôi" ⇒ fast/slow pointers.
- Linked list + "vòng", "chu trình", "lặp vô hạn" ⇒ fast/slow (Floyd).
- Yêu cầu O(1) bộ nhớ và không được biết độ dài trước ⇒ nghĩ ngay tới hai con trỏ khác tốc độ.
- Bài cần xử lý nửa sau (palindrome, reorder) ⇒ bước đầu tiên gần như luôn là tìm giữa.

## Bài luyện tập liên quan

- LeetCode 876 – Middle of the Linked List.
- LeetCode 2095 – Delete the Middle Node of a Linked List.
- LeetCode 234 – Palindrome Linked List.
- LeetCode 143 – Reorder List.
- LeetCode 148 – Sort List.
- LeetCode 141 – Linked List Cycle.
