/** Chia để trị: trộn cặp đôi, log k tầng, mỗi tầng O(N). O(N log k), không cần heap. */
export function mergeK(lists: number[][]): number[] {
  if (lists.length === 0) return [];
  let cur = lists;
  while (cur.length > 1) {
    const next: number[][] = [];
    for (let i = 0; i < cur.length; i += 2) next.push(i + 1 < cur.length ? mergeTwo(cur[i], cur[i + 1]) : cur[i]);
    cur = next; // số list giảm một nửa mỗi tầng
  }
  return cur[0];
}
function mergeTwo(a: number[], b: number[]): number[] {
  const out: number[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
