## Cách trình bày trong phỏng vấn

Bubble Sort hiếm khi là câu hỏi chính, nhưng hay xuất hiện ở dạng "warm-up" hoặc để dẫn sang câu hỏi về độ phức tạp và stable sort. Khi bị hỏi, trình bày theo thứ tự:

1. Nêu ý tưởng 1 câu: "mỗi lượt đẩy max về cuối".
2. Viết code có cờ `swapped` – thể hiện bạn biết tối ưu best case.
3. Chủ động nói: O(n²) trung bình/xấu nhất, O(n) tốt nhất, O(1) bộ nhớ, stable, in-place.
4. Nói ngay khi nào **không** nên dùng và gợi ý Merge/Quick/Tim Sort thay thế.

## Câu hỏi follow-up thường gặp

- **Tại sao Bubble Sort stable?** Vì chỉ hoán đổi khi phần tử trái lớn hơn hẳn phần tử phải; hai phần tử bằng nhau không bao giờ bị đổi chỗ.
- **Làm sao dừng sớm?** Cờ `swapped`; nếu một lượt không đổi chỗ ⇒ đã sắp xếp.
- **So sánh với Insertion Sort?** Cùng O(n²) nhưng Insertion ít phép gán hơn (dịch thay vì hoán đổi), nhanh hơn 2–3 lần thực tế và cũng adaptive. Insertion thường là lựa chọn tốt hơn cho n nhỏ (các thư viện dùng Insertion cho mảng < 16 phần tử bên trong Quick/Merge Sort).
- **Số lần hoán đổi tối đa?** n(n-1)/2 – bằng số cặp nghịch thế tối đa. Bubble Sort thực hiện đúng bằng số nghịch thế của mảng.
- **Có thể song song hóa không?** Có – Odd-Even Transposition Sort, O(n) với n bộ xử lý.

## Checklist nhận diện pattern

- Bài yêu cầu "sắp xếp" với n nhỏ (≤ 20) hoặc chỉ cần giải thích ý tưởng ⇒ Bubble/Insertion đủ.
- Bài hỏi "số lần hoán đổi tối thiểu" ⇒ nghĩ ngay tới nghịch thế (inversion), liên hệ với Bubble Sort.

## Bài luyện tập liên quan

- LeetCode 912 – Sort an Array (hãy thử nộp Bubble Sort để thấy TLE, rồi đổi sang Merge Sort).
- LeetCode 1051 – Height Checker (đếm vị trí khác nhau giữa mảng và bản sắp xếp).
