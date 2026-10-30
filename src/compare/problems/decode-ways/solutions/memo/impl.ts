/** Đệ quy + memo (top-down DP): mỗi hậu tố s[i..] chỉ đếm một lần. O(n) thời gian, O(n) bộ nhớ + stack. */
export function numDecodings(s: string, i = 0, memo = new Map<number, number>()): number {
  if (i === s.length) return 1;
  if (s[i] === '0') return 0; // '0' đứng đầu hậu tố ⇒ hậu tố này vô nghiệm
  if (memo.has(i)) return memo.get(i)!; // hậu tố đã đếm ⇒ trả ngay
  let ways = numDecodings(s, i + 1, memo);
  if (i + 1 < s.length && Number(s.slice(i, i + 2)) <= 26) ways += numDecodings(s, i + 2, memo);
  memo.set(i, ways);
  return ways;
}
