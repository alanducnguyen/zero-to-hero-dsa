## Bài toán

Cho chuỗi `s` gồm chữ cái in hoa và số nguyên `k`. Bạn được chọn **tối đa k vị trí** và đổi ký tự ở đó thành bất kỳ chữ in hoa nào. Hỏi độ dài lớn nhất của một substring **gồm toàn một ký tự** có thể đạt được (LeetCode 424).

Ví dụ: `s = "AABABBA", k = 1` ⇒ `4` (đổi chữ B ở giữa "AABA" thành A). `s = "ABAB", k = 2` ⇒ `4`.

## Ý tưởng / Trực giác

Đổi cách nhìn: thay vì hỏi "nên đổi những ký tự nào", hãy hỏi "**một cửa sổ cố định cần bao nhiêu lần đổi** để thành toàn một ký tự?". Câu trả lời rất gọn: giữ nguyên ký tự xuất hiện nhiều nhất, đổi tất cả phần còn lại. Vậy cửa sổ độ dài `len` cần đúng `len − maxFreq` lần đổi, với `maxFreq` là tần suất cao nhất trong cửa sổ.

Điều kiện **hợp lệ** là `len − maxFreq ≤ k`. Điều kiện này có tính đơn điệu: nếu một cửa sổ hợp lệ thì mọi cửa sổ con của nó cũng hợp lệ (bớt ký tự không làm tăng số lần cần đổi). Đó chính là dấu hiệu của **sliding window co–giãn**: mở rộng `right` khi còn hợp lệ, trượt `left` khi vi phạm.

Mẹo then chốt: ta **không cần giảm `maxFreq`** khi bỏ ký tự ở `left`. Ta chỉ muốn tìm cửa sổ *dài hơn* đáp án hiện tại, và một cửa sổ dài hơn chỉ có thể hợp lệ khi có ký tự nào đó đạt tần suất *lớn hơn* `maxFreq` cũ.

## Thuật toán từng bước

1. `count` = bảng tần suất trong cửa sổ, `maxFreq = 0`, `left = 0`, `best = 0`.
2. Với mỗi `right` từ 0 tới n−1:
   - Tăng `count[s[right]]`, cập nhật `maxFreq = max(maxFreq, count[s[right]])` – chỉ ký tự vừa thêm mới có thể làm maxFreq tăng.
   - Nếu `(right − left + 1) − maxFreq > k`: bỏ `s[left]` khỏi bảng đếm và `left++`. Chỉ cần **một** lần (dùng `if`, không cần `while`) vì cửa sổ vừa dài thêm đúng 1.
   - `best = max(best, right − left + 1)`.
3. Trả về `best`.

Lưu ý: với `if`, cửa sổ **không bao giờ co lại** – nó chỉ giãn hoặc trượt nguyên khối. Độ dài cửa sổ luôn bằng `best`, và cuối cùng chính là đáp án.

## Chứng minh đúng

**Bất biến:** sau mỗi bước, `maxFreq` là tần suất lớn nhất *từng thấy* trong một cửa sổ nào đó đã xét, và độ dài cửa sổ `right − left + 1 = best`.

- Khi cửa sổ thật sự hợp lệ với maxFreq thật, thuật toán giãn ⇒ best tăng đúng.
- Khi maxFreq "lỗi thời" (lớn hơn tần suất thật hiện tại), điều kiện `len − maxFreq ≤ k` có thể đúng "giả". Nhưng lúc đó ta chỉ **trượt** chứ không làm best vượt quá giá trị từng đạt hợp lệ: best chỉ tăng khi `len` tăng mà vẫn thỏa `len − maxFreq ≤ k`, tức là `len ≤ maxFreq + k`. Vì `maxFreq + k` đã từng là độ dài của một cửa sổ hợp lệ thật (lúc maxFreq đạt giá trị đó), best không bao giờ vượt quá đáp án đúng.
- Ngược lại, gọi cửa sổ tối ưu là `[L, R]` với tần suất max `f`, độ dài `f + k'` (k' ≤ k). Khi `right` đi tới `R`, nếu best còn nhỏ hơn, cửa sổ hiện tại nằm gọn trong `[L, R]` ⇒ count của ký tự trội đạt `f` đâu đó trong quá trình ⇒ maxFreq ≥ f ⇒ cửa sổ được giãn tới độ dài tối ưu. Vậy best = đáp án.

## Độ phức tạp

| | Thời gian | Bộ nhớ |
|---|---|---|
| Brute force (mọi substring, đếm lại) | O(n²·26) hoặc O(n²) | O(26) |
| Sliding window + tính lại maxFreq bằng quét 26 | O(26·n) | O(26) |
| **Sliding window + maxFreq không giảm** | **O(n)** | **O(1)** (≤ 26 khóa) |

Mỗi chỉ số vào cửa sổ một lần và ra tối đa một lần.

## Tradeoff

- Phiên bản "maxFreq không giảm" nhanh nhất nhưng **khó giải thích**; nếu phỏng vấn viên không quen, bản quét 26 chữ cái để tính maxFreq thật (O(26n)) dễ chứng minh hơn và vẫn tuyến tính.
- Dùng `Map` linh hoạt với bảng chữ cái bất kỳ; dùng mảng `int[26]` nhanh hơn với chữ in hoa.
- Bản `if` (trượt) cho đáp án là độ dài nhưng **cửa sổ cuối cùng không nhất thiết hợp lệ** – nếu cần trả về chính substring, hãy lưu `bestStart` lúc best tăng.

## Lợi / Hại

**Lợi:** O(n), O(1) bộ nhớ, code ngắn ~10 dòng; mẹo maxFreq áp dụng được cho nhiều bài "dài nhất với ≤ k ngoại lệ".

**Hại:** trực giác về maxFreq lỗi thời dễ gây nhầm; trạng thái cửa sổ ở giữa có thể "không hợp lệ thật" nên không dùng được nếu bài cần liệt kê mọi cửa sổ hợp lệ hoặc trả về substring tại thời điểm cuối.

## Use case thực tế

- Phân tích log/chuỗi gen: tìm đoạn dài nhất gần như đồng nhất, cho phép ≤ k lỗi đột biến/nhiễu.
- Xử lý tín hiệu nhị phân: chuỗi bit dài nhất toàn 1 khi được sửa ≤ k bit lỗi (Max Consecutive Ones III).
- Nén run-length: ước lượng lợi ích nếu cho phép thay một số ký tự (lossy).

## Lỗi thường gặp

- Quên rằng chỉ ký tự vừa thêm mới có thể làm tăng maxFreq, rồi quét lại toàn bảng mỗi bước (vẫn đúng nhưng chậm hơn) hoặc tệ hơn: **giảm maxFreq sai** chỉ bằng count của ký tự vừa bỏ.
- Dùng `while` với maxFreq không giảm – vẫn đúng, nhưng gây hiểu lầm rằng cửa sổ phải hợp lệ thật.
- Nhầm điều kiện thành `len − maxFreq < k` (off-by-one).
- Tính `best` bằng `maxFreq + k` mà quên chặn bởi `n` (khi k lớn hơn số ký tự cần đổi).
- Chuỗi rỗng: phải trả 0.

## Biến thể

- **1004 Max Consecutive Ones III:** mảng 0/1, được lật ≤ k số 0 – điều kiện `zeros ≤ k`.
- **2024 Maximize the Confusion of an Exam:** chạy hai lần (T và F) hoặc dùng y hệt bài này với bảng 2 ký tự.
- **3 Longest Substring Without Repeating Characters:** cùng khung sliding window, điều kiện "mọi count ≤ 1".
- **340 Longest Substring with At Most K Distinct Characters:** điều kiện trên số khóa của bảng đếm.
- Cho phép **xóa** thay vì đổi: điều kiện giống hệt, chỉ khác diễn giải.
