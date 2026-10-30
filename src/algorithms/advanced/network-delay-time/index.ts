import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { networkDelayTime } from './impl';
import { normalize } from './input';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => {
    const { times, n, k } = normalize(input);
    return networkDelayTime(times, n, k);
  },
  trace: (input) => trace(normalize(input)),
};
export default mod;
