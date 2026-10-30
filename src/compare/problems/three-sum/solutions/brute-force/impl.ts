/** Brute force: thử mọi bộ ba (i, j, k), khử trùng bằng Set khoá "a,b,c" đã sắp xếp. O(n³) thời gian, O(số đáp án) bộ nhớ. */
export function threeSum(nums: number[]): number[][] {
  const seen = new Set<string>();
  const res: number[][] = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (nums[i] + nums[j] + nums[k] !== 0) continue;
        const t = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
        const key = t.join(','); // cùng giá trị ⇒ cùng khoá dù khác chỉ số
        if (!seen.has(key)) { seen.add(key); res.push(t); }
      }
    }
  }
  return res;
}
