## Bảng tradeoff

| Lời giải | Thời gian | Bộ nhớ | Cần sort? | Cấu trúc phụ | Biết phòng nào? |
|---|---|---|---|---|---|
| Two pointers (starts/ends) | O(n log n) | O(n) | 2 lần | 2 mảng số | Không |
| Sort + min-heap | O(n log n) | O(n) | 1 lần | Heap | Có |
| Line sweep | O(n + R) | O(R) | Không | Mảng diff dài R | Không |

## Vì sao hai cách đầu đều O(n log n)

Cả hai đều phải **sắp xếp** – đó là chặn dưới của bất kỳ cách nào chỉ dựa trên phép so sánh: để biết thứ tự các sự kiện vào/ra phòng ta buộc phải sắp chúng theo thời gian, Ω(n log n).

- **Min-heap**: sort O(n log n) + n lần push và tối đa n lần pop, mỗi lần O(log n) ⇒ O(n log n). Heap là chi phí *thêm* chồng lên sort.
- **Two pointers**: hai lần sort O(n log n), sau đó vòng quét chỉ O(n) – mỗi bước hoặc `rooms++` hoặc `e++`. Toàn bộ chi phí nằm ở sort; phần thuật toán thì tuyến tính.

Cùng bậc, nhưng two pointers bỏ hẳn heap: ít code hơn, ít cấp phát hơn, truy cập mảng tuần tự thân thiện cache. Nó đúng vì ta không cần biết *cuộc họp nào* trả phòng – chỉ cần biết *có bao nhiêu* cuộc họp đã kết thúc trước giờ bắt đầu hiện tại, và mảng `ends` đã sort trả lời đúng câu đó.

## Vì sao line sweep khác

Line sweep không so sánh các cuộc họp với nhau mà **đánh chỉ số trực tiếp** theo toạ độ: `diff[start]++`, `diff[end]--`, rồi cộng dồn. Không có sort nên không bị chặn Ω(n log n) – giống counting sort thắng comparison sort. Cái giá là O(R) với R = độ rộng miền thời gian: R = 1440 (phút trong ngày) thì tuyệt vời, R = 10⁹ thì không cấp phát nổi. Khi toạ độ lớn/thưa, phải nén toạ độ (sort các mốc) hoặc dùng map có thứ tự – lúc đó lại quay về O(n log n) và thực chất trở thành two pointers.

## Xếp hạng

1. **Two pointers** – O(n log n), code ngắn nhất, không heap. Mặc định khi chỉ cần số phòng.
2. **Min-heap** – O(n log n), trực quan nhất (mô phỏng xếp phòng), tổng quát hơn: cần khi phải gán phòng hoặc xử lý online.
3. **Line sweep** – O(n + R), phụ thuộc miền giá trị; không an toàn làm đáp án chung.

## Khi nào thứ hạng đổi

- **R nhỏ, n lớn** (vd 10⁶ cuộc họp trong 1440 phút): line sweep lên hạng 1 – tuyến tính, không sort.
- **Cần biết cuộc họp nào ở phòng nào / phòng nào dùng nhiều nhất** (Meeting Rooms III): min-heap lên hạng 1, two pointers không làm được.
- **Cuộc họp đến dạng stream đã theo giờ bắt đầu**: heap xử lý online từng cuộc, không cần biết trước toàn bộ ends.
- **Nhiều truy vấn "lúc t có bao nhiêu cuộc họp"**: line sweep + prefix sum trả lời O(1) mỗi truy vấn.
