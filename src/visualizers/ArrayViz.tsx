import { motion } from 'framer-motion';
import type { ArrayVisual } from '@/engine/types';
import { fillFor, HL_COLOR, POINTER_COLORS } from './colors';

const spring = { type: 'spring', stiffness: 400, damping: 32 } as const;

export function ArrayViz({ v }: { v: ArrayVisual }) {
  const n = v.items.length;
  const mode = v.mode ?? 'cells';
  const maxLen = Math.max(1, ...v.items.map((x) => String(x).length));
  const baseCell = n > 20 ? 30 : n > 12 ? 40 : 52;
  const cell = maxLen <= 3 ? baseCell : Math.min(180, Math.max(baseCell, maxLen * 7.5 + 16));
  const gap = 6;
  const pointerRows = groupPointers(v.pointers ?? []);
  const pointerH = pointerRows.length * 22;
  const numeric = v.items.every((x) => typeof x === 'number');
  const maxV = numeric ? Math.max(1, ...(v.items as number[]).map((x) => Math.abs(x))) : 1;
  const barH = mode === 'bars' && numeric ? 150 : 0;
  const width = Math.max(1, n) * (cell + gap) - gap;
  const rangeH = (v.ranges?.length ?? 0) > 0 ? 24 : 0;
  const height = rangeH + barH + cell + 18 + pointerH + 8;
  const x = (i: number) => i * (cell + gap);
  const topY = rangeH;

  return (
    <div className="flex flex-col items-center gap-1">
      {v.title && <div className="text-xs font-medium text-fg-muted">{v.title}</div>}
      <svg width={width + 2} height={height} viewBox={`-1 0 ${width + 2} ${height}`} style={{ maxWidth: '100%', height: 'auto', fontFamily: 'var(--font-mono)' }} className="overflow-visible">
        {v.ranges?.map((r, k) => (
          <g key={k}>
            <rect x={x(r.from)} y={2} width={x(r.to) - x(r.from) + cell} height={rangeH + barH + cell - 4} rx={8} fill={HL_COLOR[r.color ?? 'range']} opacity={0.12} />
            <text x={(x(r.from) + x(r.to) + cell) / 2} y={14} textAnchor="middle" fontSize={11} fill={HL_COLOR[r.color ?? 'range']}>{r.label}</text>
          </g>
        ))}
        {v.items.map((val, i) => {
          const h = v.highlights?.[i];
          const bh = mode === 'bars' && numeric ? Math.max(4, (Math.abs(val as number) / maxV) * barH) : 0;
          return (
            <motion.g key={i} initial={false} animate={{ x: x(i) }} transition={spring}>
              {bh > 0 && <motion.rect x={0} animate={{ y: topY + barH - bh, height: bh }} transition={spring} width={cell} rx={4} fill={fillFor(h)} opacity={0.9} />}
              <rect x={0} y={topY + barH} width={cell} height={cell} rx={8} fill={fillFor(h)} opacity={h ? 1 : 0.55} stroke="var(--border)" />
              <text x={cell / 2} y={topY + barH + cell / 2 + 5} textAnchor="middle" fontSize={maxLen > 3 ? 12 : n > 20 ? 11 : 14} fontWeight={600} fill={h ? '#fff' : 'var(--fg)'}>{String(val)}</text>
              <text x={cell / 2} y={topY + barH + cell + 13} textAnchor="middle" fontSize={10} fill="var(--fg-muted)">{i}</text>
            </motion.g>
          );
        })}
        {pointerRows.map((row, r) =>
          row.map((p) => {
            const px = p.index < 0 ? -cell / 2 : p.index >= n ? x(n) : x(p.index);
            const color = POINTER_COLORS[(v.pointers ?? []).indexOf(p) % POINTER_COLORS.length];
            const py = topY + barH + cell + 18 + r * 22;
            return (
              <motion.g key={p.name} initial={false} animate={{ x: px }} transition={spring}>
                <polygon points={`${cell / 2 - 5},${py + 8} ${cell / 2 + 5},${py + 8} ${cell / 2},${py + 1}`} fill={color} />
                <text x={cell / 2} y={py + 19} textAnchor="middle" fontSize={11} fontWeight={700} fill={color}>{p.name}</text>
              </motion.g>
            );
          }),
        )}
        {n === 0 && <text x={0} y={topY + cell / 2} fontSize={12} fill="var(--fg-muted)">(mảng rỗng)</text>}
      </svg>
    </div>
  );
}

/** Xếp các con trỏ trùng index xuống hàng khác nhau để không đè lên nhau. */
function groupPointers(ps: { name: string; index: number }[]) {
  const rows: { name: string; index: number }[][] = [];
  for (const p of ps) {
    let row = rows.find((r) => r.every((q) => Math.abs(q.index - p.index) > 0));
    if (!row) {
      row = [];
      rows.push(row);
    }
    row.push(p);
  }
  return rows;
}
