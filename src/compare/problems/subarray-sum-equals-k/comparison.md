## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Ý chính | Hạng |
|---|---|---|---|---|
| Brute force 3 vòng | O(n³) | O(1) | Mỗi (i, j) cộng lại từ đầu | 4 |
| Cộng dồn từ mỗi i | O(n²) | O(1) | Tổng [i..j] = tổng [i..j−1] + nums[j] | 3 |
| Mảng prefix + 2 vòng | O(n²) | O(n) | Tổng [i..j−1] = prefix[j] − prefix[i] | 2 |
| Prefix sum + HashMap | O(n) | O(n) | Đếm số tiền tố bằng sum − k | 1 |

## Phân tích

**Brute force O(n³)** lãng phí ở chỗ tổng `[i..j]` và `[i..j−1]` chỉ khác nhau một phần tử nhưng bị tính lại từ đầu. Nó chỉ có giá trị làm rõ đề.

**Cộng dồn O(n²)** sửa đúng chỗ đó: giữ `sum` khi kéo dài `j`. Đây là lời giải O(1) bộ nhớ tốt nhất. Chú ý **không được `break`** khi `sum > k` – với số âm, tổng có thể giảm lại về `k`.

**Mảng prefix + 2 vòng** cũng O(n²) và còn tốn O(n) bộ nhớ, nên về hiệu năng thuần thì *không hơn* cộng dồn. Nó xếp trên vì là **bước tư duy** dẫn tới lời giải tối ưu: khi viết `prefix[j] − prefix[i] = k`, ta thấy với mỗi `j` chỉ cần *đếm* số `i < j` có `prefix[i] = prefix[j] − k` – một câu hỏi tần suất, trả lời O(1) bằng HashMap. Ngoài ra mảng prefix trả lời được **nhiều truy vấn tổng đoạn** bất kỳ trong O(1).

**Prefix sum + HashMap O(n)** gộp vòng trong vào một lần tra map. Hai chi tiết sống còn: khởi tạo `{0: 1}` (tiền tố rỗng, để đếm mảng con bắt đầu từ 0) và **tra trước rồi mới ghi** (để `k = 0` không đếm mảng con rỗng).

## Vì sao sliding window thất bại

Sliding window cần tính **đơn điệu**: mở rộng cửa sổ thì tổng tăng, thu hẹp thì tổng giảm, nên khi `sum > k` ta yên tâm bỏ phần tử trái. Với số âm điều đó sai: ví dụ `nums = [3, 4, −7, 1, 3, 3, 1, −4], k = 7`. Ở cửa sổ `[3, 4]` tổng đã bằng 7; thêm `−7` tổng tụt xuống 0 rồi lại tăng – không có quy tắc nào cho biết lúc nào nên co trái. Với số 0, nhiều cửa sổ cùng tổng bị bỏ sót. Chỉ khi **mọi phần tử > 0** thì sliding window O(n)/O(1) mới đúng – lúc đó nó thắng HashMap về bộ nhớ.

## Khi nào thứ hạng đổi

- **Toàn số dương** ⇒ sliding window O(n)/O(1) lên hạng 1.
- **Cấm bộ nhớ phụ, n ≤ vài nghìn** ⇒ cộng dồn O(n²)/O(1) là lựa chọn hợp lý.
- **Nhiều truy vấn "tổng đoạn [l, r]"** trên mảng cố định ⇒ mảng prefix là cấu trúc cần có.
- **Ma trận 2D** (LeetCode 1074) ⇒ cố định cặp hàng O(n²) rồi chạy HashMap trên mảng cột – kết hợp cả hai.
