
import React from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface ProcessingDetailsProps {
  isVisible: boolean;
  files: UploadedFile[];
  isProcessing: boolean;
  processedFiles: number;
}

export const ProcessingDetails: React.FC<ProcessingDetailsProps> = ({ 
  isVisible, 
  files, 
  isProcessing, 
  processedFiles 
}) => {
  if (!isVisible) return null;

  const getFileStatus = (index: number) => {
    if (isProcessing) {
      if (index < processedFiles) {
        return { status: '✓ Completed', color: 'text-processing-green', message: 'Processing successful' };
      } else if (index === processedFiles) {
        return { status: '⏳ Processing...', color: 'text-processing-yellow', message: 'Currently processing' };
      } else {
        return { status: '⏸️ Pending', color: 'text-card-foreground/60', message: 'Waiting to process' };
      }
    } else {
      // After processing is complete
      if (index === 0) {
        return { status: '✓ Completed', color: 'text-processing-green', message: 'Processing successful' };
      } else {
        return { status: '❌ Failed', color: 'text-processing-red', message: 'Processing failed' };
      }
    }
  };

  const getProcessingTime = (index: number) => {
    if (!isProcessing && index === 0) {
      return '4.2s';
    } else if (isProcessing && index < processedFiles) {
      return `${(Math.random() * 5 + 1).toFixed(1)}s`;
    }
    return '-';
  };

  const getJsonOutput = (index: number) => {
    if ((!isProcessing && index === 0) || (isProcessing && index < processedFiles)) {
      return `${files[index].name.replace(/\.[^/.]+$/, '')}_output.json`;
    }
    return '-';
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Activity className="h-5 w-5 text-processing-green" />
          Processing Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-card-foreground/80">Filename</TableHead>
                <TableHead className="text-card-foreground/80">Status</TableHead>
                <TableHead className="text-card-foreground/80">Message</TableHead>
                <TableHead className="text-card-foreground/80">Processing Time</TableHead>
                <TableHead className="text-card-foreground/80">JSON Output</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, index) => {
                const fileStatus = getFileStatus(index);
                return (
                  <TableRow key={index} className="bg-secondary/20">
                    <TableCell className="text-card-foreground">{file.name}</TableCell>
                    <TableCell>
                      <span className={fileStatus.color}>{fileStatus.status}</span>
                    </TableCell>
                    <TableCell className="text-card-foreground/60">{fileStatus.message}</TableCell>
                    <TableCell className="text-processing-blue">{getProcessingTime(index)}</TableCell>
                    <TableCell className="text-processing-blue">{getJsonOutput(index)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
