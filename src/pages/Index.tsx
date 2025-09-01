
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ProcessingSettings } from '@/components/ProcessingSettings';
import { FileUpload } from '@/components/FileUpload';
import { ProcessingStatus } from '@/components/ProcessingStatus';
import { ProcessingDetails } from '@/components/ProcessingDetails';
import { OutputFiles } from '@/components/OutputFiles';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const Index = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pageLimit, setPageLimit] = useState(50);
  const [parallelWorkers, setParallelWorkers] = useState(4);
  const [fileTypes, setFileTypes] = useState(['I', 'PDF', 'ZIP']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState(1);
  const [failedFiles, setFailedFiles] = useState(1);
  const [skippedFiles, setSkippedFiles] = useState(0);
  const [processingTime, setProcessingTime] = useState(9.0);
  const [jsonFiles, setJsonFiles] = useState(1);
  const [tiffFiles, setTiffFiles] = useState(1);

  const handleProcessFiles = () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setProcessingTime(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingTime(prev => prev + 0.1);
    }, 100);

    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      setProcessingTime(9.0);
    }, 3000);
  };

  return (
    <Layout>
      <div className="h-full overflow-y-auto bg-background">
        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Processing Settings - Always visible at top */}
          <ProcessingSettings
            pageLimit={pageLimit}
            parallelWorkers={parallelWorkers}
            fileTypes={fileTypes}
            onPageLimitChange={setPageLimit}
            onParallelWorkersChange={setParallelWorkers}
            onFileTypesChange={setFileTypes}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - File Upload */}
            <div className="space-y-6">
              <FileUpload files={files} onFilesChange={setFiles} />
              
              {files.length > 0 && (
                <Button
                  onClick={handleProcessFiles}
                  disabled={isProcessing}
                  className="w-full bg-processing-red hover:bg-processing-red/90 text-white h-12 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {isProcessing ? 'Processing Files...' : 'Process Files'}
                </Button>
              )}
            </div>

            {/* Right Column - Status and Output */}
            <div className="space-y-6">
              <ProcessingStatus
                totalFiles={files.length}
                processedFiles={processedFiles}
                failedFiles={failedFiles}
                skippedFiles={skippedFiles}
                processingTime={processingTime}
                isProcessing={isProcessing}
              />
              
              <OutputFiles
                jsonFiles={jsonFiles}
                tiffFiles={tiffFiles}
                isProcessingComplete={!isProcessing && files.length > 0}
              />
            </div>
          </div>

          {/* Processing Details - Full width at bottom */}
          <ProcessingDetails isVisible={files.length > 0} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
