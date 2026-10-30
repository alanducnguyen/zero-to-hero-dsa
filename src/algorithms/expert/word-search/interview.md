## Cách trình bày

1. Nhận diện: "Tìm một đường đi đơn trên lưới khớp chuỗi ⇒ DFS backtracking; trạng thái là (ô hiện tại, chỉ số ký tự, tập ô đã dùng)."
2. Hỏi rõ: chỉ 4 hướng? Có được sửa board không? Ký tự có thể là gì (có trùng với ký tự đánh dấu `'#'` không)? Kích thước tối đa của board và word?
3. Viết `dfs(r, c, i)` theo thứ tự điều kiện dừng: hết word ⇒ true; ngoài biên ⇒ false; sai ký tự ⇒ false. Rồi "đánh dấu – đệ quy 4 hướng với `||` – gỡ dấu".
4. Phân tích O(m·n·3^L) thời gian, O(L) bộ nhớ, giải thích vì sao là 3 chứ không phải 4.
5. Chủ động nêu cắt nhánh (đếm tần suất, đảo word) và hướng Trie cho nhiều từ.

## Câu hỏi follow-up

- **Vì sao phải khôi phục ô mà Number of Islands thì không?** Islands hỏi về thành phần liên thông – một ô thuộc đúng một đảo. Ở đây một ô có thể nằm trên nhiều đường đi khác nhau; dấu chỉ đúng cho đường đi hiện tại.
- **Không được sửa input?** Dùng `visited` boolean m×n, hoặc bitmask `number`/`bigint` khi m·n ≤ 64; vẫn gỡ dấu khi quay lui.
- **Nhiều từ (LC 212)?** Xây Trie từ danh sách từ, DFS một lần từ mỗi ô và đi song song trên Trie; xoá node Trie đã dùng hết để tránh lặp lại kết quả và cắt nhánh.
- **Tối ưu cho trường hợp xấu như `AAAA…AB`?** Kiểm tra tần suất ký tự trước; đảo word nếu ký tự cuối hiếm hơn ⇒ ít điểm xuất phát hơn và nhánh chết sớm hơn.
- **Đệ quy có tràn stack không?** Độ sâu tối đa là L + 1, thường ≤ 15 theo đề LeetCode ⇒ an toàn. Muốn lặp thì dùng stack lưu (r, c, i, hướng tiếp theo).
- **Đếm số cách ghép thay vì true/false?** Bỏ `||` dừng sớm, cộng dồn kết quả 4 hướng; vẫn backtracking, không memo được vì phụ thuộc tập ô đã dùng.
- **Song song hoá?** Mỗi điểm xuất phát độc lập nhưng phải dùng bản sao lưới (hoặc `visited` riêng) cho từng luồng vì đánh dấu tại chỗ không thread-safe.

## Checklist nhận diện pattern

- Lưới / đồ thị + "mỗi ô dùng tối đa một lần" + cần **liệt kê / kiểm tra đường đi** ⇒ backtracking với đánh dấu và gỡ dấu.
- Hỏi chỉ "có tồn tại không" ⇒ trả về boolean và dừng sớm bằng `||`.
- Không có tối ưu con (trạng thái phụ thuộc tập đã dùng) ⇒ không DP được, chấp nhận hàm mũ + cắt nhánh.
- Nhiều chuỗi truy vấn trên cùng lưới ⇒ nghĩ ngay tới Trie.
- Nếu chỉ cần liên thông (không quan tâm thứ tự) ⇒ đó là flood fill, không cần gỡ dấu.

## Bài luyện tập

- LC 79 – Word Search
- LC 212 – Word Search II (Trie + backtracking)
- LC 1219 – Path with Maximum Gold
- LC 980 – Unique Paths III (phải đi qua mọi ô trống đúng một lần)
- LC 46 / 78 – Permutations / Subsets (khuôn chọn – bỏ chọn)
- LC 51 – N-Queens
