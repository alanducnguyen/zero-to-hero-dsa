## Kịch bản trình bày (8–10 phút)

1. **Làm rõ đề** (30s): đếm số từ hay số bước; endWord có chắc trong list; bảng chữ cái `a–z`?
2. **Mô hình hoá** (1 phút): "Từ là đỉnh, khác một ký tự là cạnh, trọng số 1 ⇒ đường ngắn nhất không trọng số ⇒ BFS." Nói luôn vì sao không DFS: DFS không đảm bảo đường đầu tiên là ngắn nhất, phải thử hết – hàm mũ.
3. **BFS ngây thơ** (1 phút): "Hàng xóm = so với mọi từ, O(n²·L)." Chỉ nói, hoặc code nhanh nếu được yêu cầu.
4. **Tối ưu tìm hàng xóm** (1 phút): "Đổi từng vị trí sang 26 chữ cái rồi tra Set ⇒ O(L·26) biến thể mỗi từ, bỏ được n²." Hoặc wildcard bucket `h*t`.
5. **Code** (3 phút): BFS một phía + Set, đánh dấu đã thăm **khi đẩy vào queue** (xoá khỏi Set). Nếu còn thời gian, nâng lên bidirectional: hai Set frontier, luôn mở rộng phía nhỏ, dừng khi biến thể nằm trong frontier bên kia.
6. **Phân tích** (1 phút): O(n·L²·26) thời gian, O(n·L) bộ nhớ; bidirectional giảm số đỉnh thăm từ ~b^d xuống ~b^(d/2).

## Follow-up thường gặp

- **In ra mọi đường ngắn nhất (LeetCode 126)?** BFS theo tầng, ghi `parents[word]`; chỉ xoá từ khỏi Set *sau khi xong cả tầng* (để nhiều cha cùng tầng được ghi); rồi DFS/backtrack ngược từ endWord.
- **Vì sao bidirectional nhanh hơn?** Hai quả cầu bán kính d/2 nhỏ hơn rất nhiều một quả cầu bán kính d khi hệ số nhánh > 1.
- **Vì sao luôn mở rộng frontier nhỏ hơn?** Chi phí một vòng tỉ lệ kích thước frontier được mở rộng; chọn phía nhỏ giữ tổng chi phí thấp nhất.
- **Bảng chữ cái lớn?** Wildcard bucket: tiền xử lý O(n·L²) không phụ thuộc |Σ|.
- **Các bài cùng khuôn?** Open the Lock (752), Minimum Genetic Mutation (433), Sliding Puzzle (773) – đều là BFS trên không gian trạng thái ngầm, đều hưởng lợi từ bidirectional.
- **Nếu mỗi phép đổi ký tự có chi phí khác nhau?** Không còn trọng số 1 ⇒ Dijkstra (hoặc 0-1 BFS nếu chi phí ∈ {0, 1}).

## Lỗi hay gặp khi code

- Đánh dấu đã thăm khi *lấy ra* thay vì khi *đẩy vào* ⇒ một từ vào queue nhiều lần, chậm đi nhiều.
- Quên kiểm tra endWord ∈ wordList ⇒ trả sai khi endWord chỉ cách 1 ký tự nhưng không hợp lệ.
- Bidirectional: đếm sai độ dài khi hai phía gặp nhau (off-by-one), hoặc quên đổi vai khi frontier bên kia nhỏ hơn.
