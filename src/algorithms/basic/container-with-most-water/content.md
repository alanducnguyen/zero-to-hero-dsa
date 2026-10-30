## Bài toán

Cho mảng `height` gồm `n` số không âm, `height[i]` là chiều cao bức tường thẳng đứng tại vị trí `i`. Chọn **hai** bức tường `i < j` sao cho cùng với trục hoành chúng tạo thành một container chứa được nhiều nước nhất. Lượng nước là `min(height[i], height[j]) × (j − i)`. Trả về diện tích lớn nhất.

Ví dụ: `[1, 8, 6, 2, 5, 4, 8, 3, 7]` ⇒ `49` (tường ở chỉ số 1 cao 8 và chỉ số 8 cao 7: `min(8, 7) × 7 = 49`).

Đây là LeetCode 11 – một trong những bài Two Pointers kinh điển nhất, xuất hiện liên tục ở Amazon, Google, Meta. Cái khó không nằm ở code (chỉ 10 dòng) mà ở **lập luận vì sao được phép bỏ qua phần lớn các cặp**.

## Ý tưởng / Trực giác

Brute force thử mọi cặp `(i, j)`: O(n²). Muốn O(n), ta cần mỗi bước **loại bỏ cả một nhóm cặp** mà không cần thử.

Diện tích phụ thuộc vào hai thứ: **độ rộng** `j − i` và **tường thấp hơn**. Bắt đầu với container rộng nhất (`left = 0`, `right = n − 1`). Mọi bước tiếp theo đều làm độ rộng giảm đi 1, nên cách duy nhất để có diện tích lớn hơn là tìm được tường **cao hơn**.

Nếu dịch tường cao hơn vào trong: mực nước vẫn bị chặn bởi tường thấp (không thể tăng), còn độ rộng giảm ⇒ chắc chắn tệ hơn. Nếu dịch tường thấp hơn: có cơ hội gặp tường cao hơn bù lại độ rộng mất đi. Vậy **luôn dịch tường thấp hơn**.

## Thuật toán từng bước

1. `left = 0`, `right = n − 1`, `best = 0`.
2. Trong khi `left < right`:
   - `h = min(height[left], height[right])`, `area = h × (right − left)`.
   - Cập nhật `best = max(best, area)`.
   - Nếu `height[left] < height[right]` thì `left++`, ngược lại `right--`.
3. Trả về `best`.

Mở tab **Debug** và quan sát: vùng cyan là container hiện tại, các cột xám là những tường đã bị loại vĩnh viễn – chúng không bao giờ quay lại.

## Chứng minh đúng

Ta chứng minh: khi loại một tường, **không có cặp tối ưu nào bị bỏ lỡ**.

Giả sử `height[left] < height[right]` (trường hợp còn lại đối xứng). Xét mọi cặp chứa tường `left` mà chưa được xét: `(left, k)` với `left < k < right`. Ta có:

- Độ rộng: `k − left < right − left`.
- Chiều cao: `min(height[left], height[k]) ≤ height[left] = min(height[left], height[right])`.

Do đó `area(left, k) < area(left, right)` (hoặc bằng 0 nếu chiều cao 0). Nghĩa là **mọi** cặp còn lại chứa tường `left` đều không thể tốt hơn cặp vừa tính – và cặp đó đã được ghi nhận vào `best`. Vì vậy loại `left` là an toàn.

**Bất biến:** tại mỗi vòng lặp, mọi cặp `(i, j)` có `i < left` hoặc `j > right` đều có diện tích ≤ `best`. Khởi tạo: không có cặp nào như vậy. Duy trì: lập luận trên. Kết thúc: `left ≥ right` ⇒ mọi cặp đều thuộc vùng đã loại ⇒ `best` là max toàn cục.

Khi hai tường bằng nhau, dịch bên nào cũng được: mọi cặp mới đều có chiều cao ≤ `h` và độ rộng nhỏ hơn, nên cả hai tường thực ra đều đã "hết tiềm năng" với nhau.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ | Giải thích |
|---|---|---|---|
| Mọi trường hợp | O(n) | O(1) | Mỗi bước dịch đúng một con trỏ, tổng `n − 1` bước |
| Brute force | O(n²) | O(1) | Thử mọi `n(n−1)/2` cặp |

## Tradeoff

- **Lập luận ↔ Code:** code cực ngắn, nhưng nếu không chứng minh được thì người phỏng vấn sẽ coi đó là "học thuộc". Phần giá trị nằm ở chứng minh.
- **Greedy có cơ sở ↔ Greedy cảm tính:** "dịch tường thấp" nghe như heuristic, nhưng thực ra là một phép loại trừ chính xác (exchange argument). Đừng áp dụng mù quáng sang bài có công thức khác.
- So với brute force, ta không còn liệt kê được **tất cả** cặp tốt – chỉ biết giá trị max.

## Lợi / Hại

**Lợi**
- O(n) thời gian, O(1) bộ nhớ, không cần sắp xếp.
- Không làm thay đổi mảng đầu vào.
- Minh họa hoàn hảo kỹ thuật "loại bỏ ứng viên" của Two Pointers.

**Hại**
- Chỉ đúng vì công thức diện tích có dạng `min × độ rộng`; đổi công thức (ví dụ tính cả tường ở giữa) là hỏng.
- Khó tổng quát lên nhiều chiều hoặc nhiều tường.

## Use case thực tế

- **Phân tích chuỗi thời gian:** tìm hai thời điểm sao cho `min(giá trị) × khoảng cách` lớn nhất, ví dụ băng thông tối thiểu đảm bảo trong một khoảng thời gian dài nhất.
- **Quy hoạch không gian / bố cục:** chọn hai cột chống để tạo khoang chứa lớn nhất.
- **Mẫu tư duy chung:** bất cứ khi nào mục tiêu là `f(min(a_i, a_j), j − i)` đơn điệu theo cả hai, hai con trỏ từ hai đầu là ứng viên số một.

## Lỗi thường gặp

- Dịch tường **cao hơn** ⇒ bỏ lỡ đáp án (ví dụ `[1, 8, 6, 2, 5, 4, 8, 3, 7]` sẽ ra sai).
- Nhầm với **Trapping Rain Water** (LC 42): bài đó tính tổng nước giữa *mọi* tường, còn bài này chỉ chọn hai tường và bỏ qua tường ở giữa.
- Dùng `left <= right` ⇒ tính container độ rộng 0, vô hại nhưng thừa; tệ hơn là truy cập ngoài mảng nếu viết lỏng lẻo.
- Quên trường hợp mảng có < 2 phần tử ⇒ phải trả về 0.

## Biến thể

- **Trapping Rain Water (LC 42):** cũng hai con trỏ, cũng xử lý bên thấp hơn trước – nhưng cộng dồn nước tại từng cột.
- **Largest Rectangle in Histogram (LC 84):** diện tích là `min trên cả đoạn × độ rộng` ⇒ cần monotonic stack thay vì hai con trỏ.
- **Hai con trỏ trên mảng sắp xếp** (Two Sum II, 3Sum): cùng ý tưởng "mỗi bước loại một hàng/cột của ma trận cặp".
