## Bài toán

Cho mảng `nums` (không sắp xếp) và `target`, trả về chỉ số hai phần tử có tổng bằng `target`. Mỗi input có đúng một đáp án, không dùng một phần tử hai lần.

Two Sum là bài **#1** trên LeetCode và là câu hỏi screening phổ biến nhất lịch sử. Nó không khó, nhưng người phỏng vấn muốn xem bạn có **nhận ra ngay** cách thay vòng lặp lồng bằng HashMap hay không – đó là phản xạ cơ bản nhất của tư duy "đổi bộ nhớ lấy thời gian".

## Ý tưởng / Trực giác

Brute force: với mỗi `i`, quét `j > i` tìm `nums[j] = target − nums[i]` ⇒ O(n²). Bước "quét tìm một giá trị" chính là thứ HashMap làm trong O(1).

Duyệt một lượt. Tại `i`, hỏi Map: "đã thấy giá trị `target − nums[i]` chưa?" Nếu có ⇒ xong. Nếu chưa ⇒ ghi `nums[i] → i` vào Map để các phần tử sau tìm thấy nó. Mỗi phần tử tra và ghi một lần.

Điểm tinh tế: **kiểm tra trước, ghi sau** – nếu ghi trước, phần tử có thể ghép với chính nó khi `target = 2·nums[i]`.

## Thuật toán từng bước

1. `seen = Map()`.
2. Với mỗi `i`: `need = target − nums[i]`; nếu `seen.has(need)` trả `[seen.get(need), i]`; ngược lại `seen.set(nums[i], i)`.
3. Trả `null`.

Tab **Debug**: Map bên dưới lớn dần; ô vàng là phần bù vừa tra thấy. Preset "Không tự ghép" `[3,2,4], target 6` cho thấy vì sao phải ghi sau khi kiểm tra.

## Chứng minh đúng

**Bất biến:** sau khi xử lý `i` phần tử đầu, `seen` chứa mọi giá trị trong `nums[0..i)` (ánh xạ tới một chỉ số của nó).

Khi xét `i`, nếu tồn tại `j < i` với `nums[j] = target − nums[i]`, thì theo bất biến `seen` có `need` ⇒ ta tìm thấy. Mọi cặp `(j, i)` với `j < i` đều được xét đúng một lần tại bước `i` ⇒ không bỏ sót. Và cặp trả về thoả `nums[j] + nums[i] = target` với `j < i` (vì `j` ghi trước bước `i`) ⇒ không tự ghép.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Mỗi phần tử: 1 lần tra + 1 lần ghi Map, kỳ vọng O(1) |
| Bộ nhớ | O(n) | Map tối đa n entry |
| Brute force | O(n²) / O(1) | Để so sánh |
| Sắp xếp + two pointers | O(n log n) / O(1)* | *mất chỉ số gốc nếu không lưu cặp |

## Tradeoff

- **HashMap O(n) bộ nhớ ↔ Two pointers O(1) bộ nhớ:** two pointers cần mảng sắp xếp; nếu phải sắp xếp thì O(n log n) và mất chỉ số. HashMap thắng khi cần chỉ số gốc hoặc một lượt.
- **Một lượt ↔ Hai lượt:** hai lượt (xây Map đầy đủ rồi tra) đơn giản hơn nhưng phải xử lý trường hợp `need === nums[i]` (kiểm tra chỉ số khác nhau). Một lượt gọn và tránh bẫy đó.
- **Map ↔ Object:** `Object` với key số bị ép thành string và có nguy cơ key `__proto__`; `Map` an toàn, giữ kiểu, O(1) thật.
- **Hash collision:** worst case lý thuyết O(n) mỗi thao tác; thực tế V8 dùng bảng băm tốt, coi là O(1).

## Lợi / Hại

**Lợi**
- Một lượt, O(n), code 8 dòng.
- Không cần sắp xếp, giữ chỉ số gốc.
- Mẫu "phần bù trong Map" tái dùng cho nhiều bài: cặp có hiệu k, cặp chia hết, Contains Duplicate II.

**Hại**
- O(n) bộ nhớ phụ.
- Không mở rộng trực tiếp sang "tất cả cặp không trùng" (3Sum dùng sắp xếp + two pointers đẹp hơn).
- Với giá trị float, băm theo bằng nhau chính xác – cẩn thận sai số.

## Use case thực tế

- **Đối soát giao dịch:** tìm hai khoản có tổng bằng số tiền cần khớp.
- **Dedupe / join trong database:** hash join là chính ý tưởng này (xây hash table một bảng, tra bảng kia).
- **Caching / memo:** "đã thấy chưa?" là câu hỏi HashMap trả lời ở mọi nơi.
- **Phát hiện trùng lặp:** Contains Duplicate, kiểm tra anagram, đếm tần suất.
- **Ghép cặp tài nguyên:** ghép hai file có tổng dung lượng vừa một ổ đĩa, ghép hai task vừa một ca.

## Lỗi thường gặp

1. Ghi vào Map trước khi kiểm tra ⇒ tự ghép (`[3,2,4]`, target 6 trả `[0,0]`).
2. Dùng `if (seen.get(need))` – sai khi chỉ số là 0 (falsy); dùng `!== undefined` hoặc `has`.
3. Trả về giá trị thay vì chỉ số.
4. Dùng `indexOf` trong vòng lặp ⇒ vẫn O(n²).
5. Trả `[i, j]` với `i > j` khi đề yêu cầu thứ tự tăng.

## Biến thể

- **Two Sum II (167):** mảng sắp xếp ⇒ two pointers O(1) bộ nhớ.
- **Two Sum III (170):** design add/find ⇒ Map đếm tần suất.
- **Two Sum IV (653):** trên BST ⇒ inorder + two pointers hoặc Set.
- **Cặp có hiệu k (532), cặp chia hết (1010), Number of Good Pairs (1512):** cùng khung "phần bù trong Map".
- **3Sum / 4Sum:** sắp xếp + two pointers; hoặc Map cho 4Sum II (454) với hai nửa.
- **Contains Duplicate II (219):** Map giá trị → chỉ số gần nhất, kiểm tra khoảng cách ≤ k.
