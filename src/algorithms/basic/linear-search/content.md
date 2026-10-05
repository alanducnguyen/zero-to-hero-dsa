## Bài toán

Cho mảng `a` gồm `n` phần tử (không nhất thiết sắp xếp) và giá trị `target`. Trả về chỉ số **đầu tiên** của `target`, hoặc `-1` nếu không có.

Linear Search hiếm khi là câu hỏi chính, nhưng nó là nền để người phỏng vấn kiểm tra ba thứ: bạn có hiểu Big-O thật sự không, bạn có biết **khi nào** nên dùng thuật toán đơn giản thay vì phức tạp, và bạn có nhận ra tiền đề của Binary Search (mảng phải sắp xếp) hay không.

## Ý tưởng / Trực giác

Không có thông tin gì về thứ tự dữ liệu, bạn không thể "đoán" target nằm ở đâu. Cách duy nhất là nhìn từng ô, từ trái sang phải, dừng khi gặp. Giống như tìm một người trong hàng người xếp lộn xộn: phải nhìn mặt từng người.

Điều quan trọng: với dữ liệu **không sắp xếp**, không thuật toán nào dựa trên so sánh làm tốt hơn O(n) trong trường hợp xấu nhất, vì bất kỳ phần tử nào chưa xem đều có thể là target. Linear Search là **tối ưu** trong hoàn cảnh đó.

## Thuật toán từng bước

1. Với `i` từ `0` đến `n-1`: nếu `a[i] === target` trả về `i`.
2. Hết vòng lặp ⇒ trả `-1`.

Tab **Debug**: ô vàng là ô đang so sánh, ô xám là đã xem qua. Thử preset "Không có (worst)" để thấy phải quét đủ n ô.

## Chứng minh đúng

**Bất biến:** trước khi xét `a[i]`, không phần tử nào trong `a[0..i)` bằng target.

- Khởi tạo: `i = 0`, đoạn rỗng – đúng.
- Duy trì: nếu `a[i] ≠ target`, mở rộng đoạn thêm `a[i]` vẫn đúng. Nếu bằng, trả `i` – và theo bất biến, `i` là chỉ số **đầu tiên**.
- Kết thúc: `i = n` ⇒ không phần tử nào bằng target ⇒ `-1` đúng.

## Độ phức tạp

| Trường hợp | Thời gian | Giải thích |
|---|---|---|
| Tốt nhất | O(1) | Target ở `a[0]` |
| Trung bình | O(n) | Kỳ vọng ~n/2 so sánh nếu target có mặt và phân bố đều |
| Xấu nhất | O(n) | Target ở cuối hoặc không tồn tại |
| Bộ nhớ | O(1) | Chỉ một biến đếm |

## Tradeoff

- **Linear O(n) ↔ Binary O(log n):** Binary Search cần mảng sắp xếp. Sắp xếp tốn O(n log n) – chỉ đáng nếu tìm nhiều lần. Tìm **một lần** trên dữ liệu thô: Linear Search thắng.
- **Linear ↔ HashMap O(1):** HashMap cần O(n) bộ nhớ phụ và O(n) để xây. Tìm nhiều lần ⇒ HashMap; tìm một lần ⇒ Linear.
- **n nhỏ:** với n < ~32, Linear Search thường **nhanh hơn Binary Search thực tế** nhờ truy cập tuần tự (prefetch, cache line) và không có branch misprediction. Nhiều thư viện chuyển sang quét tuyến tính khi đoạn nhỏ.
- **Dữ liệu không có truy cập ngẫu nhiên** (linked list, stream, file tuần tự): Linear là lựa chọn duy nhất.

## Lợi / Hại

**Lợi**
- Không yêu cầu gì về dữ liệu: không sắp xếp, không băm được, không truy cập ngẫu nhiên.
- Code không thể sai, O(1) bộ nhớ, dừng sớm khi gặp.
- Trả về chỉ số **đầu tiên** một cách tự nhiên (Binary Search cần biến thể lower bound).

**Hại**
- O(n) mỗi truy vấn – không chấp nhận được khi n lớn và truy vấn nhiều.
- Không tận dụng được cấu trúc dữ liệu nếu có.

## Use case thực tế

- **Mảng nhỏ trong hot path:** tìm trong danh sách < 50 phần tử (header HTTP, tham số, enum) – mọi framework đều làm vậy.
- **`Array.prototype.indexOf`, `includes`, `find`** trong JavaScript đều là Linear Search.
- **Stream / log:** đọc file tuần tự tìm dòng thoả điều kiện (`grep`).
- **Database:** full table scan khi không có index, hoặc khi bảng nhỏ đến mức index không đáng.
- **Fallback:** khi dữ liệu vừa bị thay đổi và index chưa kịp cập nhật.

## Lỗi thường gặp

1. Dùng `==` thay `===` trong JS ⇒ `"4" == 4` là true, so sánh sai kiểu.
2. Quên trả `-1` sau vòng lặp ⇒ trả `undefined`.
3. Dùng `for...in` trên mảng (lấy key dạng string) thay vì `for` hoặc `for...of`.
4. Trả về chỉ số cuối cùng thay vì đầu tiên khi tiếp tục duyệt sau khi gặp.
5. Dùng Linear Search trong vòng lặp lồng (O(n²)) khi HashMap cho O(n) – lỗi kinh điển ở bài Two Sum.

## Biến thể

- **Sentinel search:** đặt target vào `a[n]` để bỏ kiểm tra `i < n`, giảm 1 phép so sánh/vòng.
- **Tìm tất cả vị trí:** không return sớm, gom vào mảng.
- **Tìm theo điều kiện (`find`, `findIndex`):** truyền predicate thay vì so sánh bằng.
- **Tìm min/max:** cùng cấu trúc, đổi điều kiện – O(n) và không thể tốt hơn.
- **Song song:** chia mảng cho k luồng, mỗi luồng quét tuyến tính – Linear Search là "embarrassingly parallel".
