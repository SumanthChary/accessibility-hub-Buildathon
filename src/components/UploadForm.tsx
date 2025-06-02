
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Link as LinkIcon, Mic, Image, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_CONFIG } from '@/lib/api-config';

interface UploadFormProps {
  inputUrl: string;
  setInputUrl: (url: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  onUrlSubmit: (url: string) => void;
}

export const UploadForm = ({ 
  inputUrl, 
  setInputUrl, 
  uploadedFile, 
  setUploadedFile,
  onUrlSubmit 
}: UploadFormProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      handleFileSelect(file);
    }
  };

  const handleFileSelect = async (file: File) => {
    // Check file type and size
    const supportedTypes = [
      ...API_CONFIG.supportedAudioFormats,
      ...API_CONFIG.supportedImageFormats,
      ...API_CONFIG.supportedDocumentFormats
    ];
    
    if (!supportedTypes.includes(file.type)) {
      toast({
        title: 'Unsupported File Type',
        description: `Please upload one of: Audio (MP3, WAV), Images (JPG, PNG, WebP), or PDF files`,
        variant: 'destructive'
      });
      return;
    }

    // Check file size
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Files must be less than 50MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setInputUrl('');
    
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for processing.`
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setUploadedFile(null);
      onUrlSubmit(inputUrl.trim());
      toast({
        title: "URL added successfully",
        description: "Ready to apply accessibility features."
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">
      <div 
        className={`
          relative p-6 sm:p-8 lg:p-12 border-2 border-dashed rounded-lg sm:rounded-xl transition-all
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-gray-400'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center space-x-3 sm:space-x-4 lg:space-x-6">
            <Mic className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-500" />
            <Image className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-500" />
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Drag and drop your file here</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500">
              Support for audio, images, and PDFs up to 50MB
            </p>
          </div>

          <div className="flex justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button 
                variant="outline" 
                className="relative px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base"
                disabled={processing}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept={[...API_CONFIG.supportedAudioFormats, ...API_CONFIG.supportedImageFormats, ...API_CONFIG.supportedDocumentFormats].join(',')}
                  onChange={handleFileInputChange}
                />
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="url"
            placeholder="Or paste a URL to process..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="pl-10 py-2 sm:py-3 text-sm sm:text-base"
          />
        </div>
        <Button
          onClick={handleUrlSubmit}
          disabled={!inputUrl || processing}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
        >
          Process URL
        </Button>
      </div>

      {uploadedFile && (
        <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              {uploadedFile.type.startsWith('audio/') && <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />}
              {uploadedFile.type.startsWith('image/') && <Image className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />}
              {uploadedFile.type === 'application/pdf' && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />}
              <span className="text-sm sm:text-base font-medium break-all">{uploadedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadedFile(null)}
              className="self-end sm:self-auto"
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
