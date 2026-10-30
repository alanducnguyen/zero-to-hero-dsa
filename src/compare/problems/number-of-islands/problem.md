## Đề bài

Cho lưới `grid` kích thước `m × n` gồm `1` (đất) và `0` (nước). Một **đảo** là một nhóm ô đất nối với nhau theo **4 hướng** (trên, dưới, trái, phải). Xung quanh lưới coi như toàn nước. Hãy đếm số đảo.

```
1 1 0 0 0
1 1 0 0 1
0 0 1 0 1      →  3   (khối 2×2 góc trái, ô (2,2), khối bên phải)
0 0 0 1 1

1 0 1
0 1 0          →  5   (nối chéo KHÔNG tính)
1 0 1
```

## Ràng buộc

- `1 ≤ m, n ≤ 300` ⇒ tối đa 9·10⁴ ô.
- Chỉ nối theo 4 hướng, không tính đường chéo.

## Câu hỏi nên hỏi lại người phỏng vấn

- Được phép sửa lưới input không? (Nếu không, cần bản sao hoặc mảng `visited` riêng – mọi lời giải ở đây đều **không** sửa lưới của caller.)
- Nối 4 hướng hay 8 hướng?
- Lưới lớn cỡ nào? Có thể toàn đất không? (Quyết định DFS đệ quy có bị tràn call stack hay không.)
- Lưới cố định hay ô đất được thêm dần theo thời gian? (Nếu thêm dần ⇒ Union-Find – LeetCode 305 Number of Islands II.)
