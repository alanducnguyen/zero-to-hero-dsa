## Đề bài

Cho mảng số nguyên `nums`. Trả về **mọi bộ ba không trùng nhau** `[nums[i], nums[j], nums[k]]` với `i`, `j`, `k` đôi một khác nhau và `nums[i] + nums[j] + nums[k] = 0`. Hai bộ ba được coi là trùng nếu chúng có **cùng tập giá trị** (bất kể chỉ số). Thứ tự các bộ ba trong kết quả không quan trọng.

```
nums = [-1, 0, 1, 2, -1, -4]  →  [[-1, -1, 2], [-1, 0, 1]]
nums = [0, 1, 1]              →  []
nums = [0, 0, 0]              →  [[0, 0, 0]]
```

Chú ý ví dụ đầu: `-1` xuất hiện hai lần nên có hai cách chọn cho `[-1, 0, 1]`, nhưng chỉ được trả **một lần**. Khử trùng mới là phần khó của bài, không phải tìm tổng.

## Ràng buộc

- `3 ≤ n ≤ 3000`, giá trị trong `[−10⁵, 10⁵]`.
- Với n = 3000, O(n³) ≈ 4.5·10⁹ phép thử ⇒ quá chậm; O(n²) ≈ 9·10⁶ ⇒ ổn.

## Câu hỏi nên hỏi lại người phỏng vấn

- Trả về giá trị hay chỉ số? (Nếu là giá trị, được phép sắp xếp.)
- "Trùng" là trùng giá trị hay trùng chỉ số?
- Có được sửa mảng đầu vào (sort tại chỗ) không?
- Thứ tự trong bộ ba và giữa các bộ ba có quan trọng không?
