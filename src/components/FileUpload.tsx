
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    onFilesChange([...files, ...newFiles]);
    setDragOver(false);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip'],
      'application/octet-stream': ['.001']
    },
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false)
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Upload className="h-5 w-5 text-processing-blue" />
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Processing Settings Collapsible */}
        <div className="bg-secondary/20 rounded-lg border border-border hidden">
          <button
            onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
            className="w-full flex items-center gap-2 p-3 text-left hover:bg-secondary/30 transition-colors"
          >
            {isSettingsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <span className="text-sm font-medium text-card-foreground">Processing Settings</span>
          </button>
          {isSettingsExpanded && (
            <div className="p-3 pt-0 border-t border-border">
              <p className="text-xs text-card-foreground/60">Processing settings would go here</p>
            </div>
          )}
        </div>

        {/* File Upload Area */}
        <div className="space-y-2">
          <p className="text-sm text-card-foreground">Choose PDF or ZIP files</p>
          
          <div
            {...getRootProps()}
            className={`upload-area border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive || dragOver
                ? 'border-primary bg-primary/5 drag-over'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 text-card-foreground/60 mx-auto mb-2" />
            <p className="text-card-foreground/80 text-sm mb-1">
              Drag and drop files here
            </p>
            <p className="text-xs text-card-foreground/60 mb-3">
              Limit 200MB per file • PDF, ZIP
            </p>
            <Button variant="outline" size="sm" className="bg-secondary border-border text-card-foreground hover:bg-primary hover:text-primary-foreground">
              Browse Files
            </Button>
          </div>
        </div>

        {/* Show uploaded files in the screenshot format */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-secondary/30 p-3 rounded border border-border">
                <div className="flex items-center gap-3">
                  <File className="h-4 w-4 text-card-foreground" />
                  <div>
                    <p className="text-sm text-card-foreground font-medium">{file.name}</p>
                    <p className="text-xs text-card-foreground/60">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6 p-0 hover:bg-processing-red/20"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}

            {/* Green status bar */}
            <div className="bg-processing-green/20 border border-processing-green/30 rounded p-3">
              <p className="text-sm font-medium text-processing-green flex items-center gap-2">
                ✓ {files.length} file(s) uploaded
              </p>
            </div>

            {/* Uploaded Files List */}
            <div className="space-y-2">
              <h4 className="text-card-foreground font-medium">Uploaded Files:</h4>
              <div className="space-y-1">
                {files.map((file, index) => (
                  <div key={`list-${index}`} className="flex items-center gap-2 text-sm">
                    <File className="h-3 w-3 text-card-foreground" />
                    <span className="text-card-foreground">{file.name}</span>
                    <span className="text-card-foreground/60">({formatFileSize(file.size)})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {files.length === 0 && (
          <div className="text-center py-2">
            <p className="text-card-foreground/60 text-sm">
              👆 Please upload PDF or ZIP files to begin processing
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
