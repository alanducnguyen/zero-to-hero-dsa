import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { countingSort } from './impl';
import { trace } from './trace';

const clamp = (xs: number[]) => xs.map((x) => Math.max(0, Math.min(9, Math.floor(x))));

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => countingSort(clamp(input.array as number[])),
  trace: (input) => trace(input as { array: number[] }),
};
export default mod;
