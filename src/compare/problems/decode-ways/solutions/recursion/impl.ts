/** Đệ quy thuần trên hậu tố s[i..]: lấy 1 chữ số hoặc 2 chữ số (10..26). O(2ⁿ) vì hậu tố bị đếm lại. */
export function numDecodings(s: string, i = 0): number {
  if (i === s.length) return 1; // đã giải mã trọn chuỗi: 1 cách
  if (s[i] === '0') return 0; // không chữ cái nào bắt đầu bằng '0'
  let ways = numDecodings(s, i + 1); // s[i] đứng một mình (1..9)
  if (i + 1 < s.length && Number(s.slice(i, i + 2)) <= 26) ways += numDecodings(s, i + 2); // cặp 10..26
  return ways;
}
