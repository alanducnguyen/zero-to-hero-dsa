import { fromArray, reverseList, toArray } from './impl';
/** Dùng cho scripts/run.ts: nhận input dạng object. */
export const run = (input: { values: number[] }) => toArray(reverseList(fromArray(input.values)));
