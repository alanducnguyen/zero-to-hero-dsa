## Cách trình bày trong phỏng vấn

1. Nhắc lại ràng buộc: phần tử phân biệt, yêu cầu O(log n) ⇒ binary search.
2. Quan sát then chốt: "cắt tại mid thì ít nhất một nửa tăng dần, vì chỉ có một điểm xoay".
3. Cách nhận biết: `nums[lo] ≤ nums[mid]` ⇒ nửa trái tăng dần; ngược lại nửa phải.
4. Chỉ kiểm tra "target thuộc khoảng" trên nửa đã sắp xếp; không thuộc thì sang nửa kia.
5. Chạy tay `[4, 5, 6, 7, 0, 1, 2]`, target `0` và một case biên 2 phần tử `[3, 1]`, target `1`.
6. Chốt O(log n) thời gian, O(1) bộ nhớ; nhắc cách hai lượt như phương án dự phòng.

## Câu hỏi follow-up thường gặp

- **Nếu có phần tử trùng (LC 81)?** Khi `nums[lo] = nums[mid] = nums[hi]` không biết nửa nào sắp xếp ⇒ `lo++`, `hi--`; xấu nhất O(n) (ví dụ `[1, 1, 1, 1, 0, 1, 1]`).
- **Tại sao `≤` chứ không phải `<`?** Khi `lo = mid`, nửa trái chỉ một phần tử, phải được coi là sắp xếp; dùng `<` sẽ đi nhầm nhánh.
- **Tìm điểm xoay / phần tử nhỏ nhất?** So `nums[mid] > nums[hi]` ⇒ min ở bên phải; ngược lại `hi = mid`.
- **Cách hai lượt có tốt hơn không?** Cùng O(log n), code module hóa hơn, dễ test; một lượt ít bước hơn.
- **Mảng không xoay thì sao?** Luôn rơi vào nhánh nửa trái sắp xếp ⇒ hoạt động như binary search thường.

## Checklist nhận diện pattern

- Mảng "gần sắp xếp" với cấu trúc đặc biệt (xoay, bitonic, núi) + yêu cầu O(log n) ⇒ binary search có điều kiện.
- Tự hỏi: "tại mid, phần nào tôi **chắc chắn** biết thứ tự?" – quyết định dựa trên phần đó.
- Có trùng lặp ⇒ cảnh báo worst case O(n).

## Bài luyện tập liên quan

- LeetCode 33 – Search in Rotated Sorted Array.
- LeetCode 81 – Search in Rotated Sorted Array II.
- LeetCode 153 – Find Minimum in Rotated Sorted Array.
- LeetCode 162 – Find Peak Element.
- LeetCode 852 – Peak Index in a Mountain Array.
