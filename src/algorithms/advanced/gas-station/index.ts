import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { canCompleteCircuit } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => canCompleteCircuit(input.gas as number[], input.cost as number[]),
  trace: (input) => trace(input as { gas: number[]; cost: number[] }),
};
export default mod;
