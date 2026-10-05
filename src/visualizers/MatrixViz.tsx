import type { MatrixVisual } from '@/engine/types';
import { fillFor } from './colors';

export function MatrixViz({ v }: { v: MatrixVisual }) {
  const rows = v.cells.length;
  const cols = Math.max(0, ...v.cells.map((r) => r.length));
  const cell = cols > 14 ? 28 : cols > 9 ? 36 : 44;
  const maxRowLabel = v.rowLabels ? Math.max(1, ...v.rowLabels.map((l) => l.length)) : 0;
  const lx = v.rowLabels ? Math.max(28, maxRowLabel * 6.5 + 10) : 0, ly = v.colLabels ? 20 : 0;
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
            const isMuted = h === 'muted';
            return (
              <g key={`${r}-${c}`}>
                <rect x={lx + c * cell + 0.5} y={ly + r * cell + 0.5} width={cell} height={cell} rx={4} fill={isWall || isMuted ? 'var(--fg-muted)' : fillFor(h)} opacity={isWall ? 1 : isMuted ? 0.35 : h ? 1 : 0.35} stroke="var(--border)" style={{ transition: 'fill .15s' }} />
                {isMuted && <line x1={lx + c * cell + 6} y1={ly + r * cell + 6} x2={lx + (c + 1) * cell - 6} y2={ly + (r + 1) * cell - 6} stroke="var(--fg-muted)" strokeWidth={1.5} opacity={0.6} />}
                {!isWall && <text x={lx + c * cell + cell / 2} y={ly + r * cell + cell / 2 + 4} textAnchor="middle" fontSize={str.length > 2 ? 10 : 12} fontWeight={h && !isMuted ? 700 : 500} fill={h && !isMuted ? '#fff' : 'var(--fg)'}>{str}</text>}
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
