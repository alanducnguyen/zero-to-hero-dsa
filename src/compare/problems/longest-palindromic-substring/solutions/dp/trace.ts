import { arr, composite, frame, matrix } from '@/engine/helpers';
import type { Frame, Highlight } from '@/engine/types';

export function* trace(input: { s: string }): Generator<Frame, string> {
  const s = input.s;
  const n = s.length;
  if (n === 0) { yield frame(4, {}, arr(['∅']), 'Chuỗi rỗng.'); return ''; }
  const dp: (string | null)[][] = Array.from({ length: n }, () => new Array<string | null>(n).fill(null));
  const labels = [...s];
  let start = 0, maxLen = 1;
  const viz = (hl: Record<string, Highlight> = {}) => composite([arr(labels, { ranges: [{ from: start, to: start + maxLen - 1, label: `best = "${s.slice(start, start + maxLen)}"`, color: 'done' }] }), matrix(dp, { title: 'dp[i][j] (T = palindrome); chỉ dùng nửa trên', rowLabels: labels, colLabels: labels, highlights: hl })]);
  for (let len = 1; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] !== s[j]) {
        dp[i][j] = 'F';
        yield frame(9, { len, i, j, 's[i]': s[i], 's[j]': s[j] }, viz({ [`${i},${j}`]: 'swap' }), `len = ${len}: s[${i}] = '${s[i]}' ≠ s[${j}] = '${s[j]}' ⇒ dp[${i}][${j}] = F ngay, không cần nhìn bên trong.`);
        continue;
      }
      const inner = len <= 2 || dp[i + 1][j - 1] === 'T';
      dp[i][j] = inner ? 'T' : 'F';
      const improved = inner && len > maxLen;
      if (improved) { start = i; maxLen = len; }
      yield frame(10, { len, i, j, 's[i]=s[j]': s[i], 'dp[i+1][j-1]': len <= 2 ? '(≤2 ⇒ T)' : dp[i + 1][j - 1], 'dp[i][j]': dp[i][j] }, viz({ [`${i},${j}`]: inner ? 'done' : 'swap', ...(len > 2 ? { [`${i + 1},${j - 1}`]: 'compare' } : {}) }), `Hai đầu bằng '${s[i]}'. ${len <= 2 ? 'Độ dài ≤ 2 ⇒ palindrome.' : `Nhìn ô bên trong dp[${i + 1}][${j - 1}] = ${dp[i + 1][j - 1]} (đã tính vì ngắn hơn 2).`}${improved ? ` Palindrome dài ${len} ⇒ best mới.` : ''}`);
    }
  }
  const best = s.slice(start, start + maxLen);
  yield frame(14, { best, maxLen }, viz(), `Kết quả "${best}". n² ô, mỗi ô O(1) ⇒ O(n²), nhưng tốn O(n²) bộ nhớ cho bảng.`);
  return best;
}
