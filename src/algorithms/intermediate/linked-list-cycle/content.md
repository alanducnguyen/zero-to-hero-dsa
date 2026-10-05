## Bài toán

Cho danh sách liên kết đơn, xác định nó có **vòng** không (node cuối trỏ ngược về một node trước). Nếu có, trả về **node bắt đầu vòng**. Yêu cầu O(1) bộ nhớ – không được dùng Set đánh dấu.

LeetCode 141/142 là cặp bài linked list được hỏi nhiều nhất sau Reverse. Phần "có vòng không" ai cũng làm được; phần "**tìm đầu vòng**" với O(1) bộ nhớ là nơi người phỏng vấn kiểm tra bạn có hiểu **chứng minh toán học** hay chỉ thuộc lòng.

## Ý tưởng / Trực giác

Hai người chạy trên đường đua: nếu đường thẳng, người nhanh về đích trước và không bao giờ gặp lại. Nếu đường là **vòng tròn**, người nhanh (2 bước/lần) sẽ **đuổi kịp** người chậm (1 bước/lần) – khoảng cách giữa họ giảm 1 mỗi lần, nên sau tối đa L bước (L = chu vi vòng) họ gặp nhau.

**Tìm đầu vòng:** gọi `a` = khoảng cách head → đầu vòng, `b` = đầu vòng → điểm gặp, `L` = độ dài vòng. Khi gặp, slow đi `a + b`, fast đi `2(a + b)`. Fast hơn slow đúng một số nguyên lần vòng: `a + b = kL` ⇒ `a = kL − b`. Nghĩa là từ điểm gặp đi thêm `a` bước sẽ về đúng đầu vòng (đi `kL − b` bước từ vị trí `b` trong vòng). Vậy: một con trỏ từ head, một từ điểm gặp, cùng đi 1 bước ⇒ gặp nhau tại đầu vòng.

## Thuật toán từng bước

1. `slow = fast = head`.
2. Khi `fast` và `fast.next` khác null: `slow = slow.next`, `fast = fast.next.next`. Nếu `slow === fast` ⇒ có vòng, sang bước 3.
3. `p = head`; khi `p !== slow`: cả hai tiến 1 bước. Trả `p`.
4. Nếu thoát vòng lặp ở bước 2 ⇒ không vòng.

Tab **Debug**: xem slow (vàng) và fast (tím) đuổi nhau, điểm gặp màu đỏ, rồi giai đoạn 2 với `p` từ head. Preset "Vòng cả danh sách" và "Tự trỏ" là hai biên cần thử.

## Chứng minh đúng

**Không vòng ⇒ dừng đúng:** fast tiến 2 bước mỗi lần, sẽ chạm null sau ≤ n/2 lần.

**Có vòng ⇒ gặp nhau:** sau khi cả hai vào vòng, khoảng cách (theo chiều đi) từ slow tới fast là `d ∈ [0, L)`; mỗi bước fast tiến thêm 1 so với slow ⇒ `d` tăng 1 mod L ⇒ về 0 sau ≤ L bước. Tổng ≤ a + L bước.

**Giai đoạn 2 tìm đúng đầu vòng:** như lập luận ở trên, `a ≡ −b (mod L)`. Con trỏ từ head sau `a` bước tới đầu vòng; slow từ vị trí `b` trong vòng sau `a` bước ở vị trí `b + a ≡ 0 (mod L)` = đầu vòng. Chúng gặp nhau lần đầu không sớm hơn (trước khi vào vòng, p chưa ở trong vòng nên không thể trùng slow), nên điểm gặp đầu tiên chính là đầu vòng.

## Độ phức tạp

| | Giá trị | Giải thích |
|---|---|---|
| Thời gian | O(n) | Giai đoạn 1 ≤ a + L ≤ n bước; giai đoạn 2 ≤ a bước |
| Bộ nhớ | O(1) | Hai con trỏ |
| Dùng Set | O(n) / O(n) | Đơn giản hơn nhưng tốn bộ nhớ |

## Tradeoff

- **Floyd O(1) ↔ HashSet O(n):** Set dễ viết, dễ đúng, và cũng O(n) thời gian; Floyd thắng khi bộ nhớ quan trọng hoặc đề bắt buộc. Trong phỏng vấn, nêu Set trước rồi tối ưu.
- **Không sửa danh sách ↔ Đánh dấu node:** có thể phát hiện vòng bằng cách ghi dấu vào node (sửa `val` hoặc thêm cờ) nhưng phá dữ liệu và không an toàn đa luồng.
- **Brent's algorithm:** biến thể của Floyd với ít phép `next` hơn (fast nhảy theo luỹ thừa 2), nhanh hơn ~36% thực tế; Floyd dễ nhớ hơn.
- **Linked list ↔ Hàm lặp:** Floyd áp dụng cho bất kỳ dãy `x, f(x), f(f(x))…` trong không gian hữu hạn: Find the Duplicate Number, Happy Number, sinh số giả ngẫu nhiên.

## Lợi / Hại

**Lợi**
- O(1) bộ nhớ, không sửa dữ liệu.
- Tìm được cả đầu vòng và độ dài vòng (đếm bước slow đi từ điểm gặp tới khi quay lại).
- Tổng quát cho mọi hàm lặp trên tập hữu hạn.

**Hại**
- Chứng minh giai đoạn 2 khó nhớ; dễ viết sai điều kiện `fast.next`.
- Hằng số cao hơn Set một chút (fast đi 2n bước).

## Use case thực tế

- **Garbage collector / kiểm tra cấu trúc:** phát hiện vòng tham chiếu trong linked structure mà không cần bộ nhớ phụ.
- **Mật mã & số học:** thuật toán Pollard's rho phân tích thừa số nguyên tố dùng Floyd để phát hiện chu kỳ của dãy giả ngẫu nhiên.
- **Sinh số ngẫu nhiên:** đo chu kỳ của PRNG.
- **Phát hiện deadlock / vòng phụ thuộc** khi mỗi node chỉ có một "next" (chờ một tài nguyên).
- **Find the Duplicate Number (287):** mảng n+1 số trong [1, n] coi như hàm `i → nums[i]`, số trùng = đầu vòng, O(1) bộ nhớ không sửa mảng.
- **Phân tích automaton / máy trạng thái:** phát hiện trạng thái lặp.

## Lỗi thường gặp

1. Kiểm tra `slow === fast` **trước** khi di chuyển ⇒ luôn đúng ở bước đầu (cả hai = head).
2. Thiếu kiểm tra `fast.next !== null` ⇒ `fast.next.next` lỗi.
3. Trả về điểm gặp thay vì đầu vòng.
4. Giai đoạn 2 cho một con trỏ đi 2 bước ⇒ sai.
5. Danh sách 1 node tự trỏ: cần đảm bảo logic vẫn đúng (fast.next = chính nó, bước 1: slow = fast = node ⇒ có vòng, đầu vòng = head).
6. Dùng `slow.val === fast.val` thay vì so sánh tham chiếu.

## Biến thể

- **Linked List Cycle (141):** chỉ cần boolean – bỏ giai đoạn 2.
- **Độ dài vòng:** từ điểm gặp, đi tới khi quay lại, đếm bước.
- **Middle of the Linked List (876):** slow/fast không vòng, fast tới cuối thì slow ở giữa.
- **Remove Nth From End (19):** fast đi trước n bước.
- **Find the Duplicate Number (287), Happy Number (202):** Floyd trên hàm lặp.
- **Brent's algorithm:** teleport slow tới fast mỗi khi bước = luỹ thừa 2.
