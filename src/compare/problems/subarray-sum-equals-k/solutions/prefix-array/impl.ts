/** Mảng prefix: tổng nums[i..j-1] = prefix[j] − prefix[i], rồi thử mọi cặp (i, j). O(n²) thời gian, O(n) bộ nhớ. */
export function subarraySum(nums: number[], k: number): number {
  const prefix = [0];
  for (const x of nums) prefix.push(prefix[prefix.length - 1] + x); // prefix[i] = tổng i phần tử đầu
  let count = 0;
  for (let j = 1; j < prefix.length; j++) {
    for (let i = 0; i < j; i++) {
      if (prefix[j] - prefix[i] === k) count++; // mảng con nums[i..j-1]
    }
  }
  return count;
}
