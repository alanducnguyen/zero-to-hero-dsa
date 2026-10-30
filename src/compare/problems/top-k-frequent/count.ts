import { arr, composite, frame, mapViz } from '@/engine/helpers';
import type { Frame, Highlight, VisualState } from '@/engine/types';

export type TkInput = { nums: number[]; k: number };

/** Chuẩn hoá input: k nguyên trong [1, số giá trị khác nhau] (hoặc 1 nếu mảng rỗng). */
export function norm(i: Record<string, unknown>): TkInput {
  const nums = Array.isArray(i.nums) ? (i.nums as number[]) : [];
  const distinct = new Set(nums).size;
  return { nums, k: Math.max(1, Math.min(Math.floor(Number(i.k) || 1), distinct)) };
}

export const freqViz = (freq: Map<number, number>, hl: Record<string, Highlight> = {}) =>
  mapViz(Object.fromEntries([...freq].map(([v, c]) => [String(v), c])), hl, 'freq: giá trị → số lần');

/** Bước đếm dùng chung cho cả ba lời giải (dòng 4 trong mọi impl.ts). */
export function* countPhase(nums: number[], freq: Map<number, number>, extra: () => VisualState[] = () => []): Generator<Frame, void> {
  for (let i = 0; i < nums.length; i++) {
    freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);
    yield frame(4, { i, x: nums[i], 'freq[x]': freq.get(nums[i]) },
      composite([arr(nums, { title: 'nums', highlights: { [i]: 'active' } }), freqViz(freq, { [String(nums[i])]: 'active' }), ...extra()]),
      i === 0 ? `Bước chung của mọi cách: đếm tần suất bằng HashMap – O(n). freq[${nums[i]}] = 1.` : `freq[${nums[i]}] = ${freq.get(nums[i])}.`);
  }
}
