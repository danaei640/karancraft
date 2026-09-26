'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  COMPONENTS_METADATA,
  CATEGORIES,
  getComponentsByCategory,
} from '@/lib/components-meta';
import {
  Search,
  Layers,
  ChevronRight,
  Palette,
  X,
  BookOpen,
} from 'lucide-react';

interface ComponentSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function ComponentSidebar({ onClose, isMobile = false }: ComponentSidebarProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const categorized = getComponentsByCategory();
  const totalComponents = Object.keys(COMPONENTS_METADATA).length;
  const activeSlug = pathname?.split('/').pop() || 'button';

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const filteredCategorized = Object.entries(categorized).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, typeof categorized['Actions & Inputs']>
  );

  return (
    <aside
      className={`w-72 shrink-0 border-r border-neutral-interactive/40 bg-neutral-surface flex flex-col select-none ${
        isMobile ? 'h-full' : 'h-[calc(100vh-3.5rem)] sticky top-14'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-neutral-interactive/30 flex flex-col gap-2.5">
        {isMobile && (
          <div className="flex items-center justify-between pb-1 border-b border-neutral-interactive/20">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm font-heading">Component Library</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-surface-alt font-mono">
                {totalComponents}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-7 rounded-full flex items-center justify-center text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/50 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder={`Filter ${totalComponents} components...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full bg-neutral-interactive/40 border border-neutral-interactive/40 focus:border-primary-interactive-focus/50 focus:bg-neutral-surface outline-none transition-all placeholder:text-neutral-text-muted/60"
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        <div className="px-2 py-1 space-y-1">
          <Link
            href="/components"
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              pathname === '/components'
                ? 'bg-neutral-interactive font-medium text-neutral-text shadow-xs'
                : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <Layers className="size-3.5 text-neutral-text-muted" />
            <span>Overview & Directory</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-surface-alt text-neutral-text-muted font-mono">
              {totalComponents}
            </span>
          </Link>

          <Link
            href="/colors"
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              pathname === '/colors'
                ? 'bg-primary-fill font-medium text-primary-on-fill shadow-xs'
                : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
            }`}
          >
            <Palette className="size-3.5 text-primary-fill" />
            <span className="font-semibold">OKLCH Colors</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-primary-surface text-primary-text font-mono">
              Tokens
            </span>
          </Link>
        </div>

        {Object.entries(filteredCategorized).map(([category, items]) => {
          const isCollapsed = collapsedCategories[category];
          return (
            <div key={category} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-neutral-text-muted/80 uppercase tracking-wider hover:text-neutral-text transition-colors cursor-pointer"
              >
                <span>{category}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-neutral-text-muted/60">
                    {items.length}
                  </span>
                  <ChevronRight
                    className={`size-3 transition-transform duration-200 ${
                      isCollapsed ? '' : 'rotate-90'
                    }`}
                  />
                </div>
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5 pl-1">
                  {items.map((item) => {
                    const isActive = activeSlug === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={`/components/${item.id}`}
                        onClick={onClose}
                        className={`group flex items-center justify-between px-3 py-1.5 rounded-full text-xs transition-all ${
                          isActive
                            ? 'bg-neutral-text text-neutral-surface font-medium shadow-xs'
                            : 'text-neutral-text-muted hover:text-neutral-text hover:bg-neutral-interactive/40'
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-neutral-surface shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-neutral-interactive/30 bg-neutral-surface-alt/40 text-xs text-neutral-text-muted flex items-center justify-between">
        <Link
          href="/#guide"
          onClick={onClose}
          className="flex items-center gap-1.5 hover:text-neutral-text transition-colors"
        >
          <BookOpen className="size-3.5" />
          <span>CLI Guide</span>
        </Link>
        <span className="font-mono text-[10px] text-neutral-text-muted/70">
          Tailwind v4 · Base UI
        </span>
      </div>
    </aside>
  );
}
