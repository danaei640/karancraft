'use client';

import * as React from 'react';
import { useTheme } from '@wrksz/themes/client';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative size-9 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 border border-neutral-interactive/30 active:scale-95 transition-all cursor-pointer ${className}`}
      title={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      aria-label="Toggle theme"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4 transition-transform duration-200 rotate-0 hover:rotate-45 text-amber-400" />
        ) : (
          <Moon className="size-4 transition-transform duration-200 rotate-0 hover:-rotate-12 text-neutral-text" />
        )
      ) : (
        <span className="size-4 block rounded-full bg-neutral-interactive/50" />
      )}
    </button>
  );
}
