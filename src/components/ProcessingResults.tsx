
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
  Loader2 
} from 'lucide-react';

interface ProcessingResult {
  id: string;
  type: 'audio' | 'image' | 'pdf';
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
  features: Record<string, boolean>;
}

export const ProcessingResults = ({ file, features }: ProcessingResultsProps) => {
  const [results, setResults] = useState<ProcessingResult[]>([]);

  useEffect(() => {
    if (file) {
      const fileType = getFileType(file);
      const newResult: ProcessingResult = {
        id: Date.now().toString(),
        type: fileType,
        fileName: file.name,
        status: 'processing',
        progress: 0,
      };

      setResults([newResult]);
      simulateProcessing(newResult.id, fileType, features);
    }
  }, [file, features]);

  const getFileType = (file: File): 'audio' | 'image' | 'pdf' => {
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    return 'pdf'; // default
  };

  const simulateProcessing = async (
    id: string, 
    type: 'audio' | 'image' | 'pdf', 
    enabledFeatures: Record<string, boolean>
  ) => {
    const intervals = [20, 40, 60, 80, 100];
    
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setResults(prev => prev.map(result => 
        result.id === id 
          ? { ...result, progress }
          : result
      ));
    }

    // Complete processing
    const accessibilityFeatures = getAccessibilityFeatures(type, enabledFeatures);
    
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

  const getAccessibilityFeatures = (
    type: 'audio' | 'image' | 'pdf', 
    features: Record<string, boolean>
  ): string[] => {
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
      ]
    };

    const additionalFeatures = [];
    if (features.captions) additionalFeatures.push('Enhanced captions');
    if (features.signLanguage) additionalFeatures.push('Sign language interpretation');
    if (features.highContrast) additionalFeatures.push('High contrast mode');
    if (features.textToSpeech) additionalFeatures.push('Advanced text-to-speech');
    if (features.plainLanguage) additionalFeatures.push('Plain language summary');

    return [...baseFeatures[type], ...additionalFeatures];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Volume2 className="h-5 w-5 text-blue-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-600" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string, progress: number) => {
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
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing Results</h3>
        <p className="text-gray-600">Real-time accessibility transformation progress</p>
      </div>

      {results.map((result) => (
        <Card key={result.id} className="border-l-4 border-l-blue-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTypeIcon(result.type)}
                <div>
                  <CardTitle className="text-lg">{result.fileName}</CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{result.type.toUpperCase()}</Badge>
                    <span className="text-sm text-gray-500">
                      {result.status === 'processing' && 'Processing...'}
                      {result.status === 'completed' && 'Completed'}
                      {result.status === 'failed' && 'Failed'}
                    </span>
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(result.status, result.progress)}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{result.progress}%</span>
              </div>
              <Progress value={result.progress} className="h-2" />
            </div>

            {/* Results */}
            {result.status === 'completed' && result.result && (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Accessibility Features Added:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.result.accessibilityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        {feature}
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
