## Cách trình bày trong phỏng vấn

1. Nhắc lại ràng buộc: không sửa mảng, O(1) bộ nhớ ⇒ loại HashSet và sort. Nói nhanh hai lời giải đó để thể hiện bạn có baseline.
2. Đề xuất binary search trên giá trị (O(n log n), O(1)) như bước trung gian.
3. Chuyển sang ý chính: "mỗi chỉ số trỏ tới nums[i] ⇒ đây là danh sách liên kết ngầm; số trùng = node có hai mũi tên vào = điểm vào chu trình".
4. Viết Floyd 2 giai đoạn, rồi chứng minh `a = k·c − b` bằng một hình chữ ρ trên bảng.
5. Chạy tay `[1, 3, 4, 2, 2]`: 0→1→3→2→4→2… điểm vào là 2.

## Câu hỏi follow-up thường gặp

- **Tại sao chắc chắn có chu trình?** n + 1 node, mỗi node có đúng một cạnh ra tới [1, n] ⇒ đi n + 2 bước phải lặp node (chuồng bồ câu).
- **Tại sao node 0 không nằm trong chu trình?** Không giá trị nào bằng 0 nên không có cạnh vào node 0. Đây là lý do bắt đầu từ chỉ số 0 an toàn.
- **Nếu số trùng lặp nhiều lần thì sao?** Vẫn đúng: điểm vào chu trình vẫn có ≥ 2 cạnh vào; các chỉ số khác có cùng giá trị chỉ là các nhánh không được đi tới.
- **Nếu có nhiều giá trị khác nhau bị lặp?** Floyd chỉ trả về một giá trị (cái nằm trên đường đi từ 0). Muốn tìm tất cả phải dùng cách khác (LeetCode 442).
- **Chứng minh giai đoạn 1 kết thúc trong O(n)?** Khoảng cách giảm 1 mỗi vòng sau khi slow vào chu trình ⇒ ≤ c vòng.
- **Brent's algorithm khác gì?** Thỏ "dịch chuyển" rùa tới vị trí mình mỗi khi số bước đạt lũy thừa 2; vẫn O(n), ít phép tính `f` hơn.

## Checklist nhận diện pattern

- Mảng n + 1 phần tử, giá trị trong [1, n] (hoặc [0, n − 1]) ⇒ nghĩ ngay tới đồ thị `i → nums[i]`.
- Đề cấm sửa mảng và cấm bộ nhớ phụ ⇒ Floyd / binary search trên giá trị.
- Bất kỳ hàm `f` trên tập hữu hạn được lặp `x, f(x), f(f(x))…` ⇒ chắc chắn có chu trình ⇒ rùa–thỏ.

## Bài luyện tập liên quan

- LeetCode 287 – Find the Duplicate Number.
- LeetCode 142 – Linked List Cycle II.
- LeetCode 141 – Linked List Cycle.
- LeetCode 202 – Happy Number.
- LeetCode 457 – Circular Array Loop.
