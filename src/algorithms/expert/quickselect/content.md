## Bài toán

Cho mảng `nums` chưa sắp xếp và số `k`. Tìm phần tử **nhỏ thứ k** (tương đương lớn thứ k) mà không sắp xếp toàn bộ mảng.

`[7,2,9,4,1,8,5,3]`, `k = 4` → 4.

Sort O(n log n) hoặc heap O(n log k) đều đúng, nhưng Quickselect (Hoare, 1961) đạt **O(n) trung bình** và là đáp án mong đợi cho LeetCode 215 ở các công ty lớn.

## Ý tưởng / Trực giác

Quick Sort chọn pivot, partition để pivot về đúng vị trí `p`, rồi đệ quy **cả hai** bên. Nhưng nếu chỉ cần phần tử ở vị trí `k−1`, ta biết nó nằm bên nào của `p`: `p == k−1` ⇒ xong; `p < k−1` ⇒ bên phải; ngược lại bên trái. Chỉ đệ quy **một** bên, kích thước giảm dần (trung bình một nửa) ⇒ `n + n/2 + n/4 + … = 2n`.

## Thuật toán từng bước

1. `target = k − 1`, `lo = 0`, `hi = n − 1`.
2. Lặp: `p = partition(a, lo, hi)` (Lomuto: pivot = `a[hi]`, dồn phần tử `< pivot` về trái, đặt pivot vào ranh giới).
3. `p == target` ⇒ trả `a[p]`. `p < target` ⇒ `lo = p + 1`. Ngược lại `hi = p − 1`.

Ở tab **Debug**, cột tím là pivot, dải cyan là đoạn đang xét, cột xanh lá là pivot đã về đúng chỗ, cột xám là phần đã loại bỏ; con trỏ `k-1` đánh dấu vị trí đích.

## Chứng minh đúng

**Partition đúng:** bất biến trong vòng lặp Lomuto: `a[lo..i) < pivot`, `a[i..j) ≥ pivot`. Kết thúc đổi `a[i]` với pivot ⇒ `a[lo..i) < a[i] = pivot ≤ a[i+1..hi]`. Vậy pivot ở vị trí `i` chính là vị trí của nó trong mảng đã sắp xếp (đoạn `[lo, hi]`).

**Chọn bên đúng:** sau partition, phần tử thứ `target` của toàn mảng nằm trong `[lo, hi]` (bất biến từ đầu, vì các phần tử ngoài đoạn đều đã đúng vị trí tương đối). Nếu `target < p`, nó phải thuộc `[lo, p−1]` vì mọi phần tử đó nhỏ hơn pivot và chiếm đúng các vị trí `lo..p−1`; tương tự với bên phải. Mỗi vòng thu hẹp đoạn, pivot luôn được loại nên thuật toán dừng.

## Độ phức tạp

| Cách | Trung bình | Xấu nhất | Bộ nhớ |
|---|---|---|---|
| Quickselect (pivot ngẫu nhiên) | O(n) | O(n²) (xác suất rất thấp) | O(1) |
| Median of medians | O(n) | O(n) | O(n) hoặc O(log n) |
| Min-heap kích thước k | O(n log k) | O(n log k) | O(k) |
| Sort | O(n log n) | O(n log n) | O(1)–O(n) |

## Tradeoff

- Quickselect nhanh nhất thực tế nhưng **phá thứ tự mảng** (in-place) và xấu nhất O(n²) với pivot tệ (mảng đã sắp xếp + Lomuto lấy phần tử cuối) ⇒ dùng pivot ngẫu nhiên.
- Heap giữ nguyên mảng, chạy được trên luồng dữ liệu, O(n log k); tốt khi k nhỏ hoặc dữ liệu không vừa bộ nhớ.
- Median of medians đảm bảo O(n) nhưng hằng số lớn, hiếm khi dùng ngoài lý thuyết.

## Lợi / Hại

**Lợi:** O(n) trung bình, O(1) bộ nhớ, là nền của `nth_element` trong C++ STL và `np.partition`. **Hại:** không ổn định với nhiều phần tử trùng (dùng 3-way partition), không phù hợp dữ liệu luồng, cần ngẫu nhiên hoá để tránh adversarial input.

## Use case thực tế

- Percentile / median nhanh trên mẫu lớn (p50, p99 latency) không cần sort.
- Chọn k điểm gần nhất (K Closest Points) trong O(n) thay vì heap.
- Cắt tỉa top-k trong hệ gợi ý, chọn ngưỡng (threshold) trong tìm kiếm gần đúng.
- `nth_element` để chia dữ liệu khi xây kd-tree (median split).

## Lỗi thường gặp

- Nhầm "lớn thứ k" với "nhỏ thứ k": lớn thứ k = nhỏ thứ `n − k + 1`.
- Partition với `<=` thay vì `<` ở Lomuto làm mảng toàn phần tử bằng nhau thành O(n²).
- Không thu hẹp đúng: `lo = p` thay vì `p + 1` ⇒ vòng lặp vô hạn.
- Chọn pivot cố định trên dữ liệu đã sắp xếp ⇒ O(n²); luôn random pivot hoặc shuffle trước.
- Thay đổi mảng gốc khi caller không mong muốn – sao chép trước nếu cần.

## Biến thể

- **Hoare partition:** hai con trỏ từ hai đầu, ít hoán đổi hơn.
- **3-way partition (Dutch flag):** nhóm `< pivot`, `= pivot`, `> pivot` – tối ưu khi nhiều trùng.
- **Introselect:** quickselect + fallback median of medians khi đệ quy quá sâu.
- **K Closest Points:** quickselect theo khoảng cách, lấy `k` phần tử đầu sau partition.
- **Top-k frequent bằng quickselect:** partition mảng cặp (giá trị, count).
