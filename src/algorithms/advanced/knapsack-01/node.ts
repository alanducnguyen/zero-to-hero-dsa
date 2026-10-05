import { knapsack, type Item } from './impl';
export interface KInput { weights: number[]; values: number[]; capacity: number }
export function toItems(input: KInput): Item[] {
  const n = Math.min(input.weights.length, input.values.length, 6);
  return Array.from({ length: n }, (_, i) => ({ weight: Math.max(1, Math.floor(input.weights[i])), value: Math.max(0, Math.floor(input.values[i])) }));
}
export const run = (input: KInput) => knapsack(toItems(input), Math.max(0, Math.min(12, Math.floor(input.capacity))));
