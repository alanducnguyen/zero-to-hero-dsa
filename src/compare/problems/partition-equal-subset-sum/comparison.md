## Bảng so sánh

| Lời giải | Thời gian | Bộ nhớ | Dừng sớm | Truy vết tập con | Ghi chú |
|---|---|---|---|---|---|
| Đệ quy lấy/bỏ | O(2ⁿ) | O(n) stack | Có (ngắt mạch `\|\|`) | Có (theo đường đệ quy) | Không phụ thuộc độ lớn giá trị |
| Memo (i, rem) | O(n·S) | O(n·S) | Có | Khó | Hằng số lớn vì Map + đệ quy |
| Bảng 2 chiều | O(n·S) | O(n·S) | Không | Dễ | Vòng lặp thuần |
| **1 chiều duyệt ngược** ★ | O(n·S) | **O(S)** | Có (sau mỗi số) | Không | Đáp án mong đợi |

S = total / 2. Lưu ý O(n·S) là **giả đa thức**: đa thức theo *giá trị* S chứ không theo độ dài input (số bit). Subset sum là NP-đầy đủ; DP chỉ nhanh vì đề giới hạn nums[i] ≤ 100.

## Phân tích

**Đệ quy thuần** mô tả đúng bài toán: mỗi số lấy hoặc bỏ. Nhưng nhiều đường đi khác nhau dẫn tới cùng trạng thái (i, rem) – ví dụ với nums = [1, 2, 3, …], "lấy 1, lấy 2, bỏ 3" và "bỏ 1, bỏ 2, lấy 3" cùng tới i = 3 với rem = S − 3 – và cây giải lại chúng từ đầu.

**Memo** nhận ra rằng tương lai chỉ phụ thuộc (i, rem), không phụ thuộc *đã lấy những số nào*. Có tối đa n·(S+1) trạng thái ⇒ O(n·S). Ưu điểm ẩn: chỉ thăm trạng thái *đạt tới được*, nên khi các tổng đạt được thưa, memo có thể ít việc hơn bảng.

**Bảng 2 chiều** là memo viết ngược (bottom-up): hàng i chỉ đọc hàng i−1. Không có đệ quy, dễ phân tích, và bảng đầy đủ cho phép đi ngược từ dp[n][S] để in tập con.

**Mảng 1 chiều** nhận xét rằng hàng i chỉ cần hàng i−1 ⇒ ghi đè tại chỗ. Mấu chốt là duyệt j **giảm dần**: khi cập nhật dp[j], ô dp[j − num] bên trái chưa bị số hiện tại sửa nên vẫn là giá trị hàng trước. Duyệt tăng dần sẽ cho phép dùng một số nhiều lần – đó là unbounded knapsack (Coin Change), sai cho bài này.

## Mẹo bitset (BigInt shift)

Coi tập các tổng đạt được là một dãy bit: bit j = 1 nếu đạt tổng j. Thêm số num tương đương `bits |= bits << num`. Trong JS dùng `BigInt`:

```ts
let bits = 1n;
for (const x of nums) bits |= bits << BigInt(x);
return ((bits >> BigInt(S)) & 1n) === 1n;
```

Mỗi phép shift xử lý 64 tổng một lúc ⇒ O(n·S / w). Trong C++ (`bitset<10001>`) đây là lời giải nhanh nhất thực tế. Với BigInt trong V8, mỗi phép tạo số mới nên lợi thế nhỏ hơn, nhưng vẫn là follow-up hay được hỏi.

## Xếp hạng

1. **1 chiều duyệt ngược** – O(n·S)/O(S), ngắn, dừng sớm.
2. **Bảng 2 chiều** – cùng thời gian, nhiều bộ nhớ hơn, nhưng truy vết được.
3. **Memo** – cùng độ phức tạp nhưng hằng số và stack lớn hơn.
4. **Đệ quy thuần** – hàm mũ.

## Khi nào thứ hạng đổi

- **Phải in ra hai tập** ⇒ bảng 2 chiều lên hạng 1 (hoặc 1 chiều kèm mảng `parent`).
- **n nhỏ (≤ 40) nhưng giá trị tới 10⁹** ⇒ mọi DP theo tổng chết; dùng meet-in-the-middle O(2^(n/2)·n) – hậu duệ của đệ quy lấy/bỏ.
- **Có số âm** ⇒ dịch chỉ số (offset) hoặc dùng memo với Map/Set các tổng – memo/Set thắng vì không cần mảng liên tục.
- **Cần tốc độ tối đa trong C++** ⇒ bitset vượt mảng boolean khoảng 64 lần.
