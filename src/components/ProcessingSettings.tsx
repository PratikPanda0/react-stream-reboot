
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface ProcessingSettingsProps {
  pageLimit: number;
  parallelWorkers: number;
  fileTypes: string[];
  onPageLimitChange: (value: number) => void;
  onParallelWorkersChange: (value: number) => void;
  onFileTypesChange: (value: string[]) => void;
}

export const ProcessingSettings: React.FC<ProcessingSettingsProps> = ({
  pageLimit,
  parallelWorkers,
  fileTypes,
  onPageLimitChange,
  onParallelWorkersChange,
  onFileTypesChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleFileTypeChange = (value: string) => {
    const types = value.split(',').filter(Boolean);
    onFileTypesChange(types);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader 
        className="cursor-pointer pb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <CardTitle className="flex items-center justify-between text-card-foreground">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Processing Settings
          </div>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </CardTitle>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="space-y-6 animate-slide-up">
          <div className="space-y-2">
            <Label className="text-card-foreground">
              Page Limit: {pageLimit}
            </Label>
            <Slider
              value={[pageLimit]}
              onValueChange={(value) => onPageLimitChange(value[0])}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-card-foreground/60">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground">
              Parallel Workers: {parallelWorkers}
            </Label>
            <Slider
              value={[parallelWorkers]}
              onValueChange={(value) => onParallelWorkersChange(value[0])}
              max={4}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-card-foreground/60">
              <span>1</span>
              <span>4</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-card-foreground">File Types to Process</Label>
            <Select 
              value={fileTypes.join(',')} 
              onValueChange={handleFileTypeChange}
            >
              <SelectTrigger className="bg-input border-border text-card-foreground">
                <SelectValue placeholder="Select file types" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="I,PDF,ZIP" className="text-card-foreground">
                  All (I, PDF, ZIP)
                </SelectItem>
                <SelectItem value="I" className="text-card-foreground">
                  I files only
                </SelectItem>
                <SelectItem value="PDF" className="text-card-foreground">
                  PDF files only
                </SelectItem>
                <SelectItem value="ZIP" className="text-card-foreground">
                  ZIP files only
                </SelectItem>
                <SelectItem value="I,PDF" className="text-card-foreground">
                  I & PDF files
                </SelectItem>
                <SelectItem value="I,ZIP" className="text-card-foreground">
                  I & ZIP files
                </SelectItem>
                <SelectItem value="PDF,ZIP" className="text-card-foreground">
                  PDF & ZIP files
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
