/**
 * KMP – tìm pattern trong text O(n + m) nhờ bảng LPS (longest proper prefix = suffix).
 * Khi lệch, không lùi text; nhảy pattern về lps[j-1].
 */
export function buildLPS(pattern: string): number[] {
  const lps = new Array<number>(pattern.length).fill(0);
  let len = 0; // độ dài prefix=suffix hiện tại
  for (let i = 1; i < pattern.length; i++) {
    while (len > 0 && pattern[i] !== pattern[len]) {
      len = lps[len - 1]; // lùi về prefix ngắn hơn cũng là suffix
    }
    if (pattern[i] === pattern[len]) len++;
    lps[i] = len;
  }
  return lps;
}

/** Trả về mọi vị trí bắt đầu của pattern trong text. */
export function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];
  const lps = buildLPS(pattern);
  const found: number[] = [];
  let j = 0; // số ký tự pattern đã khớp
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = lps[j - 1]; // lệch: dùng LPS để không lùi i
    }
    if (text[i] === pattern[j]) j++;
    if (j === pattern.length) {
      found.push(i - j + 1); // khớp toàn bộ
      j = lps[j - 1]; // tiếp tục tìm khớp chồng lấn
    }
  }
  return found;
}
