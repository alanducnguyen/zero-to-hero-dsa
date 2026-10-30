/**
 * Find the Duplicate Number (LeetCode 287) – Floyd cycle detection.
 * Xem mỗi chỉ số i là một node có cạnh i → nums[i]. Vì n+1 chỉ số trỏ vào
 * n giá trị trong [1, n], đồ thị đi từ node 0 chắc chắn rơi vào chu trình,
 * và điểm vào chu trình chính là số bị trùng.
 * O(n) thời gian, O(1) bộ nhớ, không sửa mảng.
 * @param nums mảng n+1 số nguyên, mỗi số trong [1, n], có đúng một số lặp
 * @returns số bị lặp
 */
export function findDuplicate(nums: number[]): number {
  // Giai đoạn 1: rùa đi 1 bước, thỏ đi 2 bước cho tới khi gặp nhau trong chu trình
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Giai đoạn 2: đưa một con trỏ về đầu, cả hai cùng đi 1 bước → gặp tại điểm vào chu trình
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
