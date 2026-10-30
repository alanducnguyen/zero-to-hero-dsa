## Bài toán

Cho danh sách `accounts`, mỗi phần tử có dạng `[name, email1, email2, ...]`. Hai account thuộc **cùng một người** nếu chúng có ít nhất một email chung (quan hệ này **bắc cầu**: A chung email với B, B chung với C ⇒ A, B, C là một người). Hai người khác nhau có thể **trùng tên**, nhưng một người luôn chỉ có một tên. Yêu cầu: gộp lại, mỗi người trả về `[name, ...emails đã sắp tăng dần]`. Đây là LeetCode 721 (Medium) – bài Union-Find kinh điển ở Meta, Google, Amazon.

Ví dụ: `John:[js, jn]`, `John:[js, j0]`, `Mary:[mary]`, `John:[jb]` ⇒ `John:[j0, jn, js]`, `John:[jb]`, `Mary:[mary]`.

## Ý tưởng / Trực giác

Hãy nhìn bài toán như một **đồ thị**: mỗi email là một đỉnh, các email cùng nằm trong một account được nối với nhau. Mỗi **thành phần liên thông** chính là một người thật. Bài toán trở thành "tìm các thành phần liên thông" – việc mà Union-Find (DSU) làm tốt nhất khi các cạnh đến dần từng cái một.

Hai quyết định thiết kế quan trọng:

- **Node là email, không phải tên.** Union theo tên sẽ gộp sai hai người trùng tên. Email mới là định danh duy nhất.
- **Chỉ nối mỗi email với email đầu tiên** của account: k email cần k−1 cạnh dạng hình sao là đủ liên thông, không cần k² cạnh.

## Thuật toán từng bước

1. Duyệt từng account `[name, ...emails]`.
2. Với mỗi email chưa gặp: cấp chỉ số mới `i`, `parent[i] = i`, `size[i] = 1`, ghi `owner[i] = name`.
3. `union(id[emails[0]], id[email])`:
   - `find` hai gốc (có **nén đường**: mọi node trên đường đi được trỏ thẳng vào gốc).
   - Cùng gốc ⇒ bỏ qua. Khác gốc ⇒ gắn gốc của cây **nhỏ hơn** vào gốc cây lớn hơn (**union by size**), cộng dồn size.
4. Sau khi xử lý hết, với mỗi email: `root = find(i)`, thêm email vào `groups[root]`.
5. Mỗi nhóm ⇒ `[owner[root], ...emails.sort()]`. Sắp kết quả theo (tên, email đầu) cho ổn định.

## Chứng minh đúng

**Bất biến:** hai email có cùng gốc ⇔ tồn tại một chuỗi account nối chúng (chung email liên tiếp).

- (⇐) Mọi cạnh của đồ thị đều được gọi `union` (cạnh hình sao vẫn giữ nguyên liên thông vì email đầu nối với tất cả). `union` gộp hai tập ⇒ mọi đỉnh trong cùng thành phần liên thông có cùng gốc.
- (⇒) `union` chỉ được gọi giữa hai email cùng một account, nên hai tập chỉ bị gộp khi thật sự có cạnh nối chúng. Nén đường và union by size chỉ đổi **hình dạng** cây, không đổi tập.

Tên đúng: mọi email trong một thành phần thuộc cùng một người, và đề đảm bảo một người chỉ có một tên ⇒ `owner[root]` là tên đúng.

## Độ phức tạp

Gọi E là tổng số email (kể cả trùng), U là số email khác nhau.

| Giai đoạn | Thời gian | Bộ nhớ |
|---|---|---|
| Xây DSU + union | O(E · α(U)) | O(U) |
| Gom nhóm | O(U · α(U)) | O(U) |
| Sắp email trong nhóm | O(U log U) | O(U) |
| **Tổng** | **O(E α(U) + U log U)** | **O(U)** |

α là hàm Ackermann ngược – ≤ 4 với mọi input thực tế. Phần sắp xếp chiếm ưu thế, nên bài này thực chất là O(n log n).

## Tradeoff

- **Union-Find vs DFS/BFS:** DFS trên đồ thị email cũng O(E + U log U) nhưng phải dựng danh sách kề trước (tốn bộ nhớ hơn) và dễ tràn stack nếu đệ quy. Union-Find xử lý được dữ liệu **đến dần** (online), DFS thì không.
- **Union by size vs rank:** tương đương về lý thuyết; size có thêm thông tin hữu ích (kích thước nhóm).
- **Index hoá email** qua Map rồi dùng mảng `parent[]` nhanh hơn dùng trực tiếp `Map<string, string>` làm parent.

## Lợi / Hại

**Lợi**
- Gần tuyến tính, code ngắn, tái sử dụng template DSU.
- Hỗ trợ thêm account mới bất kỳ lúc nào mà không phải dựng lại.

**Hại**
- Không hỗ trợ **tách** nhóm (xoá email/account) – cần cấu trúc phức tạp hơn.
- Nén đường đệ quy có thể sâu nếu không có union by size; trong JS nên dùng cả hai heuristic hoặc viết find lặp.

## Use case thực tế

- **Identity resolution / entity resolution:** gộp hồ sơ khách hàng từ nhiều hệ thống dựa trên email, số điện thoại, device id chung.
- **Chống gian lận:** phát hiện cụm tài khoản dùng chung thẻ, IP, địa chỉ giao hàng.
- **CRM dedup:** hợp nhất danh bạ trùng lặp khi import từ nhiều nguồn.
- **Social graph:** gom các tài khoản liên kết (đăng nhập bằng nhiều provider OAuth).

## Lỗi thường gặp

- Union theo **tên** ⇒ gộp nhầm hai người trùng tên (preset "Trùng tên, khác người").
- Quên nén đường hoặc union by size ⇒ cây suy biến thành chuỗi, mỗi `find` O(n).
- Gom nhóm theo `parent[i]` thay vì `find(i)` ⇒ node chưa được nén đường bị xếp sai nhóm.
- Quên khử trùng email trong một account ⇒ output có email lặp.
- Không sắp email ⇒ sai format đề yêu cầu.

## Biến thể

- **547 Number of Provinces / 323 Number of Connected Components:** đếm số tập.
- **990 Satisfiability of Equality Equations:** union các `==`, kiểm tra `!=`.
- **1202 Smallest String With Swaps:** union các chỉ số swap được, sắp ký tự trong từng nhóm – cùng khung "union rồi gom nhóm rồi sắp".
- **839 Similar String Groups, 952 Largest Component Size by Common Factor:** node là đối tượng, cạnh do một quan hệ ẩn sinh ra – giống email chung ở đây.
