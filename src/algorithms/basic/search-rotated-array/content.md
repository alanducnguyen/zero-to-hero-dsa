## Bài toán

Một mảng tăng dần gồm các phần tử **phân biệt** bị xoay tại một điểm chưa biết, ví dụ `[0, 1, 2, 4, 5, 6, 7]` thành `[4, 5, 6, 7, 0, 1, 2]`. Cho mảng `nums` đã xoay và `target`, trả về chỉ số của `target` hoặc `-1`. Yêu cầu: **O(log n)**.

Đây là LeetCode 33 – bài binary search "biến tấu" phổ biến nhất ở Meta, Amazon, Google. Nó kiểm tra xem bạn có thật sự hiểu binary search là **loại bỏ một nửa dựa trên bất biến**, hay chỉ thuộc lòng "so với mid rồi đi trái/phải".

## Ý tưởng / Trực giác

Mảng xoay là hai đoạn tăng dần ghép lại: đoạn "cao" `[4, 5, 6, 7]` rồi đoạn "thấp" `[0, 1, 2]`. Điểm xoay (chỗ giá trị tụt xuống) chỉ có **một**.

Khi cắt tại `mid`, ta có hai nửa `[lo, mid]` và `[mid, hi]`. Điểm xoay chỉ nằm trong tối đa một nửa ⇒ **ít nhất một nửa chắc chắn tăng dần**. Với nửa tăng dần, chỉ cần so hai đầu là biết `target` có nằm trong đó không. Nếu có ⇒ đi vào nửa đó; nếu không ⇒ đi vào nửa còn lại. Dù chọn bên nào, ta vẫn loại được một nửa ⇒ O(log n).

Làm sao biết nửa nào tăng dần? So `nums[lo]` với `nums[mid]`: nếu `nums[lo] ≤ nums[mid]` thì đoạn `[lo, mid]` không chứa điểm tụt ⇒ nửa trái tăng dần. Ngược lại điểm tụt nằm bên trái ⇒ nửa phải tăng dần.

## Thuật toán từng bước

1. `lo = 0`, `hi = n − 1`.
2. Trong khi `lo ≤ hi`:
   - `mid = lo + ⌊(hi − lo) / 2⌋`. Nếu `nums[mid] = target` ⇒ trả về `mid`.
   - Nếu `nums[lo] ≤ nums[mid]` (nửa trái sắp xếp): nếu `nums[lo] ≤ target < nums[mid]` thì `hi = mid − 1`, ngược lại `lo = mid + 1`.
   - Ngược lại (nửa phải sắp xếp): nếu `nums[mid] < target ≤ nums[hi]` thì `lo = mid + 1`, ngược lại `hi = mid − 1`.
3. Trả về `-1`.

Trong tab **Debug**, vùng cyan là nửa đã sắp xếp, các ô xám là phần đã bị loại.

## Chứng minh đúng

**Bất biến:** nếu `target` có trong mảng thì chỉ số của nó nằm trong `[lo, hi]`.

- **Khởi tạo:** `[0, n − 1]` là cả mảng – đúng.
- **Duy trì:** giả sử nửa trái `[lo, mid]` tăng dần. Các phần tử trong đó là đúng tập giá trị thuộc `[nums[lo], nums[mid]]`. Nếu `nums[lo] ≤ target < nums[mid]` thì target (nếu có) không thể ở nửa phải, vì các phần tử nửa phải đều **không** thuộc khoảng `[nums[lo], nums[mid]]` vì chúng hoặc lớn hơn `nums[mid]` (trước điểm xoay) hoặc nhỏ hơn `nums[lo]` (sau điểm xoay – đoạn thấp luôn nhỏ hơn mọi phần tử đoạn cao). Vậy thu hẹp về `[lo, mid − 1]` an toàn. Nếu target nằm ngoài khoảng, nó không thể ở nửa trái tăng dần ⇒ `[mid + 1, hi]` an toàn. Trường hợp nửa phải tăng dần là đối xứng.
- **Kết thúc:** mỗi vòng khoảng giảm ít nhất 1 (thực tế giảm một nửa). Khi `lo > hi` khoảng rỗng ⇒ target không tồn tại.

Dấu `≤` trong `nums[lo] ≤ nums[mid]` quan trọng: khi `lo = mid` (khoảng 2 phần tử), nửa trái chỉ có một phần tử và hiển nhiên "đã sắp xếp".

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ | Giải thích |
|---|---|---|---|
| Tốt nhất | O(1) | O(1) | `nums[mid]` trúng ngay lần đầu |
| Trung bình / Xấu nhất | O(log n) | O(1) | Mỗi vòng loại một nửa khoảng |
| Cách hai lượt | O(log n) | O(1) | Tìm điểm xoay rồi binary search thường – cùng bậc nhưng gấp đôi số bước |

## Tradeoff

- **Một lượt ↔ Hai lượt:** cách hai lượt (tìm min theo LC 153, rồi tìm trên đoạn đúng) dễ chứng minh và tái sử dụng code hơn; cách một lượt gọn hơn nhưng nhiều nhánh điều kiện, dễ sai dấu `<`/`≤`.
- **Phần tử phân biệt là giả định then chốt.** Có trùng lặp (LC 81) thì `nums[lo] = nums[mid]` không cho biết nửa nào sắp xếp ⇒ phải `lo++`, xấu nhất O(n).

## Lợi / Hại

**Lợi**
- O(log n), O(1) bộ nhớ, không cần biết trước điểm xoay.
- Một vòng lặp duy nhất, dễ trình bày trên bảng.

**Hại**
- Nhiều điều kiện biên: nhầm `<` với `≤` ở một chỗ là sai trên mảng 2 phần tử.
- Không mở rộng trực tiếp cho mảng có phần tử trùng.

## Use case thực tế

- **Bộ đệm vòng (ring buffer / circular log):** log được ghi đè vòng tròn theo timestamp tăng dần; tìm một timestamp mà không biết vị trí "đầu" hiện tại.
- **Bảng băm nhất quán (consistent hashing):** các node xếp trên vòng hash; tìm node theo khóa trên mảng vòng đã sắp xếp.
- **Dữ liệu sắp xếp được dịch chuyển:** lịch trực ca, danh sách theo giờ địa phương bị "cuộn" qua nửa đêm.

## Lỗi thường gặp

- Dùng `nums[lo] < nums[mid]` thay vì `≤` ⇒ sai khi `lo = mid`, ví dụ `[3, 1]` tìm `1`.
- Kiểm tra khoảng trên nửa **chưa** chắc sắp xếp ⇒ kết luận sai.
- Viết `nums[lo] < target` (thiếu `=`) ⇒ bỏ lỡ khi target nằm đúng ở `lo`.
- Quên trả về ngay khi `nums[mid] = target` rồi lại loại mất `mid`.
- Áp dụng nguyên văn cho mảng có trùng lặp.

## Biến thể

- **Find Minimum in Rotated Sorted Array (LC 153):** so `nums[mid]` với `nums[hi]` để tìm điểm xoay.
- **Search in Rotated Sorted Array II (LC 81):** có trùng lặp, thêm nhánh `lo++` khi không phân biệt được.
- **Đếm số lần xoay:** chính là chỉ số của phần tử nhỏ nhất.
