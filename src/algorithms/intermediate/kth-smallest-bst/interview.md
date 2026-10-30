## Cách trình bày trong phỏng vấn

1. **Làm rõ đề:** k là 1-based? Có đảm bảo `1 ≤ k ≤ n` không? Cây có giá trị trùng không? Có hỏi nhiều lần trên cây thay đổi không?
2. **Nêu insight then chốt:** inorder của BST là dãy tăng dần ⇒ đáp án là node thứ k được thăm.
3. **Đưa giải pháp brute force** (inorder ra mảng, `O(n)` bộ nhớ) rồi cải tiến: dừng sớm, chỉ dùng stack `O(h)`.
4. **Code bản lặp** với stack tường minh, giải thích ba bước: đi trái tới cùng → pop và đếm → sang phải.
5. **Chạy tay** trên cây nhỏ (ví dụ `[5,3,6,2,4,1]`, k = 3), chỉ rõ nội dung stack sau mỗi bước.
6. **Độ phức tạp:** `O(h + k)` thời gian, `O(h)` bộ nhớ; nêu worst case `O(n)` với cây lệch.

## Câu hỏi follow-up thường gặp

- *Cây bị sửa thường xuyên và hỏi kth nhiều lần?* Lưu `size` cây con ở mỗi node, cập nhật khi insert/delete; truy vấn `O(h)`, với cây cân bằng là `O(log n)`.
- *Làm với bộ nhớ O(1)?* Morris inorder traversal: nối tạm predecessor → node, gỡ nối khi quay lại.
- *Tìm phần tử lớn thứ k?* Reverse inorder, hoặc tìm phần tử nhỏ thứ `n − k + 1`.
- *Nếu là cây nhị phân thường, không phải BST?* Duyệt bất kỳ + max-heap kích thước k (`O(n log k)`) hoặc quickselect.
- *Viết bản đệ quy dừng sớm?* Dùng biến đếm ngoài closure, return ngay khi tìm thấy và kiểm tra kết quả sau lời gọi trái.

## Checklist nhận diện pattern

- Đề cho **BST** và hỏi về **thứ tự / thứ hạng** (nhỏ thứ k, successor, phần tử kế tiếp) ⇒ nghĩ ngay tới inorder.
- Cần **dừng sớm** hoặc **lazy iteration** ⇒ inorder lặp với stack tường minh.
- Yêu cầu bộ nhớ `O(h)` hoặc thiết kế iterator ⇒ stack chứa "đường đi trái".
- Thao tác cặp trên dãy đã sort nhưng dữ liệu ở trong BST ⇒ hai iterator như two pointers.

## Bài luyện tập

- LC 230 – Kth Smallest Element in a BST (Medium)
- LC 94 – Binary Tree Inorder Traversal (Easy)
- LC 173 – Binary Search Tree Iterator (Medium)
- LC 98 – Validate Binary Search Tree (Medium)
- LC 285 – Inorder Successor in BST (Medium)
- LC 653 – Two Sum IV – Input is a BST (Easy)
