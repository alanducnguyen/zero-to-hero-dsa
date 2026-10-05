import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run } from './node';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => run({ n: Math.min(6, input.n as number) }),
  trace: (input) => trace(input as { n: number }),
};
export default mod;
