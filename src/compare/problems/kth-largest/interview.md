## Kịch bản trình bày

1. **Làm rõ**: k nhỏ hay lớn? mảng sửa được không? luồng hay tĩnh?
2. **Sort** (20s): "Sort giảm dần rồi lấy index k−1, O(n log n). Nhưng ta sắp xếp thừa n−1 vị trí."
3. **Heap** (1.5 phút): "Giữ min-heap k phần tử; đỉnh là lớn thứ k tạm thời; pop khi vượt k. O(n log k). Vì sao min-heap chứ không max-heap: ta cần loại nhanh phần tử yếu nhất trong top-k."
4. **Quickselect** (3 phút): "Partition như quicksort nhưng chỉ đi một bên ⇒ O(n) trung bình." Code partition, nêu random pivot để tránh O(n²).
5. **Chốt**: "Tôi chọn quickselect nếu mảng tĩnh và sửa được; heap nếu k nhỏ hoặc dữ liệu luồng."

## Follow-up thường gặp

- **Vì sao quickselect O(n)?** Mỗi vòng loại trung bình nửa đoạn: n + n/2 + n/4 + … ≤ 2n.
- **Worst case?** O(n²) khi pivot luôn là min/max (mảng đã sắp xếp + pivot cuối). Random pivot ⇒ xác suất xấu không đáng kể; median of medians ⇒ O(n) đảm bảo.
- **k phần tử lớn nhất (không cần thứ tự)?** Quickselect tới vị trí n−k, lấy phần bên phải – O(n).
- **Luồng dữ liệu, hỏi kth largest sau mỗi phần tử mới?** Giữ min-heap k; mỗi `add` O(log k) (LeetCode 703).
- **Nhiều phần tử trùng?** 3-way partition cho quickselect; heap không ảnh hưởng.
- **Không được dùng bộ nhớ phụ và không sửa mảng?** Không có cách O(n); nêu rõ tradeoff rồi chọn heap O(k).
