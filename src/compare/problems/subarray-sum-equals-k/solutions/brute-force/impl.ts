/** Brute force: thử mọi mảng con [i..j] và cộng lại từ đầu. O(n³) thời gian, O(1) bộ nhớ. */
export function subarraySum(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      let sum = 0;
      for (let t = i; t <= j; t++) sum += nums[t]; // tính lại tổng từ đầu mỗi lần
      if (sum === k) count++;
    }
  }
  return count;
}
