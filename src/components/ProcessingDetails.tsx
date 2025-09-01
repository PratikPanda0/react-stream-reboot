
import React from 'react';
import { FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProcessingDetailsProps {
  isVisible: boolean;
}

export const ProcessingDetails: React.FC<ProcessingDetailsProps> = ({ isVisible }) => {
  if (!isVisible) return null;

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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-card-foreground/80">Filename</th>
                <th className="text-left py-2 text-card-foreground/80">Status</th>
                <th className="text-left py-2 text-card-foreground/80">Message</th>
                <th className="text-left py-2 text-card-foreground/80">Processing Time</th>
                <th className="text-left py-2 text-card-foreground/80">JSON Output</th>
              </tr>
            </thead>
            <tbody className="space-y-1">
              <tr className="bg-secondary/20">
                <td className="py-2 text-card-foreground">example_file.pdf</td>
                <td className="py-2">
                  <span className="text-processing-green">✓ Completed</span>
                </td>
                <td className="py-2 text-card-foreground/60">Processing successful</td>
                <td className="py-2 text-processing-blue">4.2s</td>
                <td className="py-2 text-processing-blue">output.json</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
