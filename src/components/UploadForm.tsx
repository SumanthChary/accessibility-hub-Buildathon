
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadFormProps {
  inputUrl: string;
  setInputUrl: (url: string) => void;
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
}

export const UploadForm = ({ inputUrl, setInputUrl, uploadedFile, setUploadedFile }: UploadFormProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
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

  const handleFileSelect = (file: File) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "File type not supported",
        description: "Please upload a PDF, Word document, or text file.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    setInputUrl(''); // Clear URL if file is uploaded
    toast({
      title: "File uploaded successfully",
      description: `${file.name} is ready for accessibility transformation.`
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
          Upload a document or paste a website link to begin making it accessible for everyone.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* URL Input */}
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

          {/* File Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Upload Document
            </label>
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                isDragOver 
                  ? 'border-blue-400 bg-blue-50' 
                  : uploadedFile 
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx,.txt"
                aria-label="Upload document file"
              />
              
              <div className="space-y-3">
                <Upload className={`mx-auto h-12 w-12 ${
                  uploadedFile ? 'text-green-600' : 'text-slate-400'
                }`} />
                
                {uploadedFile ? (
                  <div className="space-y-1">
                    <p className="text-green-700 font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-green-600">Ready for processing</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-slate-700 font-medium">
                      Drop your file here, or <span className="text-blue-600">browse</span>
                    </p>
                    <p className="text-sm text-slate-500">
                      Supports PDF, Word documents, and text files
                    </p>
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
