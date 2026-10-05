import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { linearSearch } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => linearSearch(input.array as number[], input.target as number),
  trace: (input) => trace(input as { array: number[]; target: number }),
};
export default mod;
