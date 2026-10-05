import { useEffect, useRef } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from '@/lib/useTheme';
import { cn } from '@/lib/cn';

interface Props {
  source: string;
  activeLine: number | null;
  breakpoints: Set<number>;
  onToggleBreakpoint: (line: number) => void;
}

export function CodePane({ source, activeLine, breakpoints, onToggleBreakpoint }: Props) {
  const { dark } = useTheme();
  const activeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeLine]);

  return (
    <Highlight code={source.trimEnd()} language="tsx" theme={dark ? themes.nightOwl : themes.github}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre className="h-full overflow-auto bg-transparent p-0 font-mono text-[12.5px] leading-[1.55]">
          {tokens.map((line, i) => {
            const ln = i + 1;
            const active = ln === activeLine;
            const bp = breakpoints.has(ln);
            return (
              <div key={i} {...getLineProps({ line })} ref={active ? activeRef : undefined}
                className={cn('flex min-w-max items-stretch pr-3 transition-colors', active && 'bg-accent/15 ring-1 ring-inset ring-accent/40')}>
                <button type="button" onClick={() => onToggleBreakpoint(ln)} title="Đặt/xoá breakpoint"
                  className="group flex w-7 shrink-0 cursor-pointer items-center justify-center">
                  <span className={cn('h-2.5 w-2.5 rounded-full transition-all', bp ? 'bg-viz-swap' : 'bg-transparent group-hover:bg-viz-swap/40')} />
                </button>
                <span className={cn('w-8 shrink-0 select-none pr-2 text-right text-fg-muted/70', active && 'font-bold text-accent')}>{ln}</span>
                <span className="w-4 shrink-0 text-accent">{active ? '▶' : ''}</span>
                <span>{line.map((token, k) => <span key={k} {...getTokenProps({ token })} />)}</span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
