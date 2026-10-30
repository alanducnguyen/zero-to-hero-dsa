/** Hai mảng phụ: prefix[i] = tích bên trái i, suffix[i] = tích bên phải i. O(n) thời gian, O(n) bộ nhớ phụ. */
export function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const prefix = new Array<number>(n).fill(1); // prefix[i] = nums[0]·…·nums[i−1]
  const suffix = new Array<number>(n).fill(1); // suffix[i] = nums[i+1]·…·nums[n−1]
  for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] * nums[i - 1];
  for (let i = n - 2; i >= 0; i--) suffix[i] = suffix[i + 1] * nums[i + 1];
  const answer = new Array<number>(n);
  for (let i = 0; i < n; i++) answer[i] = prefix[i] * suffix[i]; // trái × phải = mọi phần tử trừ i
  return answer;
}
