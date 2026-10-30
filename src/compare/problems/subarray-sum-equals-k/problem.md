## Đề bài

Cho mảng số nguyên `nums` (có thể **âm**, có thể **0**) và số nguyên `k`. Đếm số **mảng con liên tiếp, khác rỗng** có tổng đúng bằng `k`.

```
nums = [1, 1, 1],          k = 2  →  2   ([1,1] ở vị trí 0..1 và 1..2)
nums = [1, 2, 3],          k = 3  →  2   ([1,2] và [3])
nums = [1, 2, 1, -1, 2, 3], k = 3 →  4
```

Lưu ý: đề hỏi **số lượng**, không hỏi liệt kê. Hai mảng con khác vị trí nhưng cùng giá trị vẫn tính là hai.

## Ràng buộc

- `1 ≤ nums.length ≤ 2·10⁴`, `−1000 ≤ nums[i] ≤ 1000`, `−10⁷ ≤ k ≤ 10⁷` (LeetCode 560).
- Trong trang này giới hạn tối đa 10 phần tử để trace của lời giải O(n³) còn xem được.

## Câu hỏi nên hỏi lại

- Có số âm / số 0 không? (Có ⇒ **sliding window không dùng được** – xem phần so sánh.)
- Hỏi số lượng hay liệt kê? Hỏi độ dài dài nhất? (Đổi giá trị lưu trong map: tần suất ↔ chỉ số đầu tiên.)
- Tổng có thể tràn số không? (n·max = 2·10⁷, vừa int 32 bit.)
