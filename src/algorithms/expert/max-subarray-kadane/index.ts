import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { maxSubArray } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => maxSubArray((input.nums as number[]).length ? (input.nums as number[]) : [0]),
  trace: (input) => trace(input as { nums: number[] }),
};
export default mod;
