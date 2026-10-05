import { buildList, detectCycle } from './impl';
export interface CycleInput { values: number[]; pos: number }
/** Trả về chỉ số node bắt đầu vòng (hoặc -1). */
export function run(input: CycleInput): number {
  const head = buildList(input.values, input.pos);
  const start = detectCycle(head);
  if (!start) return -1;
  let i = 0;
  for (let n = head; n; n = n.next, i++) if (n === start) return i;
  return -1;
}
