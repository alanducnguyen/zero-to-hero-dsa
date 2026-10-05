## Cách trình bày trong phỏng vấn

1. Nêu ý tưởng 1 câu: "mỗi lượt chọn min của phần chưa sắp xếp, hoán đổi về đầu".
2. Viết code, nhấn mạnh **chỉ hoán đổi sau vòng trong** – đây là điểm người phỏng vấn nhìn.
3. Nói: O(n²) mọi trường hợp, ≤ n−1 hoán đổi, không stable, không adaptive.
4. Khi được hỏi "so với Bubble/Insertion", trả lời bằng bảng tradeoff: so sánh / hoán đổi / stable / adaptive.

## Câu hỏi follow-up thường gặp

- **Tại sao không stable? Ví dụ?** `[4a, 2, 4b, 1]`: lượt 1 hoán đổi 4a với 1 ⇒ `[1, 2, 4b, 4a]`, 4b đứng trước 4a.
- **Làm stable được không?** Dùng chèn (dịch phải) thay vì hoán đổi; trở thành O(n²) ghi.
- **Khi nào chọn Selection Sort?** Khi hoán đổi/ghi đắt hơn nhiều so với so sánh, hoặc cần worst case dự đoán được.
- **Liên hệ với Heap Sort?** Heap Sort = Selection Sort + heap để tìm max O(log n) ⇒ O(n log n).
- **Có thể dừng sớm không?** Không như Bubble Sort; thuật toán không biết phần còn lại đã sắp xếp mà không quét.
- **Số so sánh chính xác?** n(n−1)/2, bất kể dữ liệu.
- **Lấy k phần tử nhỏ nhất?** k lượt ⇒ O(n·k); so sánh với heap O(n log k) và quickselect O(n).

## Bảng so sánh nên thuộc

| | Bubble | Selection | Insertion |
|---|---|---|---|
| So sánh | O(n²), O(n) best | O(n²) luôn | O(n²), O(n) best |
| Hoán đổi/ghi | O(n²) | O(n) | O(n²) dịch |
| Stable | Có | Không | Có |
| Adaptive | Có | Không | Có |
| Dùng khi | Học | Ghi đắt | n nhỏ, gần sắp xếp |

## Checklist nhận diện pattern

- "Tối thiểu số lần hoán đổi để sắp xếp" ⇒ nghĩ tới chu trình hoán vị (cycle sort), Selection Sort là gợi ý.
- "k phần tử nhỏ nhất với k rất nhỏ" ⇒ k lượt selection.

## Bài luyện tập liên quan

- 912 Sort an Array (để so sánh), 1984 Minimum Difference Between Highest and Lowest of K Scores.
- 41 First Missing Positive / 442 Find All Duplicates (cycle sort – họ hàng của Selection Sort).
