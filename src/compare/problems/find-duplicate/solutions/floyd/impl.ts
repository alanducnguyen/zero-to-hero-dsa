/** Floyd (tortoise & hare): xem i → nums[i] là linked list; số trùng = điểm vào chu trình. O(n), O(1), không sửa mảng. */
export function findDuplicate(nums: number[]): number {
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast); // gặp nhau trong chu trình
  slow = nums[0]; // đưa một con trỏ về đầu, cả hai đi cùng tốc độ
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow; // điểm vào chu trình = giá trị có 2 "mũi tên" trỏ tới
}
