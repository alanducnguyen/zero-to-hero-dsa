import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run, type GraphInput } from './node';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => run(input as { graph: GraphInput }),
  trace: (input) => trace(input as { graph: GraphInput }),
};
export default mod;
