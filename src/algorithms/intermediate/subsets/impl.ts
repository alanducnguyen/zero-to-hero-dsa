/**
 * Subsets – liệt kê mọi tập con (power set) bằng backtracking.
 * Tại mỗi vị trí start, lần lượt "chọn" nums[i] (i ≥ start) rồi đệ quy, sau đó "bỏ chọn" (quay lui).
 * Mỗi lần vào hàm, path hiện tại là một tập con hợp lệ ⇒ ghi nhận ngay.
 */
export function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  function backtrack(start: number): void {
    result.push([...path]); // mọi path trên đường đi đều là một tập con
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); // chọn nums[i]
      backtrack(i + 1); // chỉ xét các phần tử sau i ⇒ không sinh trùng lặp
      path.pop(); // bỏ chọn, thử phần tử kế tiếp
    }
  }
  backtrack(0);
  return result;
}
