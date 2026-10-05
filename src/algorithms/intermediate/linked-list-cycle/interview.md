## Cách trình bày trong phỏng vấn

1. Nêu Set O(n) bộ nhớ trong một câu, rồi "tôi dùng Floyd để O(1)".
2. Giải thích trực giác đuổi kịp, viết giai đoạn 1 với điều kiện `fast && fast.next`.
3. Khi được hỏi đầu vòng, **vẽ hình** với a, b, L và viết `a + b = kL` ⇒ `a = kL − b`. Đây là phần quyết định.
4. Viết giai đoạn 2, nhấn mạnh cả hai đi 1 bước.
5. Chạy tay case 1 node tự trỏ và case không vòng.

## Câu hỏi follow-up thường gặp

- **Tại sao fast đi 2 bước mà không phải 3?** 2 bước đảm bảo khoảng cách tăng đúng 1 mỗi vòng ⇒ chắc chắn gặp. 3 bước vẫn gặp nếu gcd(2, L) phù hợp nhưng không đảm bảo trong mọi L; 2 là tối thiểu và luôn đúng.
- **Chứng minh điểm gặp giai đoạn 2 là đầu vòng?** Như trên: slow đi a + b, fast đi 2(a + b), hiệu a + b = kL ⇒ a ≡ −b (mod L).
- **Độ dài vòng?** Sau khi gặp, giữ fast, cho slow đi tới khi gặp lại; số bước = L.
- **Không được dùng Floyd?** Set các node đã thăm O(n); hoặc đảo ngược danh sách (có vòng ⇔ reverse trả về head cũ) – phá dữ liệu.
- **Áp dụng cho mảng (Find the Duplicate)?** Coi `nums[i]` là `next`; chỉ số 0 không bao giờ là đích nên là "head"; số trùng = đầu vòng.
- **Danh sách đôi hoặc cây?** Cây không có vòng theo định nghĩa; đồ thị tổng quát cần DFS với màu, Floyd chỉ cho "mỗi node đúng một next".
- **Brent nhanh hơn thế nào?** Chỉ di chuyển một con trỏ mỗi bước, teleport con kia định kỳ; ít truy cập bộ nhớ hơn.
- **Đa luồng, danh sách đang bị sửa?** Floyd không an toàn; cần snapshot hoặc khoá.

## Checklist nhận diện pattern

- Linked list + "vòng", "lặp vô hạn", "O(1) bộ nhớ" ⇒ Floyd.
- "Phần tử giữa", "thứ n từ cuối", "kiểm tra palindrome" ⇒ slow/fast không vòng.
- Mảng với giá trị trong [1, n] hỏi "số trùng" không sửa mảng ⇒ Floyd trên hàm `i → nums[i]`.
- Dãy `x → f(x)` trên tập hữu hạn hỏi chu kỳ ⇒ Floyd/Brent.

## Bài luyện tập liên quan

- 141 Linked List Cycle → 142 Linked List Cycle II → 287 Find the Duplicate Number.
- 876 Middle of the Linked List, 19 Remove Nth Node From End, 234 Palindrome Linked List (slow/fast).
- 202 Happy Number, 160 Intersection of Two Linked Lists (two pointers khác).
