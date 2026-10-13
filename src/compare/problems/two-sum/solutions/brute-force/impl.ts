/** Brute force: thử mọi cặp (i, j), i < j. O(n²) thời gian, O(1) bộ nhớ. */
export function twoSum(nums: number[], target: number): [number, number] | null {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return null;
}
