## Cách trình bày trong phỏng vấn

Linear Search thường xuất hiện như bước đầu trong câu hỏi lớn hơn. Cách dùng nó để ghi điểm:

1. Khi bị hỏi "tìm x trong mảng", hỏi ngay: "Mảng có sắp xếp không? Tìm một lần hay nhiều lần?" – câu hỏi này cho thấy bạn hiểu tradeoff.
2. Nêu Linear Search O(n) như baseline trong 1 câu, rồi đề xuất Binary Search (nếu sắp xếp) hoặc HashMap (nếu nhiều truy vấn).
3. Nếu n nhỏ, chủ động nói Linear Search là lựa chọn thực tế – người phỏng vấn senior đánh giá cao điều này.

## Câu hỏi follow-up thường gặp

- **Có thể tốt hơn O(n) với mảng không sắp xếp không?** Không, với thuật toán so sánh: phần tử chưa xem có thể là target. Có thể song song hoá hoặc dùng SIMD nhưng vẫn O(n) tổng công.
- **Khi nào Linear nhanh hơn Binary thực tế?** n nhỏ (vài chục): tuần tự tận dụng cache và không có nhánh khó dự đoán. Nhiều thư viện dùng ngưỡng ~16–64.
- **Tìm nhiều lần trên cùng mảng?** Xây HashMap O(n) rồi O(1) mỗi truy vấn; hoặc sắp xếp O(n log n) rồi binary search O(log n).
- **Mảng là linked list?** Linear là cách duy nhất; Binary Search không áp dụng.
- **Tìm phần tử xuất hiện nhiều lần – trả tất cả?** Gom chỉ số, O(n).
- **Linear Search trên 2D?** Vẫn O(m·n); nếu ma trận sắp xếp hàng và cột ⇒ staircase search O(m+n).

## Checklist nhận diện pattern

- Dữ liệu **không sắp xếp**, tìm **một lần** ⇒ Linear Search là đủ và tối ưu.
- n nhỏ hoặc ở hot path đơn giản ⇒ Linear Search.
- Dữ liệu sắp xếp ⇒ Binary Search. Nhiều truy vấn ⇒ HashMap/Set.

## Bài luyện tập liên quan

- 1295 Find Numbers with Even Number of Digits, 724 Find Pivot Index (quét tuyến tính với prefix sum).
- 2089 Find Target Indices After Sorting Array (so sánh Linear sau khi sort với đếm O(n)).
- 1 Two Sum – bài kinh điển về việc thay Linear lồng nhau bằng HashMap.
