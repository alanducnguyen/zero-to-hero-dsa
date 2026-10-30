/**
 * Longest Palindromic Substring (LeetCode 5) – mở rộng từ tâm.
 * Mỗi palindrome đối xứng quanh một tâm: một ký tự (độ dài lẻ) hoặc khe giữa
 * hai ký tự (độ dài chẵn) ⇒ có 2n − 1 tâm. Từ mỗi tâm, mở rộng l sang trái,
 * r sang phải chừng nào s[l] === s[r].
 * O(n²) thời gian, O(1) bộ nhớ.
 * @param s chuỗi đầu vào
 * @returns palindrome dài nhất (cái đầu tiên tìm được nếu có nhiều cái cùng độ dài)
 */
export function longestPalindrome(s: string): string {
  const n = s.length;
  let start = 0;
  let maxLen = n > 0 ? 1 : 0;
  for (let c = 0; c < 2 * n - 1; c++) {
    // c chẵn → tâm là ký tự c/2; c lẻ → tâm là khe giữa (c−1)/2 và (c+1)/2
    let l = Math.floor(c / 2);
    let r = l + (c % 2);
    while (l >= 0 && r < n && s[l] === s[r]) {
      l--;
      r++;
    }
    const len = r - l - 1; // palindrome là s[l+1 .. r-1]
    if (len > maxLen) {
      start = l + 1;
      maxLen = len;
    }
  }
  return s.slice(start, start + maxLen);
}
