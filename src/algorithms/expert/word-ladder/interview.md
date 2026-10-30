## Cách trình bày trong phỏng vấn

1. Làm rõ: mọi từ cùng độ dài? `beginWord` có cần nằm trong list không (không)? Đếm số từ hay số bước (số từ)? Chữ thường a–z?
2. Mô hình hoá: từ là đỉnh, khác một ký tự là cạnh, đường ngắn nhất trên đồ thị không trọng số ⇒ **BFS**.
3. Chỉ ra nút thắt: dựng cạnh bằng cách so từng cặp tốn O(n²·L). Đề xuất **bucket wildcard** `h*t` hoặc thử 26 chữ cái mỗi vị trí.
4. Viết BFS với `dist`/`visited` đánh dấu **khi đẩy vào queue**, queue dùng con trỏ `head`.
5. Phân tích O(n·L²) thời gian và bộ nhớ. Nhắc tối ưu BFS hai chiều nếu còn thời gian.
6. Test: ví dụ đề, `endWord` không có trong list, đích không liên thông, từ một ký tự.

## Câu hỏi follow-up thường gặp

- **Làm sao nhanh hơn nữa?** BFS hai chiều: mở rộng phía có frontier nhỏ hơn, dừng khi hai phía gặp nhau. Giảm mạnh số đỉnh duyệt khi đường dài.
- **Trả về chính chuỗi biến đổi?** Lưu `parent[next] = word` khi đẩy vào queue, tới đích thì lần ngược.
- **Trả về mọi chuỗi ngắn nhất?** (LC 126) BFS theo tầng, một từ có thể có nhiều cha cùng tầng; chỉ xoá khỏi tập chưa thăm **sau khi** xong cả tầng. Rồi DFS quay lui.
- **Vì sao không DFS?** DFS không đảm bảo ngắn nhất; muốn ngắn nhất phải duyệt mọi đường – hàm mũ.
- **wordList rất lớn, gọi nhiều lần?** Dựng bucket index một lần rồi dùng lại cho mọi truy vấn.
- **Bucket vs. thử 26 chữ cái?** Bucket không phụ thuộc alphabet, tốt khi n nhỏ so với 26^L; thử 26 chữ cái đỡ bộ nhớ.

## Checklist nhận diện pattern

- "Ít bước nhất", mỗi bước là một phép biến đổi đơn vị ⇒ BFS.
- Đồ thị không cho sẵn, đỉnh là **trạng thái** (chuỗi, mã khoá, bàn cờ) ⇒ đồ thị ngầm, sinh hàng xóm khi cần.
- "Khác đúng một vị trí" ⇒ nghĩ tới pattern wildcard để gom hàng xóm.
- Biết cả điểm đầu và điểm cuối ⇒ cân nhắc BFS hai chiều.

## Bài luyện tập liên quan

- LC 127 – Word Ladder
- LC 126 – Word Ladder II
- LC 433 – Minimum Genetic Mutation
- LC 752 – Open the Lock
- LC 841 – Keys and Rooms
- LC 1091 – Shortest Path in Binary Matrix
