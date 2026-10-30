import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { leastInterval } from './impl';
import { trace } from './trace';

const normN = (v: unknown) => Math.max(0, Math.floor(Number(v) || 0));

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => leastInterval(String(input.tasks ?? ''), normN(input.n)),
  trace: (input) => trace(input as { tasks: string; n: number }),
};
export default mod;
