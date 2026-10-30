/** Max-heap chứa [giá trị, chỉ số]; phần tử cũ chỉ bị bỏ khi nổi lên đỉnh (lazy removal). O(n log n) thời gian, O(n) bộ nhớ. */
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const h: [number, number][] = []; // max-heap theo giá trị, hoà thì chỉ số lớn hơn lên trên
  const above = (a: [number, number], b: [number, number]) => a[0] > b[0] || (a[0] === b[0] && a[1] > b[1]);
  const swap = (i: number, j: number) => ([h[i], h[j]] = [h[j], h[i]]);
  const push = (x: [number, number]) => {
    h.push(x);
    for (let i = h.length - 1; i > 0 && above(h[i], h[(i - 1) >> 1]); i = (i - 1) >> 1) swap(i, (i - 1) >> 1);
  };
  const pop = () => {
    swap(0, h.length - 1);
    h.pop();
    for (let i = 0, c = 1; c < h.length; i = c, c = 2 * i + 1) {
      if (c + 1 < h.length && above(h[c + 1], h[c])) c++;
      if (!above(h[c], h[i])) break;
      swap(i, c);
    }
  };
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    push([nums[i], i]);
    if (i < k - 1) continue; // chưa đủ một cửa sổ
    while (h[0][1] <= i - k) pop(); // đỉnh đã trượt khỏi cửa sổ ⇒ giờ mới xoá
    res.push(h[0][0]);
  }
  return res;
}
