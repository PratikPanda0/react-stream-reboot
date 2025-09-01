
import React from 'react';
import { FileText, Info } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  if (collapsed) return null;

  return (
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border p-4 overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h2 className="text-sidebar-foreground font-semibold">Information</h2>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sidebar-foreground font-medium mb-3">How to use:</h3>
          <ol className="space-y-2 text-sm text-sidebar-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">1.</span>
              <span>Upload PDF or ZIP files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">2.</span>
              <span>Adjust processing settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">3.</span>
              <span>Click 'Process Files'</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">4.</span>
              <span>Wait for processing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">5.</span>
              <span>Download results (JSON + TIFF)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium min-w-[16px]">6.</span>
              <span>View stats for historical data</span>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-sidebar-foreground font-medium mb-3">Supported formats:</h3>
          <ul className="space-y-2 text-sm text-sidebar-foreground/80">
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-processing-red" />
              <span>PDF documents (converted to TIFF)</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-processing-blue" />
              <span>ZIP files containing .001 files</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sidebar-foreground font-medium mb-3">Processing features:</h3>
          <ul className="space-y-1 text-sm text-sidebar-foreground/80">
            <li>• Parallel multimodal processing</li>
            <li>• OCR text extraction</li>
            <li>• Entity extraction with LLM</li>
            <li>• Document classification</li>
            <li>• Confidence scoring</li>
            <li>• TIFF image output</li>
            <li>• Accurate success/failure tracking</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
