## Phân tích

Cả ba cách đều dựa trên một quan sát: stack chỉ thay đổi ở **đỉnh**, nên min của phần bên dưới một mức không bao giờ đổi khi mức đó còn tồn tại. Ta chỉ cần ghi lại min "theo lịch sử" và khôi phục khi pop – khác nhau ở *ghi bao nhiêu* và *ghi thế nào*.

**Stack cặp `[giá trị, min]`** – mỗi phần tử tự mang min từ đáy tới nó. `getMin` đọc đỉnh, `pop` bỏ cả cặp là min tự khôi phục. Đúng hiển nhiên, khó viết sai nhất, nhưng **luôn** tốn 2n số.

**Hai stack** – `data` và `mins`, với `mins` chỉ nhận `x` khi `x ≤ min` hiện tại; khi pop đúng giá trị bằng đỉnh `mins` thì pop cả `mins`. Cùng O(1) mọi thao tác, worst case (dãy giảm dần) vẫn 2n, nhưng thông thường `mins` ngắn hơn `data` rất nhiều. Bẫy duy nhất: phải dùng **`≤`** – nếu dùng `<`, push hai lần cùng một min rồi pop một lần sẽ làm mất min.

**Stack độ lệch** – lưu `d = x − min` (min *trước* khi push) và một biến `min`. `d < 0` nghĩa là `x` là min mới; khi pop phần tử đó, khôi phục `min cũ = min − d`. Chỉ n số + O(1) phụ, nhưng: (1) khó đọc, khó chứng minh tại chỗ; (2) `x − min` có thể **tràn số** – với `int32`, `2³¹−1 − (−2³¹)` cần 33 bit, Java/C++ phải dùng `long`, và với giá trị `int64` thì không còn kiểu rộng hơn; (3) trong JS số là double, an toàn tới 2⁵³ nhưng cũng chỉ vậy. Tiết kiệm được cũng chỉ là hằng số (n so với ≤ 2n).

## Xếp hạng

1. **Hai stack (chỉ lưu kỷ lục min)** – O(1)/O(n), trung bình ít bộ nhớ nhất trong các cách dễ đọc, chỉ dùng các phép toán an toàn (không trừ số).
2. **Stack cặp** – O(1)/O(2n) cố định. Đơn giản nhất; hoà về tiệm cận với hạng 1, thua ở hằng số bộ nhớ khi min ít đổi.
3. **Stack độ lệch** – O(1)/O(n) + O(1). Ấn tượng như một mẹo, nhưng rủi ro tràn số và khó bảo trì ⇒ xếp cuối dù dùng ít bộ nhớ nhất.

Hạng 1 và 2 rất sát nhau: nếu ưu tiên *độ chắc chắn khi code trên bảng* thì stack cặp hoàn toàn chấp nhận được.

## Khi nào thứ hạng đổi

- **Min thay đổi liên tục (dãy giảm dần)** ⇒ hai stack không còn lợi; stack cặp gọn hơn vì chỉ một cấu trúc.
- **Bộ nhớ cực chặt và miền giá trị nhỏ (đảm bảo không tràn)** ⇒ stack độ lệch lên hạng 1.
- **Nhiều giá trị min trùng lặp** ⇒ biến thể hai stack lưu `[min, count]` trong `mins` để không phình theo số lần trùng.
- **Cần cả getMin và getMax** ⇒ stack cặp mở rộng thành bộ ba `[x, min, max]` dễ nhất.
