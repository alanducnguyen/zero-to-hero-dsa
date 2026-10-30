## Cách trình bày trong phỏng vấn

1. Hỏi rõ: có số 0, số âm không? Có được dùng phép chia không? (đề gốc: **không**). Kích thước tích có tràn không?
2. Nêu brute force O(n²) trong một câu, rồi ý "chia tổng tích" và vì sao bị cấm/bẫy số 0.
3. Đưa ra phân rã: `answer[i] = L[i] × R[i]` (tích bên trái × tích bên phải). Viết bản hai mảng O(n) bộ nhớ.
4. Tối ưu: lưu L ngay trong output, thay R bằng biến `suffix` chạy ngược ⇒ O(1) phụ.
5. Chạy tay `[1, 2, 3, 4]`: lượt 1 ⇒ `[1, 1, 2, 6]`; lượt 2 với suffix 1, 4, 12, 24 ⇒ `[24, 12, 8, 6]`.
6. Nêu độ phức tạp và edge case: một số 0, hai số 0, n = 1 (trả `[1]`).

## Câu hỏi follow-up thường gặp

- **Nếu được dùng phép chia?** Đếm số 0: không có ⇒ `total / nums[i]`; đúng một ⇒ chỉ ô chứa 0 khác 0 (bằng tích phần còn lại); ≥ 2 ⇒ toàn 0.
- **Tích quá lớn?** Dùng `BigInt` hoặc modulo M; nếu M không nguyên tố thì không chia được ⇒ prefix × suffix là cách duy nhất O(n).
- **Đổi phép nhân thành max/min/gcd?** Kỹ thuật y hệt vì chỉ cần phép toán có tính kết hợp; không cần nghịch đảo.
- **Mảng thay đổi và hỏi nhiều lần?** Segment tree lưu tích ⇒ O(log n) cập nhật và truy vấn "tích trừ i" = tích [0, i−1] × tích [i+1, n−1].
- **Có làm được một lượt không?** Có thể điền đồng thời từ hai đầu (i và n−1−i) trong một vòng, nhưng vẫn là O(n) và khó đọc hơn – không đáng.
- **Tại sao output không tính vào bộ nhớ?** Vì đề yêu cầu trả về mảng n phần tử, bộ nhớ đó bắt buộc; "O(1) extra" nói về phần ngoài output.

## Checklist nhận diện pattern

- "Mọi phần tử **trừ** i", "leave-one-out" ⇒ prefix × suffix.
- Đại lượng tại i phụ thuộc vào "toàn bộ bên trái" và "toàn bộ bên phải" ⇒ hai lượt trái→phải và phải→trái.
- Cấm phép chia / phép toán không có nghịch đảo ⇒ không thể "tổng trừ đi phần tử", phải tích luỹ hai phía.
- Đề đòi O(1) bộ nhớ phụ ⇒ tái sử dụng mảng output + biến chạy.

## Bài luyện tập liên quan

- 238 Product of Array Except Self → 724 Find Pivot Index → 1991 Find the Middle Index in Array.
- 42 Trapping Rain Water (prefix/suffix max) → 135 Candy → 821 Shortest Distance to a Character.
- 152 Maximum Product Subarray, 1352 Product of the Last K Numbers (prefix product + xử lý số 0).
