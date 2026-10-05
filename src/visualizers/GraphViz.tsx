import type { GraphVisual } from '@/engine/types';
import { fillFor, HL_COLOR } from './colors';

export function GraphViz({ v }: { v: GraphVisual }) {
  const R = 20;
  const maxX = Math.max(...v.nodes.map((n) => n.x), 100) + R + 10;
  const maxY = Math.max(...v.nodes.map((n) => n.y), 100) + R + 24;
  const byId = new Map(v.nodes.map((n) => [n.id, n]));
  return (
    <div className="flex flex-col items-center gap-1">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <svg viewBox={`0 0 ${maxX} ${maxY}`} width={maxX} height={maxY} style={{ maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-mono)' }} className="overflow-visible">
        <defs>
          <marker id="g-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--fg-muted)" /></marker>
        </defs>
        {v.edges.map((e) => {
          const a = byId.get(e.from), b = byId.get(e.to);
          if (!a || !b) return null;
          const eh = v.edgeHighlights?.[`${e.from}->${e.to}`] ?? (e.directed ? undefined : v.edgeHighlights?.[`${e.to}->${e.from}`]);
          const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
          const ux = dx / len, uy = dy / len;
          const x1 = a.x + ux * R, y1 = a.y + uy * R, x2 = b.x - ux * (R + 2), y2 = b.y - uy * (R + 2);
          return (
            <g key={`${e.from}-${e.to}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={eh ? HL_COLOR[eh] : 'var(--border)'} strokeWidth={eh ? 3 : 2} markerEnd={e.directed ? 'url(#g-arrow)' : undefined} />
              {e.weight !== undefined && (
                <g>
                  <rect x={(x1 + x2) / 2 - 11} y={(y1 + y2) / 2 - 9} width={22} height={16} rx={4} fill="var(--surface)" />
                  <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + 4} textAnchor="middle" fontSize={11} fill={eh ? HL_COLOR[eh] : 'var(--fg-muted)'}>{e.weight}</text>
                </g>
              )}
            </g>
          );
        })}
        {v.nodes.map((n) => {
          const h = v.highlights?.[n.id];
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={R} fill={fillFor(h)} opacity={h ? 1 : 0.7} stroke="var(--border)" strokeWidth={1.5} />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={600} fill={h ? '#fff' : 'var(--fg)'}>{n.label ?? n.id}</text>
              {v.marks?.[n.id] && <text x={n.x} y={n.y + R + 13} textAnchor="middle" fontSize={11} fill="var(--fg-muted)">{v.marks[n.id]}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
