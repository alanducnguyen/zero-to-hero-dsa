import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { topKFrequent } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => topKFrequent(input.nums as number[], Math.max(1, Math.floor(input.k as number))),
  trace: (input) => trace(input as { nums: number[]; k: number }),
};
export default mod;
