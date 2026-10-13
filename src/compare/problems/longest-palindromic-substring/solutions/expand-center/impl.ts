/** Mở rộng từ tâm: 2n−1 tâm (ký tự và khe giữa hai ký tự), mở rộng khi hai bên bằng nhau. O(n²), O(1). */
export function longestPalindrome(s: string): string {
  let start = 0, maxLen = 0;
  for (let c = 0; c < s.length; c++) {
    for (const [l0, r0] of [[c, c], [c, c + 1]]) { // tâm lẻ và tâm chẵn
      let l = l0, r = r0;
      while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
      const len = r - l - 1; // đoạn palindrome là (l, r)
      if (len > maxLen) { start = l + 1; maxLen = len; }
    }
  }
  return s.slice(start, start + maxLen);
}
