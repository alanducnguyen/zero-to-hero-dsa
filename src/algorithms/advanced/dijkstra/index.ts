import type { AlgorithmModule } from '@/engine/types';
import source from './impl.ts?raw';
import content from './content.md?raw';
import interview from './interview.md?raw';
import { meta } from './meta';
import { run, type GraphInput } from './node';
import { trace } from './trace';

const mod: AlgorithmModule = {
  meta,
  source,
  content,
  interview,
  run: (input) => {
    const g = input.graph as GraphInput;
    const source = g.nodes.some((n) => n.id === input.source) ? (input.source as string) : g.nodes[0]?.id;
    return run({ graph: g, source });
  },
  trace: (input) => trace(input as { graph: GraphInput; source: string }),
};
export default mod;
