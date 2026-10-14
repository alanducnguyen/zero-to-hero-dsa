/**
 * Daily Temperatures – với mỗi ngày, bao nhiêu ngày nữa mới có ngày ấm hơn (0 nếu không có).
 * Monotonic stack giảm dần lưu CHỈ SỐ các ngày chưa tìm được ngày ấm hơn.
 * Gặp ngày ấm hơn đỉnh stack ⇒ pop và trả lời cho ngày đó. Mỗi chỉ số vào/ra stack đúng 1 lần ⇒ O(n).
 */
export function dailyTemperatures(temps: number[]): number[] {
  const n = temps.length;
  const answer: number[] = new Array<number>(n).fill(0);
  const stack: number[] = []; // chỉ số, nhiệt độ giảm dần từ đáy lên đỉnh
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop()!; // ngày j vừa tìm được ngày ấm hơn đầu tiên là i
      answer[j] = i - j;
    }
    stack.push(i); // i chờ ngày ấm hơn ở tương lai
  }
  return answer; // những chỉ số còn trong stack giữ 0
}
