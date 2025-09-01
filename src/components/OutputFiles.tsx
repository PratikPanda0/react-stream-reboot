
import React from 'react';
import { Download, FileText, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OutputFilesProps {
  jsonFiles: number;
  tiffFiles: number;
  isProcessingComplete: boolean;
}

export const OutputFiles: React.FC<OutputFilesProps> = ({
  jsonFiles,
  tiffFiles,
  isProcessingComplete
}) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <FileText className="h-5 w-5 text-processing-yellow" />
          Output Files
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-processing-blue">{jsonFiles}</div>
            <div className="text-xs text-card-foreground/60">JSON Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-processing-blue">{tiffFiles}</div>
            <div className="text-xs text-card-foreground/60">TIFF Files</div>
          </div>
        </div>

        {isProcessingComplete && jsonFiles > 0 && (
          <div className="space-y-2">
            <div className="bg-processing-yellow/20 border border-processing-yellow/30 rounded p-3">
              <p className="text-sm text-processing-yellow">
                ⚠️ 50.0% of files processed successfully
              </p>
            </div>
            
            <Button className="w-full bg-processing-red hover:bg-processing-red/90 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Processed Results
            </Button>
            
            <div className="bg-processing-blue/20 border border-processing-blue/30 rounded p-3">
              <div className="flex items-center gap-2 text-processing-blue text-sm">
                <Download className="h-4 w-4" />
                <span>Download includes: JSON output files • TIFF image files</span>
              </div>
              <p className="text-xs text-card-foreground/60 mt-1">Archive size: 0.15 MB</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
