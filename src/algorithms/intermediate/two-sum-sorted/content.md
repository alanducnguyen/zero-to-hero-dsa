## Bài toán

Cho mảng `a` **đã sắp xếp tăng dần** và số `target`. Tìm hai chỉ số `i < j` sao cho `a[i] + a[j] = target`.

Đây là bài LeetCode 167, "em" của Two Sum (bài #1 huyền thoại). Nếu Two Sum dạy HashMap, thì Two Sum II dạy **Two Pointers ngược chiều** – pattern giải được 3Sum, 4Sum, Container With Most Water, Trapping Rain Water (bản two pointers), Valid Palindrome và hàng chục bài khác. Meta và Amazon hỏi 3Sum với tần suất rất cao, và 3Sum chính là bài này lồng trong một vòng lặp.

## Ý tưởng / Trực giác

Đặt `left` ở đầu (nhỏ nhất) và `right` ở cuối (lớn nhất). Tính `sum`:
- `sum < target`: cần tổng lớn hơn. `a[left]` ghép với **bất kỳ** phần tử nào bên trái `right` đều cho tổng nhỏ hơn nữa (vì chúng ≤ `a[right]`). Vậy `a[left]` **không thể** nằm trong đáp án ⇒ loại nó, `left++`.
- `sum > target`: đối xứng, loại `a[right]`, `right--`.

Mỗi bước loại chắc chắn một phần tử khỏi tập ứng viên. Sau tối đa n−1 bước, hoặc tìm thấy hoặc hết ứng viên. Không có backtracking, không có HashMap – chỉ hai số nguyên.

## Thuật toán từng bước

1. `left = 0`, `right = n-1`.
2. Khi `left < right`: `sum = a[left] + a[right]`.
   - `= target` ⇒ trả `[left, right]`.
   - `< target` ⇒ `left++`.
   - `> target` ⇒ `right--`.
3. Trả `null`.

Tab **Debug**: vùng xám là phần tử đã bị loại khỏi tập ứng viên; cột đỏ là phần tử vừa bị loại và lý do ghi ở ghi chú.

## Chứng minh đúng

**Bất biến:** nếu tồn tại cặp `(i*, j*)` với tổng bằng target, thì `left ≤ i*` và `j* ≤ right`.

- Khởi tạo: `[0, n-1]` chứa mọi cặp – đúng.
- Duy trì (trường hợp `sum < target`): giả sử `i* = left`. Khi đó `j* ≤ right` ⇒ `a[j*] ≤ a[right]` ⇒ `a[left] + a[j*] ≤ sum < target`, mâu thuẫn. Vậy `i* > left`, tăng `left` vẫn giữ bất biến. Trường hợp `>` đối xứng.
- Kết thúc: `left ≥ right` ⇒ không còn cặp `i < j` nào trong khoảng ⇒ theo bất biến, không tồn tại đáp án ⇒ `null` đúng.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | `right − left` giảm 1 mỗi bước, bắt đầu từ n−1 |
| Bộ nhớ | O(1) | Hai chỉ số |
| Nếu phải sắp xếp trước | O(n log n) | Khi đề không cho mảng sắp xếp và không cần giữ chỉ số gốc |

## Tradeoff

- **Two Pointers O(1) bộ nhớ ↔ HashMap O(n) bộ nhớ:** HashMap giải Two Sum trên mảng **không sắp xếp** trong O(n), two pointers cần sắp xếp. Đề cho mảng sắp xếp + yêu cầu O(1) bộ nhớ ⇒ two pointers là đáp án mong đợi.
- **Chỉ số gốc:** sắp xếp làm mất chỉ số gốc; nếu cần, sắp xếp mảng cặp `(giá trị, chỉ số)` – tốn O(n) bộ nhớ, mất lợi thế.
- **Một đáp án ↔ tất cả đáp án:** tìm tất cả cặp (3Sum) cần bỏ qua phần tử trùng để không ra kết quả lặp – thêm vài dòng nhưng dễ sai.
- **Two Pointers ↔ Binary Search cho mỗi phần tử:** O(n log n), chậm hơn và phức tạp hơn two pointers.

## Lợi / Hại

**Lợi**
- O(n) thời gian, O(1) bộ nhớ, không cấu trúc dữ liệu phụ.
- Khung cho họ bài k-Sum, palindrome, container, merge hai mảng sắp xếp.

**Hại**
- Bắt buộc dữ liệu có thứ tự (sắp xếp) hoặc tính chất đơn điệu tương đương.
- Chỉ áp dụng khi quyết định "loại một đầu" có thể chứng minh được – không phải bài nào có 2 chỉ số cũng là two pointers.

## Use case thực tế

- **Merge hai danh sách sắp xếp** (merge step của Merge Sort, merge log theo timestamp): hai con trỏ cùng chiều.
- **Ghép cặp tối ưu:** ghép người nặng nhất với nhẹ nhất vào thuyền (Boats to Save People) – lập lịch, bin packing đơn giản.
- **Xử lý chuỗi tại chỗ:** đảo chuỗi, kiểm tra palindrome, xoá khoảng trắng, dedupe mảng sắp xếp (`unique` trong C++).
- **Tài chính:** tìm hai giao dịch có tổng bằng số tiền đối soát trên danh sách đã sắp xếp.
- **Hình học tính toán:** rotating calipers trên đa giác lồi là two pointers.

## Lỗi thường gặp

1. Dùng `left <= right` ⇒ có thể dùng một phần tử hai lần (`a[i] + a[i]`).
2. Quên sắp xếp khi mảng chưa sắp xếp – thuật toán cho kết quả sai mà không báo lỗi.
3. Trong 3Sum: không bỏ qua phần tử trùng ⇒ kết quả lặp; hoặc bỏ qua sai chỗ ⇒ mất kết quả.
4. Tăng/giảm sai con trỏ (nhầm hướng khi mảng giảm dần).
5. Tràn số khi cộng trong ngôn ngữ 32-bit (JS không bị nhưng hãy nhắc).

## Biến thể

- **3Sum / 4Sum:** cố định một (hai) phần tử, two pointers phần còn lại ⇒ O(n²) / O(n³).
- **Two Sum ≤ / ≥ target, đếm số cặp:** khi `sum < target`, mọi cặp `(left, k)` với `left < k ≤ right` đều thoả ⇒ cộng `right − left` rồi `left++`.
- **Container With Most Water:** loại cạnh **thấp hơn** vì giữ nó không thể tăng diện tích.
- **Valid Palindrome / Reverse String:** hai con trỏ so sánh và tiến vào giữa.
- **Two pointers cùng chiều (fast/slow):** xoá trùng tại chỗ, tìm giữa linked list – họ hàng nhưng khác cơ chế loại trừ.
