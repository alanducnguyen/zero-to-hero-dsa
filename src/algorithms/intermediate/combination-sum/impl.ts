/**
 * Combination Sum – backtracking với chỉ số start (được dùng lại phần tử).
 * Sort candidates để cắt tỉa: gặp số > remain thì mọi số sau cũng lớn hơn ⇒ dừng vòng lặp.
 */
export function combinationSum(candidates: number[], target: number): number[][] {
  const nums = [...candidates].sort((a, b) => a - b);
  const result: number[][] = [];
  const path: number[] = [];
  function backtrack(start: number, remain: number): void {
    if (remain === 0) {
      result.push([...path]); // tổng đúng bằng target ⇒ ghi nhận bản sao
      return;
    }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remain) break; // đã sort ⇒ các số sau còn lớn hơn, cắt tỉa
      path.push(nums[i]);
      backtrack(i, remain - nums[i]); // truyền i (không phải i + 1) vì được dùng lại
      path.pop(); // quay lui
    }
  }
  backtrack(0, target);
  return result;
}
