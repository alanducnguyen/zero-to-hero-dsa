/**
 * Sliding Window Maximum – max của mọi cửa sổ độ dài k, O(n) bằng deque đơn điệu giảm.
 * Deque chứa CHỈ SỐ; giá trị tương ứng giảm dần từ đầu tới cuối; đầu deque là max cửa sổ.
 */
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const out: number[] = [];
  const dq: number[] = []; // chỉ số, nums[dq[0]] > nums[dq[1]] > ...
  let head = 0; // con trỏ đầu deque (tránh shift O(n))
  for (let i = 0; i < nums.length; i++) {
    while (dq.length > head && nums[dq[dq.length - 1]] <= nums[i]) {
      dq.pop(); // phần tử nhỏ hơn ở cuối không bao giờ là max nữa ⇒ loại
    }
    dq.push(i);
    if (dq[head] <= i - k) head++; // đầu deque đã rời khỏi cửa sổ
    if (i >= k - 1) out.push(nums[dq[head]]); // cửa sổ đủ k ⇒ ghi max
  }
  return out;
}
