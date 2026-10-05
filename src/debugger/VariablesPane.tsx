import type { Frame } from '@/engine/types';

function fmt(v: unknown): string {
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  if (typeof v === 'string') return `"${v}"`;
  if (v instanceof Map) return `Map(${v.size}) {${[...v.entries()].map(([k, x]) => `${String(k)}: ${fmt(x)}`).join(', ')}}`;
  if (v instanceof Set) return `Set(${v.size}) {${[...v].map(fmt).join(', ')}}`;
  if (Array.isArray(v)) return `[${v.map(fmt).join(', ')}]`;
  if (typeof v === 'object') return `{${Object.entries(v as object).map(([k, x]) => `${k}: ${fmt(x)}`).join(', ')}}`;
  return String(v);
}

export function VariablesPane({ frame, prev }: { frame: Frame | undefined; prev: Frame | undefined }) {
  const entries = Object.entries(frame?.vars ?? {});
  return (
    <div className="flex flex-col gap-3 p-3 text-sm">
      <section>
        <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Biến</h4>
        {entries.length === 0 ? (
          <div className="text-xs text-fg-muted">Chưa có biến</div>
        ) : (
          <table className="w-full font-mono text-xs">
            <tbody>
              {entries.map(([k, v]) => {
                const s = fmt(v);
                const changed = prev && fmt(prev.vars[k]) !== s;
                return (
                  <tr key={k} className="border-b border-border/60 last:border-0">
                    <td className="w-24 py-1 pr-2 align-top text-accent">{k}</td>
                    <td className={'py-1 break-all ' + (changed ? 'rounded bg-viz-compare/20 px-1 font-semibold' : '')}>{s}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
      {frame?.callStack && frame.callStack.length > 0 && (
        <section>
          <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">Call stack (trên cùng = đang chạy)</h4>
          <ul className="flex flex-col-reverse gap-0.5 font-mono text-xs">
            {frame.callStack.map((c, i) => (
              <li key={i} className={'rounded px-2 py-1 ' + (i === frame.callStack!.length - 1 ? 'bg-accent/15 text-accent' : 'bg-surface-3/60')}>{c}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
