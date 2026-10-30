import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run } from './node';
import { trace, type WordSearchInput } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => run(input as unknown as WordSearchInput),
  trace: (input) => trace(input as unknown as WordSearchInput),
};
export default mod;
