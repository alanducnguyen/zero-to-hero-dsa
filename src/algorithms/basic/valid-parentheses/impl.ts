/**
 * Valid Parentheses – kiểm tra chuỗi ngoặc hợp lệ bằng stack.
 * Mỗi ngoặc mở được push; gặp ngoặc đóng phải khớp với đỉnh stack.
 * @param s chuỗi chỉ gồm ()[]{}
 * @returns true nếu mọi ngoặc đóng đúng thứ tự
 */
export function isValidParentheses(s: string): boolean {
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0) return false; // đóng mà chưa có mở
      const top = stack.pop();
      if (top !== pair[ch]) return false; // sai loại ngoặc
    }
  }
  return stack.length === 0; // còn ngoặc mở chưa đóng ⇒ sai
}
