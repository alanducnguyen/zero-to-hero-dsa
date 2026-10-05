import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { numIslands } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => numIslands((input.grid as number[][]).map((row) => row.map((v) => (v ? 1 : 0)))),
  trace: (input) => trace(input as { grid: number[][] }),
};
export default mod;
