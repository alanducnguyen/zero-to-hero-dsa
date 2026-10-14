## Cách trình bày trong phỏng vấn

1. Nêu brute force O(n²), rồi quan sát "các ngày đang chờ" và việc một ngày mới có thể trả lời nhiều ngày cùng lúc.
2. Giới thiệu stack giảm dần lưu chỉ số; giải thích vì sao dừng khi đỉnh ≥ nhiệt độ hiện tại.
3. Code, chạy tay với `[73,74,75,71,69,72,76,73]`.
4. Chứng minh O(n) bằng lập luận mỗi chỉ số vào/ra một lần.
5. Nêu các biến thể: next smaller, vòng tròn, stock span.

## Câu hỏi follow-up thường gặp

- **Vì sao O(n) dù có while trong for?** Mỗi chỉ số push đúng 1 lần, pop tối đa 1 lần ⇒ tổng thao tác ≤ 2n.
- **O(1) bộ nhớ phụ?** Duyệt ngược: `j = i + 1; while (j < n && temps[j] ≤ temps[i]) j += answer[j] (dừng nếu answer[j] = 0)`.
- **Mảng vòng tròn?** Duyệt `i` từ 0 tới 2n−1, dùng `i % n`, chỉ push khi `i < n`.
- **Dữ liệu đến dần (online)?** Vẫn dùng stack; mỗi ngày mới pop các ngày được trả lời – nhưng đáp án của ngày cũ chỉ biết muộn.
- **Phần tử bằng nhau tính không?** Tuỳ đề: "ấm hơn" ⇒ `>`; "không lạnh hơn" ⇒ `≥`.
- **Tìm ngày ấm hơn gần nhất bên TRÁI?** Duyệt xuôi, đáp án là đỉnh stack trước khi push (previous greater).

## Checklist nhận diện pattern

- "Phần tử lớn hơn / nhỏ hơn gần nhất bên phải/trái", "bao nhiêu ngày nữa", "span" ⇒ monotonic stack.
- Cần với mọi vị trí (không chỉ một) và mảng không sắp xếp ⇒ stack, không phải binary search.
- Hỏi về "khoảng mà phần tử là max/min" ⇒ kết hợp next + previous smaller/greater.

## Bài luyện tập

- 739 Daily Temperatures → 496 Next Greater Element I → 503 Next Greater Element II.
- 901 Online Stock Span, 1019 Next Greater Node In Linked List.
- 84 Largest Rectangle in Histogram, 42 Trapping Rain Water (biến thể stack).
