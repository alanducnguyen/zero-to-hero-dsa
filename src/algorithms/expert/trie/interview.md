## Cách trình bày trong phỏng vấn

1. Vẽ Trie cho 3 từ có tiền tố chung, chỉ rõ `isEnd`.
2. Viết `TrieNode { children: Map; isEnd }` rồi 3 phương thức; tách `walk` để `search`/`startsWith` dùng chung – thể hiện code sạch.
3. Nêu O(L) mỗi thao tác và bộ nhớ O(tổng ký tự · Σ); so sánh với HashSet để giải thích **tại sao** chọn Trie.
4. Nếu bài là ứng dụng (autocomplete, word search), nói rõ Trie giúp cắt tỉa thế nào.

## Câu hỏi follow-up thường gặp

- **Xoá một từ?** Đệ quy tới node cuối, bỏ `isEnd`; khi quay lên, xoá con nếu con không `isEnd` và không còn con nào.
- **Liệt kê tất cả từ có tiền tố p (autocomplete)?** `walk(p)` rồi DFS thu thập; để trả top-k nhanh, lưu sẵn top-k (hoặc count) ở mỗi node, cập nhật khi insert.
- **Tìm từ với wildcard `.`?** DFS: gặp `.` thì thử mọi con; độ phức tạp xấu nhất O(26^số dấu chấm · L).
- **Map vs mảng 26?** Mảng nhanh hơn, bộ nhớ cố định 26×8 byte/node; Map cho Unicode và tiết kiệm khi thưa. Nêu cả hai.
- **Trie tốn bao nhiêu bộ nhớ cho 1 triệu từ tiếng Anh?** Khoảng 2–3 triệu node (nhiều tiền tố chung) × ~(Map ~100 byte) ⇒ vài trăm MB với Map, ~50–100 MB với mảng; Radix tree giảm thêm.
- **Longest prefix match (router)?** Đi theo từng bit/ký tự, ghi nhớ node `isEnd` gần nhất; trả node đó khi đứt đường.
- **Trie vs HashMap cho "có từ không"?** HashMap gọn, đủ. Trie chỉ thắng khi cần tiền tố/thứ tự/wildcard.
- **Thread-safe / concurrent insert?** Khoá theo node hoặc copy-on-write; nêu được là điểm cộng ở system design.

## Checklist nhận diện pattern

- "Tiền tố", "bắt đầu bằng", "autocomplete", "gợi ý" ⇒ Trie.
- "Tập từ điển + duyệt lưới/chuỗi tìm nhiều từ cùng lúc" ⇒ Trie + DFS (Word Search II) hoặc Aho–Corasick.
- "XOR lớn nhất", "bit cao tới thấp" ⇒ Binary Trie.
- "Đếm số chuỗi có tiền tố p" ⇒ Trie với count.

## Bài luyện tập liên quan

- 208 Implement Trie → 211 Add and Search Words → 1268 Search Suggestions System.
- 212 Word Search II (Hard), 648 Replace Words, 677 Map Sum Pairs.
- 421 Maximum XOR of Two Numbers (binary trie), 1032 Stream of Characters (Aho–Corasick nhẹ).
