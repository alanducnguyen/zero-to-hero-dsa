/**
 * House Robber II – các nhà xếp thành vòng tròn.
 * Nhà 0 và nhà n−1 kề nhau ⇒ không thể lấy cả hai.
 * Đáp án = max(robLine(0..n−2), robLine(1..n−1)).
 * @param nums tiền ở mỗi nhà
 * @returns tổng lớn nhất
 */
export function robCircular(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0]; // 1 nhà: không có cặp kề nào
  /** House Robber tuyến tính trên đoạn [lo, hi], O(1) bộ nhớ. */
  const robLine = (lo: number, hi: number): number => {
    let prev2 = 0; // tốt nhất tới nhà i−2
    let prev1 = 0; // tốt nhất tới nhà i−1
    for (let i = lo; i <= hi; i++) {
      const cur = Math.max(prev1, prev2 + nums[i]); // bỏ i hoặc lấy i
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };
  const skipLast = robLine(0, n - 2); // pha 1: loại nhà cuối
  const skipFirst = robLine(1, n - 1); // pha 2: loại nhà đầu
  return Math.max(skipLast, skipFirst);
}
