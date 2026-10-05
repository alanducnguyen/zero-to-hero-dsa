## Bài toán

Sắp xếp mảng `n` số. Merge Sort là thuật toán sắp xếp O(n log n) **đầu tiên** bạn nên thuộc lòng, vì nó có ba thứ Quick Sort không có: **worst case O(n log n) đảm bảo**, **stable**, và **không cần truy cập ngẫu nhiên** (sắp xếp được linked list và dữ liệu trên đĩa). Nó cũng là ví dụ chuẩn khi người phỏng vấn hỏi về chia để trị và Master Theorem.

## Ý tưởng / Trực giác

Hai quan sát:
1. Mảng 1 phần tử luôn sắp xếp.
2. Có hai mảng **đã sắp xếp**, ta trộn chúng thành một mảng sắp xếp trong O(n) bằng cách so sánh phần tử đầu của mỗi mảng và lấy phần tử nhỏ hơn – như trộn hai hàng người đã xếp theo chiều cao.

Vậy: chia đôi mảng, sắp xếp từng nửa (đệ quy), trộn. Mọi "công việc thật" nằm ở bước **trộn**; bước chia chỉ là cắt đôi.

## Thuật toán từng bước

1. `mergeSort(a)`: nếu `|a| ≤ 1` trả `a`.
2. `mid = ⌊n/2⌋`; `left = mergeSort(a[0..mid))`, `right = mergeSort(a[mid..n))`.
3. `merge(left, right)`: hai con trỏ `i`, `j`; lấy phần tử nhỏ hơn (ưu tiên trái khi bằng), rồi chép phần dư.

Tab **Debug**: vùng cyan/vàng là hai nửa đang chia; khi merge, ba mảng nhỏ `left`, `right`, `out` hiện bên dưới; call stack ở bên phải cho thấy độ sâu đệ quy. Preset "Trùng lặp (stable)" cho thấy hai số 5 giữ nguyên thứ tự.

## Chứng minh đúng

**Merge đúng:** bất biến: `out` sắp xếp, và mọi phần tử trong `out` ≤ `left[i]` và ≤ `right[j]`. Mỗi bước lấy min của hai đầu ⇒ phần tử mới ≥ mọi phần tử trong `out` và ≤ mọi phần tử còn lại ⇒ bất biến giữ. Khi một bên hết, phần dư bên kia đã sắp xếp và ≥ mọi phần tử trong `out` ⇒ chép thẳng.

**Merge Sort đúng (quy nạp theo n):** n ≤ 1 hiển nhiên. Với n > 1, hai nửa nhỏ hơn nên được sắp xếp đúng theo giả thiết; merge hai mảng sắp xếp cho mảng sắp xếp chứa đúng các phần tử ban đầu.

**Stable:** khi `left[i] = right[j]`, lấy `left[i]` trước (điều kiện `<=`). Mọi phần tử của `left` đứng trước mọi phần tử của `right` trong mảng gốc ⇒ thứ tự tương đối giữ nguyên.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian (mọi trường hợp) | O(n log n) | T(n) = 2T(n/2) + O(n) ⇒ Master Theorem case 2. log n tầng, mỗi tầng merge tổng n phần tử |
| Bộ nhớ | O(n) | Mảng phụ cho merge (+ O(log n) stack đệ quy) |
| Linked list | O(1) phụ | Chỉ nối lại con trỏ |

Không có best case tốt hơn: dù mảng đã sắp xếp, vẫn chia và merge đủ (TimSort sửa điểm này bằng cách phát hiện run có sẵn).

## Tradeoff

- **Merge ↔ Quick:** Merge đảm bảo O(n log n), stable, tốt cho linked list/đĩa; Quick nhanh hơn ~2× thực tế trên mảng trong RAM, in-place. Thư viện: Java dùng Merge (TimSort) cho object vì cần stable, Quick (dual-pivot) cho primitive vì không cần.
- **Top-down (đệ quy) ↔ Bottom-up (lặp):** bottom-up merge các đoạn kích thước 1, 2, 4… không đệ quy, phù hợp hệ thống nhúng; top-down dễ đọc hơn.
- **Cấp phát mỗi lần merge ↔ một buffer dùng chung:** code minh hoạ dùng `slice` cho rõ; production cấp phát một mảng phụ kích thước n dùng lại ⇒ giảm GC đáng kể.
- **In-place merge:** tồn tại (block merge, Wiki sort) nhưng phức tạp và chậm hơn; thực tế hiếm dùng.
- **Ngưỡng Insertion Sort:** với đoạn < 16–32 phần tử, dùng Insertion Sort thay vì đệ quy tiếp ⇒ nhanh hơn 10–20%.

## Lợi / Hại

**Lợi**
- Worst case O(n log n) – không bị "tấn công" bằng input xấu như Quick Sort.
- Stable.
- Tuần tự: sắp xếp linked list O(1) bộ nhớ phụ, external sort trên đĩa, song song hoá dễ (hai nửa độc lập).
- Mở rộng tự nhiên để đếm nghịch thế, đếm "số nhỏ hơn bên phải".

**Hại**
- O(n) bộ nhớ phụ trên mảng.
- Hằng số lớn hơn Quick Sort (copy dữ liệu, cache kém hơn).
- Không adaptive ở dạng cơ bản.

## Use case thực tế

- **TimSort** (Python `sorted`, Java `Arrays.sort(Object[])`, V8 `Array.prototype.sort`): Merge Sort + phát hiện run + Insertion Sort.
- **External sort:** sắp xếp file lớn hơn RAM: chia thành chunk vừa RAM, sắp xếp từng chunk, k-way merge (database ORDER BY, Hadoop/Spark shuffle).
- **Sắp xếp linked list:** `std::list::sort`, Linux kernel `list_sort`.
- **Đếm nghịch thế:** đo "độ lộn xộn" của dữ liệu, so sánh xếp hạng (Kendall tau).
- **Song song:** merge sort đa luồng/GPU vì chia việc độc lập.
- **Merge nhiều log/stream sắp xếp theo thời gian:** bước merge dùng trực tiếp.

## Lỗi thường gặp

1. `mid = n / 2` không làm tròn trong JS ⇒ `slice(0, 2.5)` ngầm làm tròn nhưng tránh dựa vào đó.
2. Dùng `<` thay `<=` trong merge ⇒ mất stable.
3. Quên chép phần dư sau vòng while ⇒ mất phần tử.
4. Base case `n < 1` thay vì `≤ 1` ⇒ đệ quy vô hạn với 1 phần tử.
5. Dùng `shift()` để lấy đầu mảng trong merge ⇒ O(n) mỗi lần, merge thành O(n²).
6. Trả về mảng gốc (`input`) ở base case rồi sửa tại chỗ ở nơi khác ⇒ side effect bất ngờ.

## Biến thể

- **Bottom-up Merge Sort:** lặp với width = 1, 2, 4, …
- **Natural Merge Sort / TimSort:** tận dụng run có sẵn ⇒ O(n) với mảng đã sắp xếp.
- **Merge Sort trên linked list:** tìm giữa bằng slow/fast, cắt, merge bằng nối con trỏ.
- **Đếm nghịch thế (inversions):** khi lấy `right[j]` trước `left[i]`, cộng `left.length − i`.
- **k-way merge:** trộn k mảng bằng heap O(N log k).
- **Parallel Merge Sort:** hai nửa chạy song song, merge song song bằng binary search chia đôi.
