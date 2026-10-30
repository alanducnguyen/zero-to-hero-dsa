/** Top-down + memo: go(i) chỉ phụ thuộc i ⇒ lưu kết quả, mỗi ô tính một lần. O(n²) thời gian, O(n) bộ nhớ + stack. */
export function canJump(nums: number[]): boolean {
  const last = nums.length - 1;
  const memo = new Map<number, boolean>(); // ô → có tới được cuối không
  const go = (i: number): boolean => {
    if (i >= last) return true;
    if (memo.has(i)) return memo.get(i)!; // đã biết ⇒ cắt cả cây con
    let ok = false;
    for (let s = nums[i]; s >= 1 && !ok; s--) ok = go(i + s);
    memo.set(i, ok);
    return ok;
  };
  return go(0);
}
