/**
 * Gas Station (LeetCode 134) – tham lam một lượt.
 * Trạm i cho gas[i] lít, đi từ trạm i sang trạm i+1 tốn cost[i] lít (vòng tròn).
 * @param gas lượng xăng nhận được ở mỗi trạm
 * @param cost lượng xăng tiêu tốn để đi tới trạm kế tiếp
 * @returns chỉ số trạm xuất phát đi hết một vòng được, hoặc -1 nếu không có
 */
export function canCompleteCircuit(gas: number[], cost: number[]): number {
  let total = 0; // tổng (gas - cost) cả vòng
  let tank = 0; // xăng hiện có kể từ trạm start
  let start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      // không tới được i+1 từ start ⇒ mọi trạm trong [start, i] đều bị loại
      start = i + 1;
      tank = 0;
    }
  }
  return total < 0 ? -1 : start;
}
