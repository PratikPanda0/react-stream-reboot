
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, BarChart3 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStatsClick = () => {
    navigate('/statistics');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Navbar */}
      <header className="bg-card border-b border-border p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-card-foreground">Document Processing Portal</h1>
            <p className="text-card-foreground/70 text-sm">
              Unified PDF & ZIP Processing with Parallel Multimodal Support
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {location.pathname === '/statistics' ? (
            <Button 
              onClick={handleHomeClick}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Home
            </Button>
          ) : (
            <Button 
              onClick={handleStatsClick}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Stats
            </Button>
          )}
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
