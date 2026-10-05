## Bài toán

Thiết kế cấu trúc `Trie` với ba thao tác: `insert(word)`, `search(word)` (từ có tồn tại chính xác không), `startsWith(prefix)` (có từ nào bắt đầu bằng prefix không). Mỗi thao tác phải O(L) với L là độ dài chuỗi, **không phụ thuộc số từ** trong tập.

LeetCode 208 là bài "design" được hỏi nhiều nhất ở Google và Amazon, vì Trie là lõi của autocomplete, bộ lọc từ khoá, router IP, và là bước đệm cho bài Hard như Word Search II.

## Ý tưởng / Trực giác

Hãy nghĩ về cách tra từ điển giấy: không so sánh toàn bộ từ, bạn lật theo chữ cái đầu, rồi chữ cái thứ hai… Trie là chính xác cấu trúc đó: mỗi **cạnh** là một ký tự, mỗi **đường đi từ gốc** là một tiền tố. Các từ có tiền tố chung **dùng chung** đoạn đường đó – `car`, `card`, `care` chỉ tốn thêm 2 node so với riêng `car`.

Cờ `isEnd` phân biệt "đường đi tồn tại" (là tiền tố của từ nào đó) với "đây là một từ hoàn chỉnh". Thiếu cờ này, `search("ca")` sẽ trả `true` dù chỉ có `cat`.

## Thuật toán từng bước

- **insert:** từ gốc, với mỗi ký tự: nếu chưa có con tương ứng thì tạo; đi xuống. Cuối cùng đặt `isEnd = true`.
- **walk(prefix):** đi theo từng ký tự; thiếu nhánh ⇒ `null`; hết ⇒ trả node.
- **search(word):** `walk(word)` khác `null` **và** `isEnd`.
- **startsWith(prefix):** `walk(prefix)` khác `null`.

Tab **Debug**: xem từng từ được chèn, nhánh mới màu đỏ, đường đi màu xám, node kết thúc có dấu ✓. Thử preset "Chỉ là tiền tố" để thấy `search("ap")` trả `false` trong khi `startsWith("ap")` trả `true`.

## Chứng minh đúng

**Bất biến cấu trúc:** với mọi node `v` ở độ sâu `d`, chuỗi ký tự trên đường gốc→`v` là tiền tố độ dài `d` của ít nhất một từ đã insert; và `v.isEnd = true` ⇔ chuỗi đó là một từ đã insert.

- `insert` tạo đúng các node còn thiếu trên đường đi của `word` và đặt `isEnd` ở node cuối ⇒ bất biến giữ cho từ mới, không phá từ cũ (không xoá/ghi đè gì).
- `walk(p)` tìm được node ⇔ tồn tại đường đi `p` ⇔ (theo bất biến) `p` là tiền tố của từ nào đó ⇒ `startsWith` đúng.
- `search(w)` = tồn tại node của `w` và `isEnd` ⇔ `w` đã được insert ⇒ đúng.

## Độ phức tạp

| Thao tác | Thời gian | Giải thích |
|---|---|---|
| insert / search / startsWith | O(L) | Mỗi ký tự: một lần tra Map O(1) |
| Bộ nhớ | O(tổng ký tự · Σ) | Xấu nhất không có tiền tố chung; mỗi node tốn 1 Map (hoặc mảng 26) |

So sánh với **HashSet**: `search` cũng O(L) (băm chuỗi), nhưng `startsWith` phải duyệt toàn bộ set O(N·L). Với **mảng sắp xếp + binary search**: `startsWith` O(L log N), insert O(N). Trie thắng khi cần tiền tố và cập nhật thường xuyên.

## Tradeoff

- **Map ↔ mảng 26:** mảng `TrieNode[26]` nhanh hơn (truy cập trực tiếp, cache tốt) nhưng tốn 26 con trỏ/node kể cả khi chỉ dùng 1–2; Map linh hoạt (Unicode, tiếng Việt) và tiết kiệm bộ nhớ khi thưa.
- **Trie ↔ HashSet:** HashSet gọn hơn, đủ cho "có/không"; Trie cần khi hỏi tiền tố, gợi ý, wildcard, hoặc sắp xếp từ điển (duyệt DFS cho ra thứ tự alphabet miễn phí).
- **Trie ↔ Ternary Search Tree / Radix tree:** TST tiết kiệm bộ nhớ hơn Trie với Map; Radix (Patricia) tree gộp chuỗi node đơn con thành một cạnh – dùng trong router, Linux kernel, HTTP router của Go/Echo.
- **Bộ nhớ:** Trie tốn nhiều hơn HashSet 5–10 lần với từ điển tiếng Anh; nếu RAM quan trọng và chỉ cần membership, dùng Bloom filter + HashSet.

## Lợi / Hại

**Lợi**
- Tiền tố O(L), không phụ thuộc N.
- Liệt kê mọi từ có tiền tố p: DFS từ node p – autocomplete tự nhiên.
- Hỗ trợ wildcard (`.`) bằng DFS nhánh.
- Thứ tự từ điển miễn phí khi duyệt con theo thứ tự ký tự.

**Hại**
- Tốn bộ nhớ (con trỏ/Map mỗi node).
- Xoá từ phức tạp (phải dọn node không còn dùng).
- Không hỗ trợ tìm "gần đúng" trực tiếp (cần kết hợp DP edit distance trên Trie).

## Use case thực tế

- **Autocomplete / search suggestion:** Google search, IDE (IntelliSense) – Trie + lưu top-k tại mỗi node.
- **Router IP (longest prefix match):** bảng định tuyến dùng Patricia trie trên bit.
- **Bộ lọc từ nhạy cảm / spam:** Aho–Corasick = Trie + failure link, quét văn bản O(n + số khớp).
- **T9 / bàn phím dự đoán, kiểm tra chính tả.**
- **Hệ thống file, URL router:** khớp đường dẫn theo segment.
- **Nén (LZW):** từ điển động dạng trie.

## Lỗi thường gặp

1. `search` quên kiểm tra `isEnd` ⇒ tiền tố cũng trả `true`.
2. Dùng `for (let i...) word[i]` với Unicode (emoji, chữ có dấu tổ hợp) ⇒ tách sai; dùng `for...of`.
3. Tạo node mới ngay cả khi đã có (ghi đè) ⇒ mất nhánh cũ.
4. Xoá từ mà không kiểm tra node còn con/isEnd ⇒ phá từ khác.
5. Dùng object `{}` làm map con với key như `constructor`/`__proto__` ⇒ bug kỳ lạ; dùng `Map` hoặc `Object.create(null)`.

## Biến thể

- **Design Add and Search Words (211):** `.` khớp mọi ký tự ⇒ DFS theo tất cả con.
- **Word Search II (212):** chèn từ điển vào Trie, DFS trên lưới theo Trie ⇒ cắt tỉa cực mạnh.
- **Search Suggestions (1268):** mỗi node lưu tối đa 3 từ đầu theo thứ tự từ điển.
- **Trie đếm:** lưu `count` tại node để trả "bao nhiêu từ có tiền tố p" O(L).
- **Binary Trie:** XOR lớn nhất của hai số (421), bit từ cao tới thấp.
- **Radix tree / Suffix tree:** nén cạnh; suffix tree cho tìm substring O(m).
