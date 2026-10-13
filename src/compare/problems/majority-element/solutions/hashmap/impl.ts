/** HashMap đếm tần suất, trả về giá trị có count > n/2. O(n) thời gian, O(n) bộ nhớ. */
export function majorityElement(nums: number[]): number {
  const count = new Map<number, number>();
  for (const x of nums) {
    const c = (count.get(x) ?? 0) + 1;
    if (c > nums.length / 2) return x; // vượt nửa ⇒ chắc chắn là đa số, dừng sớm
    count.set(x, c);
  }
  return nums[0];
}
