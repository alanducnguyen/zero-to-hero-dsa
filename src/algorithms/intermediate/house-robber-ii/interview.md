## Cách trình bày trong phỏng vấn

1. Nhắc lại House Robber thẳng và công thức `max(prev1, prev2 + x)` – cho thấy bạn nhận ra bài gốc.
2. Chỉ rõ điểm khác: chỉ thêm đúng **một** cặp kề (0, n−1).
3. Lập luận chia trường hợp: nghiệm tối ưu không chứa nhà 0 **hoặc** không chứa nhà n−1 ⇒ hai bài thẳng.
4. Viết `robLine(lo, hi)` O(1) bộ nhớ, gọi hai lần, lấy max.
5. Tự nêu case biên `n = 1` (và `n = 0`) trước khi người phỏng vấn hỏi.

## Câu hỏi follow-up thường gặp

- **Tại sao lấy max mà không lo hai trường hợp chồng nhau?** Ta tìm giá trị lớn nhất, không đếm số cách; chồng nhau không làm max sai.
- **Làm trong một lần quét được không?** Có: DP với cờ "đã lấy nhà 0", 4 biến trạng thái; cùng O(n), O(1).
- **Nếu bài hỏi số cách chọn (đếm)?** Khi đó phải dùng bao hàm–loại trừ: cách(0..n−2) + cách(1..n−1) − cách(1..n−2).
- **Trả về danh sách nhà?** Giữ mảng dp cho pha thắng rồi truy vết ngược như bài thẳng, nhớ cộng offset `lo`.
- **Nhà trên cây?** House Robber III – postorder trả `[lấy, không lấy]`.
- **Giá trị âm?** Prev khởi tạo 0 đã cho phép "không lấy gì", công thức vẫn đúng.

## Checklist nhận diện pattern

- Dãy **vòng tròn** + ràng buộc chỉ giữa phần tử kề nhau ⇒ cố định/loại một phần tử để phá vòng, chạy lời giải thẳng.
- "Không chọn hai phần tử kề nhau, tối đa tổng" ⇒ DP 1D kiểu House Robber.
- Công thức chỉ dùng i−1 và i−2 ⇒ rút về 2 biến, O(1) bộ nhớ.

## Bài luyện tập liên quan

- 198 House Robber → 213 House Robber II → 337 House Robber III.
- 918 Maximum Sum Circular Subarray, 1388 Pizza With 3n Slices.
- 740 Delete and Earn, 256 Paint House, 2560 House Robber IV.
