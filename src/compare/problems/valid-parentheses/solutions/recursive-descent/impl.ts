const CLOSE: Record<string, string> = { '(': ')', '[': ']', '{': '}' };

/** Recursive descent theo văn phạm S → (mở S đóng)*: mỗi lời gọi đọc một dãy nhóm cân bằng. O(n) thời gian, O(n) call stack. */
export function isValid(s: string): boolean {
  let i = 0;
  const parseSeq = (): boolean => {
    while (i < s.length && '([{'.includes(s[i])) {
      const want = CLOSE[s[i]];
      i++; // ăn ngoặc mở
      if (!parseSeq()) return false; // phần bên trong phải cân bằng
      if (s[i] !== want) return false; // phải đóng đúng loại
      i++;
    }
    return true; // gặp ngoặc đóng hoặc hết chuỗi ⇒ trả quyền cho tầng gọi
  };
  return parseSeq() && i === s.length;
}
