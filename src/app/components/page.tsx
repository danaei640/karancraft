'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  COMPONENTS_METADATA,
  CATEGORIES,
  getComponentsByCategory,
} from '@/lib/components-meta';
import {
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Box,
  Compass,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

export default function ComponentsIndexPage() {
  const [search, setSearch] = useState('');
  const categorized = getComponentsByCategory();

  const totalComponents = Object.keys(COMPONENTS_METADATA).length;

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-background">
      {/* Header Banner */}
      <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-muted/30 via-background to-muted/20 p-8 flex flex-col gap-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/40">
              <Sparkles className="size-3.5 text-primary" />
              <span>Custom Component Preview & Test Workbench</span>
            </div>
            <h1 className="text-3xl font-bold font-heading tracking-tight">
              Karan UI Component System
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore, test, and interact with all {totalComponents} components and primitives with modern styling and tokens.
              Features full prop controls, portable story execution, and automated assertion tests.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-full bg-muted border border-border/40 text-foreground font-semibold">
                {totalComponents} Components
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                <span>100% Tested</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Search */}
        <div className="relative max-w-md pt-2">
          <Search className="size-4 absolute left-3.5 top-[calc(50%+4px)] -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder={`Search across all ${totalComponents} components...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full bg-background border border-border/60 shadow-xs focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Categorized Component Grids */}
      <div className="space-y-8">
        {CATEGORIES.map((category) => {
          const items = categorized[category].filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase()) ||
              item.id.toLowerCase().includes(search.toLowerCase())
          );

          if (items.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/30 pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold font-heading">{category}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono">
                    {items.length}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/components/${item.id}`}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-border/40 bg-card hover:bg-muted/20 hover:border-border transition-all duration-200 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-foreground font-heading group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                        <ArrowRight className="size-3.5 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all" />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                      <span>{item.props.length} props</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground text-[10px]">
                        Base UI
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
