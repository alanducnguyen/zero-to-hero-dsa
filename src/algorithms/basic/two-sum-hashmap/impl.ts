/**
 * Two Sum – mảng KHÔNG sắp xếp, tìm hai chỉ số có tổng bằng target.
 * Một lượt duyệt với HashMap: giá trị → chỉ số.
 * @returns [i, j] với i < j, hoặc null nếu không có
 */
export function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // giá trị đã gặp → chỉ số
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]; // phần bù cần tìm
    const j = seen.get(need);
    if (j !== undefined) {
      return [j, i]; // phần bù đã xuất hiện trước đó
    }
    seen.set(nums[i], i); // ghi nhớ sau khi kiểm tra ⇒ không tự ghép với chính mình
  }
  return null;
}
