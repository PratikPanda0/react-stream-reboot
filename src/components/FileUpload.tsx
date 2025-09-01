
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
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
        <div className="space-y-2">
          <p className="text-sm text-card-foreground/80">Choose PDF or ZIP files</p>
          
          <div
            {...getRootProps()}
            className={`upload-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive || dragOver
                ? 'border-primary bg-primary/5 drag-over'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-card-foreground mb-2">
              {isDragActive ? 'Drop files here...' : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-card-foreground/60 mb-4">
              Limit 200MB per file • PDF, ZIP
            </p>
            <Button variant="outline" className="bg-secondary border-border text-card-foreground hover:bg-primary hover:text-primary-foreground">
              Browse Files
            </Button>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-processing-green">
                📁 {files.length} file(s) uploaded
              </p>
            </div>
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4 text-processing-blue" />
                    <span className="text-sm text-card-foreground truncate">{file.name}</span>
                    <span className="text-xs text-card-foreground/60">({formatFileSize(file.size)})</span>
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
