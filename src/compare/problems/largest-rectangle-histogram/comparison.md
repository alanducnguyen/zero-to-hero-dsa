## Phân tích

Cả bốn cách đều dựa trên cùng một sự thật: **hình tối ưu cao bằng cột thấp nhất trong nó**. Khác nhau ở cách tìm "hình đó kéo dài tới đâu".

**Brute force** thử mọi đoạn [i..j], giữ `minH` chạy khi mở rộng j: O(n²), O(1). Mẹo giữ `minH` chạy đã bỏ được một vòng lặp (bản ngây thơ là O(n³)).

**Chia để trị** nhìn từ cột thấp nhất m của đoạn: hình tối ưu hoặc **chứa m** – khi đó nó phải trải hết đoạn với chiều cao h[m] – hoặc **không chứa m**, tức nằm gọn trong [lo..m−1] hay [m+1..hi]. Đệ quy giống quicksort: O(n log n) khi m rơi giữa, O(n²) khi mảng sắp xếp (m luôn ở rìa). Dùng segment tree cho truy vấn min ⇒ O(n log n) chắc chắn, nhưng code dài.

**Cột thấp hơn gần nhất** lật góc nhìn: với mỗi cột i (làm chiều cao), cần `left[i]` và `right[i]` – chỉ số cột thấp hơn gần nhất hai bên. Đây là bài "next smaller element" kinh điển, giải bằng monotonic stack trong O(n). Lượt thứ ba tính `h[i] × (right − left − 1)`. Dễ chứng minh nhất trong nhóm O(n).

**Monotonic stack một lượt** gộp ba lượt thành một: duy trì stack chỉ số với chiều cao **tăng dần**. Khi cột i không cao hơn đỉnh, đỉnh vừa tìm được **biên phải** (i), còn **biên trái** chính là phần tử nằm ngay dưới nó trong stack – vì mọi cột ở giữa đã bị pop do cao hơn. Cột ảo cao 0 ở cuối buộc mọi phần tử còn lại được tính.

## Xếp hạng

1. **Monotonic stack một lượt** – O(n)/O(n), code ngắn nhất.
2. **Cột thấp hơn gần nhất** – O(n)/O(n), ba lượt. Chọn khi muốn giải thích từng bước thật chắc, hoặc cần `left`/`right` cho bài khác.
3. **Chia để trị** – O(n log n) trung bình, O(n²) xấu nhất. Hay để thể hiện tư duy, không nên là đáp án cuối.
4. **Brute force** – O(n²). Chỉ là baseline.

## Khi nào thứ hạng đổi

- **Maximal Rectangle (ma trận 0/1)**: mỗi hàng là một histogram ⇒ gọi lời giải stack m lần, O(m·n).
- **Cột bằng nhau**: bản hai lượt dùng `≥` cả hai phía vẫn đúng (biên vượt qua cột bằng, hình không vượt trần). Bản một lượt dùng `≥` khi pop: cột bằng nhau bị pop sớm với diện tích thiếu, nhưng cột cuối cùng của nhóm vẫn tính đủ – kết quả đúng.
- **Dữ liệu stream, hỏi đáp án sau mỗi cột**: stack một lượt là online một phần (chỉ chốt được hình khi biết biên phải).
- **Cần truy vấn nhiều đoạn con**: chia để trị + segment tree linh hoạt hơn.
