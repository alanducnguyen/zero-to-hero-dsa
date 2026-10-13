/** Brute force: xét mọi đoạn [i, j], kiểm tra palindrome O(n). O(n³), O(1). */
export function longestPalindrome(s: string): string {
  let best = '';
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      if (j - i + 1 > best.length && isPalindrome(s, i, j)) best = s.slice(i, j + 1);
    }
  }
  return best;
}
function isPalindrome(s: string, i: number, j: number): boolean {
  while (i < j) if (s[i++] !== s[j--]) return false;
  return true;
}
