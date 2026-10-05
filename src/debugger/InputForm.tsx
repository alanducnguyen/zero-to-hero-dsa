import { useState } from 'react';
import { Shuffle, Play } from 'lucide-react';
import type { AlgorithmMeta, InputField } from '@/engine/types';
import { cn } from '@/lib/cn';

interface Props {
  meta: AlgorithmMeta;
  value: Record<string, unknown>;
  onRun: (v: Record<string, unknown>) => void;
}

const parseNumbers = (s: string) => s.split(/[\s,;]+/).filter(Boolean).map(Number).filter((x) => !Number.isNaN(x));
const parseStrings = (s: string) => s.split(/[\s,;]+/).filter(Boolean);

function toText(f: InputField, v: unknown): string {
  if (f.type === 'number[]' || f.type === 'string[]') return (v as unknown[]).join(', ');
  if (f.type === 'grid') return (v as number[][]).map((r) => r.join(' ')).join('\n');
  if (f.type === 'graph') return JSON.stringify(v);
  return String(v);
}

function fromText(f: InputField, s: string): unknown {
  switch (f.type) {
    case 'number[]': {
      let xs = parseNumbers(s);
      if (f.maxLength) xs = xs.slice(0, f.maxLength);
      if (f.min !== undefined || f.max !== undefined) xs = xs.map((x) => Math.max(f.min ?? -Infinity, Math.min(f.max ?? Infinity, x)));
      return xs;
    }
    case 'string[]': return parseStrings(s).slice(0, f.maxLength ?? 50);
    case 'number': return Math.max(f.min ?? -Infinity, Math.min(f.max ?? Infinity, Number(s) || 0));
    case 'string': return s.slice(0, f.maxLength ?? 40);
    case 'grid': return s.split('\n').map((r) => r.trim()).filter(Boolean).map((r) => parseNumbers(r.replace(/#/g, '1').replace(/\./g, '0')));
    case 'graph':
      try { return JSON.parse(s); } catch { return f.default; }
  }
}

function randomFor(f: InputField): unknown {
  const rnd = (lo: number, hi: number) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
  switch (f.type) {
    case 'number[]': return Array.from({ length: rnd(5, Math.min(f.maxLength ?? 12, 12)) }, () => rnd(f.min ?? 0, f.max ?? 50));
    case 'number': return rnd(f.min ?? 0, f.max ?? 50);
    case 'string': return Array.from({ length: rnd(5, 10) }, () => 'abcdefg'[rnd(0, 6)]).join('');
    default: return f.default;
  }
}

export function InputForm({ meta, value, onRun }: Props) {
  const [text, setText] = useState<Record<string, string>>(() => Object.fromEntries(meta.inputs.map((f) => [f.key, toText(f, value[f.key] ?? f.default)])));
  const build = () => Object.fromEntries(meta.inputs.map((f) => [f.key, fromText(f, text[f.key] ?? '')]));
  const applyPreset = (vals: Record<string, unknown>) => {
    const next = { ...text };
    for (const f of meta.inputs) if (vals[f.key] !== undefined) next[f.key] = toText(f, vals[f.key]);
    setText(next);
    onRun(Object.fromEntries(meta.inputs.map((f) => [f.key, fromText(f, next[f.key])])));
  };
  const randomize = () => {
    const vals = Object.fromEntries(meta.inputs.filter((f) => ['number[]', 'number', 'string'].includes(f.type)).map((f) => [f.key, randomFor(f)]));
    applyPreset(vals);
  };
  return (
    <form className="flex flex-col gap-2 p-3" onSubmit={(e) => { e.preventDefault(); onRun(build()); }}>
      {meta.inputs.map((f) => {
        const multi = f.type === 'grid' || f.type === 'graph';
        return (
          <label key={f.key} className="flex flex-col gap-1 text-xs">
            <span className="font-medium text-fg-muted">{f.label} <span className="font-mono opacity-60">({f.type})</span></span>
            {multi ? (
              <textarea rows={f.type === 'grid' ? 5 : 3} value={text[f.key]} onChange={(e) => setText({ ...text, [f.key]: e.target.value })} spellCheck={false}
                className="rounded-lg border border-border bg-surface px-2 py-1.5 font-mono text-xs outline-none focus:ring-2 focus:ring-accent/40" />
            ) : (
              <input value={text[f.key]} onChange={(e) => setText({ ...text, [f.key]: e.target.value })} spellCheck={false}
                className="rounded-lg border border-border bg-surface px-2 py-1.5 font-mono text-xs outline-none focus:ring-2 focus:ring-accent/40" />
            )}
          </label>
        );
      })}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <button type="submit" className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-accent-fg hover:bg-accent/90"><Play size={12} /> Chạy lại</button>
        <button type="button" onClick={randomize} className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-surface-3"><Shuffle size={12} /> Ngẫu nhiên</button>
        {meta.presets?.map((p) => (
          <button key={p.label} type="button" onClick={() => applyPreset(p.values)} className={cn('rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-surface-3')}>{p.label}</button>
        ))}
      </div>
    </form>
  );
}
