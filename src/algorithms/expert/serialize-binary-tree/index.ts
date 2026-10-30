import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run, type SerializeInput } from './node';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => run(input as unknown as SerializeInput),
  trace: (input) => trace(input as unknown as SerializeInput),
};
export default mod;
