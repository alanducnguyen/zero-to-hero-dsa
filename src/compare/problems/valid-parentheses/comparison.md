## Phân tích

Cả ba lời giải đều khai thác cùng một tính chất: chuỗi ngoặc hợp lệ có cấu trúc **lồng nhau LIFO** – ngoặc mở sau cùng phải được đóng đầu tiên. Khác nhau ở *cách lưu* các ngoặc đang chờ.

**Xoá cặp lặp lại** dựa trên nhận xét: chuỗi hợp lệ khác rỗng luôn chứa một cặp kề nhau `()`, `[]` hoặc `{}`; xoá nó đi, phần còn lại vẫn hợp lệ (và ngược lại). Lặp đến điểm bất động rồi kiểm tra rỗng. Đúng cho cả ba loại ngoặc, nhưng mỗi vòng có thể chỉ bóc được **một tầng** lồng nhau: `"((((…))))"` độ sâu n/2 cần n/2 vòng, mỗi vòng ba lượt `replaceAll` O(n) và cấp phát chuỗi mới ⇒ **O(n²)** thời gian, áp lực GC lớn. Không cho biết lỗi ở đâu.

**Recursive descent** coi chuỗi là văn phạm `S → (mở S đóng)*`. Gặp ngoặc mở thì ghi nhớ ngoặc đóng mong đợi vào biến cục bộ `want`, gọi đệ quy đọc phần trong, rồi đòi `s[i] === want`. Mỗi ký tự đọc đúng một lần ⇒ **O(n)**. Thực chất stack vẫn ở đó – là **call stack**, mỗi khung giữ một `want`. Hệ quả: độ sâu đệ quy bằng độ lồng, chuỗi `"(" × 50 000 + ")" × 50 000` sẽ ném `RangeError: Maximum call stack size exceeded` trên V8. Giá trị lớn của nó: đây là khung của mọi parser thật (biểu thức số học, JSON, Basic Calculator), nên nêu ra cho thấy bạn hiểu *vì sao* stack xuất hiện.

**Stack + map cặp** đưa stack ra heap một cách tường minh: push ngoặc mở, gặp ngoặc đóng thì pop và so với `pair[ch]`. Một lượt **O(n)**, dừng ngay tại lỗi đầu tiên, không giới hạn độ sâu. Biến thể tương đương là **stack ngoặc đóng mong đợi** (gặp `(` thì push `)`, gặp ngoặc đóng thì so trực tiếp `stack.pop() === ch`) – bỏ được map nhưng logic y hệt; chọn bản nào là sở thích, bản map dễ mở rộng thêm loại ngoặc hơn.

## Bảng tóm tắt

| Lời giải | Thời gian | Bộ nhớ | Rủi ro |
|---|---|---|---|
| Xoá cặp lặp lại | O(n²) | O(n) chuỗi tạm mỗi vòng | Chậm, GC, không chỉ vị trí lỗi |
| Recursive descent | O(n) | O(n) call stack | Tràn stack khi lồng sâu |
| Stack + map | O(n) | O(n) heap | Quên một trong ba điều kiện biên |

## Vì sao không dùng counter?

Với **một** loại ngoặc, chỉ cần biến đếm `open`: `+1` khi mở, `−1` khi đóng, âm là sai, cuối phải bằng 0 – O(1) bộ nhớ, tốt hơn stack. Nhưng với nhiều loại, ba counter riêng không phát hiện được đan chéo `"([)]"`: counter mỗi loại đều cân bằng, mà thứ tự đóng sai. Thông tin cần thiết là **thứ tự** các ngoặc đang mở – đúng thứ stack lưu. Nói được điểm này cho thấy bạn hiểu giới hạn của từng cấu trúc dữ liệu.

## Xếp hạng

1. **Stack + map** – O(n)/O(n), an toàn với mọi độ sâu. Đáp án nên chốt.
2. **Recursive descent** – O(n) nhưng phụ thuộc call stack; hợp lý khi bài là parser và độ lồng nhỏ.
3. **Xoá cặp lặp lại** – O(n²), chỉ để khởi động.

## Khi nào thứ hạng đổi

- Chỉ một loại ngoặc ⇒ **counter** O(1) bộ nhớ thắng stack.
- Cần parse/evaluate nội dung bên trong ngoặc (Basic Calculator, Decode String) ⇒ recursive descent thường gọn nhất.
- Luồng dữ liệu cực lớn, độ lồng lớn ⇒ chỉ stack tường minh (hoặc counter nếu một loại) là an toàn.
