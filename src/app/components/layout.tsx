'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { ComponentSidebar } from '@/components/preview/component-sidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-neutral-surface text-neutral-text overflow-hidden">
      {/* Unified Global Site Header */}
      <SiteHeader
        showSidebarToggle
        onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
      />

      <div className="flex-1 flex min-w-0 overflow-hidden relative">
        {/* Desktop Fixed Sidebar */}
        <div className="hidden md:block shrink-0">
          <ComponentSidebar />
        </div>

        {/* Mobile Slide-Over Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-text/25 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Slide-over panel */}
            <div className="relative w-80 max-w-[85vw] bg-neutral-surface shadow-2xl flex flex-col h-full z-10 border-r border-neutral-interactive/50 animate-in slide-in-from-left duration-200">
              <ComponentSidebar onClose={() => setMobileSidebarOpen(false)} isMobile />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-3.5rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
