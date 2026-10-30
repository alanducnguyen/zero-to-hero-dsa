## Cách trình bày trong phỏng vấn

1. Làm rõ: hai người có thể trùng tên không (có)? Một email có thể thuộc hai tên khác nhau không (không)? Thứ tự output có quan trọng không?
2. Mô hình hoá: **email là đỉnh**, email cùng account là cạnh ⇒ đếm/gom **thành phần liên thông**.
3. Nêu hai cách: DFS trên đồ thị email hoặc Union-Find. Chọn Union-Find vì không cần dựng adjacency list và xử lý online được.
4. Viết DSU có **path compression + union by size**, map email → index, ghi owner khi gặp email lần đầu.
5. Gom theo `find(i)`, sắp email, gắn tên. Phân tích O(E α + U log U).
6. Test: ví dụ đề, hai người trùng tên, bắc cầu qua account thứ ba, email lặp trong một account.

## Câu hỏi follow-up thường gặp

- **Vì sao chỉ union với email đầu?** k−1 cạnh hình sao đã đủ liên thông; nối mọi cặp tốn O(k²) vô ích.
- **Viết bằng DFS thì sao?** Dựng `graph: email → email[]`, DFS từ mỗi email chưa thăm, mỗi lần DFS là một người. Cùng độ phức tạp, tốn thêm bộ nhớ cho cạnh.
- **Dữ liệu stream, account đến liên tục?** Union-Find hợp nhất: mỗi account mới chỉ thêm vài thao tác `union` gần O(1).
- **Có thêm số điện thoại làm khoá?** Thêm loại node mới (prefix `phone:`), union giống hệt – DSU không quan tâm kiểu node.
- **Cần xoá account?** DSU không tách được; dùng rebuild định kỳ hoặc dynamic connectivity (phức tạp hơn nhiều).
- **α(n) là gì?** Hàm Ackermann ngược, ≤ 4 với n tới 2^65536 – coi như hằng số, nhưng phải có CẢ hai heuristic mới đạt.

## Checklist nhận diện pattern

- "Gộp/nhóm các đối tượng khi chúng **chung** thuộc tính nào đó", quan hệ **bắc cầu** ⇒ Union-Find.
- Định danh dạng string ⇒ map sang chỉ số để dùng mảng `parent[]`.
- Sau khi union xong cần **liệt kê** nhóm ⇒ gom theo `find(i)` vào Map gốc → danh sách.
- Nếu chỉ hỏi "có liên thông không / bao nhiêu nhóm" ⇒ DSU thuần, không cần gom.

## Bài luyện tập liên quan

- 721 Accounts Merge (bài này) → 547 Number of Provinces → 684 Redundant Connection.
- 990 Satisfiability of Equality Equations, 1202 Smallest String With Swaps.
- 839 Similar String Groups, 952 Largest Component Size by Common Factor, 1101 The Earliest Moment When Everyone Become Friends.
