## Bài toán

Cho mảng `nums` và số nguyên `k`. Một cửa sổ dài `k` trượt từ trái sang phải, mỗi lần một ô. Trả về **trung vị** của từng cửa sổ (LeetCode 480, Hard). Với `k` lẻ, trung vị là phần tử ở giữa sau khi sắp xếp; với `k` chẵn, là trung bình hai phần tử giữa, ví dụ cửa sổ `[1, 4, 2, 3]` có trung vị `(2 + 3) / 2 = 2.5`.

Ví dụ: `nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3` ⇒ `[1, -1, -1, 3, 5, 6]`. Trong tab **Debug**, nút xám trong heap là giá trị đang chờ xoá.

Đây là bản "khó" của Find Median from Data Stream (295): ngoài **thêm** phần tử, ta còn phải **bỏ** phần tử rời cửa sổ. Mà heap thì không xoá được phần tử ở giữa.

## Ý tưởng / Trực giác

Trung vị chia cửa sổ thành hai nửa: nửa nhỏ và nửa lớn. Nếu giữ:
- `low`: **max-heap** chứa nửa nhỏ ⇒ đỉnh là phần tử lớn nhất của nửa nhỏ;
- `high`: **min-heap** chứa nửa lớn ⇒ đỉnh là phần tử nhỏ nhất của nửa lớn;

thì trung vị chỉ phụ thuộc hai đỉnh, đọc trong O(1). Quy ước `low` nhiều hơn `high` tối đa 1 phần tử, nên `k` lẻ ⇒ trung vị là `low.peek()`.

Vấn đề còn lại là xoá `nums[i-k]` khi nó rời cửa sổ. Tìm nó trong heap mất O(k). Mẹo là **xoá trễ (lazy deletion)**: ghi `delayed[x]++` và để nguyên phần tử trong heap. Nó chỉ thật sự bị pop khi nổi lên **đỉnh**, vì trung vị chỉ đọc đỉnh, nên một phần tử "chết" nằm sâu bên trong không làm sai gì.

Hệ quả: `heap.size` không còn là số phần tử thật. Ta đếm riêng **kích thước hợp lệ** `lowSize`, `highSize` và cân bằng theo hai số này, không theo kích thước vật lý.

## Thuật toán từng bước

Với mỗi `i`:
1. **Thêm** `nums[i]`: nếu `low` rỗng hoặc `nums[i] ≤ low.peek()` thì push vào `low` (`lowSize++`), ngược lại push vào `high` (`highSize++`).
2. **Bỏ** `out = nums[i-k]` (khi `i ≥ k`): `delayed[out]++`. Nếu `out ≤ low.peek()` thì nó thuộc nửa nhỏ, `lowSize--`; ngược lại `highSize--`. Sau đó `prune` cả hai heap: chừng nào đỉnh có trong `delayed` thì pop và giảm bộ đếm.
3. **Cân bằng**: nếu `lowSize > highSize + 1` thì chuyển đỉnh `low` sang `high`; nếu `lowSize < highSize` thì chuyển ngược lại. Sau khi lấy đỉnh, prune heap vừa mất đỉnh, vì đỉnh mới có thể là phần tử chết.
4. Khi `i ≥ k-1`: trung vị là `low.peek()` (k lẻ) hoặc `(low.peek() + high.peek()) / 2` (k chẵn).

Một lần cân bằng là đủ. Trước mỗi bước, hiệu `lowSize − highSize` thuộc {0, 1}; thêm và bỏ mỗi thao tác đổi hiệu tối đa 1, nên hiệu nằm trong [−2, 3]; một lần chuyển đổi hiệu đúng 2 đơn vị, đủ đưa về {0, 1}.

## Chứng minh đúng

**Bất biến sau mỗi bước** (chỉ xét phần tử hợp lệ):
1. Mọi phần tử của `low` ≤ mọi phần tử của `high`.
2. `lowSize = highSize` hoặc `lowSize = highSize + 1`, tổng bằng `k`.
3. Đỉnh của cả hai heap đều hợp lệ (đã prune).

Bước thêm so với đỉnh hợp lệ của `low` nên giữ (1). Bước cân bằng chỉ chuyển **đỉnh** (phần tử lớn nhất của `low` hoặc nhỏ nhất của `high`) nên vẫn giữ (1). (2) đúng theo lập luận "một lần cân bằng là đủ" ở trên. (3) đúng vì ta prune sau mọi thao tác có thể làm lộ ra một đỉnh chết. Từ (1) và (2), đỉnh `low` là phần tử thứ ⌈k/2⌉ của cửa sổ đã sắp xếp, đỉnh `high` là phần tử kế tiếp, nên công thức trung vị đúng.

Về giá trị trùng: `delayed` đếm theo **giá trị**, nên có thể pop một bản sao khác với bản đã rời cửa sổ. Điều này vô hại vì các bản sao có cùng giá trị nên tập giá trị hợp lệ vẫn đúng. Test so với brute force trên mảng nhiều giá trị trùng xác nhận điều này.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n log n) | Mỗi phần tử được push ≤ 2 lần và pop ≤ 2 lần; heap có thể phình tới O(n) do phần tử chết |
| Bộ nhớ | O(n) | Phần tử chết có thể nằm lại trong heap |
| Sorted array + chèn nhị phân | O(n·k) | Tìm vị trí O(log k) nhưng `splice` dịch O(k) |

## Tradeoff

- **Cách đơn giản O(n·k): mảng đã sắp xếp.** Giữ cửa sổ dạng mảng tăng dần; mỗi bước tìm nhị phân để xoá `nums[i-k]` và chèn `nums[i]` (`splice`), trung vị là `w[k>>1]`. Code chỉ khoảng 10 dòng, ít lỗi, và với `k` nhỏ (vài trăm) thường **nhanh hơn** hai heap nhờ `memmove` thân thiện cache. Phỏng vấn nên nêu cách này trước rồi mới tối ưu.
- **Hai heap + xoá trễ ↔ cây cân bằng / multiset (C++ `multiset`, Java `TreeMap` đếm).** Multiset xoá trực tiếp O(log k), bộ nhớ O(k) và code ngắn, nhưng JS/Python không có sẵn cấu trúc này. Hai heap dùng được ở mọi ngôn ngữ.
- **Xoá trễ ↔ indexed heap.** Heap có bảng vị trí cho phép xoá giữa O(log k) và bộ nhớ O(k), nhưng phải cập nhật vị trí mỗi lần swap nên dễ lỗi.

## Lợi / Hại

**Lợi**
- O(log n) mỗi bước, không phụ thuộc `k`.
- Chỉ cần heap, có ở mọi ngôn ngữ.
- Kỹ thuật xoá trễ tái dùng được cho nhiều bài heap khác.

**Hại**
- Nhiều chi tiết dễ sai: đếm kích thước hợp lệ, prune đúng chỗ, giá trị trùng.
- Bộ nhớ O(n) thay vì O(k) vì phần tử chết còn nằm lại.
- Hằng số lớn hơn mảng sắp xếp khi `k` nhỏ.

## Use case thực tế

- **Lọc nhiễu median filter** cho tín hiệu cảm biến và ảnh 1D: trung vị bền với outlier hơn trung bình.
- **Giám sát latency**: trung vị (p50) của N request gần nhất trên dashboard.
- **Tài chính**: rolling median giá, phát hiện bất thường (MAD, viết tắt của median absolute deviation).

## Lỗi thường gặp

1. Cân bằng theo `heap.size` vật lý thay vì `lowSize`/`highSize`, làm trung vị lệch khi có phần tử chết.
2. Quên prune sau khi chuyển đỉnh giữa hai heap, khiến đỉnh mới là phần tử chết.
3. Quyết định `out` thuộc heap nào bằng cách so với đỉnh **chưa prune**.
4. Tính `(a + b) / 2` bằng số nguyên 32-bit (Java/C++) gây tràn số với `2^31 − 1`; dùng `a / 2.0 + b / 2.0` hoặc `long`.

## Biến thể

- **Find Median from Data Stream (295):** chỉ thêm, không xoá, nên dùng hai heap không cần `delayed`.
- **Sliding Window Maximum (239):** chỉ cần max nên monotonic deque O(n) là đủ.
- **Phần tử thứ p bất kỳ trong cửa sổ (percentile):** order-statistics tree hoặc Fenwick trên giá trị nén.
- **Lazy deletion nói chung:** Dijkstra bỏ qua bản ghi cũ, "top k với xoá", scheduler huỷ task.
