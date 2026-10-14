import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { wordBreak } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => wordBreak(input.s as string, input.wordDict as string[]),
  trace: (input) => trace(input as { s: string; wordDict: string[] }),
};
export default mod;
