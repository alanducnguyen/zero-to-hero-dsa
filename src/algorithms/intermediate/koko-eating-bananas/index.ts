import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { minEatingSpeed } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => minEatingSpeed(input.piles as number[], input.h as number),
  trace: (input) => trace(input as { piles: number[]; h: number }),
};
export default mod;
