import { motion } from 'framer-motion';
import type { LinkedListVisual } from '@/engine/types';
import { fillFor, POINTER_COLORS } from './colors';

export function LinkedListViz({ v }: { v: LinkedListVisual }) {
  const order = v.order ?? v.nodes.map((n) => n.id);
  const pos = new Map(order.map((id, i) => [id, i]));
  const W = 64, H = 40, GAP = 40;
  const x = (i: number) => i * (W + GAP);
  const nullX = x(order.length);
  const width = nullX + 50;
  const ptrRows = v.pointers ?? [];
  const height = 24 + H + 18 + ptrRows.length * 20;
  const byId = new Map(v.nodes.map((n) => [n.id, n]));

  return (
    <div className="flex flex-col items-center gap-1">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-mono)' }} className="overflow-visible">
        <defs>
          <marker id="ll-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--fg-muted)" /></marker>
        </defs>
        {order.map((id, i) => {
          const n = byId.get(id);
          if (!n) return null;
          const h = v.highlights?.[id];
          const ny = 24;
          const target = n.next === null ? undefined : pos.get(n.next);
          let path: string | null = null;
          if (n.next === null) path = `M${x(i) + W},${ny + H / 2} L${nullX - 4},${ny + H / 2}`;
          else if (target !== undefined) {
            const tx = x(target);
            if (target === i + 1) path = `M${x(i) + W},${ny + H / 2} L${tx - 4},${ny + H / 2}`;
            else {
              const dir = target > i ? 1 : -1;
              const sx = dir > 0 ? x(i) + W : x(i);
              const ex = dir > 0 ? tx - 4 : tx + W + 4;
              path = `M${sx},${ny + H / 2} Q${(sx + ex) / 2},${ny - 46} ${ex},${ny + H / 2}`;
            }
          }
          return (
            <motion.g key={id} initial={false} animate={{ x: 0 }}>
              {path && <path d={path} fill="none" stroke="var(--fg-muted)" strokeWidth={1.5} markerEnd="url(#ll-arrow)" />}
              <rect x={x(i)} y={ny} width={W} height={H} rx={8} fill={fillFor(h)} opacity={h ? 1 : 0.6} stroke="var(--border)" />
              <text x={x(i) + W / 2} y={ny + H / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={600} fill={h ? '#fff' : 'var(--fg)'}>{String(n.value)}</text>
            </motion.g>
          );
        })}
        <text x={nullX} y={24 + H / 2 + 5} fontSize={12} fill="var(--fg-muted)">null</text>
        {ptrRows.map((p, r) => {
          const i = p.id === null ? order.length : (pos.get(p.id) ?? -1);
          const px = i < 0 ? 0 : i === order.length ? nullX + 12 : x(i) + W / 2;
          const py = 24 + H + 8 + r * 20;
          const color = POINTER_COLORS[r % POINTER_COLORS.length];
          return (
            <motion.g key={p.name} initial={false} animate={{ x: px }} transition={{ type: 'spring', stiffness: 400, damping: 32 }}>
              <polygon points={`-5,${py + 8} 5,${py + 8} 0,${py + 1}`} fill={color} />
              <text x={0} y={py + 19} textAnchor="middle" fontSize={11} fontWeight={700} fill={color}>{p.name}</text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
