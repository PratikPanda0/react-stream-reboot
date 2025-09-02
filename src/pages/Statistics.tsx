
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { RefreshCw, X, BarChart3, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Statistics = () => {
  const summaryData = {
    totalSessions: 6,
    totalFilesProcessed: 11,
    successRate: "100.0%",
    avgProcessingTime: "17.0s"
  };

  const detailedStats = [
    { id: 0, timestamp: "2024-01-15 10:30:00", sessionId: "sess_001", fileCount: 2, filenames: "doc1.pdf, doc2.zip", processingTimes: "12.5s", finishTime: "10:30:15", totalTime: "15s", status: "Success", processed: 2, failed: 0, skipped: 0 },
    { id: 1, timestamp: "2024-01-15 11:45:00", sessionId: "sess_002", fileCount: 1, filenames: "report.pdf", processingTimes: "8.2s", finishTime: "11:45:10", totalTime: "10s", status: "Success", processed: 1, failed: 0, skipped: 0 },
    { id: 2, timestamp: "2024-01-15 14:20:00", sessionId: "sess_003", fileCount: 3, filenames: "data1.zip, data2.zip, manual.pdf", processingTimes: "25.8s", finishTime: "14:20:30", totalTime: "30s", status: "Success", processed: 3, failed: 0, skipped: 0 },
    { id: 3, timestamp: "2024-01-15 15:10:00", sessionId: "sess_004", fileCount: 2, filenames: "invoice.pdf, receipt.pdf", processingTimes: "14.3s", finishTime: "15:10:18", totalTime: "18s", status: "Success", processed: 2, failed: 0, skipped: 0 },
    { id: 4, timestamp: "2024-01-15 16:05:00", sessionId: "sess_005", fileCount: 1, filenames: "contract.zip", processingTimes: "9.7s", finishTime: "16:05:12", totalTime: "12s", status: "Success", processed: 1, failed: 0, skipped: 0 },
    { id: 5, timestamp: "2024-01-15 17:30:00", sessionId: "sess_006", fileCount: 2, filenames: "proposal.pdf, attachment.zip", processingTimes: "18.9s", finishTime: "17:30:22", totalTime: "22s", status: "Success", processed: 2, failed: 0, skipped: 0 },
  ];

  return (
    <Layout>
      <div className="h-full overflow-y-auto bg-background">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Processing Statistics</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Stats
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Clear All Stats
            </Button>
          </div>

          {/* Summary Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">Summary</h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-2xl font-bold text-card-foreground">{summaryData.totalSessions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Files Processed</p>
                <p className="text-2xl font-bold text-card-foreground">{summaryData.totalFilesProcessed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                <p className="text-2xl font-bold text-card-foreground">{summaryData.successRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Processing Time</p>
                <p className="text-2xl font-bold text-card-foreground">{summaryData.avgProcessingTime}</p>
              </div>
            </div>
          </div>

          {/* Detailed Statistics Table */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-card-foreground">Detailed Statistics</h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Timestamp</TableHead>
                    <TableHead className="text-xs">Session ID</TableHead>
                    <TableHead className="text-xs">Files Count</TableHead>
                    <TableHead className="text-xs">Filenames</TableHead>
                    <TableHead className="text-xs">Processing Times</TableHead>
                    <TableHead className="text-xs">Finish Time</TableHead>
                    <TableHead className="text-xs">Total Time (s)</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Processed</TableHead>
                    <TableHead className="text-xs">Failed</TableHead>
                    <TableHead className="text-xs">Skipped</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedStats.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/50">
                      <TableCell className="text-xs">{row.timestamp}</TableCell>
                      <TableCell className="text-xs">{row.sessionId}</TableCell>
                      <TableCell className="text-xs">{row.fileCount}</TableCell>
                      <TableCell className="text-xs max-w-48 truncate" title={row.filenames}>
                        {row.filenames}
                      </TableCell>
                      <TableCell className="text-xs">{row.processingTimes}</TableCell>
                      <TableCell className="text-xs">{row.finishTime}</TableCell>
                      <TableCell className="text-xs">{row.totalTime}</TableCell>
                      <TableCell className="text-xs">
                        <span className="text-green-600 font-medium">{row.status}</span>
                      </TableCell>
                      <TableCell className="text-xs">{row.processed}</TableCell>
                      <TableCell className="text-xs">{row.failed}</TableCell>
                      <TableCell className="text-xs">{row.skipped}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;
