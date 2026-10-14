import { mergeKSortedLists } from './impl';

export interface MKInput { lists: number[][] }

/** Sắp xếp từng danh sách con (đề cho đã sắp xếp; ở đây chuẩn hoá input người dùng). */
export function normalize(input: MKInput): number[][] {
  return (input.lists ?? []).map((l) => [...l].sort((a, b) => a - b));
}

export const run = (input: MKInput) => mergeKSortedLists(normalize(input));
