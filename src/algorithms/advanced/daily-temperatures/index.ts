import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { dailyTemperatures } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => dailyTemperatures(input.temps as number[]),
  trace: (input) => trace(input as { temps: number[] }),
};
export default mod;
