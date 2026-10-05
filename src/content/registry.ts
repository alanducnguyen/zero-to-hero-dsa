import type { AlgorithmModule, Level } from '@/engine/types';
import bubbleSort from '@/algorithms/basic/bubble-sort';

export const ALGORITHMS: AlgorithmModule[] = [bubbleSort];

export const byId = new Map(ALGORITHMS.map((m) => [m.meta.id, m]));
export const byLevel = (level: Level) => ALGORITHMS.filter((m) => m.meta.level === level);
export const CATEGORIES = [...new Set(ALGORITHMS.map((m) => m.meta.category))];
