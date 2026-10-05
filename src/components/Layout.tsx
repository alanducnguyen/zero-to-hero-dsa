import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BookmarkCheck, CheckCircle2, Code, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { LEVELS } from '@/content/levels';
import { ALGORITHMS, byLevel } from '@/content/registry';
import { useProgress } from '@/lib/progress';
import { useTheme } from '@/lib/useTheme';
import { cn } from '@/lib/cn';
import { SearchDialog } from './SearchDialog';

export function Layout() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  
  const { completed, bookmarked } = useProgress();
  const done = Object.keys(completed).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearch((s) => !s); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const sidebar = (
    <nav className="flex h-full flex-col gap-4 overflow-y-auto p-3">
      {LEVELS.map((l) => {
        const list = byLevel(l.id);
        return (
          <div key={l.id}>
            <NavLink to={`/level/${l.id}`} className="mb-1 flex items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-wider text-fg-muted hover:text-fg">
              <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-${l.color})` }} />{l.title}
              <span className="ml-auto font-mono text-[10px] font-normal">{list.filter((m) => completed[m.meta.id]).length}/{list.length}</span>
            </NavLink>
            <ul className="flex flex-col gap-0.5">
              {list.map((m) => (
                <li key={m.meta.id}>
                  <NavLink to={`/algo/${m.meta.id}`} className={({ isActive }) => cn('flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition', isActive ? 'bg-accent/12 font-medium text-accent' : 'text-fg/85 hover:bg-surface-3')}>
                    <span className="truncate">{m.meta.title}</span>
                    <span className="ml-auto flex shrink-0 items-center gap-1">
                      {bookmarked[m.meta.id] && <BookmarkCheck size={13} className="text-viz-compare" />}
                      {completed[m.meta.id] && <CheckCircle2 size={13} className="text-viz-done" />}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="flex h-full flex-col">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface/80 px-3 backdrop-blur md:px-4">
        <button type="button" className="rounded-lg p-2 hover:bg-surface-3 lg:hidden" onClick={() => setOpen(true)} aria-label="Mở menu"><Menu size={20} /></button>
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-fg">Z→H</span>
          <span className="hidden sm:inline">Zero to Hero <span className="text-accent">DSA</span></span>
        </Link>
        <button type="button" onClick={() => setSearch(true)} className="ml-2 hidden items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm text-fg-muted hover:bg-surface-3 md:flex">
          <Search size={14} /> Tìm thuật toán… <kbd className="ml-6 rounded border border-border px-1 font-mono text-[10px]">⌘K</kbd>
        </button>
        <div className="ml-auto flex items-center gap-1">
          <div className="mr-2 hidden items-center gap-2 text-xs text-fg-muted sm:flex">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-3"><div className="h-full bg-viz-done transition-all" style={{ width: `${(done / ALGORITHMS.length) * 100}%` }} /></div>
            {done}/{ALGORITHMS.length} hoàn thành
          </div>
          <button type="button" onClick={() => setSearch(true)} className="rounded-lg p-2 hover:bg-surface-3 md:hidden" aria-label="Tìm kiếm"><Search size={18} /></button>
          <button type="button" onClick={toggle} className="rounded-lg p-2 hover:bg-surface-3" aria-label="Đổi giao diện sáng/tối">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <a href="https://github.com/alanducnguyen/zero-to-hero-dsa" target="_blank" rel="noreferrer" className="rounded-lg p-2 hover:bg-surface-3" aria-label="GitHub"><Code size={18} /></a>
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-surface-2/40 lg:block">{sidebar}</aside>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">
              <div className="flex h-14 items-center justify-between border-b border-border px-4 font-semibold">Mục lục<button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-surface-3"><X size={18} /></button></div>
              <div className="h-[calc(100%-3.5rem)]" onClickCapture={(e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); }}>{sidebar}</div>
            </aside>
          </div>
        )}
        <main className="min-w-0 flex-1 overflow-y-auto"><Outlet /></main>
      </div>
      {search && <SearchDialog onClose={() => setSearch(false)} />}
    </div>
  );
}
