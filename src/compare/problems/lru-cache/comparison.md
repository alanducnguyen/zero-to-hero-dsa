## Phân tích

**Mảng + timestamp** là cách nghĩ đầu tiên: mỗi entry nhớ lần dùng cuối, khi đầy thì quét tìm timestamp nhỏ nhất. Đúng và dễ giải thích, nhưng cả việc tìm key lẫn việc evict đều **O(n)**. Với `capacity = 3000` và `2·10⁵` lệnh là ~6·10⁸ bước. Bản chất vấn đề: "độ mới" chỉ nằm trong một con số, không nằm trong *vị trí*, nên muốn tìm phần tử cũ nhất thì phải quét.

**DLL + HashMap** sửa đúng hai điểm yếu đó: HashMap cho O(1) *tìm* node, danh sách liên kết **đôi** cho O(1) *đổi thứ tự* (tháo một node ở giữa cần biết `prev`, nên danh sách đơn không đủ). Danh sách luôn sắp theo độ mới, nên LRU luôn ở cuối. Sentinel head/tail (hoặc một sentinel nối vòng) xoá mọi ca đặc biệt khi danh sách rỗng hay chỉ có một node. Đây là **đáp án chuẩn** mà người phỏng vấn chờ đợi, vì nó cho thấy bạn hiểu *tại sao* O(1) khả thi và viết được cấu trúc con trỏ không lỗi.

**JS `Map` theo thứ tự chèn** cho cùng O(1) chỉ với ~15 dòng: đặc tả ECMAScript **bảo đảm** `Map` duyệt theo thứ tự chèn, nên "xoá rồi chèn lại" = "chuyển thành MRU", và `keys().next()` = LRU. Thực chất engine đã cài sẵn một danh sách liên kết bên trong `Map` (V8 dùng hash table có thứ tự). Tương tự: `LinkedHashMap(accessOrder = true)` trong Java, `OrderedDict.move_to_end` trong Python.

## Xếp hạng

1. **JS Map thứ tự chèn** – O(1)/O(capacity), ít code nhất, ít bug nhất, hằng số nhỏ (cài bằng C++ trong engine). Chọn trong code production JavaScript/TypeScript.
2. **DLL + HashMap** – O(1)/O(capacity), cùng độ phức tạp nhưng nhiều con trỏ hơn và mỗi node là một object riêng. Là câu trả lời mặc định trong phỏng vấn và là lựa chọn duy nhất khi ngôn ngữ không có map có thứ tự.
3. **Mảng + timestamp** – O(n) mỗi thao tác. Chỉ để mở đầu, hoặc khi capacity cực nhỏ (≤ 8–16, vừa một cache line) – lúc đó quét tuyến tính thực tế còn nhanh hơn băm.

Xếp Map trên DLL vì cả hai cùng tiệm cận, nhưng Map ngắn hơn, nhanh hơn trên thực tế và dựa trên một **đảm bảo của đặc tả** (không phải chi tiết cài đặt tình cờ). Tuy vậy, trong phỏng vấn đó có thể bị coi là "dùng thư viện để né bài".

## Khi nào thứ hạng đổi

- **Người phỏng vấn cấm cấu trúc có sẵn** ("tự cài, đừng dùng LinkedHashMap") ⇒ DLL + HashMap lên hạng 1; rất hay gặp ở Meta/Amazon.
- **Ngôn ngữ không có map giữ thứ tự** (C++ `unordered_map`, Go `map`) ⇒ chỉ còn DLL + HashMap (C++ thường dùng `std::list` + `unordered_map<key, list::iterator>`).
- **Đa luồng** ⇒ cả hai cách O(1) đều phải khoá toàn bộ khi `get` (vì `get` cũng ghi thứ tự). Hệ thống thật dùng xấp xỉ: CLOCK, sharded LRU, hoặc ghi nhận truy cập vào buffer rồi xử lý theo lô (Caffeine).
- **Capacity rất nhỏ, dữ liệu nằm trong cache CPU** ⇒ mảng quét tuyến tính có thể thắng về thời gian thực.
