import { minMeetingRooms } from './impl';

export interface MRInput { intervals: string[] }

/** "1-3" hoặc "1,3" ⇒ [1,3]; chuỗi sai định dạng ⇒ null */
export function parseOne(raw: string): number[] | null {
  const m = /^\s*(-?\d+)\s*[-,:]\s*(-?\d+)\s*$/.exec(raw);
  if (!m) return null;
  const a = Number(m[1]), b = Number(m[2]);
  return [Math.min(a, b), Math.max(a, b)];
}

export function parse(input: MRInput): number[][] {
  return (input.intervals ?? []).map(parseOne).filter((x): x is number[] => x !== null);
}

export const run = (input: MRInput) => minMeetingRooms(parse(input));
