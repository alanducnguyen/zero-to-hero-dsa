## Cách trình bày trong phỏng vấn

1. Công thức cốt lõi: `water[i] = min(maxLeft, maxRight) − height[i]`. Vẽ ví dụ nhỏ để kiểm chứng.
2. Giải O(n)/O(n) bằng prefix max + suffix max – chắc chắn đúng, chấm được điểm.
3. Tối ưu hai con trỏ: "chỉ cần biết bên nào có tường thấp hơn, bên đó mức nước đã xác định".
4. Code 15 dòng, chạy tay `[4,2,0,3,2,5]`.
5. Nếu được hỏi: cách stack (theo lớp ngang) và phiên bản 2D.

## Câu hỏi follow-up thường gặp

- **Vì sao di chuyển con trỏ thấp hơn là an toàn?** Bên kia có tường ≥ cột hiện tại, nên min(hai max) do bên này quyết định; cột này không cần thông tin thêm.
- **Cách stack hoạt động?** Stack giảm dần; khi gặp cột cao hơn đỉnh, pop và cộng nước theo lớp: `(min(cao mới, cao đỉnh mới) − cao pop) × khoảng cách`.
- **2D thì sao?** Trapping Rain Water II: min-heap chứa biên, lấy ô thấp nhất, lan vào trong, nước = max(0, mức − cao).
- **Dữ liệu đến dạng luồng?** Stack hoặc prefix max + tính lại; hai con trỏ cần biết cả hai đầu.
- **Chỉ muốn hố sâu nhất?** Giữ `water[i]` và lấy max.
- **Liên hệ Container With Most Water?** Cùng hai con trỏ từ hai đầu, nhưng hàm mục tiêu khác (diện tích giữa hai cột, không phải tổng).

## Checklist nhận diện pattern

- "Nước đọng", "tổng của min(maxTrái, maxPhải) − giá trị" ⇒ prefix/suffix max hoặc hai con trỏ.
- Cần O(1) bộ nhớ và biết cả hai đầu ⇒ hai con trỏ.
- "Next greater" liên quan tới lớp ngang ⇒ monotonic stack.

## Bài luyện tập

- 42 Trapping Rain Water → 11 Container With Most Water → 407 Trapping Rain Water II.
- 84 Largest Rectangle in Histogram, 238 Product of Array Except Self (prefix/suffix).
- 1793 Maximum Score of a Good Subarray (hai con trỏ mở rộng).
