import type { MatrixVisual } from '@/engine/types';
import { fillFor } from './colors';

export function MatrixViz({ v }: { v: MatrixVisual }) {
  const rows = v.cells.length;
  const cols = Math.max(0, ...v.cells.map((r) => r.length));
  const cell = cols > 14 ? 28 : cols > 9 ? 36 : 44;
  const lx = v.rowLabels ? 28 : 0, ly = v.colLabels ? 20 : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <svg viewBox={`0 0 ${lx + cols * cell + 1} ${ly + rows * cell + 1}`} width={lx + cols * cell + 1} height={ly + rows * cell + 1} style={{ maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-mono)' }}>
        {v.colLabels?.map((l, c) => <text key={c} x={lx + c * cell + cell / 2} y={14} textAnchor="middle" fontSize={11} fill="var(--fg-muted)">{l}</text>)}
        {v.rowLabels?.map((l, r) => <text key={r} x={lx - 8} y={ly + r * cell + cell / 2 + 4} textAnchor="end" fontSize={11} fill="var(--fg-muted)">{l}</text>)}
        {v.cells.map((row, r) =>
          row.map((val, c) => {
            const h = v.highlights?.[`${r},${c}`];
            const str = val === null ? '' : String(val);
            const isWall = val === '#';
            return (
              <g key={`${r}-${c}`}>
                <rect x={lx + c * cell + 0.5} y={ly + r * cell + 0.5} width={cell} height={cell} rx={4} fill={isWall ? 'var(--fg-muted)' : fillFor(h)} opacity={h || isWall ? 1 : 0.35} stroke="var(--border)" style={{ transition: 'fill .15s' }} />
                {!isWall && <text x={lx + c * cell + cell / 2} y={ly + r * cell + cell / 2 + 4} textAnchor="middle" fontSize={str.length > 2 ? 10 : 12} fontWeight={h ? 700 : 500} fill={h ? '#fff' : 'var(--fg)'}>{str}</text>}
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
