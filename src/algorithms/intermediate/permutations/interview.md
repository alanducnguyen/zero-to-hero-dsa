## Cách trình bày trong phỏng vấn

1. **Làm rõ đề:** các số có phân biệt không? Thứ tự output có quan trọng không? `n` tối đa bao nhiêu (để xác nhận `n!` chấp nhận được)?
2. **Vẽ cây quyết định** cho `[1, 2, 3]`: tầng = vị trí cần điền, nhánh = số chưa dùng, lá = hoán vị.
3. **Nêu khung backtracking:** chọn → đệ quy → bỏ chọn; trạng thái gồm `path` và `used[]`; điều kiện dừng `path.length == n`.
4. **So sánh với Subsets:** vì sao duyệt từ 0 (thứ tự quan trọng) và chỉ ghi nhận ở lá.
5. **Code**, nhấn mạnh sao chép `path` khi ghi nhận và khôi phục `used` khi quay lui.
6. **Độ phức tạp:** `O(n · n!)` thời gian, `O(n)` bộ nhớ phụ – tối ưu vì output đã lớn như vậy.

## Câu hỏi follow-up thường gặp

- *Có phần tử trùng thì sao?* (LC 47) Sort, rồi bỏ qua `nums[i]` khi `nums[i] == nums[i−1] && !used[i−1]` để mỗi giá trị trùng chỉ được "mở" theo một thứ tự cố định.
- *Không dùng mảng used được không?* Dùng swap tại chỗ: hoán đổi `nums[start]` với `nums[i]`, đệ quy `start + 1`, hoán đổi lại.
- *Chỉ cần hoán vị thứ k?* (LC 60) Dùng hệ giai thừa: chữ số đầu là `⌊(k−1)/(n−1)!⌋`, lặp lại – `O(n²)`.
- *Viết không đệ quy?* Lặp Next Permutation từ mảng đã sort cho tới khi không còn hoán vị kế tiếp.
- *Bộ nhớ không đủ chứa n! kết quả?* Chuyển thành generator/callback để xử lý từng hoán vị ngay khi sinh.

## Checklist nhận diện pattern

- Đề yêu cầu **liệt kê tất cả** cách sắp xếp / thứ tự.
- **Thứ tự quan trọng** (`[1,2]` ≠ `[2,1]`) ⇒ hoán vị, không phải tổ hợp.
- `n` nhỏ (≤ 8–10) – dấu hiệu chấp nhận độ phức tạp giai thừa.
- Mỗi phần tử dùng **đúng một lần** ⇒ cần `used[]` hoặc swap.
- Có ràng buộc giữa các vị trí kề nhau ⇒ backtracking + pruning (N-Queens, Beautiful Arrangement).

## Bài luyện tập

- LC 46 – Permutations (Medium)
- LC 47 – Permutations II (Medium)
- LC 31 – Next Permutation (Medium)
- LC 60 – Permutation Sequence (Hard)
- LC 526 – Beautiful Arrangement (Medium)
- LC 51 – N-Queens (Hard)
