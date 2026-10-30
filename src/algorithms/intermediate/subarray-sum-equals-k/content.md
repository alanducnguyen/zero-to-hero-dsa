## Bài toán

Cho mảng số nguyên `nums` (**có thể có số âm và số 0**) và số nguyên `k`. Đếm số **mảng con liên tiếp** (subarray, khác rỗng) có tổng đúng bằng `k`.

Ví dụ: `nums = [1, 2, 1, -1, 2, 3]`, `k = 3` ⇒ có **4** mảng con: `[1,2]`, `[2,1]`, `[1,2,1,-1]` và `[3]`. Lưu ý `[1,2,1,-1]` chứa số âm – đây chính là lý do sliding window thất bại.

Đây là LeetCode 560 – một trong những bài prefix sum được hỏi nhiều nhất ở Meta và Google.

## Ý tưởng / Trực giác

Gọi `P[j]` là tổng `nums[0..j]`, và `P[-1] = 0` (prefix rỗng). Tổng của đoạn `nums[i+1..j]` là:

```
sum(i+1..j) = P[j] − P[i]
```

Vậy đoạn kết thúc tại `j` có tổng `k` ⇔ tồn tại `i < j` với `P[i] = P[j] − k`. Câu hỏi "có bao nhiêu đoạn kết thúc tại `j`?" trở thành "**có bao nhiêu prefix trước đó bằng `P[j] − k`?**" – đúng loại câu hỏi mà một HashMap đếm tần suất trả lời trong O(1).

Đây chính là "Two Sum trên prefix sum": thay vì tìm `a + b = target`, ta tìm `P[j] − P[i] = k`.

Tại sao không dùng sliding window? Sliding window cần tính **đơn điệu**: mở rộng cửa sổ thì tổng tăng, thu hẹp thì giảm. Khi có số âm, thêm phần tử có thể làm tổng giảm, nên không biết lúc nào nên co cửa sổ. Prefix sum + HashMap không cần giả định này.

## Thuật toán từng bước

1. `seen = {0: 1}` – prefix rỗng xuất hiện một lần, để đếm được các đoạn bắt đầu từ index 0.
2. `prefix = 0`, `count = 0`.
3. Với mỗi `j` từ 0 đến n−1:
   - `prefix += nums[j]`.
   - `need = prefix − k`; `count += seen[need]` (0 nếu chưa có).
   - `seen[prefix] += 1` – **sau** khi tra cứu.
4. Trả về `count`.

## Chứng minh đúng

**Bất biến:** ngay trước khi xử lý `j`, `seen[v]` bằng số chỉ số `i ∈ {−1, 0, …, j−1}` với `P[i] = v`.

- Khởi tạo: chỉ có `i = −1`, `P[−1] = 0` ⇒ `seen = {0: 1}`. Đúng.
- Duy trì: tại bước `j`, số đoạn `[i+1..j]` có tổng `k` bằng số `i < j` với `P[i] = P[j] − k`, tức `seen[P[j] − k]` theo bất biến. Sau đó ta thêm `P[j]` vào `seen` ⇒ bất biến đúng cho `j+1`.

Mỗi đoạn `[i+1..j]` được đếm đúng một lần – tại bước `j` của nó, ứng với đúng một `i`. Cộng theo mọi `j` ⇒ `count` là đáp án.

Thứ tự "tra rồi mới ghi" đảm bảo `i < j` nghiêm ngặt: nếu ghi trước, với `k = 0` ta sẽ ghép `P[j]` với chính nó và đếm cả đoạn rỗng.

## Độ phức tạp

| Trường hợp | Thời gian | Bộ nhớ |
|---|---|---|
| Tốt nhất | O(n) | O(1) – mọi prefix trùng nhau |
| Trung bình | O(n) | O(n) |
| Xấu nhất | O(n) kỳ vọng (hash) | O(n) – mọi prefix khác nhau |
| Brute force | O(n²) | O(1) |

## Tradeoff

- **Prefix sum + HashMap** (bài này): O(n) thời gian, O(n) bộ nhớ, chạy với mọi dấu.
- **Brute force hai vòng**: O(n²), O(1) bộ nhớ – chấp nhận được khi n ≤ vài nghìn, và là baseline nên nêu trước trong phỏng vấn.
- **Sliding window**: O(n), O(1) nhưng **chỉ đúng khi mọi phần tử ≥ 0** (hoặc đều > 0). Nếu đề đảm bảo không âm, đây là lựa chọn tiết kiệm bộ nhớ hơn.
- **Mảng prefix + sắp xếp**: không giúp đếm vì mất thứ tự `i < j`.

## Lợi / Hại

**Lợi**
- Một lượt duyệt, code ~10 dòng, dễ chứng minh.
- Online: xử lý dữ liệu dạng stream, không cần lưu lại `nums`.
- Tổng quát hoá cho nhiều bài: chia hết cho k, số 0 bằng số 1, path sum trên cây.

**Hại**
- Tốn O(n) bộ nhớ cho map.
- Hash có hằng số lớn hơn mảng; với giá trị prefix nhỏ, có thể thay map bằng mảng offset.
- Chỉ trả về **số lượng**; muốn liệt kê mọi đoạn thì đầu ra có thể là O(n²).
- Với số rất lớn cần chú ý tràn số (JS dùng double nên an toàn tới 2^53).

## Use case thực tế

- **Phân tích chuỗi thời gian**: đếm số khoảng thời gian liên tiếp có tổng doanh thu / lượng truy cập đạt ngưỡng đúng bằng mục tiêu.
- **Tài chính**: số giai đoạn liên tiếp mà lãi/lỗ ròng bằng 0 (cân bằng) – dữ liệu có cả số âm.
- **Bioinformatics**: đếm đoạn gen có độ lệch GC/AT bằng một giá trị (mã hoá +1/−1 rồi prefix sum).
- **Log hệ thống**: số cửa sổ liên tiếp mà số request mở = số request đóng.

## Lỗi thường gặp

- **Quên `seen[0] = 1`** ⇒ bỏ sót mọi đoạn bắt đầu từ index 0.
- **Ghi prefix vào map trước khi tra** ⇒ sai khi `k = 0`.
- **Dùng Set thay vì Map đếm** ⇒ sai khi prefix lặp lại (do số 0 hoặc số âm), ví dụ `[0,0,0], k=0` phải là 6 chứ không phải 3.
- **Dùng sliding window** khi có số âm.
- `count++` thay vì `count += seen[need]`.

## Biến thể

- **Subarray Sums Divisible by K (974)**: map đếm theo `((prefix % k) + k) % k`.
- **Contiguous Array (525)**: đổi 0 thành −1, tìm đoạn dài nhất tổng 0 ⇒ map lưu **chỉ số đầu tiên** thay vì tần suất.
- **Maximum Size Subarray Sum Equals k (325)**: tương tự, lưu chỉ số xuất hiện sớm nhất.
- **Path Sum III (437)**: cùng ý tưởng trên đường đi gốc→nút của cây, nhớ backtrack (giảm tần suất khi rời nút).
- **Number of Submatrices That Sum to Target (1074)**: cố định cặp hàng, nén thành mảng 1 chiều rồi áp dụng bài này ⇒ O(R²·C).
