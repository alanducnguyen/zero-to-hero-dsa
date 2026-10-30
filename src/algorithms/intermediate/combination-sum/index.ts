import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { combinationSum } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => combinationSum(input.candidates as number[], input.target as number),
  trace: (input) => trace(input as { candidates: number[]; target: number }),
};
export default mod;
