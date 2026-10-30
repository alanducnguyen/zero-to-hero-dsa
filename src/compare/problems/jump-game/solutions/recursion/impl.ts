/** Backtracking: từ ô i thử mọi bước 1..nums[i] (dài trước). O(2ⁿ) worst case vì cùng một ô bị thử lại nhiều lần. */
export function canJump(nums: number[]): boolean {
  const last = nums.length - 1;
  const go = (i: number): boolean => {
    if (i >= last) return true; // đã tới (hoặc vượt) ô cuối
    for (let s = nums[i]; s >= 1; s--) {
      if (go(i + s)) return true; // một nhánh thành công là đủ
    }
    return false; // mọi bước từ i đều dẫn tới ngõ cụt
  };
  return go(0);
}
