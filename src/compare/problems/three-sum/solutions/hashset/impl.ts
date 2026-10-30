/** Cố định nums[i], giải Two Sum (tổng = −nums[i]) bằng HashSet trên phần sau i. O(n²) thời gian, O(n) bộ nhớ. */
export function threeSum(nums: number[]): number[][] {
  const found = new Map<string, number[]>(); // khoá đã sắp xếp → bộ ba, để khử trùng
  for (let i = 0; i < nums.length; i++) {
    const seen = new Set<number>(); // các giá trị nums[i+1..j-1]
    for (let j = i + 1; j < nums.length; j++) {
      const need = 0 - nums[i] - nums[j]; // viết 0 − … để tránh −0 khi nums[i] = 0
      if (seen.has(need)) {
        const t = [nums[i], nums[j], need].sort((a, b) => a - b);
        found.set(t.join(','), t);
      }
      seen.add(nums[j]);
    }
  }
  return [...found.values()];
}
