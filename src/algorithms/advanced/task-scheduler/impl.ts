/**
 * Task Scheduler – greedy bằng công thức "khung" (frame/slots).
 * Mỗi ký tự là một task (1 đơn vị thời gian); hai task cùng loại phải cách nhau ≥ n đơn vị.
 * Task xuất hiện nhiều nhất (maxFreq lần) tạo ra (maxFreq − 1) khung, mỗi khung dài n + 1,
 * cộng thêm một hàng cuối gồm các task có tần suất bằng maxFreq.
 * @param tasks chuỗi task, ví dụ "AAABBB"
 * @param n thời gian nghỉ tối thiểu giữa hai task cùng loại
 * @returns số đơn vị thời gian tối thiểu (kể cả idle)
 */
export function leastInterval(tasks: string, n: number): number {
  const freq = new Map<string, number>();
  for (const t of tasks) freq.set(t, (freq.get(t) ?? 0) + 1);
  let maxFreq = 0;
  for (const f of freq.values()) maxFreq = Math.max(maxFreq, f);
  let countMax = 0; // số loại task đạt tần suất maxFreq
  for (const f of freq.values()) if (f === maxFreq) countMax++;
  const frameSlots = (maxFreq - 1) * (n + 1) + countMax;
  return Math.max(frameSlots, tasks.length); // khung đầy ⇒ không cần idle
}
