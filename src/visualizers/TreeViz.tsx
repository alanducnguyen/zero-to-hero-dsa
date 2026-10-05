import { motion } from 'framer-motion';
import type { TreeVisual } from '@/engine/types';
import { fillFor } from './colors';

/** Layout cây đơn giản: mỗi lá chiếm 1 cột, cha ở giữa các con. */
export function TreeViz({ v }: { v: TreeVisual }) {
  const byId = new Map(v.nodes.map((n) => [n.id, n]));
  const pos = new Map<string, { x: number; y: number }>();
  let col = 0;
  let depthMax = 0;
  const walk = (id: string, depth: number): number => {
    const n = byId.get(id);
    if (!n) return col++;
    depthMax = Math.max(depthMax, depth);
    const kids = n.children.filter((c) => byId.has(c));
    let xc: number;
    if (kids.length === 0) xc = col++;
    else {
      const xs = kids.map((c) => walk(c, depth + 1));
      xc = (xs[0] + xs[xs.length - 1]) / 2;
    }
    pos.set(id, { x: xc, y: depth });
    return xc;
  };
  if (v.rootId) walk(v.rootId, 0);
  const CW = 56, RH = 70, R = 18;
  const width = Math.max(col, 1) * CW;
  const height = (depthMax + 1) * RH + 20;
  const px = (c: number) => c * CW + CW / 2;
  const py = (d: number) => d * RH + R + 8;

  return (
    <div className="flex flex-col items-center gap-1">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-mono)' }} className="overflow-visible">
        {v.nodes.map((n) => {
          const p = pos.get(n.id);
          if (!p) return null;
          return n.children.map((c) => {
            const q = pos.get(c);
            if (!q) return null;
            return <line key={`${n.id}-${c}`} x1={px(p.x)} y1={py(p.y)} x2={px(q.x)} y2={py(q.y)} stroke="var(--border)" strokeWidth={2} />;
          });
        })}
        {v.nodes.map((n) => {
          const p = pos.get(n.id);
          if (!p) return null;
          const h = v.highlights?.[n.id];
          return (
            <motion.g key={n.id} initial={false} animate={{ x: px(p.x), y: py(p.y) }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <circle r={R} fill={fillFor(h)} opacity={h ? 1 : 0.7} stroke="var(--border)" strokeWidth={1.5} />
              <text y={5} textAnchor="middle" fontSize={13} fontWeight={600} fill={h ? '#fff' : 'var(--fg)'}>{n.label}</text>
              {v.marks?.[n.id] && <text y={R + 12} textAnchor="middle" fontSize={10} fill="var(--fg-muted)">{v.marks[n.id]}</text>}
            </motion.g>
          );
        })}
        {!v.rootId && <text x={10} y={20} fontSize={12} fill="var(--fg-muted)">(cây rỗng)</text>}
      </svg>
    </div>
  );
}
