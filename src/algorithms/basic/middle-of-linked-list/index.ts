import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { middleOfLinkedList } from './impl';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => middleOfLinkedList(input.values as number[]),
  trace: (input) => trace(input as { values: number[] }),
};
export default mod;
