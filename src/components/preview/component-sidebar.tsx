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
  Sparkles,
  Layers,
  ChevronRight,
  Sun,
  Moon,
  Home,
  BookOpen,
  Code2,
} from 'lucide-react';

export function ComponentSidebar() {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const categorized = getComponentsByCategory();
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
    <aside className="w-72 shrink-0 border-r border-border/40 bg-background flex flex-col h-screen sticky top-0 overflow-hidden select-none">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border/30 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold font-heading text-base tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="size-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">
              K
            </div>
            <span>karan-ui</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground font-mono font-medium">
              v0.1
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                document.documentElement.classList.toggle('dark');
              }}
              className="size-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              title="Toggle Dark Mode"
            >
              <Sun className="size-3.5 dark:hidden" />
              <Moon className="size-3.5 hidden dark:block" />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search 54 components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-full bg-muted/40 border border-border/40 focus:border-ring/50 focus:bg-background outline-none transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        <div className="px-2 py-1">
          <Link
            href="/components"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
              pathname === '/components'
                ? 'bg-secondary font-medium text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
            }`}
          >
            <Layers className="size-3.5 text-muted-foreground" />
            <span>All Components Overview</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-full bg-muted text-muted-foreground font-mono">
              54
            </span>
          </Link>
        </div>

        {Object.entries(filteredCategorized).map(([category, items]) => {
          const isCollapsed = collapsedCategories[category];
          return (
            <div key={category} className="space-y-1">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-muted-foreground/80 uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <span>{category}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-muted-foreground/60">
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
                        className={`group flex items-center justify-between px-3 py-1.5 rounded-full text-xs transition-all ${
                          isActive
                            ? 'bg-foreground text-background font-medium shadow-xs'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-background shrink-0" />
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
      <div className="p-3 border-t border-border/30 bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Home className="size-3.5" />
          <span>Home</span>
        </Link>
        <a
          href="/r/index.json"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-foreground transition-colors font-mono text-[11px]"
        >
          <Code2 className="size-3.5" />
          <span>/r/index.json</span>
        </a>
      </div>
    </aside>
  );
}
