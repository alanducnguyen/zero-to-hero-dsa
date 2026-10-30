/** Stack ngoặc mở + map đóng → mở: ngoặc đóng phải khớp ngoặc mở gần nhất (LIFO). O(n) thời gian, O(n) bộ nhớ. */
export function isValid(s: string): boolean {
  const pair: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.length === 0) return false; // đóng mà chưa có mở
      if (stack.pop() !== pair[ch]) return false; // sai loại ngoặc
    }
  }
  return stack.length === 0; // còn ngoặc mở chưa đóng ⇒ sai
}
