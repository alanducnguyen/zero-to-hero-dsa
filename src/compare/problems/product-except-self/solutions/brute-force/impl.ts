/** Brute force: với mỗi i, nhân mọi nums[j] với j ≠ i. O(n²) thời gian, O(1) bộ nhớ phụ. */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    let p = 1;
    for (let j = 0; j < n; j++) {
      if (j !== i) p *= nums[j];
    }
    answer[i] = p;
  }
  return answer;
}
