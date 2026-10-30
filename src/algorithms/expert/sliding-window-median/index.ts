import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { medianSlidingWindow } from './impl';
import { trace, type SWMInput } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => medianSlidingWindow((input as unknown as SWMInput).nums ?? [], Math.floor((input as unknown as SWMInput).k)),
  trace: (input) => trace(input as unknown as SWMInput),
};
export default mod;
