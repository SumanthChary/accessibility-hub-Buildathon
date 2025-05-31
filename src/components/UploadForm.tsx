import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Link as LinkIcon, Mic, Image, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSpeech } from '@/hooks/use-speech';
import { useVision } from '@/hooks/use-vision';
import { useDocument } from '@/hooks/use-document';
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
  const { transcribeAudio, synthesizeSpeech } = useSpeech();
  const { analyzeImage, answerImageQuestion } = useVision();
  const { parseDocument, extractInformation } = useDocument();

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
    const isAudio = file.type.startsWith('audio/');
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    
    const supportedTypes = [
      ...API_CONFIG.supportedAudioFormats,
      ...API_CONFIG.supportedImageFormats,
      ...API_CONFIG.supportedDocumentFormats
    ];
    
    if (!supportedTypes.includes(file.type)) {
      toast({
        title: 'Unsupported File Type',
        description: `Please upload one of: ${supportedTypes.join(', ')}`,
        variant: 'destructive'
      });
      return;
    }

    // Check file size
    if (isAudio && file.size > API_CONFIG.maxAudioFileSize) {
      toast({
        title: "File too large",
        description: "Audio files must be less than 25MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setInputUrl('');
    setProcessing(true);

    try {
      if (isAudio) {
        const transcript = await transcribeAudio(file);
        toast({
          title: "Audio transcribed successfully",
          description: "Your audio has been converted to text."
        });
      } else if (isImage) {
        const analysis = await analyzeImage(file);
        toast({
          title: "Image analyzed successfully",
          description: "Image analysis and description are ready."
        });
      } else if (isPDF) {
        const parsedDoc = await parseDocument(file);
        toast({
          title: "Document processed successfully",
          description: "Document content and structure extracted."
        });
      }
    } catch (err) {
      toast({
        title: "Processing failed",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
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
      setUploadedFile(null); // Clear file if URL is entered
      onUrlSubmit(inputUrl.trim());
      toast({
        title: "URL added successfully",
        description: "Ready to apply accessibility features."
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div 
        className={`
          relative p-8 border-2 border-dashed rounded-lg transition-all
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-gray-400'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Mic className="w-8 h-8 text-blue-500" />
            <Image className="w-8 h-8 text-green-500" />
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Drag and drop your file here</h3>
            <p className="text-sm text-gray-500">
              Support for audio, images, and PDFs up to 50MB
            </p>
          </div>

          <div className="flex justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button 
                variant="outline" 
                className="relative"
                disabled={processing}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept={[...API_CONFIG.supportedAudioFormats, ...API_CONFIG.supportedImageFormats, ...API_CONFIG.supportedDocumentFormats].join(',')}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="url"
            placeholder="Or paste a URL to process..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => {
            if (inputUrl) onUrlSubmit(inputUrl);
          }}
          disabled={!inputUrl || processing}
        >
          Process URL
        </Button>
      </div>

      {uploadedFile && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {uploadedFile.type.startsWith('audio/') && <Mic className="w-4 h-4 text-blue-500" />}
              {uploadedFile.type.startsWith('image/') && <Image className="w-4 h-4 text-green-500" />}
              {uploadedFile.type === 'application/pdf' && <FileText className="w-4 h-4 text-purple-500" />}
              <span className="text-sm font-medium">{uploadedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadedFile(null)}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
