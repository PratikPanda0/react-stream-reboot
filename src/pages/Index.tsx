
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
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processedFiles, setProcessedFiles] = useState(0);
  const [failedFiles, setFailedFiles] = useState(0);
  const [skippedFiles, setSkippedFiles] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [jsonFiles, setJsonFiles] = useState(0);
  const [tiffFiles, setTiffFiles] = useState(0);

  const handleProcessFiles = () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setHasProcessed(true);
    setProcessingTime(0);
    setProcessedFiles(0);
    setFailedFiles(0);
    
    // Simulate processing
    const interval = setInterval(() => {
      setProcessingTime(prev => prev + 0.1);
    }, 100);

    // Simulate processing files one by one
    let currentFile = 0;
    const processInterval = setInterval(() => {
      if (currentFile < files.length - 1) {
        setProcessedFiles(prev => prev + 1);
        currentFile++;
      }
    }, 1500);

    setTimeout(() => {
      setIsProcessing(false);
      clearInterval(interval);
      clearInterval(processInterval);
      setProcessingTime(9.0);
      setProcessedFiles(1);
      setFailedFiles(files.length - 1);
      setSkippedFiles(0);
      setJsonFiles(1);
      setTiffFiles(1);
    }, 3000);
  };

  return (
    <Layout>
      <div className="h-full overflow-y-auto bg-background">
        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Upload Documents */}
            <div className="space-y-6">
              {/* Processing Settings inside Upload Documents area */}
              <ProcessingSettings
                pageLimit={pageLimit}
                parallelWorkers={parallelWorkers}
                fileTypes={fileTypes}
                onPageLimitChange={setPageLimit}
                onParallelWorkersChange={setParallelWorkers}
                onFileTypesChange={setFileTypes}
              />

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

            {/* Right Column - Processing Status - Only show after processing starts */}
            {hasProcessed && (
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
            )}
          </div>

          {/* Processing Details - Full width at bottom - Only show after processing starts */}
          {hasProcessed && (
            <ProcessingDetails 
              isVisible={files.length > 0} 
              files={files}
              isProcessing={isProcessing}
              processedFiles={processedFiles}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
