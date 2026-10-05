import { useEffect, useState } from 'react';
import { AlertTriangle, Code2, Eye, Maximize2, Minimize2, SlidersHorizontal, Variable } from 'lucide-react';
import type { AlgorithmModule } from '@/engine/types';
import { useDebugger } from './useDebugger';
import { CodePane } from './CodePane';
import { Controls } from './Controls';
import { VariablesPane } from './VariablesPane';
import { InputForm } from './InputForm';
import { Visual } from '@/visualizers';
import { HL_COLOR, HL_LABEL } from '@/visualizers/colors';
import { defaultInput } from '@/engine/testUtils';
import { cn } from '@/lib/cn';

export function DebuggerPanel({ mod }: { mod: AlgorithmModule }) {
  const st = useDebugger();
  const [full, setFull] = useState(false);
  const [mobileTab, setMobileTab] = useState<'visual' | 'code' | 'vars' | 'input'>('visual');

  useEffect(() => {
    if (st.moduleId !== mod.meta.id) st.load(mod, defaultInput(mod));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod]);

  // auto play
  useEffect(() => {
    if (!st.playing) return;
    const t = setInterval(() => useDebugger.getState().next(), st.speed);
    return () => clearInterval(t);
  }, [st.playing, st.speed]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const s = useDebugger.getState();
      if (e.key === 'ArrowRight') { e.preventDefault(); s.next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); s.prev(); }
      else if (e.key === ' ') { e.preventDefault(); s.togglePlay(); }
      else if (e.key === 'Home') { e.preventDefault(); s.first(); }
      else if (e.key === 'End') { e.preventDefault(); s.last(); }
      else if (e.key === 'F8') { e.preventDefault(); s.continueToBreakpoint(); }
      else if (e.key === 'Escape') setFull(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const frame = st.frames[st.index];
  const prev = st.index > 0 ? st.frames[st.index - 1] : undefined;
  const usedHl = new Set<string>();
  const collect = (v: typeof frame.visual | undefined) => {
    if (!v) return;
    if (v.kind === 'composite') v.parts.forEach(collect);
    else if ('highlights' in v && v.highlights) Object.values(v.highlights).forEach((h) => usedHl.add(h as string));
  };
  collect(frame?.visual);

  const codePane = <CodePane source={mod.source} activeLine={frame?.line ?? null} breakpoints={st.breakpoints} onToggleBreakpoint={st.toggleBreakpoint} />;
  const varsPane = <VariablesPane frame={frame} prev={prev} />;
  const inputPane = <InputForm meta={mod.meta} value={st.input} onRun={(v) => st.load(mod, v)} />;
  const visualPane = (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center overflow-auto p-4">
        {st.error ? (
          <div className="flex items-center gap-2 rounded-lg border border-viz-swap/40 bg-viz-swap/10 p-3 text-sm"><AlertTriangle size={16} /> Lỗi: {st.error}</div>
        ) : frame ? <Visual v={frame.visual} /> : <div className="text-sm text-fg-muted">Không có frame</div>}
      </div>
      <div className="border-t border-border bg-surface-2/60 px-4 py-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">dòng {frame?.line}</span>
          <p className="text-sm leading-relaxed">{frame?.note ?? '—'}</p>
        </div>
        {st.truncated && <p className="mt-2 text-xs text-viz-compare">Input quá lớn, chỉ ghi lại {st.frames.length} bước đầu.</p>}
        {usedHl.size > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {[...usedHl].map((h) => (
              <span key={h} className="inline-flex items-center gap-1 text-[11px] text-fg-muted"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: HL_COLOR[h as keyof typeof HL_COLOR] }} />{HL_LABEL[h as keyof typeof HL_LABEL]}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn('flex flex-col overflow-hidden rounded-2xl border border-border bg-surface', full ? 'fixed inset-2 z-50 shadow-2xl' : 'h-[calc(100vh-14rem)] min-h-[560px]')}>
      {/* mobile tabs */}
      <div className="flex items-center justify-between border-b border-border bg-surface-2 px-2 lg:hidden">
        <div className="flex">
          {([['visual', Eye, 'Visual'], ['code', Code2, 'Code'], ['vars', Variable, 'Biến'], ['input', SlidersHorizontal, 'Input']] as const).map(([k, Icon, label]) => (
            <button key={k} type="button" onClick={() => setMobileTab(k)} className={cn('flex items-center gap-1 border-b-2 px-3 py-2 text-xs', mobileTab === k ? 'border-accent text-accent' : 'border-transparent text-fg-muted')}><Icon size={14} />{label}</button>
          ))}
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        {/* desktop: 3 columns */}
        <div className={cn('hidden w-[38%] min-w-0 flex-col border-r border-border lg:flex', full && 'w-[32%]')}>
          <PaneHeader icon={<Code2 size={14} />} title="impl.ts" hint="click số dòng để đặt breakpoint" />
          <div className="min-h-0 flex-1 overflow-auto">{codePane}</div>
        </div>
        <div className="hidden min-w-0 flex-1 flex-col lg:flex">
          <PaneHeader icon={<Eye size={14} />} title="Visualize" right={<button type="button" onClick={() => setFull((f) => !f)} className="rounded p-1 hover:bg-surface-3" title={full ? 'Thu nhỏ (Esc)' : 'Mở rộng'}>{full ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>} />
          <div className="min-h-0 flex-1">{visualPane}</div>
        </div>
        <div className="hidden w-[24%] min-w-[220px] flex-col border-l border-border lg:flex">
          {mod.meta.inputs.length > 0 && (
            <>
              <PaneHeader icon={<SlidersHorizontal size={14} />} title="Input" />
              <div className="max-h-[45%] overflow-auto border-b border-border">{inputPane}</div>
            </>
          )}
          <PaneHeader icon={<Variable size={14} />} title="Biến & Call stack" />
          <div className="min-h-0 flex-1 overflow-auto">{varsPane}</div>
        </div>
        {/* mobile */}
        <div className="flex min-h-0 flex-1 flex-col lg:hidden">
          {mobileTab === 'visual' && visualPane}
          {mobileTab === 'code' && <div className="min-h-0 flex-1 overflow-auto">{codePane}</div>}
          {mobileTab === 'vars' && <div className="min-h-0 flex-1 overflow-auto">{varsPane}</div>}
          {mobileTab === 'input' && <div className="min-h-0 flex-1 overflow-auto">{inputPane}</div>}
        </div>
      </div>
      <Controls />
    </div>
  );
}

function PaneHeader({ icon, title, hint, right }: { icon: React.ReactNode; title: string; hint?: string; right?: React.ReactNode }) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-surface-2 px-3 text-xs">
      <span className="flex items-center gap-1.5 font-medium">{icon}{title}{hint && <span className="hidden font-normal text-fg-muted xl:inline">· {hint}</span>}</span>
      {right}
    </div>
  );
}
