/** Sắp xếp (giữ chỉ số gốc) rồi hai con trỏ hai đầu. O(n log n) thời gian, O(n) bộ nhớ cho mảng chỉ số. */
export function twoSum(nums: number[], target: number): [number, number] | null {
  const idx = nums.map((_, i) => i).sort((a, b) => nums[a] - nums[b]); // chỉ số theo giá trị tăng dần
  let l = 0;
  let r = idx.length - 1;
  while (l < r) {
    const sum = nums[idx[l]] + nums[idx[r]];
    if (sum === target) return [Math.min(idx[l], idx[r]), Math.max(idx[l], idx[r])];
    if (sum < target) l++; // tổng nhỏ ⇒ cần số lớn hơn ⇒ tiến l
    else r--; // tổng lớn ⇒ lùi r
  }
  return null;
}
