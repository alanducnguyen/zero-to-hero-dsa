## Bài toán

Cho mảng `n` số nguyên, sắp xếp tăng dần. Bubble Sort là thuật toán đầu tiên hầu hết mọi người học, không phải vì nó nhanh (nó rất chậm) mà vì nó dạy ta cách **tư duy bằng bất biến vòng lặp (loop invariant)** – kỹ năng mà người phỏng vấn ở Google, Meta luôn kiểm tra khi hỏi "tại sao code của bạn đúng?".

## Ý tưởng / Trực giác

Hãy tưởng tượng các bong bóng trong nước: bong bóng to nổi lên trên nhanh nhất. Ở đây, mỗi lượt duyệt ta so sánh từng cặp kề nhau và đổi chỗ nếu sai thứ tự. Kết quả: phần tử **lớn nhất** của đoạn chưa sắp xếp "nổi" về cuối mảng sau mỗi lượt.

Sau lượt 1, phần tử lớn nhất đã đúng chỗ. Sau lượt 2, hai phần tử lớn nhất đúng chỗ. Cứ thế, sau `n-1` lượt toàn bộ mảng được sắp xếp.

## Thuật toán từng bước

1. Lặp `i` từ `0` đến `n-2` (mỗi lượt cố định thêm 1 phần tử ở cuối).
2. Trong mỗi lượt, lặp `j` từ `0` đến `n-2-i`: so sánh `a[j]` và `a[j+1]`, hoán đổi nếu `a[j] > a[j+1]`.
3. Nếu một lượt không có hoán đổi nào ⇒ mảng đã có thứ tự, dừng sớm.

Hãy bật tab **Debug** và bấm từng bước: chú ý vùng màu xanh ở cuối mảng lớn dần sau mỗi lượt – đó chính là bất biến.

## Chứng minh đúng (loop invariant)

**Bất biến:** Trước khi bắt đầu lượt `i`, `i` phần tử cuối (`a[n-i..n-1]`) đã là `i` phần tử lớn nhất của mảng và đã đúng thứ tự.

- **Khởi tạo:** `i = 0`, đoạn rỗng – đúng hiển nhiên.
- **Duy trì:** Trong lượt `i`, con trỏ `j` quét `0..n-2-i`. Sau mỗi bước, `a[j+1]` là max của `a[0..j+1]` (quy nạp theo `j`). Kết thúc lượt, `a[n-1-i]` là max của phần chưa sắp xếp ⇒ bất biến đúng cho `i+1`.
- **Kết thúc:** `i = n-1` ⇒ `n-1` phần tử cuối đúng chỗ, phần tử còn lại tất yếu là nhỏ nhất ⇒ mảng sắp xếp.

Khi phỏng vấn, chỉ cần nói được 3 ý "khởi tạo – duy trì – kết thúc" là bạn đã ghi điểm hơn 80% ứng viên.

## Độ phức tạp

| Trường hợp | Thời gian | Giải thích |
|---|---|---|
| Tốt nhất | O(n) | Mảng đã sắp xếp: lượt đầu không hoán đổi ⇒ dừng sớm (cần cờ `swapped`) |
| Trung bình | O(n²) | Khoảng n²/4 hoán đổi |
| Xấu nhất | O(n²) | Mảng giảm dần: n(n-1)/2 so sánh và hoán đổi |
| Bộ nhớ | O(1) | Sắp xếp tại chỗ (in-place) |

## Tradeoff

- **Đơn giản ↔ Hiệu năng:** cực dễ viết đúng, nhưng O(n²) khiến nó vô dụng với n > vài nghìn.
- **Stable:** vì chỉ hoán đổi khi `a[j] > a[j+1]` (không phải `>=`), các phần tử bằng nhau giữ nguyên thứ tự tương đối. Đổi thành `>=` sẽ mất tính stable – một câu hỏi bẫy phổ biến.
- **Adaptive:** nhờ cờ `swapped`, mảng "gần sắp xếp" chạy nhanh. Không có cờ thì luôn O(n²).

## Lợi / Hại

**Lợi**
- Code 10 dòng, khó sai.
- In-place, stable, adaptive.
- Dễ phát hiện mảng đã sắp xếp.

**Hại**
- Số lần hoán đổi lớn (mỗi hoán đổi là 3 phép gán) ⇒ chậm hơn Insertion Sort dù cùng O(n²).
- Không tận dụng được cache tốt như Insertion Sort.
- Không có ứng dụng thực tế cho dữ liệu lớn.

## Use case thực tế

- **Giáo dục & phỏng vấn:** dùng để kiểm tra khả năng phân tích, chứng minh đúng, nhận biết stable/in-place.
- **Dữ liệu rất nhỏ hoặc gần sắp xếp:** vài chục phần tử gần đúng thứ tự (ví dụ danh sách đã sort cần chèn thêm 1–2 phần tử).
- **Đồ họa máy tính:** phát hiện và sửa lỗi thứ tự rất nhỏ trong polygon fill (nổi tiếng với tên "odd-even sort" trên GPU song song).

## Lỗi thường gặp

- Chạy `j` tới `n-1` thay vì `n-2-i` ⇒ truy cập `a[n]` (undefined) và so sánh sai.
- Quên cờ `swapped` ⇒ mất best case O(n).
- Dùng `>=` ⇒ mất stable.
- Sửa trực tiếp mảng đầu vào khi hàm được kỳ vọng pure.

## Biến thể

- **Cocktail Shaker Sort:** quét hai chiều, xử lý tốt "con rùa" (phần tử nhỏ ở cuối di chuyển rất chậm trong Bubble Sort thường).
- **Odd-Even Sort:** phiên bản song song hóa, mỗi bước so sánh các cặp chẵn rồi cặp lẻ.
- **Comb Sort:** so sánh với khoảng cách giảm dần (gap), tiến gần O(n log n) trong thực tế.
