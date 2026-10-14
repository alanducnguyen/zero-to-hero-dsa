import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { longestCommonSubsequence } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => longestCommonSubsequence(input.a as string, input.b as string),
  trace: (input) => trace(input as { a: string; b: string }),
};
export default mod;
