import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { subarraySum } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => subarraySum([...(input.nums as number[])], input.k as number),
  trace: (input) => trace(input as { nums: number[]; k: number }),
};
export default mod;
