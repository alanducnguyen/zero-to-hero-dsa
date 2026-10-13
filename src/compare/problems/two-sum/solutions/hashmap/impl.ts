/** HashMap một lượt: với mỗi x, hỏi "target − x đã xuất hiện chưa?". O(n) thời gian, O(n) bộ nhớ. */
export function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // giá trị → chỉ số
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i]; // phần bù đã gặp ở phía trước
    seen.set(nums[i], i);
  }
  return null;
}
