## Cách trình bày

1. Làm rõ: cây nhị phân thường hay BST? Giá trị có trùng/âm không? Có yêu cầu định dạng hay giới hạn độ dài chuỗi không? Độ sâu tối đa (để quyết định đệ quy hay lặp)?
2. Nêu vấn đề cốt lõi: một dãy duyệt không xác định duy nhất cây ⇒ phải ghi cả các con rỗng.
3. Chọn preorder + `#`: "Gốc ghi trước, nên khi đọc lại token đầu luôn là gốc; mỗi node có đúng 2 con kể cả `#` nên chuỗi tự định giới hạn."
4. Viết `serialize` (DFS 6 dòng) và `deserialize` với con trỏ `i` dùng chung; nhấn mạnh tránh `shift()` O(n).
5. Phân tích O(n)/O(n), chuỗi có 2n + 1 token, call stack O(h). Đề xuất bản BFS/lặp nếu cây rất sâu.

## Câu hỏi follow-up

- **Vì sao không dùng inorder + `#`?** Inorder với `#` vẫn nhập nhằng: không biết token nào là gốc. Preorder/postorder thì gốc nằm ở đầu/cuối nên xác định được.
- **Làm bằng BFS được không?** Được: ghi level-order với `null`, deserialize bằng queue các node chờ gắn con, đọc từng cặp token. Không đệ quy, chịu được cây sâu, có thể bỏ `null` ở đuôi.
- **Nếu là BST?** Bỏ `#`, chỉ ghi preorder; dựng lại với cận `(lo, hi)` trong O(n). Chuỗi ngắn gần một nửa.
- **Giảm kích thước chuỗi?** Định dạng nhị phân: 2 bit cho "có trái/có phải" + varint giá trị; hoặc nén chuỗi. Với cây đầy đủ có thể bỏ hẳn cấu trúc.
- **Cây sâu 10⁵ node lệch một phía?** Đệ quy tràn stack ⇒ dùng stack tường minh cho preorder, hoặc BFS.
- **Node có con trỏ cha / đồ thị có chu trình?** Gán id cho mỗi node, ghi danh sách cạnh theo id; dùng HashMap node→id để tránh lặp vô hạn.
- **Kiểm tra một chuỗi có phải serialize hợp lệ không (LC 331)?** Đếm slot: khởi tạo 1, mỗi token −1, số thì +2; không được âm giữa chừng, kết thúc phải bằng 0.
- **Thread-safety / stateless?** Codec không nên giữ trạng thái giữa các lần gọi: con trỏ `i` phải là biến cục bộ của mỗi lần `deserialize`.

## Checklist nhận diện pattern

- "Lưu/khôi phục cấu trúc", "gửi cây qua mạng", "encode/decode" ⇒ serialization; với cây: preorder + sentinel null.
- Cần biến cấu trúc thành khoá so sánh/băm (cây con trùng lặp, cây con giống nhau) ⇒ serialize từng cây con.
- Dựng cây từ một dãy token có định giới hạn ⇒ recursive descent với con trỏ chỉ tiến.
- Thấy định dạng level-order kiểu LeetCode ⇒ BFS + queue cho cả hai chiều.
- Cây là BST ⇒ có thể bỏ sentinel nhờ ràng buộc giá trị.

## Bài luyện tập

- LC 297 – Serialize and Deserialize Binary Tree
- LC 449 – Serialize and Deserialize BST
- LC 428 – Serialize and Deserialize N-ary Tree
- LC 331 – Verify Preorder Serialization of a Binary Tree
- LC 652 – Find Duplicate Subtrees
- LC 105 – Construct Binary Tree from Preorder and Inorder Traversal
- LC 271 – Encode and Decode Strings
