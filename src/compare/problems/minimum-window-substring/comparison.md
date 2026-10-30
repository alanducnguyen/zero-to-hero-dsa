## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Kiểm tra hợp lệ | Tái dùng công đã làm |
|---|---|---|---|---|
| Brute force mọi substring | O(n²·σ) | O(σ) | So cả bảng O(σ) | Chỉ trong cùng i |
| Mở rộng right cho mỗi left | O(n²) | O(σ) | Bộ đếm `missing` O(1) | Không – làm lại cho mỗi left |
| Sliding window need/missing | O(n + m) | O(σ) | `missing` O(1) | Có – bảng đếm dùng suốt |

## Phân tích

**Brute force** xét đủ n(n+1)/2 substring. Đếm tăng dần theo j đã tránh được O(n) cho mỗi substring (nếu dựng lại bảng đếm từ đầu thì là O(n³)), nhưng mỗi lần vẫn phải so cả bảng `need` – σ phép so. Nó cũng không biết dừng: khi s[i..j] đã hợp lệ, mọi j lớn hơn chắc chắn dài hơn nhưng vẫn bị xét.

**Mở rộng right cho mỗi left** sửa hai chỗ đó: biến `missing` (tổng số ký tự còn thiếu) chỉ giảm khi gặp ký tự *đang thiếu*, nên "hợp lệ chưa?" thành câu hỏi O(1); và `break` ngay khi hợp lệ vì đó là cửa sổ ngắn nhất bắt đầu tại left. Nhưng khi chuyển sang left + 1 ta vứt bỏ toàn bộ bảng đếm, trong khi cửa sổ [left + 1, right] chỉ khác đúng một ký tự. Với chuỗi mà cửa sổ hợp lệ dài (t rải rác hai đầu s), mỗi left quét gần hết s ⇒ O(n²).

**Sliding window** khai thác tính **đơn điệu**: nếu [l, r] hợp lệ thì [l, r + 1] cũng hợp lệ; nếu [l, r] chưa hợp lệ thì [l + 1, r] cũng không. Vì vậy right không bao giờ cần lùi, left không bao giờ cần lùi – mỗi ký tự vào cửa sổ một lần và ra một lần, tổng ≤ 2n bước, mỗi bước O(1). Đây là bước nhảy từ O(n²) xuống O(n): thay vì *làm lại* cho mỗi left, ta *cập nhật* trạng thái khi left tiến một bước.

## Xếp hạng

1. **Sliding window** – O(n + m). Đáp án mong đợi ở phỏng vấn Hard.
2. **Mở rộng right** – O(n²), đúng và ngắn; dùng để dẫn tới ý "giữ lại bảng đếm".
3. **Brute force** – O(n²·σ), chỉ để khởi động và làm oracle khi test.

## Khi nào thứ hạng đổi

- **s rất ngắn (≤ vài chục) và t lớn**: cả ba gần như bằng nhau; brute force dễ viết đúng nhất cho script một lần.
- **Điều kiện không đơn điệu** (vd "đúng bằng" thay vì "ít nhất", hoặc có số âm khi bài chuyển sang tổng): sliding window không còn đúng, phải quay về O(n²) hoặc prefix sum + HashMap.
- **σ lớn (Unicode) và chuỗi ngắn**: chi phí HashMap chiếm ưu thế; mảng đếm cố định chỉ có lợi khi σ nhỏ (128).
- **s chỉ chứa ít ký tự thuộc t**: biến thể "filtered s" (chỉ giữ vị trí ký tự thuộc t) làm sliding window nhanh hơn về hằng số, cùng O(n).
