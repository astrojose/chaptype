import React from 'react';
import { useNavigate } from 'react-router';

import { getPracticeModes } from '../../src/content/practiceContent';

type CommandItem = {
  id: string;
  label: string;
  group: string;
  action: () => void;
};

export function CommandPalette({ onToggleTheme }: Readonly<{ onToggleTheme: () => void }>) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const previousFocusRef = React.useRef<Element | null>(null);

  const allItems = React.useMemo<CommandItem[]>(() => {
    const modes = getPracticeModes();
    return [
      { id: 'nav-home', label: 'Home', group: 'Go to', action: () => navigate('/') },
      { id: 'nav-login', label: 'Sign in', group: 'Go to', action: () => navigate('/login') },
      { id: 'nav-settings', label: 'Settings', group: 'Go to', action: () => navigate('/settings') },
      { id: 'nav-about', label: 'About', group: 'Go to', action: () => navigate('/about') },
      ...modes.map((m) => ({
        id: `mode-${m.id}`,
        label: m.name,
        group: 'Practice',
        action: () => navigate(`/practice/${m.id}`),
      })),
      { id: 'action-theme', label: 'Toggle theme', group: 'Actions', action: onToggleTheme },
    ];
  }, [navigate, onToggleTheme]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q),
    );
  }, [allItems, query]);

  // Open/close via Cmd+K / Ctrl+K
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus management on open/close
  React.useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      setQuery('');
      setActiveIndex(0);
      // rAF ensures the DOM is painted before we focus
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      (previousFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [open]);

  // Reset active index when filtered list changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function close() {
    setOpen(false);
  }

  function runItem(item: CommandItem) {
    item.action();
    close();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (filtered.length === 0) return;
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (filtered.length === 0) return;
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = filtered[activeIndex];
      if (item) runItem(item);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  if (!open) return null;

  return (
    <div
      className="cmd-overlay"
      onClick={close}
      role="presentation"
    >
      <div
        className="cmd-palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          className="cmd-input"
          placeholder="Go to page or search practice modes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
          spellCheck={false}
          aria-label="Search commands"
          aria-activedescendant={filtered[activeIndex] ? `cmd-item-${filtered[activeIndex].id}` : undefined}
        />
        <div className="cmd-results" role="listbox" aria-label="Available commands">
          {filtered.length === 0 ? (
            <p className="cmd-empty">No results.</p>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                id={`cmd-item-${item.id}`}
                role="option"
                aria-selected={i === activeIndex}
                className={`cmd-item${i === activeIndex ? ' is-active' : ''}`}
                onClick={() => runItem(item)}
                tabIndex={-1}
                type="button"
              >
                <span className="cmd-item-group">{item.group}</span>
                <span className="cmd-item-label">{item.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
