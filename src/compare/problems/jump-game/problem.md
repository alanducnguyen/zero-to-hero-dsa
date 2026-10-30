## Đề bài

Cho mảng số nguyên không âm `nums`. Bạn đứng ở chỉ số `0`; `nums[i]` là **độ dài bước nhảy tối đa** từ ô `i` (được nhảy 1, 2, …, `nums[i]` ô). Trả về `true` nếu có thể tới **ô cuối cùng**, ngược lại `false`.

## Ví dụ

- `nums = [2, 3, 1, 1, 4]` ⇒ `true` (0 → 1 → 4).
- `nums = [3, 2, 1, 0, 4]` ⇒ `false`: mọi đường đều dừng ở ô 3 vì `nums[3] = 0`.
- `nums = [0]` ⇒ `true`: đã đứng sẵn ở ô cuối.

## Ràng buộc

- `1 ≤ nums.length ≤ 10⁴`
- `0 ≤ nums[i] ≤ 10⁵`

## Gợi ý suy nghĩ

Câu hỏi chỉ là **có/không**, không hỏi số bước hay đường đi. Ta có thực sự cần biết *đã nhảy thế nào* để tới một ô, hay chỉ cần biết ô đó *tới được*? (Bộ visualizer giới hạn n ≤ 10, nums[i] ≤ 9 để lời giải backtracking không vượt quá 4000 frame.)
