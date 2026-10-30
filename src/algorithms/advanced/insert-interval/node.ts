import { insertInterval } from './impl';

export interface IInput { intervals: string[]; newInterval: string }

/** "1-3" hoặc "1,3" ⇒ [1,3]; chuỗi sai định dạng ⇒ null */
export function parseOne(raw: string): number[] | null {
  const m = /^\s*(-?\d+)\s*[-,:]\s*(-?\d+)\s*$/.exec(raw);
  if (!m) return null;
  const a = Number(m[1]), b = Number(m[2]);
  return [Math.min(a, b), Math.max(a, b)];
}

/** Chuẩn hoá input: parse, sắp xếp theo start (impl giả định danh sách đã sắp xếp). */
export function parse(input: IInput): { intervals: number[][]; newInterval: number[] } {
  const intervals = input.intervals.map(parseOne).filter((x): x is number[] => x !== null).sort((a, b) => a[0] - b[0]);
  const newInterval = parseOne(input.newInterval) ?? [0, 0];
  return { intervals, newInterval };
}

export const run = (input: IInput) => {
  const { intervals, newInterval } = parse(input);
  return insertInterval(intervals, newInterval);
};
