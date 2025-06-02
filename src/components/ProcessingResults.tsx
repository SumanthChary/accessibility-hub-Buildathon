
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Download, 
  Eye, 
  FileText, 
  Image, 
  Volume2, 
  Clock,
  AlertCircle,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';

interface ProcessingResult {
  id: string;
  type: 'audio' | 'image' | 'pdf' | 'url';
  fileName: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  result?: {
    accessibilityFeatures: string[];
    downloadUrl?: string;
    previewUrl?: string;
  };
}

interface ProcessingResultsProps {
  file: File | null;
  url: string;
  isProcessing: boolean;
}

export const ProcessingResults = ({ file, url, isProcessing }: ProcessingResultsProps) => {
  const [results, setResults] = useState<ProcessingResult[]>([]);

  useEffect(() => {
    if (file || url) {
      const fileType = file ? getFileType(file) : 'url';
      const fileName = file ? file.name : extractDomainFromUrl(url);
      
      const newResult: ProcessingResult = {
        id: Date.now().toString(),
        type: fileType,
        fileName: fileName,
        status: 'processing',
        progress: 0,
      };

      setResults([newResult]);
      simulateProcessing(newResult.id, fileType);
    }
  }, [file, url]);

  const extractDomainFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'URL Content';
    }
  };

  const getFileType = (file: File): 'audio' | 'image' | 'pdf' => {
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'pdf';
  };

  const simulateProcessing = async (id: string, type: 'audio' | 'image' | 'pdf' | 'url') => {
    const intervals = [20, 40, 60, 80, 100];
    
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setResults(prev => prev.map(result => 
        result.id === id 
          ? { ...result, progress }
          : result
      ));
    }

    const accessibilityFeatures = getAccessibilityFeatures(type);
    
    setResults(prev => prev.map(result => 
      result.id === id 
        ? { 
            ...result, 
            status: 'completed',
            progress: 100,
            result: {
              accessibilityFeatures,
              downloadUrl: '#download',
              previewUrl: '#preview'
            }
          }
        : result
    ));
  };

  const getAccessibilityFeatures = (type: 'audio' | 'image' | 'pdf' | 'url'): string[] => {
    const baseFeatures = {
      audio: [
        'Automatic transcription generated',
        'Closed captions created',
        'Audio description track added',
        'Variable playback speed controls'
      ],
      image: [
        'AI-generated alt text',
        'Color contrast optimization',
        'High contrast version created',
        'Screen reader compatibility'
      ],
      pdf: [
        'Text-to-speech optimization',
        'Structured heading hierarchy',
        'Alt text for embedded images',
        'Keyboard navigation support'
      ],
      url: [
        'Accessibility audit completed',
        'WCAG compliance check',
        'Screen reader optimization',
        'Keyboard navigation improvements',
        'Color contrast enhancements'
      ]
    };

    return baseFeatures[type];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Volume2 className="h-5 w-5 text-blue-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'url':
        return <LinkIcon className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Processing Results</h3>
        <p className="text-gray-600 text-sm sm:text-base">Real-time accessibility transformation progress</p>
      </div>

      {results.map((result) => (
        <Card key={result.id} className="border-l-4 border-l-blue-600 w-full shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                {getTypeIcon(result.type)}
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg truncate">{result.fileName}</CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{result.type.toUpperCase()}</Badge>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {result.status === 'processing' && 'Processing...'}
                      {result.status === 'completed' && 'Completed'}
                      {result.status === 'failed' && 'Failed'}
                    </span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(result.status)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{result.progress}%</span>
              </div>
              <Progress value={result.progress} className="h-3" />
            </div>

            {result.status === 'completed' && result.result && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Accessibility Features Added:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {result.result.accessibilityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
