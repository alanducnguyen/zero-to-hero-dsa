## Bài toán

Cho `beginWord`, `endWord` và danh sách `wordList`. Mỗi bước được đổi **đúng một ký tự** của từ hiện tại, và từ mới phải nằm trong `wordList`. Hỏi chuỗi biến đổi ngắn nhất từ `beginWord` tới `endWord` gồm bao nhiêu **từ** (tính cả hai đầu). Nếu không có chuỗi nào, trả về `0`.

Ví dụ: `hit → hot → dot → dog → cog` gồm 5 từ ⇒ đáp án `5`. Nếu bỏ `cog` khỏi `wordList` thì đáp án là `0`, vì từ đích cũng phải hợp lệ.

## Ý tưởng / Trực giác

Hãy nhìn mỗi từ là một **đỉnh**, hai từ khác nhau đúng một ký tự thì có **cạnh**. Bài toán trở thành: tìm đường đi ít cạnh nhất trên đồ thị **không trọng số** ⇒ đó chính là việc của **BFS**.

Khó khăn nằm ở chỗ đồ thị **không được cho sẵn** (đồ thị ngầm – implicit graph). Cách ngây thơ là so mọi cặp từ: O(n²·L), với n = 5000 từ thì 25 triệu phép so sánh chuỗi. Mẹo kinh điển là gom từ theo **pattern wildcard**: thay ký tự thứ i bằng `*`. `hot` thuộc ba bucket `*ot`, `h*t`, `ho*`. Hai từ là hàng xóm **khi và chỉ khi** chúng có chung ít nhất một pattern. Vậy muốn tìm hàng xóm của một từ, chỉ cần sinh L pattern của nó và đọc các bucket tương ứng.

## Thuật toán từng bước

1. Đưa `wordList` vào `Set`. Nếu `endWord` không có trong đó ⇒ trả về `0` ngay.
2. Tiền xử lý: với mỗi từ `w` và mỗi vị trí `i`, thêm `w` vào `buckets[w[0..i) + '*' + w(i..]]`.
3. Khởi tạo `dist[beginWord] = 1`, queue = `[beginWord]`.
4. Lặp khi queue còn phần tử: lấy `word` ở đầu queue.
   - Nếu `word === endWord` ⇒ trả về `dist[word]`.
   - Với mỗi vị trí `i`, sinh pattern `p`, duyệt mọi `next` trong `buckets[p]`: nếu chưa có `dist` thì gán `dist[next] = dist[word] + 1` và đẩy vào queue.
   - Xoá `buckets[p]` sau khi duyệt: mọi từ trong bucket đó đã được đánh dấu, lần sau duyệt lại cũng vô ích.
5. Queue rỗng mà chưa tới đích ⇒ trả về `0`.

## Chứng minh đúng

**Bất biến BFS:** queue luôn chứa các đỉnh theo thứ tự `dist` không giảm, và chênh lệch giữa đầu và cuối queue tối đa là 1. Do đó khi một từ được gán `dist` lần đầu, giá trị đó bằng độ dài đường ngắn nhất: nếu tồn tại đường ngắn hơn, đỉnh liền trước trên đường đó có `dist` nhỏ hơn và đã được lấy ra trước, nên đã đánh dấu từ này sớm hơn – mâu thuẫn.

**Tính đúng của bucket:** `a` và `b` cùng độ dài khác nhau đúng ở vị trí `i` ⇔ chúng có chung pattern thứ `i`. Vậy duyệt các bucket của `word` liệt kê **đầy đủ** và **chỉ** các hàng xóm (cộng thêm chính `word`, vốn đã có `dist` nên bị bỏ qua).

**Xoá bucket an toàn:** sau khi duyệt bucket `p`, mọi từ trong đó đã có `dist`. Một từ khác chạm tới `p` sau này cũng sẽ chỉ thấy các từ đã thăm ⇒ bỏ đi không làm mất đường nào.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Tiền xử lý bucket | O(n·L²) – n·L pattern, mỗi pattern dựng chuỗi O(L) | O(n·L²) |
| BFS | O(n·L²) – mỗi từ sinh L pattern; mỗi bucket duyệt tối đa 1 lần | O(n) cho queue + dist |
| So từng cặp (ngây thơ) | O(n²·L) | O(n²) nếu dựng cạnh |
| Thử 26 chữ cái mỗi vị trí | O(n·L·26·L) | O(n) |

Với n lớn và L nhỏ (bài thường có L ≤ 10, n ≤ 5000) cách bucket nhanh hơn hẳn so từng cặp.

## Tradeoff

- **Bucket wildcard vs. thử 26 chữ cái:** thử 26 chữ cái không cần bộ nhớ phụ cho bucket nhưng phụ thuộc kích thước bảng chữ cái; với Unicode hay DNA (4 chữ) thì tính toán khác hẳn. Bucket không quan tâm alphabet.
- **BFS một chiều vs. hai chiều:** BFS hai chiều (từ cả `beginWord` và `endWord`, luôn mở rộng phía nhỏ hơn) giảm số đỉnh duyệt từ b^d xuống khoảng 2·b^(d/2). Đổi lại code phức tạp hơn.
- **Đếm từ hay đếm bước:** đề hỏi số từ, nên khởi tạo `dist = 1`. Nhầm thành 0 là lỗi off-by-one rất hay gặp.

## Lợi / Hại

**Lợi**
- Đảm bảo đường ngắn nhất, dừng ngay khi chạm đích.
- Không cần dựng danh sách cạnh tường minh.
- Kỹ thuật bucket áp dụng cho mọi đồ thị "khác một vị trí".

**Hại**
- Tốn bộ nhớ O(n·L²) cho chuỗi pattern.
- BFS một chiều có thể bùng nổ số đỉnh khi đồ thị dày.
- Muốn liệt kê **mọi** đường ngắn nhất (Word Ladder II) phải lưu thêm cha và quay lui, khó hơn nhiều.

## Use case thực tế

- **Gợi ý sửa lỗi chính tả:** tìm từ trong từ điển cách từ gõ sai một lần thay ký tự; bucket wildcard chính là index tra nhanh.
- **Sinh học:** đột biến gen tối thiểu (Minimum Genetic Mutation) – chuỗi DNA khác nhau một nucleotide.
- **Giải đố / game:** khoá số (Open the Lock), trạng thái câu đố – mọi bài "trạng thái + một phép biến đổi đơn vị + ít bước nhất" đều là BFS trên đồ thị ngầm.

## Lỗi thường gặp

- Quên kiểm tra `endWord` thuộc `wordList` ⇒ trả về độ dài sai.
- Đánh dấu đã thăm lúc **lấy ra** khỏi queue thay vì lúc **đẩy vào** ⇒ một từ bị đẩy nhiều lần, queue phình to và có thể TLE.
- Dùng `Array.shift()` làm queue: O(n) mỗi lần trong JS. Dùng con trỏ `head`.
- Trả về số bước (cạnh) thay vì số từ.
- Dùng DFS: tìm được đường nhưng không đảm bảo ngắn nhất, và dễ bùng nổ tổ hợp.

## Biến thể

- **Word Ladder II (LC 126):** trả về mọi chuỗi ngắn nhất – BFS theo tầng ghi lại các cha, rồi DFS quay lui từ đích.
- **Bidirectional BFS:** hai tập frontier, luôn mở rộng tập nhỏ hơn, dừng khi hai tập giao nhau.
- **Minimum Genetic Mutation (LC 433), Open the Lock (LC 752):** cùng khung BFS trên trạng thái chuỗi.
- **Trọng số khác nhau cho từng phép đổi:** chuyển sang Dijkstra.
