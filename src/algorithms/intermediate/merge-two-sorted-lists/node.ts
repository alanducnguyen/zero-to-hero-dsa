import { fromArray, mergeTwoLists, toArray } from './impl';
export interface MInput { a: number[]; b: number[] }
const sorted = (x: number[]) => [...x].sort((p, q) => p - q);
export const run = (input: MInput) => toArray(mergeTwoLists(fromArray(sorted(input.a)), fromArray(sorted(input.b))));
