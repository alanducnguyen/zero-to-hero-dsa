/** Monotonic deque: giữ chỉ số có giá trị giảm dần; đầu deque luôn là max cửa sổ. O(n) thời gian, O(k) bộ nhớ. */
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const dq: number[] = []; // chỉ số; nums[dq[head..]] giảm dần
  let head = 0; // dq[head] là đầu deque (tránh shift() tốn O(k))
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (head < dq.length && dq[head] <= i - k) head++; // đầu đã trượt khỏi cửa sổ
    while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) dq.pop(); // bị nums[i] "đè" vĩnh viễn
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[head]]);
  }
  return res;
}
