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
}

export const UploadForm = ({ inputUrl, setInputUrl, uploadedFile, setUploadedFile }: UploadFormProps) => {
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
    const isDocument = API_CONFIG.supportedDocumentFormats.includes(file.type);

    if (!isAudio && !isImage && !isDocument) {
      toast({
        title: "File type not supported",
        description: "Please upload an audio file, image, or document (PDF/Word).",
        variant: "destructive"
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
      } else if (isDocument) {
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
      toast({
        title: "URL added successfully",
        description: "Ready to apply accessibility features."
      });
    }
  };

  return (
    <section id="upload-section" className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-slate-800">
          Start with Your Content
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload audio, images, or documents to make them accessible for everyone.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* URL Input Section */}
          <form onSubmit={handleUrlSubmit} className="space-y-3">
            <label htmlFor="url-input" className="block text-sm font-medium text-slate-700">
              Website URL
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="url-input"
                  type="url"
                  placeholder="Paste a link to any website..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  aria-describedby="url-help"
                />
              </div>
              <Button 
                type="submit" 
                disabled={!inputUrl.trim()}
                className="h-12 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Process website URL"
              >
                Process
              </Button>
            </div>
            <p id="url-help" className="text-sm text-slate-500">
              We support most websites and will extract the main content.
            </p>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-slate-500 font-medium">OR</span>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Upload File
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-4">
                  <Mic className="h-8 w-8 text-slate-400" />
                  <Image className="h-8 w-8 text-slate-400" />
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600">
                    Drag and drop your file here, or
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                  >
                    browse from your computer
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileInputChange}
                      accept="audio/*,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    />
                  </label>
                </div>
                {processing && (
                  <div className="text-blue-500">Processing your file...</div>
                )}
                {uploadedFile && !processing && (
                  <div className="text-green-500">
                    {uploadedFile.name} uploaded successfully
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
