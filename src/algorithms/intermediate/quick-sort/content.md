## Bài toán

Sắp xếp mảng `n` số. Quick Sort là thuật toán được dùng trong `std::sort` (C++), `Arrays.sort` cho kiểu nguyên thuỷ (Java, dual-pivot), và từng là nền tảng của V8 trước khi chuyển sang TimSort. Khi phỏng vấn hỏi "hãy sắp xếp mảng", Quick Sort và Merge Sort là hai lựa chọn mặc định; người phỏng vấn muốn bạn giải thích **partition** và **khi nào nó suy biến O(n²)**.

## Ý tưởng / Trực giác

Chọn một phần tử làm **pivot**. Sắp xếp lại mảng sao cho mọi phần tử nhỏ hơn pivot nằm bên trái, lớn hơn hoặc bằng nằm bên phải. Lúc này pivot đã ở **đúng vị trí cuối cùng** – không bao giờ phải động tới nó nữa. Đệ quy trên hai nửa.

So với Merge Sort (chia đôi "ngu ngốc" rồi tốn công merge), Quick Sort tốn công ở bước **chia** (partition) để bước **gộp** là miễn phí – hai nửa đã nằm đúng chỗ.

## Thuật toán từng bước (phân hoạch Lomuto)

1. `sort(lo, hi)`: nếu `lo >= hi` trả về.
2. `partition(lo, hi)`:
   - `pivot = a[hi]`, `i = lo`.
   - Với `j` từ `lo` đến `hi-1`: nếu `a[j] < pivot` thì hoán đổi `a[i]` ↔ `a[j]`, `i++`.
   - Hoán đổi `a[i]` ↔ `a[hi]`. Trả `i`.
3. `sort(lo, p-1)`, `sort(p+1, hi)`.

Ở tab **Debug**, quan sát **call stack** ở panel phải và vùng xanh lá (pivot đã cố định) lớn dần. Thử preset "Đã sắp xếp" để thấy đệ quy lệch hẳn một bên – đó là worst case.

## Chứng minh đúng

**Bất biến của partition** (với `j` hiện tại):
- `a[lo..i-1] < pivot`
- `a[i..j-1] >= pivot`
- `a[j..hi-1]` chưa xét, `a[hi] = pivot`.

Mỗi bước: nếu `a[j] < pivot`, hoán đổi nó với `a[i]` (phần tử đầu vùng ≥) rồi `i++` ⇒ cả hai vùng mở rộng đúng. Nếu không, vùng ≥ mở rộng thêm `a[j]`. Kết thúc `j = hi`: hoán `a[i]` ↔ `a[hi]` đặt pivot giữa hai vùng. Vị trí `i` là **vị trí cuối cùng** của pivot vì có đúng `i - lo` phần tử nhỏ hơn nó trong đoạn.

**Quy nạp theo kích thước:** đoạn 0–1 phần tử đã sắp xếp; đoạn lớn hơn được tách thành pivot (đúng chỗ) + hai đoạn nhỏ hơn được sắp xếp đúng theo giả thiết ⇒ toàn đoạn sắp xếp.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Tốt nhất / Trung bình | O(n log n) | Pivot chia đôi ⇒ log n tầng, mỗi tầng O(n) partition |
| Xấu nhất | O(n²) | Pivot luôn là min/max (mảng đã sắp xếp với pivot cuối) ⇒ n tầng |
| Bộ nhớ | O(log n) | Stack đệ quy (trung bình). Xấu nhất O(n) nếu không tối ưu |

**Hằng số nhỏ:** partition chỉ so sánh và hoán đổi tại chỗ, truy cập bộ nhớ tuần tự ⇒ cache cực tốt. Đó là lý do nó nhanh hơn Merge Sort 2–3 lần dù cùng O(n log n).

## Tradeoff

- **Tốc độ trung bình ↔ Bảo đảm worst case:** Quick Sort nhanh nhất trung bình nhưng O(n²) khi xui; Merge Sort/Heap Sort bảo đảm O(n log n). Introsort (C++) kết hợp: Quick Sort, chuyển sang Heap Sort nếu đệ quy quá sâu.
- **In-place ↔ Stable:** Quick Sort in-place O(log n) nhưng **không stable**. Merge Sort stable nhưng O(n) bộ nhớ phụ. Khi sắp xếp object theo key (cần giữ thứ tự ban đầu của key bằng nhau), bắt buộc stable ⇒ V8, Python, Java (object) dùng TimSort.
- **Lomuto ↔ Hoare partition:** Lomuto dễ hiểu, dễ chứng minh; Hoare ít hoán đổi hơn ~3 lần và xử lý trùng lặp tốt hơn. Với nhiều phần tử bằng nhau, Lomuto suy biến O(n²) ⇒ dùng 3-way partition (Dutch National Flag).
- **Chọn pivot:** cuối/đầu (đơn giản, dễ worst case), ngẫu nhiên (kỳ vọng O(n log n) với mọi input), median-of-three (thực tế tốt), median-of-medians (bảo đảm O(n log n) nhưng chậm thực tế).

## Lợi / Hại

**Lợi**
- Nhanh nhất thực tế cho mảng lớn trong bộ nhớ.
- In-place, O(log n) bộ nhớ phụ.
- Partition là nền tảng của **Quickselect** (tìm phần tử thứ k trong O(n) trung bình).

**Hại**
- Worst case O(n²) nếu chọn pivot kém – phải randomize.
- Không stable.
- Đệ quy; mảng rất lớn có thể tràn stack nếu không đệ quy nửa nhỏ trước + lặp nửa lớn.
- Kém hiệu quả với dữ liệu trên đĩa / linked list (cần truy cập ngẫu nhiên).

## Use case thực tế

- **Thư viện chuẩn:** C++ `std::sort` (introsort), Java `Arrays.sort(int[])` (dual-pivot quicksort), Go `sort.Slice` (pdqsort – pattern-defeating quicksort), Rust `sort_unstable`.
- **Quickselect:** top-k, median trong thống kê, k điểm gần nhất (LeetCode 973) với O(n) trung bình thay vì O(n log k) heap.
- **Database:** sắp xếp in-memory cho ORDER BY khi dữ liệu vừa RAM.
- **Đồ họa:** sắp xếp đối tượng theo độ sâu (z-order) mỗi frame.

## Lỗi thường gặp

1. `sort(lo, p)` thay vì `sort(lo, p-1)` ⇒ đệ quy vô hạn khi `p = hi`.
2. Dùng `a[j] <= pivot` với Lomuto ⇒ với mảng toàn phần tử bằng nhau vẫn O(n²) (cả `<` lẫn `<=` đều tệ; cần 3-way).
3. Quên randomize pivot ⇒ TLE trên test mảng đã sắp xếp (LeetCode 912 có test này).
4. Hoare partition: trả về `j` nhưng đệ quy `[lo, j]` và `[j+1, hi]` (không phải `j-1`).
5. Đệ quy nửa lớn trước ⇒ stack O(n) worst case.

## Biến thể

- **Randomized Quick Sort:** hoán đổi `a[hi]` với phần tử ngẫu nhiên trước partition.
- **3-way Quick Sort (Dijkstra):** ba vùng `< = >`; O(n) khi ít giá trị phân biệt.
- **Dual-pivot Quick Sort (Yaroslavskiy):** Java 7+, ít cache miss hơn.
- **Introsort:** Quick → Heap khi depth > 2 log n; Insertion khi đoạn < 16.
- **Quickselect:** chỉ đệ quy vào nửa chứa vị trí k ⇒ O(n) trung bình.
