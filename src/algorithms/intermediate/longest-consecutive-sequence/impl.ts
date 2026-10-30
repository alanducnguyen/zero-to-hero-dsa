/**
 * Longest Consecutive Sequence (LeetCode 128) – độ dài dãy số nguyên liên tiếp dài nhất.
 * HashSet + chỉ bắt đầu đếm từ x khi x − 1 KHÔNG có trong set (x là "đầu dãy").
 * Mỗi giá trị bị bước qua tối đa 2 lần (vòng for + vòng while của đúng một đầu dãy) ⇒ O(n).
 * @param nums mảng số nguyên chưa sắp xếp (có thể trùng, có thể âm)
 * @returns độ dài dãy liên tiếp dài nhất
 */
export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums); // loại trùng + tra cứu O(1)
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue; // x nằm giữa một dãy ⇒ không phải đầu dãy
    let len = 1;
    while (set.has(x + len)) len++; // kéo dài x, x+1, x+2, ...
    best = Math.max(best, len);
  }
  return best;
}
