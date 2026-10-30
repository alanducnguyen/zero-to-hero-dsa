/**
 * Valid Palindrome (LC 125) – hai con trỏ ngược chiều, bỏ qua ký tự không phải chữ/số.
 * So sánh không phân biệt hoa thường, không tạo chuỗi phụ ⇒ O(1) bộ nhớ.
 * @param s chuỗi đầu vào
 * @returns true nếu s là palindrome sau khi chỉ giữ chữ/số và bỏ qua hoa thường
 */
export function isPalindrome(s: string): boolean {
  const isAlnum = (c: string) => /[a-z0-9]/i.test(c);
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (!isAlnum(s[l])) {
      l++; // ký tự "rác" bên trái ⇒ bỏ qua
    } else if (!isAlnum(s[r])) {
      r--; // ký tự "rác" bên phải ⇒ bỏ qua
    } else if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false; // một cặp đối xứng lệch ⇒ chắc chắn không phải palindrome
    } else {
      l++;
      r--;
    }
  }
  return true;
}
