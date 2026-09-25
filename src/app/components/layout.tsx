import React from 'react';
import { ComponentSidebar } from '@/components/preview/component-sidebar';

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <ComponentSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}
