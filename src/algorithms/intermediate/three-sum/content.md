## Bài toán

Cho mảng số nguyên `nums`, trả về **mọi bộ ba không trùng** `[a, b, c]` gồm ba phần tử ở ba chỉ số khác nhau sao cho `a + b + c = 0`. Hai bộ ba trùng nhau nếu chúng có cùng tập giá trị (kể cả bội).

Ví dụ: `nums = [-1, 0, 1, 2, -1, -4]` ⇒ `[[-1, -1, 2], [-1, 0, 1]]`. Dù có hai số `-1` ở hai vị trí khác nhau, bộ `[-1, 0, 1]` chỉ được tính một lần.

Đây là LeetCode 15 – bài "kinh điển nhất" để kiểm tra two pointers và kỹ năng xử lý trùng lặp.

## Ý tưởng / Trực giác

Brute force ba vòng lặp là O(n³) và còn phải lọc trùng bằng Set. Hai quan sát giúp giảm xuống O(n²):

1. **Cố định một phần tử** `a[i]` thì phần còn lại là bài Two Sum với target `−a[i]`.
2. **Sắp xếp mảng** thì Two Sum giải được bằng two pointers O(n) không cần bộ nhớ phụ, **và** các giá trị bằng nhau nằm cạnh nhau – bỏ trùng chỉ cần so với phần tử liền kề.

Ta luôn chọn `a[i]` là phần tử **nhỏ nhất** của bộ ba (chỉ tìm `l, r > i`), nên mỗi bộ ba được sinh ra theo đúng một thứ tự `a[i] ≤ a[l] ≤ a[r]`.

## Thuật toán từng bước

1. Sắp xếp `a` tăng dần.
2. Với `i` từ 0 đến n−3:
   - Nếu `a[i] > 0` ⇒ dừng (ba số đều dương).
   - Nếu `i > 0` và `a[i] = a[i−1]` ⇒ bỏ qua.
   - `l = i+1`, `r = n−1`. Trong khi `l < r`:
     - `sum = a[i] + a[l] + a[r]`.
     - `sum = 0`: ghi nhận; tiến `l` qua các giá trị bằng `a[l]`, lùi `r` qua các giá trị bằng `a[r]`; rồi `l++`, `r--`.
     - `sum < 0`: `l++`. `sum > 0`: `r--`.
3. Trả về danh sách – theo thứ tự quét trên mảng đã sắp xếp.

## Chứng minh đúng

**Không bỏ sót.** Xét bộ ba `x ≤ y ≤ z` có tổng 0. Gọi `i` là vị trí **đầu tiên** của giá trị `x` trong mảng sắp xếp – vòng `i` này không bị bỏ qua. Trong vòng two pointers, bất biến "nếu cặp `(y, z)` tồn tại trong `(i, n−1]` thì nó nằm trong `[l, r]`" được giữ: khi `sum < 0`, `a[l]` cộng với phần tử lớn nhất còn lại vẫn quá nhỏ nên không thuộc cặp nào; tương tự với `sum > 0`. Bước bỏ trùng sau khi tìm thấy chỉ loại các giá trị đã được dùng, nên cặp `(y, z)` khác vẫn còn trong vùng.

**Không trùng.** Mỗi giá trị `x` chỉ được làm `a[i]` một lần (bỏ qua `a[i] = a[i−1]`). Với `x` cố định, sau khi tìm `(y, z)`, `l` vượt qua mọi `y` và `r` vượt qua mọi `z` ⇒ cặp `(y, z)` không thể xuất hiện lại. Vì `l` chỉ tăng, `y` lần sau luôn lớn hơn ⇒ các cặp khác nhau.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(n log n) – `a[0] > 0` dừng ngay | O(log n) (stack của sort) |
| Trung bình | O(n²) | O(log n) – O(n) |
| Xấu nhất | O(n²) | O(n) nếu sort cần buffer, chưa kể output |
| Brute force | O(n³) | O(k) cho Set kết quả |

## Tradeoff

- **Sort + two pointers** (bài này): O(n²), gần như không bộ nhớ phụ, xử lý trùng gọn. Đổi lại phải **thay đổi thứ tự** (hoặc copy) mảng.
- **Cố định i + HashSet**: cũng O(n²) nhưng tốn O(n) bộ nhớ mỗi vòng và khử trùng rắc rối hơn (thường phải dùng Set chuỗi).
- **Không sort, dùng Set kết quả**: dễ viết nhưng hằng số lớn, khó chứng minh không trùng.
- Cận dưới: 3SUM được tin là không giải được nhanh hơn ~O(n²) trong mô hình tổng quát (giả thuyết 3SUM), nên O(n²) là đáp án kỳ vọng.

## Lợi / Hại

**Lợi**
- Khung "sort + cố định + two pointers" mở rộng cho 3Sum Closest, 3Sum Smaller, 4Sum (kSum).
- Bỏ trùng tự nhiên nhờ sort, không cần cấu trúc phụ.
- Có thể dừng sớm (`a[i] > 0`).

**Hại**
- Thay đổi mảng gốc (hoặc tốn O(n) để copy).
- Mất chỉ số gốc – nếu đề yêu cầu chỉ số phải lưu cặp (giá trị, index).
- O(n²) vẫn chậm khi n ~ 10⁵.

## Use case thực tế

- **Đối soát tài chính**: tìm ba giao dịch bù trừ nhau (tổng ròng bằng 0) trong sổ cái.
- **Hình học tính toán**: nhiều bài (ba điểm thẳng hàng, tam giác suy biến) quy về 3SUM.
- **Hoá học / dinh dưỡng**: chọn ba thành phần có độ lệch tổng cân bằng.
- **Mẫu cho kSum**: tìm tổ hợp đơn hàng đúng ngân sách.

## Lỗi thường gặp

- **Quên sort** ⇒ two pointers vô nghĩa.
- **Bỏ trùng `i` sai chiều**: so `a[i] === a[i+1]` sẽ bỏ lỡ `[-1, -1, 2]`. Phải so với `a[i−1]`.
- **Không bỏ trùng `l`/`r` sau khi tìm thấy** ⇒ kết quả lặp, ví dụ `[-2,0,0,2,2]`.
- **Bỏ trùng `l` trước khi kiểm tra tổng** ⇒ mất bộ như `[0, 0, 0]`.
- Thiếu `l < r` trong vòng while bỏ trùng ⇒ truy cập ngoài vùng.
- Quên `l++; r--` sau khi bỏ trùng ⇒ lặp vô hạn.

## Biến thể

- **3Sum Closest (16)**: cùng khung, theo dõi `|sum − target|` nhỏ nhất, không cần bỏ trùng.
- **3Sum Smaller (259)**: khi `sum < target`, cộng `r − l` vào đáp án rồi `l++`.
- **4Sum (18) / kSum**: đệ quy cố định thêm một phần tử, đáy là two pointers ⇒ O(n^(k−1)).
- **3Sum With Multiplicity (923)**: đếm theo tần suất giá trị, xử lý tổ hợp C(m, 2), C(m, 3).
- **Valid Triangle Number (611)**: sort, cố định cạnh lớn nhất, two pointers đếm cặp.
