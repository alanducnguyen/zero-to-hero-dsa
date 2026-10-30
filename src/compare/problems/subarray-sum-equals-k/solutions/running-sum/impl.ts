/** Cố định i, kéo dài j và cộng dồn: tổng [i..j] = tổng [i..j-1] + nums[j]. O(n²) thời gian, O(1) bộ nhớ. */
export function subarraySum(nums: number[], k: number): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]; // tái dùng tổng của nums[i..j-1]
      if (sum === k) count++; // không break: số âm phía sau có thể đưa tổng về k lần nữa
    }
  }
  return count;
}
