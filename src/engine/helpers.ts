import type {
  ArrayVisual,
  Frame,
  Highlight,
  MapVisual,
  MatrixVisual,
  StackQueueVisual,
  VisualState,
} from './types';

/** Tạo frame nhanh gọn. */
export function frame(
  line: number,
  vars: Record<string, unknown>,
  visual: VisualState,
  note?: string,
  extra?: { callStack?: string[]; log?: string },
): Frame {
  return { line, vars: cloneVars(vars), visual, note, ...extra };
}

function cloneVars(vars: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(vars)) out[k] = structuredClone(v);
  return out;
}

export function arr(
  items: (number | string)[],
  opts: Omit<ArrayVisual, 'kind' | 'items'> = {},
): ArrayVisual {
  return { kind: 'array', items: [...items], ...opts };
}

/** Tạo map highlight từ danh sách [index, highlight]. */
export function hl(...pairs: [number, Highlight][]): Record<number, Highlight> {
  const out: Record<number, Highlight> = {};
  for (const [i, h] of pairs) out[i] = h;
  return out;
}

/** Tô tất cả index trong [from,to] với highlight h, hợp nhất với base. */
export function hlRange(
  from: number,
  to: number,
  h: Highlight,
  base: Record<number, Highlight> = {},
): Record<number, Highlight> {
  const out = { ...base };
  for (let i = from; i <= to; i++) out[i] = h;
  return out;
}

export function stack(items: (number | string)[], highlights?: Record<number, Highlight>, title?: string): StackQueueVisual {
  return { kind: 'stackqueue', mode: 'stack', items: [...items], highlights, title };
}
export function queue(items: (number | string)[], highlights?: Record<number, Highlight>, title?: string): StackQueueVisual {
  return { kind: 'stackqueue', mode: 'queue', items: [...items], highlights, title };
}

export function matrix(
  cells: (number | string | null)[][],
  opts: Omit<MatrixVisual, 'kind' | 'cells'> = {},
): MatrixVisual {
  return { kind: 'matrix', cells: cells.map((r) => [...r]), ...opts };
}

export function mapViz(
  m: Map<string | number, string | number> | Record<string, string | number>,
  highlights?: Record<string, Highlight>,
  title?: string,
): MapVisual {
  const entries =
    m instanceof Map
      ? [...m.entries()].map(([k, v]) => ({ key: String(k), value: v }))
      : Object.entries(m).map(([k, v]) => ({ key: k, value: v }));
  return { kind: 'map', entries, highlights, title };
}

export function composite(parts: VisualState[], layout: 'row' | 'column' = 'column'): VisualState {
  return { kind: 'composite', parts, layout };
}
