## Bài toán

Cho lưới `m × n`: ô `0` trống, ô `1` là cam tươi, ô `2` là cam thối. Mỗi phút, mọi cam thối làm thối các cam tươi **kề 4 hướng** với nó. Hỏi sau **ít nhất bao nhiêu phút** thì không còn cam tươi? Nếu có cam không bao giờ bị thối, trả về `-1`.

Đây là bài "kinh điển" của Amazon (LeetCode 994) và là ví dụ chuẩn của **multi-source BFS**: thay vì lan từ một điểm như BFS shortest path, ta lan **đồng thời** từ nhiều nguồn.

## Ý tưởng / Trực giác

Hình dung nhiều viên đá cùng rơi xuống mặt hồ cùng lúc: các vòng sóng lan ra **song song**, và một điểm trên mặt nước bị sóng chạm lần đầu bởi viên đá **gần nhất**. Thời điểm cam `(r,c)` bị thối chính là **khoảng cách ngắn nhất** từ nó tới cam thối gần nhất (đi qua cam tươi). Đáp án = khoảng cách lớn nhất trong số đó.

Chạy BFS riêng từ từng cam thối rồi lấy min sẽ tốn O(k·m·n). Mẹo: đưa **tất cả** cam thối vào queue ở phút 0 – giống như có một "siêu nguồn" ảo nối tới mọi cam thối bằng cạnh trọng số 0. Một lần BFS duy nhất cho đúng khoảng cách tới nguồn gần nhất của mọi ô.

Để đếm phút, ta xử lý **theo tầng**: trước mỗi phút chụp `size = số phần tử đang có trong queue`, chỉ lấy đúng `size` phần tử đó. Cam mới thối trong phút này được đẩy vào cuối queue và thuộc tầng sau.

## Thuật toán từng bước

1. Quét lưới: đẩy mọi ô `2` vào queue, đếm số cam tươi `fresh`.
2. `minutes = 0`. Lặp khi queue còn phần tử **và** `fresh > 0`:
   - `size = queue.length - head` (số cam thối của tầng hiện tại).
   - Lấy lần lượt `size` ô; với mỗi hàng xóm là cam tươi: đánh dấu `2`, `fresh--`, đẩy vào queue.
   - `minutes++`.
3. Nếu `fresh === 0` trả `minutes`, ngược lại `-1`.

Điều kiện `fresh > 0` trong vòng lặp rất quan trọng: nếu không có nó, tầng cuối cùng (không lây được ai) vẫn bị đếm thêm 1 phút thừa.

Tab **Debug**: ô vàng `●` là cam tươi, ô đỏ ghi số phút cam bị thối, ô cyan là frontier đang nằm trong queue, ô tím là cam đang lan, ô xanh dương là cam vừa bị lây.

## Chứng minh đúng

**Bất biến:** sau `t` vòng lặp, các ô đã bị đánh dấu `2` là **đúng** tập ô có khoảng cách (tới cam thối ban đầu gần nhất) `≤ t`, và queue chứa đúng các ô có khoảng cách bằng `t`.

- `t = 0`: queue = các cam thối ban đầu – khoảng cách 0. Đúng.
- Giả sử đúng với `t`. Một ô tươi có khoảng cách `t+1` ⇔ nó kề một ô có khoảng cách `t` (đường ngắn nhất đi qua ô liền trước). Vòng lặp thứ `t+1` duyệt hết mọi ô khoảng cách `t` và lây cho mọi hàng xóm tươi ⇒ đúng tập ô khoảng cách `t+1`. Ô có khoảng cách nhỏ hơn đã bị đánh dấu nên không bị đẩy lại.

Vậy vòng lặp dừng khi `fresh = 0` ở `t` = khoảng cách lớn nhất – đó chính là thời gian tối thiểu (không thể nhanh hơn vì cam lan đúng 1 ô/phút). Nếu queue rỗng mà `fresh > 0`, những cam còn lại không nằm trong thành phần liên thông nào chứa cam thối ⇒ `-1`.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(m·n) | Quét lưới 1 lần + mỗi ô vào queue tối đa 1 lần, xét 4 hàng xóm |
| Bộ nhớ | O(m·n) | Queue (xấu nhất gần như mọi ô) + bản sao lưới |
| So với BFS từng nguồn | O(k·m·n) | k = số cam thối ban đầu – multi-source tiết kiệm hệ số k |

## Tradeoff

- **Sửa lưới tại chỗ ↔ bản sao:** code tạo bản sao `g` để không phá input (an toàn, dễ test). Sửa trực tiếp `grid` tiết kiệm O(m·n) bộ nhớ – hỏi người phỏng vấn có được phép không.
- **Đếm tầng ↔ lưu thời gian từng ô:** lưu `time[r][c]` cho phép trả lời "cam này thối lúc nào", nhưng tốn thêm mảng; đếm tầng bằng `size` gọn hơn khi chỉ cần đáp án.
- **BFS ↔ mô phỏng từng phút:** mô phỏng ngây thơ (mỗi phút quét lại cả lưới) là O((m·n)²) trong trường hợp xấu (lưới hình rắn). BFS chỉ chạm mỗi ô một lần.
- **BFS ↔ DFS:** DFS không cho khoảng cách ngắn nhất từ nhiều nguồn; phải cập nhật lại nhiều lần, phức tạp và chậm.

## Lợi / Hại

**Lợi**
- Tuyến tính, một lần BFS cho mọi nguồn.
- Không đệ quy, không lo tràn stack.
- Template tầng dùng lại được cho mọi bài "lan toả theo thời gian".

**Hại**
- Bộ nhớ O(m·n) cho queue.
- Chỉ đúng khi mỗi bước lan tốn cùng thời gian; nếu tốc độ lan khác nhau theo ô ⇒ cần Dijkstra.

## Use case thực tế

- **Mô phỏng dịch tễ / cháy rừng:** nhiều ổ dịch hoặc điểm cháy lan đồng thời.
- **Bản đồ khoảng cách (distance transform):** xử lý ảnh, mỗi pixel → khoảng cách tới biên gần nhất.
- **Game:** tính vùng ảnh hưởng, "flow field" cho hàng trăm unit cùng tìm đường về nhiều mục tiêu.
- **Hạ tầng:** khoảng cách từ mỗi nhà tới trạm cứu hoả / cửa hàng gần nhất (Walls and Gates).
- **Mạng:** lan truyền thông tin từ nhiều node seed, ước lượng thời gian hội tụ.

## Lỗi thường gặp

1. Chạy BFS riêng cho từng cam thối ⇒ chậm và dễ sai khi lấy min.
2. Không chụp `size` trước vòng `for` ⇒ cam vừa thối lan tiếp ngay trong cùng phút.
3. Đếm thừa 1 phút ở tầng cuối (thiếu điều kiện `fresh > 0` hoặc trả `minutes - 1` sai chỗ).
4. Quên trường hợp không có cam tươi ⇒ phải trả `0`, không phải `-1`.
5. Đánh dấu thối khi **lấy ra** thay vì khi **đẩy vào** ⇒ một cam bị đẩy nhiều lần, `fresh` bị trừ nhiều lần.
6. Dùng `queue.shift()` O(n) trong JS.

## Biến thể

- **542 – 01 Matrix:** khoảng cách mỗi ô tới số 0 gần nhất – multi-source từ mọi ô 0.
- **286 – Walls and Gates:** khoảng cách tới cổng gần nhất.
- **1162 – As Far from Land as Possible:** max của khoảng cách tới đất gần nhất.
- **934 – Shortest Bridge:** DFS tô một đảo, rồi multi-source BFS từ cả đảo đó.
- **Có trọng số / tốc độ lan khác nhau:** multi-source Dijkstra (đẩy mọi nguồn vào heap với khoảng cách 0).
