import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { useDebugger } from './useDebugger';
import { cn } from '@/lib/cn';

const SPEEDS = [
  { label: '0.25×', ms: 1600 },
  { label: '0.5×', ms: 1000 },
  { label: '1×', ms: 600 },
  { label: '2×', ms: 300 },
  { label: '4×', ms: 120 },
];

function Btn({ onClick, title, children, disabled, primary }: { onClick: () => void; title: string; children: React.ReactNode; disabled?: boolean; primary?: boolean }) {
  return (
    <button type="button" onClick={onClick} title={title} disabled={disabled}
      className={cn('inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border transition hover:bg-surface-3 disabled:cursor-not-allowed disabled:opacity-40',
        primary && 'h-10 w-10 border-accent bg-accent text-accent-fg hover:bg-accent/90')}>
      {children}
    </button>
  );
}

export function Controls() {
  const { frames, index, playing, speed, breakpoints, first, prev, next, last, togglePlay, setSpeed, goto, continueToBreakpoint } = useDebugger();
  const total = frames.length;
  const atEnd = index >= total - 1;
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-border bg-surface-2 px-3 py-2">
      <div className="flex items-center gap-1">
        <Btn onClick={first} title="Về đầu (Home)" disabled={index === 0}><ChevronFirst size={18} /></Btn>
        <Btn onClick={prev} title="Lùi 1 bước (←)" disabled={index === 0}><ChevronLeft size={18} /></Btn>
        <Btn onClick={togglePlay} title={playing ? 'Tạm dừng (Space)' : 'Chạy tự động (Space)'} primary>{playing ? <Pause size={18} /> : atEnd ? <RotateCcw size={18} /> : <Play size={18} />}</Btn>
        <Btn onClick={next} title="Tiến 1 bước (→)" disabled={atEnd}><ChevronRight size={18} /></Btn>
        <Btn onClick={last} title="Tới cuối (End)" disabled={atEnd}><ChevronLast size={18} /></Btn>
        <Btn onClick={continueToBreakpoint} title={breakpoints.size ? 'Chạy tới breakpoint kế tiếp (F8)' : 'Chưa có breakpoint – click vào số dòng để đặt'} disabled={atEnd}><SkipForward size={18} /></Btn>
      </div>
      <div className="flex flex-1 items-center gap-2 px-2">
        <span className="w-20 shrink-0 text-right font-mono text-xs text-fg-muted">{total ? index + 1 : 0} / {total}</span>
        <input type="range" min={0} max={Math.max(0, total - 1)} value={index} onChange={(e) => goto(Number(e.target.value))} className="w-full accent-accent" aria-label="Timeline" />
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
        {SPEEDS.map((s) => (
          <button key={s.ms} type="button" onClick={() => setSpeed(s.ms)}
            className={cn('rounded-md px-2 py-1 text-xs transition', speed === s.ms ? 'bg-accent text-accent-fg' : 'hover:bg-surface-3')}>{s.label}</button>
        ))}
      </div>
    </div>
  );
}
