import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { ladderLength } from './impl';
import { trace, type LadderInput } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => {
    const i = input as unknown as LadderInput;
    return ladderLength(String(i.beginWord ?? ''), String(i.endWord ?? ''), (i.wordList ?? []).map(String));
  },
  trace: (input) => trace(input as unknown as LadderInput),
};
export default mod;
