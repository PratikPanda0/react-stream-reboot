
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Navbar */}
      <header className="bg-card border-b border-border p-4 flex items-center gap-3 z-10">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold text-card-foreground">Document Processing Portal</h1>
          <p className="text-card-foreground/70 text-sm">
            Unified PDF & ZIP Processing with Parallel Multimodal Support
          </p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with Toggle */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0' : 'w-64'} relative`}>
          <Sidebar collapsed={sidebarCollapsed} />
          
          {/* Toggle Arrow */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-4 bg-card border border-border rounded-full p-1 shadow-lg hover:bg-accent z-20"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-card-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-card-foreground" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
