/**
 * Online Stock Span – span hôm nay = số ngày liên tiếp (tính cả hôm nay, đi lùi)
 * có giá ≤ giá hôm nay. Giá đến từng ngày một (online).
 * Monotonic stack GIẢM NGHIÊM NGẶT lưu cặp [giá, span]: khi gặp giá ≥ đỉnh, pop và
 * "nuốt" span của đỉnh – vì mọi ngày đỉnh đã gộp cũng ≤ giá hôm nay.
 * Mỗi ngày push/pop tối đa 1 lần ⇒ O(1) amortized mỗi lần next, O(n) tổng.
 */
export function stockSpans(prices: number[]): number[] {
  const stack: [number, number][] = []; // [giá, span], giá giảm dần từ đáy lên đỉnh
  const spans: number[] = [];
  for (const price of prices) {
    let span = 1; // chính hôm nay
    while (stack.length > 0 && stack[stack.length - 1][0] <= price) {
      span += stack.pop()![1]; // gộp cả khối ngày mà đỉnh đại diện
    }
    stack.push([price, span]);
    spans.push(span);
  }
  return spans;
}
