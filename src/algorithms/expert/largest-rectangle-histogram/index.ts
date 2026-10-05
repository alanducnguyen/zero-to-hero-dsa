import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { largestRectangleArea } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => largestRectangleArea((input.heights as number[]).map((h) => Math.max(0, h))),
  trace: (input) => trace(input as { heights: number[] }),
};
export default mod;
