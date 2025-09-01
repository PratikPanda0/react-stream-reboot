
import React from 'react';
import { BarChart3, Clock, CheckCircle, XCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessingStatusProps {
  totalFiles: number;
  processedFiles: number;
  failedFiles: number;
  skippedFiles: number;
  processingTime: number;
  isProcessing: boolean;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  totalFiles,
  processedFiles,
  failedFiles,
  skippedFiles,
  processingTime,
  isProcessing
}) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <BarChart3 className="h-5 w-5 text-processing-yellow" />
          Processing Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-status-uploaded">{totalFiles}</div>
            <div className="text-xs text-card-foreground/60">Total Files</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold text-status-completed ${isProcessing ? 'animate-pulse-processing' : ''}`}>
              {processedFiles}
            </div>
            <div className="text-xs text-card-foreground/60">Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-status-failed">{failedFiles}</div>
            <div className="text-xs text-card-foreground/60">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-status-processing">{skippedFiles}</div>
            <div className="text-xs text-card-foreground/60">Skipped</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-card-foreground/80">Total Processing Time</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-processing-blue" />
              <span className="font-mono text-processing-blue">{processingTime.toFixed(1)}s</span>
            </div>
          </div>
          
          {isProcessing && (
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 animate-pulse-processing"
                style={{ width: `${Math.min((processedFiles / Math.max(totalFiles, 1)) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
