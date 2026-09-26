'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers,
  Palette,
  BookOpen,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  PanelLeft,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

function GithubIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface SiteHeaderProps {
  onToggleMobileSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export function SiteHeader({
  onToggleMobileSidebar,
  showSidebarToggle = false,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isComponentsActive = pathname?.startsWith('/components');
  const isColorsActive = pathname === '/colors';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-interactive/40 bg-neutral-surface/80 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3 sm:gap-4 flex-nowrap">
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {showSidebarToggle && (
            <button
              type="button"
              onClick={onToggleMobileSidebar}
              className="md:hidden size-8 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 border border-neutral-interactive/40 transition-colors cursor-pointer"
              title="Toggle Component List"
              aria-label="Toggle Component List"
            >
              <PanelLeft className="size-4" />
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold font-heading text-base tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <div className="size-7 rounded-xl bg-neutral-text text-neutral-surface flex items-center justify-center font-bold text-xs shadow-xs">
              K
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-neutral-text">
                karan-ui
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-primary-interactive/50 border border-primary-interactive/60 px-2 py-0.2 text-[10px] font-medium text-primary-text font-mono">
                v0.1
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Navigation (Desktop) - Guaranteed single-line flex-nowrap */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 text-xs font-medium text-neutral-text-muted flex-nowrap shrink-0">
          <Link
            href="/components"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
              isComponentsActive
                ? 'bg-neutral-interactive text-neutral-text font-semibold'
                : 'hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <Layers className="size-3.5 shrink-0" />
            <span>Components</span>
          </Link>

          <Link
            href="/colors"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
              isColorsActive
                ? 'bg-neutral-interactive text-neutral-text font-semibold'
                : 'hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <Palette className="size-3.5 text-primary-fill shrink-0" />
            <span>Colors<span className="hidden lg:inline"> & Tokens</span></span>
            <span className="hidden xl:inline-flex text-[10px] px-1.5 py-0.2 rounded-full bg-primary-surface text-primary-text font-mono font-medium border border-primary-interactive/40">
              OKLCH
            </span>
          </Link>

          <Link
            href="/#guide"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:text-neutral-text hover:bg-neutral-interactive/40 transition-colors whitespace-nowrap"
          >
            <BookOpen className="size-3.5 shrink-0" />
            <span>Guides</span>
          </Link>

          <a
            href="/r/index.json"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full hover:text-neutral-text hover:bg-neutral-interactive/40 transition-colors font-mono text-[11px] whitespace-nowrap"
          >
            <span>/r/index.json</span>
            <ExternalLink className="size-2.5 opacity-60" />
          </a>
        </nav>

        {/* Right: Actions (Theme Toggle, GitHub, Mobile Menu Button) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="size-9 rounded-full hidden sm:flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 border border-neutral-interactive/30 transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="size-4" />
          </a>

          {/* Unified, single Dark/Light Toggle */}
          <ThemeToggle />

          {/* Mobile Navigation Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-9 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 border border-neutral-interactive/30 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-interactive/40 bg-neutral-surface/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href="/components"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              isComponentsActive
                ? 'bg-neutral-interactive text-neutral-text font-semibold'
                : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="size-4" />
              <span>Components</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-surface-alt">54 Primitives</span>
          </Link>

          <Link
            href="/colors"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              isColorsActive
                ? 'bg-neutral-interactive text-neutral-text font-semibold'
                : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-primary-fill" />
              <span>Colors & OKLCH Engine</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-surface text-primary-text border border-primary-interactive/40">OKLCH</span>
          </Link>

          <Link
            href="/#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40 transition-colors"
          >
            <BookOpen className="size-4" />
            <span>Guides & CLI Spec</span>
          </Link>

          <div className="pt-2 border-t border-neutral-interactive/30 flex items-center justify-between px-3 text-xs text-neutral-text-muted">
            <a
              href="/r/index.json"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] hover:text-neutral-text"
            >
              <span>/r/index.json</span>
              <ExternalLink className="size-2.5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-text"
            >
              <GithubIcon className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
