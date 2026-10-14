## Bài toán

Cho hai mảng đã sắp xếp: `nums1` có `m` phần tử thật và `n` ô trống phía sau, `nums2` có `n` phần tử. Trộn `nums2` vào `nums1` **tại chỗ** sao cho `nums1` sắp xếp tăng dần.

`nums1 = [1,2,3,0,0,0], m = 3`, `nums2 = [2,5,6]` → `[1,2,2,3,5,6]`.

Bài này (LeetCode 88) là bước trộn của Merge Sort nhưng với ràng buộc không được dùng mảng phụ. Cái bẫy nằm ở **hướng đi**.

## Ý tưởng / Trực giác

Trộn từ đầu thì ô `nums1[0]` sẽ bị ghi đè khi phần tử của `nums1` chưa được xét ⇒ mất dữ liệu (hoặc phải dịch mảng O(n) mỗi lần).

Trộn **từ cuối**: ô ghi `k = m + n − 1` là ô trống. Phần tử lớn nhất trong hai mảng chắc chắn đứng cuối, nên lấy max của `nums1[i]`, `nums2[j]` ghi vào `k`. Bất biến: `k ≥ i + 1` vì số ô còn trống ở bên phải `i` luôn ≥ số phần tử `nums2` chưa chép ⇒ không bao giờ ghi đè lên phần tử chưa xét.

## Thuật toán từng bước

1. `i = m − 1`, `j = n − 1`, `k = m + n − 1`.
2. Khi `j ≥ 0`: nếu `i ≥ 0` và `nums1[i] > nums2[j]` thì `nums1[k] = nums1[i]; i−−`; ngược lại `nums1[k] = nums2[j]; j−−`. Sau đó `k−−`.
3. Dừng khi `nums2` hết; phần còn lại của `nums1` đã đúng chỗ.

Ở tab **Debug**, dải cyan là phần `nums1` chưa xét, ô xanh lá là phần đã trộn xong từ cuối, ô đỏ là ô vừa ghi.

## Chứng minh đúng

Bất biến sau mỗi vòng: `nums1[k+1..m+n)` chứa đúng các phần tử lớn nhất của hai mảng theo thứ tự tăng, và `nums1[0..i]`, `nums2[0..j]` là phần chưa xét. Mỗi bước ghi max của hai phần tử cuối chưa xét vào `k`, là phần tử lớn nhất còn lại ⇒ giữ bất biến. Vì `k − i = (m+n−1−(m−1)) − ...` luôn bằng `j + 1 ≥ 1` khi `j ≥ 0`, ô `k` không trùng ô chưa xét của `nums1`. Khi `j < 0`, phần còn lại `nums1[0..i]` nhỏ hơn mọi phần tử đã ghi và đã sắp xếp sẵn ⇒ kết quả đúng.

## Độ phức tạp

| Cách | Thời gian | Bộ nhớ |
|---|---|---|
| Hai con trỏ từ cuối | O(m + n) | O(1) |
| Trộn ra mảng phụ rồi chép lại | O(m + n) | O(m + n) |
| Chèn từng phần tử nums2 rồi dịch | O(m·n) | O(1) |
| Nối rồi sort | O((m+n) log(m+n)) | O(1)–O(m+n) |

## Tradeoff

- Trộn từ cuối tối ưu cả thời gian lẫn bộ nhớ nhưng chỉ dùng được khi `nums1` có sẵn chỗ trống.
- Mảng phụ đơn giản nhất, phù hợp khi không có ràng buộc bộ nhớ.
- `sort` ngắn gọn nhưng bỏ phí thông tin đã sắp xếp.

## Lợi / Hại

**Lợi:** O(1) bộ nhớ, ổn định (dùng `>` nghiêm ngặt nên phần tử bằng nhau giữ thứ tự `nums1` trước), là bước trộn tái dùng trong Merge Sort / Timsort. **Hại:** cần biết trước `n` ô trống; không áp dụng cho linked list (dùng dummy node thay thế).

## Use case thực tế

- Gộp hai lô dữ liệu đã sắp xếp vào buffer có sẵn (log segment, SSTable compaction trong LSM-tree).
- Timsort (sort mặc định của Python, Java, V8) trộn các run đã sắp xếp tại chỗ với buffer tạm nhỏ.
- Hợp nhất kết quả hai truy vấn đã sắp xếp theo thời gian (feed, timeline).
- Thuật toán trên external storage: trộn từ cuối tránh ghi đè block chưa đọc.

## Lỗi thường gặp

- Trộn từ đầu ⇒ ghi đè dữ liệu chưa xét.
- Điều kiện vòng lặp `i >= 0 && j >= 0` rồi quên chép nốt `nums2` khi `nums1` hết. Dùng `while (j >= 0)` với kiểm tra `i >= 0` bên trong thì không cần bước phụ.
- Dùng `>=` thay vì `>` làm mất tính ổn định (không sai kết quả số, nhưng sai nếu phần tử là object).
- Nhầm `m`, `n` với `nums1.length`, `nums2.length`.

## Biến thể

- **Merge Two Sorted Lists (21):** cùng ý tưởng trên linked list, đi từ đầu với dummy node.
- **Squares of a Sorted Array (977):** hai con trỏ từ hai đầu, ghi từ cuối.
- **Merge k mảng:** heap k phần tử, O(N log k).
- **Trộn không có chỗ trống (in-place merge):** rất khó, O(n log n) hoặc thuật toán block merge (Timsort dùng buffer).
- **Intersection của hai mảng sắp xếp:** hai con trỏ từ đầu, tiến con trỏ nhỏ hơn.
