/**
 * Danh mục pattern DSA: cách nhận diện, khi nào không dùng, khung code, ví dụ thực tế.
 * `algorithms` là id các bài trên site (được lọc theo registry khi hiển thị).
 */
export interface Pattern {
  id: string;
  title: string;
  tagline: string;
  group: 'Mảng & Chuỗi' | 'Cấu trúc dữ liệu' | 'Đồ thị & Cây' | 'Quy hoạch động & Tìm kiếm' | 'Thiết kế';
  /** Dấu hiệu trong đề bài gợi ý pattern này */
  signals: string[];
  /** Khi nào KHÔNG nên dùng */
  avoid: string[];
  /** Các bước áp dụng */
  steps: string[];
  /** Khung code TypeScript */
  template: string;
  complexity: string;
  /** Ví dụ thực tế ngoài phỏng vấn */
  realWorld: { domain: string; example: string }[];
  /** id thuật toán trên site */
  algorithms: string[];
  leetcode: { id: number; title: string; slug: string }[];
  /** Câu hỏi tự kiểm tra để phân biệt với pattern gần giống */
  distinguish?: string;
}

export const PATTERNS: Pattern[] = [
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    tagline: 'Hai con trỏ tiến vào nhau hoặc cùng chiều trên dữ liệu có thứ tự',
    group: 'Mảng & Chuỗi',
    signals: [
      'Mảng hoặc chuỗi ĐÃ SẮP XẾP (hoặc sắp xếp được mà không mất thông tin)',
      '"Cặp / bộ ba có tổng bằng / nhỏ hơn X"',
      '"Palindrome", "đảo ngược tại chỗ", "so sánh hai đầu"',
      '"Xoá trùng tại chỗ", "gộp hai mảng sắp xếp", "giao của hai danh sách"',
      'Yêu cầu O(1) bộ nhớ phụ',
    ],
    avoid: [
      'Dữ liệu không sắp xếp và không được sắp xếp (mất chỉ số gốc) ⇒ HashMap',
      'Không chứng minh được "loại một đầu là an toàn" ⇒ có thể là sliding window hoặc DP',
      'Cần mọi cặp không phân biệt thứ tự với trùng lặp ⇒ cẩn thận bỏ qua phần tử trùng',
    ],
    steps: [
      'Sắp xếp nếu chưa (và cho phép).',
      'Đặt left ở đầu, right ở cuối (ngược chiều) hoặc slow/fast cùng chiều.',
      'Tại mỗi bước, dựa vào so sánh để quyết định tiến con trỏ nào – chứng minh phần tử bị bỏ không thể thuộc đáp án.',
      'Dừng khi hai con trỏ gặp nhau.',
    ],
    template: `let l = 0, r = a.length - 1;
while (l < r) {
  const s = a[l] + a[r];
  if (s === target) return [l, r];
  if (s < target) l++;   // a[l] không ghép được với ai ⇒ loại
  else r--;              // a[r] không ghép được với ai ⇒ loại
}`,
    complexity: 'O(n) sau khi sắp xếp, O(1) bộ nhớ',
    realWorld: [
      { domain: 'Merge trong database / log', example: 'Gộp hai luồng log đã sắp xếp theo timestamp thành một (bước merge của Merge Sort, merge join trong SQL).' },
      { domain: 'Đối soát tài chính', example: 'Tìm hai giao dịch có tổng bằng số tiền cần khớp trên danh sách đã sắp xếp theo số tiền.' },
      { domain: 'Xử lý chuỗi', example: 'Chuẩn hoá và kiểm tra palindrome, xoá khoảng trắng thừa tại chỗ trong editor.' },
    ],
    algorithms: ['two-sum-sorted', 'reverse-linked-list', 'linked-list-cycle'],
    leetcode: [
      { id: 167, title: 'Two Sum II', slug: 'two-sum-ii-input-array-is-sorted' },
      { id: 15, title: '3Sum', slug: '3sum' },
      { id: 11, title: 'Container With Most Water', slug: 'container-with-most-water' },
      { id: 125, title: 'Valid Palindrome', slug: 'valid-palindrome' },
      { id: 26, title: 'Remove Duplicates from Sorted Array', slug: 'remove-duplicates-from-sorted-array' },
    ],
    distinguish: 'Nếu cửa sổ giữa hai con trỏ là thứ cần tối ưu (độ dài, tổng) ⇒ Sliding Window. Nếu quyết định dựa trên hai ĐẦU ⇒ Two Pointers.',
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    tagline: 'Cửa sổ liên tiếp co giãn, mỗi phần tử vào/ra đúng một lần',
    group: 'Mảng & Chuỗi',
    signals: [
      '"Subarray / substring LIÊN TIẾP dài nhất / ngắn nhất / có tổng / có k phần tử khác nhau"',
      'Điều kiện ĐƠN ĐIỆU: mở rộng cửa sổ làm điều kiện "xấu đi", co lại làm "tốt lên" (hoặc ngược lại)',
      'Phần tử không âm (với bài về tổng)',
      '"Cửa sổ độ dài k cố định"',
    ],
    avoid: [
      'Có số âm và điều kiện về tổng ⇒ prefix sum + HashMap',
      'Subsequence (không liên tiếp) ⇒ DP',
      'Cần max/min của mỗi cửa sổ ⇒ Monotonic Deque (biến thể)',
    ],
    steps: [
      'right mở rộng từng bước, cập nhật trạng thái cửa sổ (Map đếm, tổng…).',
      'Khi cửa sổ vi phạm điều kiện, tăng left tới khi hợp lệ (co).',
      'Sau mỗi bước, cập nhật đáp án từ cửa sổ hợp lệ hiện tại.',
    ],
    template: `let left = 0, best = 0;
const count = new Map<string, number>();
for (let right = 0; right < s.length; right++) {
  add(s[right]);                               // mở rộng
  while (!valid()) remove(s[left++]);          // co tới khi hợp lệ
  best = Math.max(best, right - left + 1);
}`,
    complexity: 'O(n), bộ nhớ O(k) theo kích thước bảng chữ cái',
    realWorld: [
      { domain: 'Rate limiting', example: 'Giới hạn N request trong 60 giây gần nhất: cửa sổ trượt theo thời gian trên log request.' },
      { domain: 'Monitoring / time-series', example: 'Trung bình, độ lệch chuẩn hoặc số lỗi trong 5 phút gần nhất để phát hiện bất thường.' },
      { domain: 'Nén dữ liệu', example: 'LZ77 tìm chuỗi lặp trong cửa sổ trượt phía trước (zip, gzip, PNG).' },
      { domain: 'Mạng', example: 'TCP sliding window điều khiển lưu lượng gói tin.' },
    ],
    algorithms: ['longest-substring-no-repeat', 'sliding-window-maximum', 'max-subarray-kadane'],
    leetcode: [
      { id: 3, title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeating-characters' },
      { id: 209, title: 'Minimum Size Subarray Sum', slug: 'minimum-size-subarray-sum' },
      { id: 76, title: 'Minimum Window Substring', slug: 'minimum-window-substring' },
      { id: 424, title: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement' },
      { id: 567, title: 'Permutation in String', slug: 'permutation-in-string' },
    ],
    distinguish: 'Hỏi: "Nếu cửa sổ hiện tại hợp lệ, cửa sổ nhỏ hơn bên trong có hợp lệ không?" Nếu có (đơn điệu) ⇒ Sliding Window. Nếu không ⇒ Prefix Sum + HashMap hoặc DP.',
  },
  {
    id: 'prefix-sum',
    title: 'Prefix Sum',
    tagline: 'Tiền xử lý tích luỹ để trả lời tổng đoạn O(1), kết hợp HashMap cho "tổng = k"',
    group: 'Mảng & Chuỗi',
    signals: [
      '"Tổng đoạn [l, r]" nhiều truy vấn trên mảng TĨNH',
      '"Số subarray có tổng = k / chia hết cho k / XOR = k" – đặc biệt khi CÓ SỐ ÂM',
      '"Cộng v lên đoạn nhiều lần rồi hỏi mảng cuối" ⇒ difference array',
      '"Tổng hình chữ nhật" trong ma trận ⇒ prefix 2D',
    ],
    avoid: [
      'Mảng thay đổi giữa các truy vấn ⇒ Fenwick / Segment Tree',
      'Cần max/min đoạn (không có nghịch đảo) ⇒ Sparse table / Segment Tree',
      'Chỉ một truy vấn ⇒ cộng trực tiếp O(n) là đủ',
    ],
    steps: [
      'prefix[0] = 0, prefix[i+1] = prefix[i] + a[i].',
      'Tổng [l, r] = prefix[r+1] − prefix[l].',
      'Với "tổng = k": duyệt, hỏi Map "đã gặp prefix − k bao nhiêu lần", rồi ghi prefix hiện tại.',
    ],
    template: `const seen = new Map<number, number>([[0, 1]]);
let run = 0, count = 0;
for (const x of a) {
  run += x;
  count += seen.get(run - k) ?? 0;     // mỗi prefix cũ = run − k là một subarray tổng k
  seen.set(run, (seen.get(run) ?? 0) + 1);
}`,
    complexity: 'O(n) tiền xử lý, O(1) mỗi truy vấn',
    realWorld: [
      { domain: 'Analytics dashboard', example: 'Doanh thu giữa hai ngày bất kỳ: cột cumulative sum trong warehouse, trừ hai giá trị.' },
      { domain: 'Thị giác máy tính', example: 'Integral image (prefix 2D) cho Haar features trong nhận diện khuôn mặt Viola–Jones, box blur O(1)/pixel.' },
      { domain: 'Đặt chỗ / lịch', example: 'Số ghế đã đặt trên mỗi chặng bay: difference array cộng cho đoạn [from, to] rồi prefix một lần.' },
    ],
    algorithms: ['prefix-sum', 'max-subarray-kadane'],
    leetcode: [
      { id: 560, title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k' },
      { id: 303, title: 'Range Sum Query - Immutable', slug: 'range-sum-query-immutable' },
      { id: 974, title: 'Subarray Sums Divisible by K', slug: 'subarray-sums-divisible-by-k' },
      { id: 1109, title: 'Corporate Flight Bookings', slug: 'corporate-flight-bookings' },
      { id: 304, title: 'Range Sum Query 2D', slug: 'range-sum-query-2d-immutable' },
    ],
  },
  {
    id: 'hashmap',
    title: 'HashMap: đếm & phần bù',
    tagline: 'Đổi O(n) bộ nhớ lấy O(1) tra cứu – "đã thấy chưa?" và "cần phần bù nào?"',
    group: 'Mảng & Chuỗi',
    signals: [
      '"Tìm cặp thoả quan hệ" trên dữ liệu KHÔNG sắp xếp',
      '"Đếm tần suất", "anagram", "trùng lặp", "xuất hiện đúng k lần"',
      '"Nhóm theo khoá" (group by), "hai phần tử cách nhau ≤ k"',
      'Vòng lặp lồng O(n²) mà vòng trong chỉ "tìm một giá trị"',
    ],
    avoid: [
      'Yêu cầu O(1) bộ nhớ ⇒ sắp xếp + two pointers, hoặc XOR/bit trick',
      'Cần thứ tự (min/max/kề cận) ⇒ BST / TreeMap / heap',
      'Khoá là float ⇒ sai số băm; làm tròn hoặc tránh',
    ],
    steps: [
      'Xác định khoá cần tra (giá trị, phần bù, chữ ký như chuỗi đã sắp xếp).',
      'Duyệt một lượt: tra Map trước, ghi sau (tránh tự ghép).',
      'Với đếm: Map giá trị → số lần; với nhóm: Map khoá → danh sách.',
    ],
    template: `const seen = new Map<number, number>();   // giá trị → chỉ số
for (let i = 0; i < a.length; i++) {
  const need = target - a[i];
  if (seen.has(need)) return [seen.get(need)!, i];
  seen.set(a[i], i);                        // ghi SAU khi kiểm tra
}`,
    complexity: 'O(n) thời gian, O(n) bộ nhớ',
    realWorld: [
      { domain: 'Database', example: 'Hash join: xây bảng băm từ bảng nhỏ, quét bảng lớn tra cứu – cách join phổ biến nhất.' },
      { domain: 'Dedupe / cache', example: 'Loại bỏ bản ghi trùng theo khoá, memoization kết quả hàm, cache DNS.' },
      { domain: 'Phân tích log', example: 'Đếm số request theo IP/endpoint, top lỗi theo mã – group by trong bộ nhớ.' },
    ],
    algorithms: ['two-sum-hashmap', 'longest-substring-no-repeat', 'lru-cache'],
    leetcode: [
      { id: 1, title: 'Two Sum', slug: 'two-sum' },
      { id: 49, title: 'Group Anagrams', slug: 'group-anagrams' },
      { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements' },
      { id: 128, title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence' },
      { id: 219, title: 'Contains Duplicate II', slug: 'contains-duplicate-ii' },
    ],
  },
  {
    id: 'monotonic-stack',
    title: 'Monotonic Stack',
    tagline: 'Stack giữ phần tử tăng/giảm dần để tìm "gần nhất lớn hơn / nhỏ hơn" trong O(n)',
    group: 'Cấu trúc dữ liệu',
    signals: [
      '"Phần tử lớn hơn / nhỏ hơn GẦN NHẤT bên trái / phải"',
      '"Bao nhiêu ngày tới khi ấm hơn", "stock span", "nhìn thấy bao nhiêu toà nhà"',
      '"Diện tích hình chữ nhật lớn nhất", "nước đọng", "tổng min của mọi subarray"',
      '"Xoá k chữ số để nhỏ nhất", "132 pattern"',
    ],
    avoid: [
      'Cần max/min của CỬA SỔ trượt ⇒ Monotonic Deque (cần bỏ đầu)',
      'Truy vấn đoạn bất kỳ nhiều lần ⇒ Sparse table / Segment Tree',
      'Dữ liệu động (chèn giữa) ⇒ cấu trúc khác',
    ],
    steps: [
      'Chọn chiều đơn điệu: tìm "lớn hơn gần nhất" ⇒ stack GIẢM dần; "nhỏ hơn gần nhất" ⇒ stack TĂNG dần.',
      'Duyệt; khi phần tử mới phá đơn điệu, pop và ghi đáp án cho phần tử bị pop (phần tử mới là "gần nhất" của nó).',
      'Push chỉ số (không phải giá trị) để tính khoảng cách / độ rộng.',
    ],
    template: `const st: number[] = [];            // chỉ số, giá trị giảm dần
const next = new Array(n).fill(-1);  // next greater
for (let i = 0; i < n; i++) {
  while (st.length && a[st[st.length - 1]] < a[i]) next[st.pop()!] = i;
  st.push(i);
}`,
    complexity: 'O(n) amortized – mỗi chỉ số push/pop một lần',
    realWorld: [
      { domain: 'Tài chính', example: 'Stock span, số phiên liên tiếp giá thấp hơn hôm nay; phát hiện breakout.' },
      { domain: 'Xử lý ảnh / OCR', example: 'Hình chữ nhật trắng lớn nhất trong ảnh nhị phân (Maximal Rectangle) để tách vùng văn bản.' },
      { domain: 'Compiler', example: 'Stack toán tử theo độ ưu tiên khi parse biểu thức (Shunting-yard).' },
    ],
    algorithms: ['largest-rectangle-histogram', 'valid-parentheses'],
    leetcode: [
      { id: 739, title: 'Daily Temperatures', slug: 'daily-temperatures' },
      { id: 84, title: 'Largest Rectangle in Histogram', slug: 'largest-rectangle-in-histogram' },
      { id: 42, title: 'Trapping Rain Water', slug: 'trapping-rain-water' },
      { id: 907, title: 'Sum of Subarray Minimums', slug: 'sum-of-subarray-minimums' },
      { id: 402, title: 'Remove K Digits', slug: 'remove-k-digits' },
    ],
    distinguish: 'Có cửa sổ cố định cần "bỏ đầu" ⇒ Deque. Không có cửa sổ, chỉ "gần nhất" ⇒ Stack.',
  },
  {
    id: 'monotonic-deque',
    title: 'Monotonic Deque',
    tagline: 'Max/min của mọi cửa sổ trượt trong O(n); tối ưu DP có ràng buộc cửa sổ',
    group: 'Cấu trúc dữ liệu',
    signals: [
      '"Max / min của mỗi cửa sổ độ dài k"',
      'DP dạng dp[i] = f(i) + max(dp[j]) với i−k ≤ j < i',
      '"Subarray ngắn nhất có tổng ≥ K" với số âm (deque trên prefix sum)',
      '"|max − min| ≤ limit" trên cửa sổ co giãn (hai deque)',
    ],
    avoid: [
      'Cần median hoặc thống kê thứ k ⇒ hai heap / multiset',
      'Cửa sổ không trượt một chiều ⇒ Segment Tree',
    ],
    steps: [
      'Deque chứa chỉ số, giá trị giảm dần (cho max).',
      'Thêm i: pop cuối khi a[cuối] ≤ a[i]; push i.',
      'Bỏ đầu nếu đầu ≤ i − k. Đầu deque là đáp án.',
    ],
    template: `const dq: number[] = []; let head = 0;
for (let i = 0; i < n; i++) {
  while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (dq[head] <= i - k) head++;
  if (i >= k - 1) out.push(a[dq[head]]);
}`,
    complexity: 'O(n), bộ nhớ O(k)',
    realWorld: [
      { domain: 'Monitoring', example: 'Max latency / CPU trong cửa sổ 1 phút trượt, O(1) mỗi điểm dữ liệu.' },
      { domain: 'Tài chính', example: 'Rolling high/low (Donchian channel), chỉ báo kỹ thuật thời gian thực.' },
      { domain: 'Xử lý ảnh', example: 'Max/min filter 1D (dilation/erosion) với thuật toán van Herk.' },
    ],
    algorithms: ['sliding-window-maximum', 'queue-two-stacks'],
    leetcode: [
      { id: 239, title: 'Sliding Window Maximum', slug: 'sliding-window-maximum' },
      { id: 1438, title: 'Longest Subarray With |diff| ≤ Limit', slug: 'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit' },
      { id: 862, title: 'Shortest Subarray with Sum at Least K', slug: 'shortest-subarray-with-sum-at-least-k' },
      { id: 1696, title: 'Jump Game VI', slug: 'jump-game-vi' },
    ],
  },
  {
    id: 'binary-search',
    title: 'Binary Search & Binary Search trên câu trả lời',
    tagline: 'Loại một nửa không gian mỗi bước – trên mảng sắp xếp hoặc trên hàm đơn điệu',
    group: 'Quy hoạch động & Tìm kiếm',
    signals: [
      'Mảng sắp xếp / xoay / "first bad version" / "insert position"',
      '"Nhỏ nhất thoả điều kiện", "lớn nhất sao cho…" và kiểm tra một giá trị cụ thể là DỄ (feasible(x) đơn điệu)',
      'Yêu cầu O(log n) hoặc ràng buộc 10⁹ với n ≤ 10⁵',
      '"Tốc độ ăn chuối nhỏ nhất", "sức chứa tàu nhỏ nhất", "khoảng cách lớn nhất nhỏ nhất"',
    ],
    avoid: [
      'Hàm kiểm tra KHÔNG đơn điệu ⇒ binary search sai',
      'Dữ liệu không có truy cập ngẫu nhiên (linked list)',
      'n nhỏ (< 32): quét tuyến tính nhanh hơn thực tế',
    ],
    steps: [
      'Xác định không gian [lo, hi] và predicate đơn điệu (sai…sai đúng…đúng).',
      'Dùng khuôn lower-bound nửa mở: while lo < hi; mid; nếu !ok(mid) lo = mid+1 else hi = mid.',
      'Trả lo. Kiểm tra tay với 1 phần tử và không tồn tại.',
    ],
    template: `let lo = L, hi = R;                 // đáp án trong [L, R], ok(x) đơn điệu
while (lo < hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  if (ok(mid)) hi = mid;            // mid khả thi ⇒ thử nhỏ hơn
  else lo = mid + 1;
}
return lo;                          // giá trị nhỏ nhất thoả ok`,
    complexity: 'O(log(range) · cost(ok))',
    realWorld: [
      { domain: 'Git', example: '`git bisect` tìm commit gây bug: binary search trên lịch sử với predicate "có bug".' },
      { domain: 'Database', example: 'Tìm key trong B-tree node, tìm vị trí timestamp trong log sắp xếp (lower_bound).' },
      { domain: 'Capacity planning', example: '"Số máy ít nhất để xử lý hết job trong T giờ" – binary search trên số máy với mô phỏng.' },
      { domain: 'Hệ thống phân tán', example: 'Consistent hashing tìm node kế tiếp trên vòng băm.' },
    ],
    algorithms: ['binary-search', 'linear-search', 'lis-patience', 'bst-operations'],
    leetcode: [
      { id: 704, title: 'Binary Search', slug: 'binary-search' },
      { id: 33, title: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array' },
      { id: 875, title: 'Koko Eating Bananas', slug: 'koko-eating-bananas' },
      { id: 1011, title: 'Capacity To Ship Packages', slug: 'capacity-to-ship-packages-within-d-days' },
      { id: 4, title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays' },
    ],
  },
  {
    id: 'fast-slow',
    title: 'Fast & Slow Pointers',
    tagline: 'Hai con trỏ tốc độ khác nhau trên linked list / dãy lặp để tìm vòng, giữa, thứ n từ cuối',
    group: 'Cấu trúc dữ liệu',
    signals: [
      'Linked list + "có vòng không", "đầu vòng", "phần tử giữa", "thứ n từ cuối", "palindrome"',
      'Mảng với giá trị trong [1, n] hỏi "số trùng" không sửa mảng, O(1) bộ nhớ',
      'Dãy x → f(x) hỏi chu kỳ (Happy Number)',
    ],
    avoid: [
      'Cấu trúc có nhiều "next" (đồ thị tổng quát) ⇒ DFS với màu',
      'Được dùng O(n) bộ nhớ và không cần tối ưu ⇒ Set đơn giản hơn',
    ],
    steps: [
      'slow đi 1, fast đi 2; dừng khi fast chạm null (không vòng) hoặc slow === fast (có vòng).',
      'Tìm đầu vòng: một con trỏ về head, cả hai đi 1 bước tới khi gặp.',
      'Tìm giữa: khi fast tới cuối, slow ở giữa.',
    ],
    template: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow!.next; fast = fast.next.next;
  if (slow === fast) {                      // có vòng
    let p = head;
    while (p !== slow) { p = p!.next; slow = slow!.next; }
    return p;                               // đầu vòng
  }
}
return null;`,
    complexity: 'O(n), O(1) bộ nhớ',
    realWorld: [
      { domain: 'Mật mã / số học', example: 'Pollard\'s rho phân tích thừa số dùng Floyd để phát hiện chu kỳ của dãy giả ngẫu nhiên.' },
      { domain: 'Hệ thống', example: 'Phát hiện vòng tham chiếu trong cấu trúc liên kết, vòng phụ thuộc "mỗi task chờ đúng một task".' },
      { domain: 'PRNG', example: 'Đo chu kỳ của bộ sinh số ngẫu nhiên.' },
    ],
    algorithms: ['linked-list-cycle', 'reverse-linked-list'],
    leetcode: [
      { id: 141, title: 'Linked List Cycle', slug: 'linked-list-cycle' },
      { id: 142, title: 'Linked List Cycle II', slug: 'linked-list-cycle-ii' },
      { id: 876, title: 'Middle of the Linked List', slug: 'middle-of-the-linked-list' },
      { id: 287, title: 'Find the Duplicate Number', slug: 'find-the-duplicate-number' },
      { id: 234, title: 'Palindrome Linked List', slug: 'palindrome-linked-list' },
    ],
  },
  {
    id: 'intervals',
    title: 'Intervals: sắp xếp + quét',
    tagline: 'Sắp xếp theo start (hoặc end) rồi quét một lượt – lịch, phòng họp, gộp khoảng',
    group: 'Mảng & Chuỗi',
    signals: [
      '"Khoảng [start, end]", "lịch họp", "đặt phòng", "chồng lấn", "gộp"',
      '"Số phòng / tài nguyên tối thiểu cùng lúc"',
      '"Chọn nhiều nhất không chồng", "bỏ ít nhất"',
      '"Thời gian rảnh chung"',
    ],
    avoid: [
      'Khoảng thêm/xoá động nhiều lần ⇒ TreeMap / Segment Tree',
      'Khoảng 2D (hình chữ nhật) ⇒ sweep line + segment tree',
    ],
    steps: [
      'Gộp: sắp xếp theo start; so với khoảng cuối kết quả; chồng thì kéo dài end bằng max.',
      'Đếm tài nguyên: tách sự kiện +1/−1, sắp xếp, max tổng chạy; hoặc heap theo end.',
      'Chọn nhiều nhất không chồng: sắp xếp theo END, tham lam giữ khoảng kết thúc sớm.',
    ],
    template: `intervals.sort((a, b) => a[0] - b[0]);
const out = [intervals[0]];
for (const [s, e] of intervals.slice(1)) {
  const last = out[out.length - 1];
  if (s <= last[1]) last[1] = Math.max(last[1], e);   // chồng ⇒ gộp
  else out.push([s, e]);
}`,
    complexity: 'O(n log n) do sắp xếp',
    realWorld: [
      { domain: 'Calendar', example: 'Google Calendar "find a time": gộp khung bận của mọi người rồi lấy khoảng trống.' },
      { domain: 'Hệ thống file / allocator', example: 'Gộp block trống liền kề (coalescing) trong free list, defragment.' },
      { domain: 'Mạng', example: 'Gộp dải IP thành CIDR, gộp khoảng cổng trong firewall.' },
      { domain: 'Genomics', example: '`bedtools merge` gộp vùng gen chồng lấn.' },
    ],
    algorithms: ['merge-intervals', 'kth-largest-heap'],
    leetcode: [
      { id: 56, title: 'Merge Intervals', slug: 'merge-intervals' },
      { id: 57, title: 'Insert Interval', slug: 'insert-interval' },
      { id: 253, title: 'Meeting Rooms II', slug: 'meeting-rooms-ii' },
      { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals' },
      { id: 986, title: 'Interval List Intersections', slug: 'interval-list-intersections' },
    ],
  },
  {
    id: 'bfs',
    title: 'BFS',
    tagline: 'Duyệt theo tầng bằng queue – đường đi ngắn nhất khi mọi bước cùng chi phí',
    group: 'Đồ thị & Cây',
    signals: [
      '"Ít bước nhất", "ngắn nhất" trên lưới / đồ thị KHÔNG trọng số',
      '"Theo tầng", "độ sâu nhỏ nhất", "nhìn từ bên phải", "zigzag" trên cây',
      '"Sau bao nhiêu phút thì lan hết" ⇒ multi-source BFS',
      '"Biến đổi từ trạng thái A sang B với ít thao tác nhất" (Word Ladder, Open the Lock)',
    ],
    avoid: [
      'Có trọng số khác nhau ⇒ Dijkstra; trọng số 0/1 ⇒ 0-1 BFS',
      'Chỉ cần "có đường không" / đếm vùng ⇒ DFS ngắn hơn',
      'Không gian trạng thái khổng lồ ⇒ bidirectional BFS / A*',
    ],
    steps: [
      'Queue = nguồn (có thể nhiều nguồn), đánh dấu visited KHI ĐẨY VÀO.',
      'Lấy đầu queue, xử lý, đẩy hàng xóm chưa thăm.',
      'Theo tầng: xử lý theo size của queue tại mỗi vòng.',
    ],
    template: `const q = [start]; let head = 0; dist.set(start, 0);
while (head < q.length) {
  const u = q[head++];
  if (u === target) return dist.get(u)!;
  for (const v of neighbors(u)) if (!dist.has(v)) { dist.set(v, dist.get(u)! + 1); q.push(v); }
}`,
    complexity: 'O(V + E), bộ nhớ O(độ rộng tầng)',
    realWorld: [
      { domain: 'Mạng xã hội', example: 'Bậc kết nối (LinkedIn 2nd/3rd), gợi ý bạn chung.' },
      { domain: 'Web crawler', example: 'Thu thập trang theo độ sâu link từ trang gốc.' },
      { domain: 'Garbage collector', example: 'Mark phase: đánh dấu object sống từ root set.' },
      { domain: 'Game / robot', example: 'Tìm đường ngắn nhất trên bản đồ ô vuông; lan toả vùng ảnh hưởng.' },
    ],
    algorithms: ['bfs-grid-shortest-path', 'binary-tree-traversal', 'topological-sort'],
    leetcode: [
      { id: 1091, title: 'Shortest Path in Binary Matrix', slug: 'shortest-path-in-binary-matrix' },
      { id: 994, title: 'Rotting Oranges', slug: 'rotting-oranges' },
      { id: 102, title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order-traversal' },
      { id: 127, title: 'Word Ladder', slug: 'word-ladder' },
      { id: 752, title: 'Open the Lock', slug: 'open-the-lock' },
    ],
    distinguish: 'Hỏi "ngắn nhất" và cạnh bằng nhau ⇒ BFS. Hỏi "có tồn tại / đếm vùng / liệt kê" ⇒ DFS.',
  },
  {
    id: 'dfs-backtracking',
    title: 'DFS & Backtracking',
    tagline: 'Đi sâu hết một nhánh; backtracking = DFS trên cây trạng thái + bỏ chọn + cắt tỉa',
    group: 'Đồ thị & Cây',
    signals: [
      '"Đếm vùng liên thông", "flood fill", "có đường đi không"',
      '"Liệt kê TẤT CẢ", "mọi tổ hợp / hoán vị / tập con", "có tồn tại cách xếp"',
      'n nhỏ (≤ 15–20) trong ràng buộc đề',
      'Ràng buộc kiểm tra được TỪNG PHẦN (cắt tỉa sớm)',
      'Trên cây: "chiều cao", "đường kính", "tổng cây con" (postorder); "đường đi từ gốc", "serialize" (preorder)',
    ],
    avoid: [
      'Cần ngắn nhất ⇒ BFS',
      'Có overlapping subproblems và chỉ cần giá trị tối ưu ⇒ DP (memo)',
      'Cây/lưới cực lớn và lệch ⇒ đệ quy tràn stack, dùng stack tường minh',
    ],
    steps: [
      'Base case: đạt mục tiêu ⇒ ghi nhận; hết lựa chọn ⇒ return.',
      'Với mỗi lựa chọn hợp lệ: chọn → đệ quy → BỎ CHỌN.',
      'Cắt tỉa: kiểm tra ràng buộc trước khi đệ quy; dùng visited/set để O(1).',
    ],
    template: `function backtrack(path: T[], choices: T[]) {
  if (isGoal(path)) { result.push([...path]); return; }
  for (const c of choices) {
    if (!valid(path, c)) continue;      // cắt tỉa
    path.push(c); mark(c);              // chọn
    backtrack(path, choices);
    path.pop(); unmark(c);              // bỏ chọn – không được quên
  }
}`,
    complexity: 'Hàm mũ/giai thừa trên lý thuyết; cắt tỉa quyết định thực tế. DFS đồ thị O(V + E)',
    realWorld: [
      { domain: 'Lập lịch / CSP', example: 'Xếp thời khoá biểu, phân ca, xếp phòng thi với ràng buộc – backtracking + forward checking.' },
      { domain: 'Xử lý ảnh', example: 'Connected component labeling, magic wand / bucket fill.' },
      { domain: 'Compiler / build', example: 'Register allocation (graph coloring), phát hiện import vòng bằng DFS 3 màu.' },
      { domain: 'SAT solver', example: 'DPLL là backtracking với unit propagation và cắt tỉa.' },
    ],
    algorithms: ['number-of-islands', 'n-queens', 'binary-tree-traversal', 'bst-operations'],
    leetcode: [
      { id: 200, title: 'Number of Islands', slug: 'number-of-islands' },
      { id: 46, title: 'Permutations', slug: 'permutations' },
      { id: 78, title: 'Subsets', slug: 'subsets' },
      { id: 39, title: 'Combination Sum', slug: 'combination-sum' },
      { id: 79, title: 'Word Search', slug: 'word-search' },
      { id: 51, title: 'N-Queens', slug: 'n-queens' },
    ],
  },
  {
    id: 'topological-sort',
    title: 'Topological Sort',
    tagline: 'Thứ tự hợp lệ trên đồ thị phụ thuộc có hướng; phát hiện chu trình',
    group: 'Đồ thị & Cây',
    signals: [
      '"Tiên quyết", "phụ thuộc", "phải xong trước", "thứ tự cài đặt / biên dịch"',
      '"Có thể hoàn thành tất cả không?" ⇒ phát hiện chu trình',
      '"Số học kỳ tối thiểu nếu học song song" ⇒ số tầng',
      '"Suy ra thứ tự bảng chữ cái từ các từ đã sắp xếp" (Alien Dictionary)',
    ],
    avoid: [
      'Đồ thị vô hướng ⇒ không có topo sort (Minimum Height Trees dùng bóc lá – ý tưởng tương tự)',
      'Có chu trình hợp lệ theo đề ⇒ cần SCC (Tarjan) rồi topo trên DAG rút gọn',
    ],
    steps: [
      'Xây danh sách kề và indegree (chú ý hướng cạnh: "a cần b" là b → a).',
      'Queue các đỉnh indegree 0; lấy ra, giảm indegree hàng xóm, đẩy khi về 0.',
      'order.length < V ⇒ chu trình.',
    ],
    template: `const q = nodes.filter(v => indeg[v] === 0); const order: string[] = [];
let head = 0;
while (head < q.length) {
  const u = q[head++]; order.push(u);
  for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);
}
if (order.length !== nodes.length) throw new Error('cycle');`,
    complexity: 'O(V + E)',
    realWorld: [
      { domain: 'Build system', example: 'Make, Bazel, Gradle xác định thứ tự biên dịch; `make -j` chạy song song các đỉnh cùng tầng.' },
      { domain: 'Package manager', example: 'npm/pip/apt cài dependency trước, báo lỗi dependency vòng.' },
      { domain: 'Bảng tính', example: 'Excel tính lại ô theo thứ tự topo của công thức; tham chiếu vòng báo lỗi.' },
      { domain: 'Workflow / ML', example: 'Airflow DAG, thứ tự tính toán trong computation graph (autograd).' },
    ],
    algorithms: ['topological-sort', 'dijkstra'],
    leetcode: [
      { id: 207, title: 'Course Schedule', slug: 'course-schedule' },
      { id: 210, title: 'Course Schedule II', slug: 'course-schedule-ii' },
      { id: 269, title: 'Alien Dictionary', slug: 'alien-dictionary' },
      { id: 1136, title: 'Parallel Courses', slug: 'parallel-courses' },
      { id: 310, title: 'Minimum Height Trees', slug: 'minimum-height-trees' },
    ],
  },
  {
    id: 'union-find',
    title: 'Union-Find',
    tagline: 'Gộp nhóm và hỏi "cùng nhóm?" gần O(1) – cạnh thêm dần, chu trình, MST',
    group: 'Đồ thị & Cây',
    signals: [
      '"Cùng nhóm / liên thông / gộp" với cạnh THÊM DẦN hoặc nhiều truy vấn xen kẽ',
      '"Số thành phần liên thông", "số tỉnh", "số đảo khi thêm ô"',
      '"Cạnh nào tạo chu trình", "cạnh thừa"',
      '"Gộp tài khoản trùng thông tin", "nhóm phần tử tương đương"',
      'Cây khung nhỏ nhất (Kruskal)',
    ],
    avoid: [
      'Cần đường đi / khoảng cách ⇒ BFS/DFS/Dijkstra',
      'Cần XOÁ cạnh ⇒ offline (đảo thời gian) hoặc cấu trúc khác',
      'Đồ thị tĩnh và chỉ một truy vấn ⇒ DFS đủ',
    ],
    steps: [
      'parent[i] = i, rank/size.',
      'find với path compression; union by rank/size; đếm count giảm khi gộp thành công.',
      'union trả false ⇒ cạnh tạo chu trình.',
    ],
    template: `const parent = [...Array(n).keys()];
const find = (x: number): number => parent[x] === x ? x : (parent[x] = find(parent[x]));
const union = (a: number, b: number): boolean => {
  const ra = find(a), rb = find(b);
  if (ra === rb) return false;        // đã cùng nhóm ⇒ chu trình
  parent[rb] = ra; return true;
};`,
    complexity: 'O(α(n)) ≈ O(1) mỗi thao tác amortized',
    realWorld: [
      { domain: 'Mạng', example: 'Kiểm tra liên thông khi thêm link, phát hiện vòng lặp cấu hình; Kruskal thiết kế mạng rẻ nhất.' },
      { domain: 'Dữ liệu người dùng', example: 'Gộp tài khoản trùng email/số điện thoại (entity resolution).' },
      { domain: 'Compiler', example: 'Unification trong type inference (Hindley–Milner) gộp biến kiểu.' },
      { domain: 'Xử lý ảnh / vật lý', example: 'Connected component labeling, percolation, đếm nhóm quân trong cờ Go.' },
    ],
    algorithms: ['union-find', 'kruskal-mst', 'number-of-islands'],
    leetcode: [
      { id: 547, title: 'Number of Provinces', slug: 'number-of-provinces' },
      { id: 684, title: 'Redundant Connection', slug: 'redundant-connection' },
      { id: 721, title: 'Accounts Merge', slug: 'accounts-merge' },
      { id: 1584, title: 'Min Cost to Connect All Points', slug: 'min-cost-to-connect-all-points' },
      { id: 305, title: 'Number of Islands II', slug: 'number-of-islands-ii' },
    ],
  },
  {
    id: 'shortest-path',
    title: 'Đường đi ngắn nhất có trọng số',
    tagline: 'Dijkstra với heap cho trọng số ≥ 0; Bellman-Ford cho trọng số âm; MST ≠ shortest path',
    group: 'Đồ thị & Cây',
    signals: [
      '"Chi phí / thời gian / khoảng cách NHỎ NHẤT" trên đồ thị có trọng số',
      '"Thời gian tín hiệu lan khắp mạng", "đường ít tốn sức nhất qua địa hình"',
      '"Xác suất lớn nhất" (nhân thay cộng), "min của max" (max thay cộng)',
      '"Trong tối đa k bước" ⇒ trạng thái (đỉnh, bước) hoặc Bellman-Ford k vòng',
    ],
    avoid: [
      'Mọi cạnh bằng nhau ⇒ BFS đơn giản hơn',
      'Trọng số âm ⇒ Dijkstra SAI, dùng Bellman-Ford/SPFA',
      '"Nối tất cả với tổng nhỏ nhất" ⇒ MST (Kruskal/Prim), không phải shortest path',
    ],
    steps: [
      'dist = ∞, dist[s] = 0, heap (d, u).',
      'Pop nhỏ nhất; bỏ qua nếu d > dist[u] (stale); relax các cạnh đi ra.',
      'Dừng sớm khi pop đích nếu chỉ cần một đích.',
    ],
    template: `dist[s] = 0; heap.push([0, s]);
while (heap.size) {
  const [d, u] = heap.pop();
  if (d > dist[u]) continue;                       // bản ghi cũ
  for (const [v, w] of adj[u]) if (d + w < dist[v]) { dist[v] = d + w; heap.push([dist[v], v]); }
}`,
    complexity: 'O((V + E) log V) với heap',
    realWorld: [
      { domain: 'Bản đồ / gọi xe', example: 'Google Maps, Uber ETA (Dijkstra + A* + contraction hierarchies).' },
      { domain: 'Định tuyến Internet', example: 'OSPF, IS-IS chạy Dijkstra trên bản đồ link-state của router.' },
      { domain: 'Game', example: 'Pathfinding NPC trên navmesh với chi phí địa hình.' },
      { domain: 'Chip design', example: 'Định tuyến dây với chi phí khác nhau theo vùng.' },
    ],
    algorithms: ['dijkstra', 'bfs-grid-shortest-path', 'kth-largest-heap'],
    leetcode: [
      { id: 743, title: 'Network Delay Time', slug: 'network-delay-time' },
      { id: 1631, title: 'Path With Minimum Effort', slug: 'path-with-minimum-effort' },
      { id: 787, title: 'Cheapest Flights Within K Stops', slug: 'cheapest-flights-within-k-stops' },
      { id: 1514, title: 'Path with Maximum Probability', slug: 'path-with-maximum-probability' },
    ],
  },
  {
    id: 'heap-topk',
    title: 'Heap / Top-K',
    tagline: 'Lấy min/max lặp đi lặp lại trên dữ liệu thay đổi; giữ k phần tử tốt nhất trong O(n log k)',
    group: 'Cấu trúc dữ liệu',
    signals: [
      '"Top k", "k lớn nhất / nhỏ nhất / gần nhất / thường xuyên nhất"',
      '"Stream", "liên tục", "online" – không có toàn bộ dữ liệu',
      '"Merge k danh sách sắp xếp"',
      '"Median động" ⇒ hai heap',
      '"Lấy phần tử ưu tiên cao nhất tiếp theo" (scheduler, sự kiện theo thời gian)',
    ],
    avoid: [
      'Có toàn bộ dữ liệu, chỉ cần một đáp án ⇒ Quickselect O(n) trung bình',
      'Cần tìm/xoá phần tử bất kỳ hoặc duyệt có thứ tự ⇒ BST / TreeMap',
      'k ≈ n ⇒ sắp xếp đơn giản hơn',
    ],
    steps: [
      'Top-k lớn nhất ⇒ MIN-heap kích thước k (đỉnh = yếu nhất trong top-k để loại).',
      'Push từng phần tử; nếu size > k thì pop.',
      'Merge k: heap chứa đầu mỗi danh sách; pop rồi push phần tử kế của danh sách đó.',
    ],
    template: `const heap = new MinHeap();
for (const x of stream) {
  heap.push(x);
  if (heap.size > k) heap.pop();     // loại phần tử nhỏ nhất, giữ k lớn nhất
}
return heap.peek();                   // phần tử lớn thứ k`,
    complexity: 'O(n log k), bộ nhớ O(k)',
    realWorld: [
      { domain: 'Trending / xếp hạng', example: 'Top 10 từ khoá nóng trong 1 giờ qua, sản phẩm bán chạy theo cửa sổ thời gian.' },
      { domain: 'Scheduler / timer', example: 'Timer sắp hết hạn gần nhất, event-driven simulation, lấy job ưu tiên cao nhất.' },
      { domain: 'Log aggregation', example: 'Merge k file log theo timestamp (external sort k-way merge).' },
      { domain: 'Nén', example: 'Huffman coding luôn gộp hai cây tần suất nhỏ nhất.' },
    ],
    algorithms: ['kth-largest-heap', 'dijkstra', 'merge-sort'],
    leetcode: [
      { id: 215, title: 'Kth Largest Element in an Array', slug: 'kth-largest-element-in-an-array' },
      { id: 347, title: 'Top K Frequent Elements', slug: 'top-k-frequent-elements' },
      { id: 23, title: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists' },
      { id: 295, title: 'Find Median from Data Stream', slug: 'find-median-from-data-stream' },
      { id: 973, title: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin' },
    ],
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    tagline: 'Tối ưu / đếm với overlapping subproblems – định nghĩa trạng thái, công thức chuyển, cơ sở',
    group: 'Quy hoạch động & Tìm kiếm',
    signals: [
      '"Số cách", "lớn nhất / nhỏ nhất", "có thể hay không" trên dãy / chuỗi / lưới',
      'Quyết định ở mỗi bước chỉ phụ thuộc vài phần tử trước (1D) hoặc hai tiền tố (2D chuỗi)',
      '"Mỗi món chọn tối đa một lần" (0/1 knapsack) / "dùng không giới hạn" (unbounded)',
      'Greedy cho phản ví dụ, brute force là hàm mũ',
      'Ràng buộc n ≤ 10³ (O(n²)) hoặc n·W ≤ 10⁷',
    ],
    avoid: [
      'Cần LIỆT KÊ mọi nghiệm ⇒ backtracking',
      'Không có overlapping subproblems ⇒ chia để trị thường',
      'Greedy chứng minh được đúng (exchange argument) ⇒ greedy nhanh hơn',
      'Trạng thái quá lớn (hàm mũ) ⇒ bitmask DP chỉ khi n ≤ 20, nếu không cần heuristic',
    ],
    steps: [
      'Định nghĩa dp[...] bằng MỘT CÂU rõ ràng (ví dụ "max tiền từ i nhà đầu").',
      'Công thức chuyển từ quyết định ở bước cuối; kiểm tra optimal substructure.',
      'Cơ sở; thứ tự tính (bottom-up) hoặc memo (top-down); tối ưu bộ nhớ nếu chỉ cần vài hàng trước; truy vết nếu cần nghiệm.',
    ],
    template: `// 1D: dp[i] phụ thuộc dp[i-1], dp[i-2]
let prev2 = 0, prev1 = 0;
for (const x of nums) { const cur = Math.max(prev1, prev2 + x); prev2 = prev1; prev1 = cur; }

// 2D hai chuỗi: dp[i][j] từ (i-1,j-1), (i-1,j), (i,j-1)
dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);

// Knapsack 0/1 một hàng: w GIẢM dần; unbounded: w TĂNG dần`,
    complexity: 'O(số trạng thái × chi phí chuyển)',
    realWorld: [
      { domain: 'Spell check / diff', example: 'Edit distance cho gợi ý sửa lỗi; Myers diff (LCS) trong git.' },
      { domain: 'Tin sinh học', example: 'Alignment DNA/protein (Needleman–Wunsch, Smith–Waterman).' },
      { domain: 'Tài chính / tối ưu', example: 'Phân bổ ngân sách (knapsack), trả tiền thừa (coin change), lịch không chồng lấn.' },
      { domain: 'Nén & mã hoá', example: 'Viterbi (HMM, giải mã kênh), tách từ (word break) trong NLP tiếng Việt/Trung.' },
    ],
    algorithms: ['house-robber', 'coin-change', 'knapsack-01', 'edit-distance', 'max-subarray-kadane', 'lis-patience'],
    leetcode: [
      { id: 70, title: 'Climbing Stairs', slug: 'climbing-stairs' },
      { id: 198, title: 'House Robber', slug: 'house-robber' },
      { id: 322, title: 'Coin Change', slug: 'coin-change' },
      { id: 1143, title: 'Longest Common Subsequence', slug: 'longest-common-subsequence' },
      { id: 416, title: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum' },
      { id: 139, title: 'Word Break', slug: 'word-break' },
    ],
    distinguish: 'Hỏi "cần giá trị tối ưu hay mọi nghiệm?" Tối ưu ⇒ DP. Mọi nghiệm ⇒ backtracking. Hỏi "quyết định cục bộ có luôn đúng không?" Có ⇒ greedy.',
  },
  {
    id: 'greedy',
    title: 'Greedy',
    tagline: 'Chọn tốt nhất cục bộ ở mỗi bước – chỉ đúng khi chứng minh được bằng exchange argument',
    group: 'Quy hoạch động & Tìm kiếm',
    signals: [
      '"Nhiều nhất / ít nhất" với cấu trúc đơn giản: chọn khoảng, ghép cặp, phân phối',
      'Sau khi sắp xếp theo một tiêu chí, quyết định từng phần tử là hiển nhiên',
      '"Có thể nhảy tới cuối không", "số trạm xăng ít nhất", "ghép người nặng nhất với nhẹ nhất"',
      'Huffman, Kruskal, Dijkstra, activity selection là greedy có chứng minh',
    ],
    avoid: [
      'Tìm được phản ví dụ nhỏ ⇒ dùng DP (coin change với [1,3,4], knapsack 0/1)',
      'Lựa chọn hiện tại ảnh hưởng tới lựa chọn sau theo cách không đơn giản ⇒ DP',
    ],
    steps: [
      'Tìm tiêu chí sắp xếp (end sớm nhất, tỉ lệ, deadline…).',
      'Phát biểu lựa chọn greedy; chứng minh bằng exchange: hoán đổi lựa chọn tối ưu bất kỳ sang lựa chọn greedy không làm xấu đi.',
      'Thử phản ví dụ nhỏ trước khi tin.',
    ],
    template: `intervals.sort((a, b) => a[1] - b[1]);     // kết thúc sớm trước
let count = 0, lastEnd = -Infinity;
for (const [s, e] of intervals) {
  if (s >= lastEnd) { count++; lastEnd = e; }   // chọn khoảng không chồng
}`,
    complexity: 'Thường O(n log n) do sắp xếp',
    realWorld: [
      { domain: 'Lập lịch', example: 'Activity selection chọn nhiều cuộc họp nhất cho một phòng; EDF scheduling.' },
      { domain: 'Nén', example: 'Huffman coding (zip, JPEG) – cây tiền tố tối ưu.' },
      { domain: 'Mạng / hạ tầng', example: 'Kruskal/Prim thiết kế mạng, Dijkstra định tuyến.' },
      { domain: 'Vận hành', example: 'Đổ xăng ít lần nhất, xếp thuyền (ghép nặng–nhẹ), cache LRU là heuristic greedy.' },
    ],
    algorithms: ['merge-intervals', 'kruskal-mst', 'dijkstra', 'max-subarray-kadane'],
    leetcode: [
      { id: 435, title: 'Non-overlapping Intervals', slug: 'non-overlapping-intervals' },
      { id: 55, title: 'Jump Game', slug: 'jump-game' },
      { id: 134, title: 'Gas Station', slug: 'gas-station' },
      { id: 881, title: 'Boats to Save People', slug: 'boats-to-save-people' },
      { id: 763, title: 'Partition Labels', slug: 'partition-labels' },
    ],
  },
  {
    id: 'trie-string',
    title: 'Trie & String Matching',
    tagline: 'Tiền tố, autocomplete, nhiều pattern; KMP/Z/rolling hash cho tìm chuỗi tuyến tính',
    group: 'Cấu trúc dữ liệu',
    signals: [
      '"Tiền tố", "bắt đầu bằng", "autocomplete", "gợi ý"',
      '"Tập từ điển + duyệt lưới / văn bản tìm nhiều từ"',
      '"Tìm pattern trong text O(n + m)", "chu kỳ chuỗi", "prefix cũng là suffix"',
      '"XOR lớn nhất của hai số" ⇒ binary trie',
      '"So sánh nhiều chuỗi con bằng nhau nhanh" ⇒ rolling hash',
    ],
    avoid: [
      'Chỉ cần "có từ này không" ⇒ HashSet gọn hơn',
      'Bộ nhớ hạn chế với từ điển lớn ⇒ radix tree / Bloom filter',
      'Tìm một pattern một lần trong text ngắn ⇒ `indexOf` của thư viện',
    ],
    steps: [
      'Trie: node có Map con + isEnd; insert/search/startsWith đi theo từng ký tự.',
      'KMP: xây LPS của pattern; quét text không lùi, lệch thì j = lps[j−1].',
      'Nhiều pattern ⇒ Aho–Corasick (Trie + failure link).',
    ],
    template: `class TrieNode { children = new Map<string, TrieNode>(); isEnd = false; }
insert(word) { let n = root; for (const ch of word) { if (!n.children.has(ch)) n.children.set(ch, new TrieNode()); n = n.children.get(ch)!; } n.isEnd = true; }
startsWith(p) { let n = root; for (const ch of p) { n = n.children.get(ch)!; if (!n) return false; } return true; }`,
    complexity: 'Trie O(L) mỗi thao tác; KMP O(n + m)',
    realWorld: [
      { domain: 'Search / IDE', example: 'Autocomplete của Google, IntelliSense; gợi ý theo tiền tố với top-k lưu tại node.' },
      { domain: 'Router', example: 'Longest prefix match trên bảng định tuyến IP (Patricia trie).' },
      { domain: 'Bảo mật', example: 'Snort/IDS quét chữ ký bằng Aho–Corasick; lọc từ nhạy cảm.' },
      { domain: 'Version control', example: 'Patience diff, tìm chuỗi trong editor, grep.' },
    ],
    algorithms: ['trie', 'kmp', 'edit-distance'],
    leetcode: [
      { id: 208, title: 'Implement Trie', slug: 'implement-trie-prefix-tree' },
      { id: 212, title: 'Word Search II', slug: 'word-search-ii' },
      { id: 28, title: 'Find the Index of the First Occurrence', slug: 'find-the-index-of-the-first-occurrence-in-a-string' },
      { id: 1392, title: 'Longest Happy Prefix', slug: 'longest-happy-prefix' },
      { id: 421, title: 'Maximum XOR of Two Numbers', slug: 'maximum-xor-of-two-numbers-in-an-array' },
    ],
  },
  {
    id: 'bit',
    title: 'Bit Manipulation',
    tagline: 'XOR triệt tiêu cặp, n & (n−1) xoá bit thấp nhất, bitmask biểu diễn tập con',
    group: 'Quy hoạch động & Tìm kiếm',
    signals: [
      '"O(1) bộ nhớ" + "xuất hiện chẵn lần trừ một"',
      '"Số bit 1", "luỹ thừa của 2", "bit thấp nhất", "đảo bit"',
      '"Tập con", "chọn/không chọn" với n ≤ 20 ⇒ bitmask (2ⁿ trạng thái)',
      '"Cờ / quyền / trạng thái bật tắt"',
    ],
    avoid: [
      '"Xuất hiện 3 lần trừ một" ⇒ XOR thuần không đủ (đếm bit mod 3)',
      'JS chỉ bit 32-bit ⇒ số lớn dùng BigInt',
      'Khó đọc – trong production đặt tên hàm rõ ràng',
    ],
    steps: [
      'Viết bảng chân trị / ví dụ 8 bit để chắc chắn về phép toán.',
      'XOR cho triệt tiêu; AND với mask để kiểm tra; OR/XOR để bật/lật.',
      'Bitmask DP: dp[mask][i], chuyển bằng mask | (1 << j).',
    ],
    template: `let acc = 0; for (const x of nums) acc ^= x;          // số lẻ loi
const lowest = n & -n;                                       // bit 1 thấp nhất
const isPow2 = n > 0 && (n & (n - 1)) === 0;
for (let mask = 0; mask < (1 << n); mask++) {               // mọi tập con
  for (let i = 0; i < n; i++) if (mask & (1 << i)) use(a[i]);
}`,
    complexity: 'O(1) mỗi phép; bitmask DP O(2ⁿ · n)',
    realWorld: [
      { domain: 'Hệ điều hành / quyền', example: 'Unix file mode, feature flags, bitmap cấp phát block.' },
      { domain: 'Lưu trữ', example: 'RAID 5 dùng XOR parity để khôi phục ổ hỏng; checksum.' },
      { domain: 'Database', example: 'Bitmap index, Roaring bitmap, Bloom filter.' },
      { domain: 'Mạng', example: 'Subnet mask `ip & mask`, hash `n & (size − 1)` thay cho modulo.' },
    ],
    algorithms: ['single-number-bits', 'trie'],
    leetcode: [
      { id: 136, title: 'Single Number', slug: 'single-number' },
      { id: 191, title: 'Number of 1 Bits', slug: 'number-of-1-bits' },
      { id: 338, title: 'Counting Bits', slug: 'counting-bits' },
      { id: 78, title: 'Subsets', slug: 'subsets' },
      { id: 847, title: 'Shortest Path Visiting All Nodes', slug: 'shortest-path-visiting-all-nodes' },
    ],
  },
  {
    id: 'divide-conquer-sort',
    title: 'Chia để trị & Sắp xếp',
    tagline: 'Chia đôi, giải đệ quy, gộp – Merge/Quick Sort, đếm nghịch thế, chọn thuật toán sắp xếp đúng',
    group: 'Quy hoạch động & Tìm kiếm',
    signals: [
      '"Đếm cặp (i, j) với i < j và điều kiện so sánh" (nghịch thế, smaller after self) ⇒ Merge Sort',
      '"Phần tử thứ k" không cần sắp xếp hết ⇒ Quickselect',
      'Cần stable / worst-case đảm bảo / sắp xếp linked list ⇒ Merge Sort',
      'Số nguyên miền nhỏ ⇒ Counting/Radix; n nhỏ hoặc gần sắp xếp ⇒ Insertion',
      'Bài có thể tách thành hai nửa độc lập + gộp O(n)',
    ],
    avoid: [
      'Hai nửa không độc lập (phụ thuộc chồng chéo) ⇒ DP',
      'Chỉ cần min/max/top-k ⇒ không cần sắp xếp toàn bộ',
    ],
    steps: [
      'Base case nhỏ; chia đôi; đệ quy; gộp (nơi có logic thật).',
      'Master Theorem: T(n) = 2T(n/2) + O(n) ⇒ O(n log n).',
      'Đếm trong bước merge: khi lấy phần tử phải trước, cộng số phần tử trái còn lại.',
    ],
    template: `function mergeSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  return merge(mergeSort(a.slice(0, mid)), mergeSort(a.slice(mid)));
}`,
    complexity: 'O(n log n); Quickselect O(n) trung bình; Counting O(n + k)',
    realWorld: [
      { domain: 'Thư viện chuẩn', example: 'TimSort (Python, Java object, V8), introsort (C++), pdqsort (Rust, Go).' },
      { domain: 'Big data', example: 'External merge sort cho dữ liệu lớn hơn RAM; shuffle trong Hadoop/Spark.' },
      { domain: 'Thống kê / xếp hạng', example: 'Kendall tau từ số nghịch thế; median với quickselect.' },
      { domain: 'Song song', example: 'Merge sort đa luồng / GPU vì hai nửa độc lập.' },
    ],
    algorithms: ['merge-sort', 'quick-sort', 'counting-sort', 'insertion-sort', 'bubble-sort', 'selection-sort'],
    leetcode: [
      { id: 912, title: 'Sort an Array', slug: 'sort-an-array' },
      { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self' },
      { id: 148, title: 'Sort List', slug: 'sort-list' },
      { id: 215, title: 'Kth Largest Element', slug: 'kth-largest-element-in-an-array' },
      { id: 75, title: 'Sort Colors', slug: 'sort-colors' },
    ],
  },
  {
    id: 'range-query',
    title: 'Range Query động',
    tagline: 'Truy vấn đoạn xen kẽ cập nhật ⇒ Segment Tree / Fenwick thay cho prefix sum',
    group: 'Cấu trúc dữ liệu',
    signals: [
      '"Nhiều truy vấn đoạn" XEN KẼ "cập nhật phần tử / đoạn"',
      '"Đếm phần tử nhỏ hơn bên phải", "số cặp đảo" ⇒ BIT trên giá trị nén',
      '"Cộng lên đoạn nhiều lần rồi hỏi đoạn" ⇒ lazy segment tree',
      'Skyline, falling squares, calendar booking III',
    ],
    avoid: [
      'Không có cập nhật ⇒ prefix sum (tổng) hoặc sparse table (min/max) đơn giản hơn',
      'Chỉ cập nhật rồi hỏi một lần cuối ⇒ difference array',
      'Giá trị 10⁹ ⇒ nén toạ độ hoặc segment tree động',
    ],
    steps: [
      'Chọn phép kết hợp (sum/min/max/gcd) và phần tử trung hoà.',
      'Tổng/đếm với update điểm ⇒ Fenwick (ngắn); min/max hoặc lazy ⇒ Segment Tree.',
      'Query: node nằm trọn lấy ngay, không giao bỏ, giao một phần hỏi hai con.',
    ],
    template: `// Fenwick: add(i, delta) và prefix(i), i & -i để nhảy
add(i, d) { for (i++; i <= n; i += i & -i) t[i] += d; }
prefix(i) { let s = 0; for (i++; i > 0; i -= i & -i) s += t[i]; return s; }`,
    complexity: 'O(log n) query/update, O(n) build',
    realWorld: [
      { domain: 'Analytics thời gian thực', example: 'Tổng/max theo khoảng thời gian với cập nhật liên tục (metrics, doanh thu theo giờ).' },
      { domain: 'Tài chính', example: 'Order book: tổng khối lượng trong khoảng giá khi lệnh thay đổi liên tục.' },
      { domain: 'Editor', example: 'Rope / piece table đếm ký tự và dòng trong khoảng với chèn xoá.' },
      { domain: 'Đồ hoạ', example: 'Sweep line + segment tree cho union area, skyline, va chạm theo trục.' },
    ],
    algorithms: ['segment-tree', 'prefix-sum'],
    leetcode: [
      { id: 307, title: 'Range Sum Query - Mutable', slug: 'range-sum-query-mutable' },
      { id: 315, title: 'Count of Smaller Numbers After Self', slug: 'count-of-smaller-numbers-after-self' },
      { id: 218, title: 'The Skyline Problem', slug: 'the-skyline-problem' },
      { id: 732, title: 'My Calendar III', slug: 'my-calendar-iii' },
    ],
  },
  {
    id: 'design',
    title: 'Design: ghép cấu trúc dữ liệu',
    tagline: 'Mỗi cấu trúc giỏi một việc; bài "design O(1)" = ghép hai cấu trúc bù khuyết nhau',
    group: 'Thiết kế',
    signals: [
      '"Thiết kế … với get/put/delete O(1)"',
      '"LRU / LFU", "insert delete getRandom O(1)", "min stack", "queue bằng stack"',
      '"Giữ thứ tự chèn + tra cứu nhanh" (ordered map)',
      '"Lấy ngẫu nhiên đều" ⇒ cần mảng; "xoá bất kỳ O(1)" ⇒ cần map tới vị trí',
    ],
    avoid: [
      'Một cấu trúc có sẵn đã đủ (TreeMap, Map giữ thứ tự chèn trong JS) – nêu ra nhưng vẫn hiểu cơ chế',
      'Yêu cầu worst-case O(1) thật sự ⇒ amortized không đủ (hiếm)',
    ],
    steps: [
      'Liệt kê từng thao tác và độ phức tạp yêu cầu.',
      'Với mỗi thao tác, cấu trúc nào làm được O(1)? Map (tra), doubly linked list (tháo/gắn), mảng (ngẫu nhiên, swap-remove), stack phụ (min).',
      'Ghép lại, duy trì bất biến "hai cấu trúc chứa cùng tập phần tử"; dùng sentinel để bỏ case biên.',
    ],
    template: `// LRU: Map<key, Node> + doubly linked list với sentinel head/tail
get(k) { const n = map.get(k); if (!n) return -1; unlink(n); pushFront(n); return n.value; }
put(k, v) { if (map.has(k)) { update, unlink, pushFront; return; }
  if (map.size === cap) { const lru = tail.prev!; unlink(lru); map.delete(lru.key); }
  const n = node(k, v); pushFront(n); map.set(k, n); }`,
    complexity: 'O(1) mỗi thao tác (có thể amortized)',
    realWorld: [
      { domain: 'Cache', example: 'Redis allkeys-lru, page cache của OS, buffer pool database, `functools.lru_cache`.' },
      { domain: 'Ordered map', example: 'Python dict, Java LinkedHashMap, JS Map – giữ thứ tự chèn với tra cứu O(1).' },
      { domain: 'Lập trình hàm', example: 'Banker\'s queue (hai list bất biến) trong Clojure/Scala.' },
      { domain: 'Game / lấy mẫu', example: 'Chọn ngẫu nhiên phần tử với thêm/xoá O(1) (loot table, matchmaking pool).' },
    ],
    algorithms: ['lru-cache', 'queue-two-stacks', 'kth-largest-heap', 'trie'],
    leetcode: [
      { id: 146, title: 'LRU Cache', slug: 'lru-cache' },
      { id: 380, title: 'Insert Delete GetRandom O(1)', slug: 'insert-delete-getrandom-o1' },
      { id: 155, title: 'Min Stack', slug: 'min-stack' },
      { id: 232, title: 'Implement Queue using Stacks', slug: 'implement-queue-using-stacks' },
      { id: 460, title: 'LFU Cache', slug: 'lfu-cache' },
    ],
  },
];

export const PATTERN_GROUPS = [...new Set(PATTERNS.map((p) => p.group))];
export const patternById = new Map(PATTERNS.map((p) => [p.id, p]));
/** Các pattern có liên kết tới thuật toán id */
export const patternsForAlgorithm = (algoId: string) => PATTERNS.filter((p) => p.algorithms.includes(algoId));

/** Cây quyết định nhanh: đọc đề → gợi ý pattern */
export const DECISION_TREE: { question: string; options: { label: string; patterns: string[] }[] }[] = [
  {
    question: 'Input chính là gì?',
    options: [
      { label: 'Mảng / chuỗi', patterns: ['two-pointers', 'sliding-window', 'prefix-sum', 'hashmap', 'monotonic-stack', 'binary-search', 'intervals', 'divide-conquer-sort'] },
      { label: 'Linked list', patterns: ['fast-slow', 'two-pointers', 'design'] },
      { label: 'Cây', patterns: ['dfs-backtracking', 'bfs', 'trie-string', 'range-query'] },
      { label: 'Đồ thị / lưới', patterns: ['bfs', 'dfs-backtracking', 'topological-sort', 'union-find', 'shortest-path'] },
      { label: 'Thiết kế cấu trúc', patterns: ['design', 'heap-topk', 'trie-string'] },
    ],
  },
  {
    question: 'Đề hỏi gì?',
    options: [
      { label: 'Ngắn nhất / ít bước nhất', patterns: ['bfs', 'shortest-path'] },
      { label: 'Tối ưu (max/min) một giá trị', patterns: ['dp', 'greedy', 'sliding-window', 'binary-search', 'monotonic-stack'] },
      { label: 'Đếm số cách / số subarray', patterns: ['dp', 'prefix-sum', 'hashmap'] },
      { label: 'Liệt kê tất cả nghiệm', patterns: ['dfs-backtracking'] },
      { label: 'Có tồn tại / có hợp lệ không', patterns: ['dfs-backtracking', 'union-find', 'topological-sort', 'bit'] },
      { label: 'Top-k / thứ k / median', patterns: ['heap-topk', 'divide-conquer-sort'] },
      { label: 'Nhiều truy vấn đoạn', patterns: ['prefix-sum', 'range-query'] },
      { label: 'Thứ tự hợp lệ / phụ thuộc', patterns: ['topological-sort'] },
    ],
  },
  {
    question: 'Ràng buộc gợi ý gì?',
    options: [
      { label: 'n ≤ 20', patterns: ['dfs-backtracking', 'bit'] },
      { label: 'n ≤ 10³', patterns: ['dp'] },
      { label: 'n ≤ 10⁵, cần O(n log n)', patterns: ['binary-search', 'divide-conquer-sort', 'heap-topk', 'intervals', 'range-query'] },
      { label: 'n ≤ 10⁶, cần O(n)', patterns: ['two-pointers', 'sliding-window', 'prefix-sum', 'hashmap', 'monotonic-stack', 'monotonic-deque'] },
      { label: 'O(1) bộ nhớ', patterns: ['two-pointers', 'fast-slow', 'bit'] },
      { label: 'Dữ liệu đã sắp xếp', patterns: ['binary-search', 'two-pointers'] },
      { label: 'Dữ liệu đến dần (online / stream)', patterns: ['heap-topk', 'union-find', 'design', 'monotonic-deque'] },
    ],
  },
];
