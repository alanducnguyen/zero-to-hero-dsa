/**
 * Permutations – sinh mọi hoán vị bằng backtracking.
 * path giữ hoán vị đang xây; used[i] đánh dấu nums[i] đã nằm trong path.
 * Khi path đủ n phần tử ⇒ ghi nhận một hoán vị hoàn chỉnh.
 */
export function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used: boolean[] = new Array<boolean>(nums.length).fill(false);
  function backtrack(): void {
    if (path.length === nums.length) {
      result.push([...path]); // đủ n phần tử ⇒ một hoán vị hoàn chỉnh
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // nums[i] đã có trong path, không dùng lại
      used[i] = true;
      path.push(nums[i]); // chọn nums[i] cho vị trí path.length
      backtrack();
      path.pop(); // quay lui: trả nums[i] lại cho các nhánh khác
      used[i] = false;
    }
  }
  backtrack();
  return result;
}
