## Bài toán

Cho mảng số nguyên `nums` **chưa sắp xếp** (có thể trùng, có thể âm). Tìm độ dài dãy dài nhất gồm các số nguyên **liên tiếp nhau về giá trị** (x, x+1, x+2, …), không quan tâm vị trí của chúng trong mảng. Yêu cầu của LeetCode 128: thuật toán chạy trong **O(n)**.

Ví dụ: `[100, 4, 200, 1, 3, 2]` ⇒ dãy `1, 2, 3, 4` ⇒ đáp án **4**. Mảng rỗng ⇒ **0**.

## Ý tưởng / Trực giác

Cách tự nhiên nhất là **sắp xếp** rồi quét một lượt đếm đoạn tăng đều 1 — đúng nhưng tốn O(n log n). Muốn O(n) ta phải bỏ sắp xếp, và câu hỏi duy nhất ta thực sự cần trả lời là: *"giá trị v có xuất hiện không?"* ⇒ HashSet trả lời trong O(1).

Phiên bản ngây thơ: với mỗi x, đếm x+1, x+2, … cho đến khi hụt. Với input `[1, 2, …, n]`, phần tử 1 đi n bước, phần tử 2 đi n−1 bước… ⇒ **O(n²)**. Lãng phí nằm ở chỗ ta đếm lại cùng một dãy từ giữa chừng.

Mẹo then chốt: **chỉ bắt đầu đếm từ đầu dãy**. x là đầu dãy ⇔ `x − 1` không có trong set. Nếu `x − 1` có mặt thì x nằm giữa một dãy dài hơn bắt đầu sớm hơn — dãy đó sẽ được đếm trọn vẹn khi vòng lặp chạm tới đầu dãy của nó, nên đếm từ x là thừa.

## Thuật toán từng bước

1. Đưa toàn bộ `nums` vào `set` (loại trùng, tra cứu O(1)).
2. `best = 0`.
3. Duyệt từng `x` **trong set** (không phải trong nums):
   - Nếu `set.has(x − 1)` ⇒ x không phải đầu dãy ⇒ bỏ qua.
   - Ngược lại `len = 1`; trong khi `set.has(x + len)` thì `len++`.
   - `best = max(best, len)`.
4. Trả về `best`.

## Chứng minh đúng

**Không bỏ sót:** gọi dãy dài nhất là `a, a+1, …, a+L−1`. Vì là dãy *tối đại* nên `a − 1` không thuộc set ⇒ `a` là đầu dãy ⇒ khi vòng lặp gặp `a`, vòng while đi đúng tới `a+L−1` và dừng vì `a+L` không có (nếu có thì dãy dài hơn, mâu thuẫn). Vậy `best ≥ L`.

**Không đếm quá:** mọi giá trị while đi qua đều thật sự có trong set và liên tiếp nhau, nên mọi `len` tính ra đều là độ dài một dãy hợp lệ ⇒ `best ≤ L`.

**Tại sao O(n):** các dãy tối đại *phân hoạch* tập giá trị — mỗi giá trị thuộc đúng một dãy và mỗi dãy có đúng một đầu. Vòng while chỉ chạy từ đầu dãy, nên mỗi giá trị bị while bước qua **tối đa một lần**. Cộng thêm một phép kiểm tra `x − 1` cho mỗi x ⇒ tổng số lần tra set ≤ 2n. Vòng while lồng trong vòng for *trông* như O(n²) nhưng tổng chi phí được **phân bổ (amortized)** trên toàn bộ phần tử.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(n) | O(n) |
| Trung bình | O(n) | O(n) |
| Xấu nhất | O(n) (kỳ vọng, nhờ hash O(1)) | O(n) |
| So sánh: sắp xếp + quét | O(n log n) | O(1)–O(n) |

## Tradeoff

- **HashSet vs sắp xếp:** HashSet thắng về Big-O nhưng hằng số lớn (băm, cấp phát). Với n vài chục nghìn, sort + quét thường nhanh ngang hoặc hơn trên thực tế và có thể O(1) bộ nhớ nếu được sửa mảng gốc.
- **HashSet vs Union-Find:** Union-Find (nối x với x±1) cũng ~O(n·α(n)) và hợp với bài **động** (thêm số dần, hỏi dãy dài nhất sau mỗi lần), nhưng code dài hơn nhiều.
- **Worst case của hash:** dữ liệu cố tình gây va chạm có thể đẩy tra cứu lên O(n) — hiếm trong phỏng vấn, nhưng đáng nhắc.

## Lợi / Hại

**Lợi:**
- O(n) đúng yêu cầu đề, code chỉ ~8 dòng.
- Xử lý tự nhiên số âm, số trùng, khoảng giá trị rất rộng (không cần mảng đếm).

**Hại:**
- Tốn O(n) bộ nhớ phụ.
- Không trả lời được câu hỏi động (chèn/xoá liên tục) mà không xây lại set.
- Hằng số cao hơn sort trên dữ liệu nhỏ.

## Use case thực tế

- **Tìm chuỗi ngày hoạt động liên tục (streak)** của người dùng từ tập ngày đăng nhập (đổi ngày ra số nguyên).
- **Phát hiện khoảng ID / số thứ tự liền mạch** trong log, gói tin, hoá đơn — và ngược lại tìm "lỗ hổng".
- **Gộp các block bộ nhớ / sector liên tiếp** khi cấp phát.
- Tiền xử lý cho phân tích chuỗi thời gian rời rạc (khoảng không mất dữ liệu dài nhất).

## Lỗi thường gặp

- **Quên điều kiện `x − 1`**: code vẫn đúng nhưng thành O(n²) — rớt test lớn và mất điểm phỏng vấn.
- **Duyệt trên `nums` thay vì `set`**: với input nhiều bản sao của cùng một đầu dãy dài (vd. `[1,1,1,…,1,2,3,…,k]`), dãy bị đếm lại cho mỗi bản sao ⇒ có thể O(n²).
- **Trả về 1 cho mảng rỗng** (khởi tạo `best = 1`).
- **Dùng sort rồi quên xử lý trùng**: `[1,2,2,3]` phải ra 3; gặp số bằng số trước thì giữ nguyên độ dài, không reset.
- Dùng mảng đếm theo giá trị khi giá trị lên tới 10⁹ ⇒ tràn bộ nhớ.

## Biến thể

- **Trả về chính dãy**: lưu thêm `start` của dãy tốt nhất, kết quả là `start..start+best−1`.
- **Binary Tree Longest Consecutive Sequence (298)**: dãy phải đi theo đường cha → con; DFS mang theo độ dài hiện tại.
- **Phiên bản động**: chèn số dần dần — dùng Union-Find hoặc HashMap lưu độ dài tại hai đầu đoạn (`len[x−left] = len[x+right] = left+right+1`).
- **Cho phép thiếu tối đa k số**: chuyển sang sắp xếp + sliding window trên giá trị.
- **Maximum Consecutive Floors (2274)**: cùng ý tưởng "khoảng trống giữa các giá trị đặc biệt".
