## Cách trình bày trong phỏng vấn

1. **Xác nhận tiền đề:** "Mảng đã sắp xếp tăng dần? Có phần tử trùng không? Nếu trùng, cần vị trí nào?" – câu hỏi này cho thấy bạn hiểu điều kiện áp dụng.
2. **Nêu bất biến trước khi code:** "Tôi dùng khoảng đóng [lo, hi]; bất biến là target nếu tồn tại thì nằm trong khoảng này." Người phỏng vấn sẽ rất ấn tượng.
3. Viết code, giải thích tại sao `mid + 1` / `mid - 1` và `lo <= hi`.
4. Chạy tay 2 case: mảng 1 phần tử và target không tồn tại.
5. Nêu độ phức tạp O(log n) / O(1).

## Câu hỏi follow-up thường gặp

- **Mảng có phần tử trùng, tìm vị trí đầu tiên?** Chuyển sang lower bound: khi `a[mid] >= target` thì `hi = mid` (không `-1`), dùng `while (lo < hi)`, trả `lo` sau khi kiểm tra `a[lo] === target`.
- **Tại sao `lo + (hi - lo) / 2`?** Tránh tràn số nguyên 32-bit khi `lo + hi` vượt 2³¹−1. Trong JS số là double 53-bit nên không tràn, nhưng hãy thể hiện bạn biết.
- **Đệ quy hay lặp?** Lặp: O(1) bộ nhớ, không giới hạn stack. Đệ quy chỉ để minh hoạ.
- **Nếu mảng là linked list?** Không hiệu quả (O(n) để tới mid). Dùng skip list hoặc BST.
- **Mảng bị xoay (rotated sorted array)?** Ở mỗi bước, ít nhất một nửa `[lo, mid]` hoặc `[mid, hi]` là sắp xếp; kiểm tra target có nằm trong nửa sắp xếp đó không để chọn hướng.
- **Binary search trên "không gian câu trả lời" là gì?** Khi đáp án là một số trong khoảng `[L, R]` và hàm kiểm tra `feasible(x)` đơn điệu (sai…sai đúng…đúng), tìm điểm chuyển bằng binary search. Ví dụ: Koko Eating Bananas, Capacity To Ship Packages.
- **Có thể tìm trên mảng 2D sắp xếp hàng và cột không?** Coi ma trận m×n như mảng 1D (nếu mỗi hàng đầu > hàng trước cuối) hoặc dùng "staircase search" O(m+n).

## Checklist nhận diện pattern

- Dữ liệu **sắp xếp** hoặc **đơn điệu** ⇒ nghĩ ngay tới binary search.
- Đề yêu cầu O(log n) ⇒ gần như chắc chắn.
- Bài hỏi "nhỏ nhất/lớn nhất thoả điều kiện" và kiểm tra điều kiện với một giá trị cụ thể là dễ ⇒ binary search trên câu trả lời.
- Có từ khoá "rotated", "peak", "first bad version", "insert position".

## Template nên học thuộc (lower bound)

```ts
// vị trí đầu tiên có a[i] >= target, trả về n nếu không có
function lowerBound(a: number[], target: number): number {
  let lo = 0, hi = a.length;        // nửa mở [lo, hi)
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (a[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

## Bài luyện tập liên quan

- 704 Binary Search → 35 Search Insert Position → 34 First and Last Position (lower/upper bound).
- 33 Search in Rotated Sorted Array, 153 Find Minimum in Rotated Sorted Array.
- 278 First Bad Version, 162 Find Peak Element.
- 875 Koko Eating Bananas, 1011 Capacity To Ship Packages (binary search trên câu trả lời).
