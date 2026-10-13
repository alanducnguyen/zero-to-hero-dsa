/**
 * Majority Element – phần tử xuất hiện > n/2 lần (Boyer-Moore Voting).
 * Giữ một ứng viên và bộ đếm: gặp giống thì +1, khác thì -1, đếm về 0 thì đổi ứng viên.
 * O(n) thời gian, O(1) bộ nhớ. Giả định đề bài: phần tử đa số luôn tồn tại.
 */
export function majorityElement(nums: number[]): number {
  let candidate = nums[0];
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x; // ứng viên cũ đã bị "triệt tiêu" hết
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
