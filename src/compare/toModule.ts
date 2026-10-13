import type { AlgorithmModule } from '@/engine/types';
import type { CompareProblem, Solution } from './types';

/** Gói một lời giải thành AlgorithmModule để tái dùng DebuggerPanel và checkModule. */
export function toModule(p: CompareProblem, s: Solution): AlgorithmModule {
  return {
    meta: {
      id: `compare:${p.id}:${s.id}`,
      title: `${p.title} – ${s.name}`,
      subtitle: s.approach,
      level: p.difficulty === 'Easy' ? 'basic' : p.difficulty === 'Medium' ? 'intermediate' : 'advanced',
      category: 'Nhiều lời giải',
      tags: p.tags,
      companies: [],
      complexity: s.complexity,
      inputs: p.inputs,
      presets: p.presets,
    },
    source: s.source,
    content: '',
    interview: '',
    run: s.run,
    trace: s.trace,
  };
}

/** Lời giải theo thứ tự trình bày (rank giảm dần: brute force trước, tối ưu sau). */
export const byPresentation = (p: CompareProblem) => [...p.solutions].sort((a, b) => b.rank - a.rank);
/** Lời giải theo thứ tự tối ưu (rank 1 trước). */
export const byRank = (p: CompareProblem) => [...p.solutions].sort((a, b) => a.rank - b.rank);
