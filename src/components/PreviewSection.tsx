import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePreview } from '@/hooks/use-preview';
import { 
  Play as PlayIcon, 
  Pause as PauseIcon, 
  Download as DownloadIcon,
  Copy as CopyIcon
} from 'lucide-react';

interface PreviewSectionProps {
  features: {
    captions: boolean;
    signLanguage: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    plainLanguage: boolean;
  };
  hasContent: boolean;
  file: File | null;
  url: string | null;
}

export const PreviewSection = ({ features, hasContent, file, url }: PreviewSectionProps) => {
  const [activeTab, setActiveTab] = useState('original');
  const [isPlaying, setIsPlaying] = useState(false);
  const { processing, progress, preview, audioUrl, processFile, processUrl } = usePreview();

  useEffect(() => {
    if (!hasContent) return;
    
    if (file) {
      processFile(file);
    } else if (url) {
      processUrl(url);
    }
  }, [file, url, processFile, processUrl, hasContent]);

  const togglePlayPause = () => {
    const audio = document.querySelector('audio');
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadAccessible = () => {
    if (!preview.accessible) return;
    
    const blob = new Blob([preview.accessible], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessible-version.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  if (!hasContent) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800">
            Live Preview
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload content or enter a URL to see the accessibility features in action.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Preview will appear here</p>
              <p className="text-sm text-gray-400">Add content above to see it transformed</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getContentStyle = () => {
    let className = "p-4 rounded-lg ";
    
    if (features.highContrast) {
      className += "bg-black text-white border border-white ";
    } else {
      className += "bg-white border border-gray-200 ";
    }
    
    return className;
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      <Card className={features.highContrast ? "bg-gray-900 text-white p-6" : "p-6"}>
        <div className="space-y-4">
          {processing && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-gray-500 text-center">
                Processing your content... {progress}%
              </p>
            </div>
          )}

          {preview.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{preview.error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="original" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="accessible">Accessible Version</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="min-h-[300px]">
              <div className={getContentStyle()}>
                {file && file.type.startsWith('audio/') && (
                  <div className="space-y-4">
                    <audio src={preview.original} controls className="w-full" />
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayPause}
                        className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                      >
                        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                    {features.captions && preview.accessible && (
                      <div className="bg-black bg-opacity-80 text-white p-3 rounded text-sm mt-2">
                        {preview.accessible}
                      </div>
                    )}
                  </div>
                )}
                {file && file.type.startsWith('image/') && (
                  <div className="space-y-4">
                    <img
                      src={preview.original}
                      alt={preview.accessible || "Original upload"}
                      className="max-w-full h-auto mx-auto"
                      style={features.highContrast ? { filter: 'contrast(150%) brightness(120%)' } : undefined}
                    />
                    {features.signLanguage && (
                      <div className="fixed bottom-4 right-4 w-48 h-64 bg-black rounded-lg border border-white">
                        <div className="p-2 text-white text-center text-sm">Sign Language Interpreter</div>
                      </div>
                    )}
                  </div>
                )}
                {file && file.type === 'application/pdf' && (
                  <iframe
                    src={preview.original}
                    className="w-full h-[500px]"
                    title="PDF preview"
                  />
                )}
                {url && (
                  <iframe
                    src={url}
                    className="w-full h-[500px]"
                    title="Web content preview"
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="accessible" className="min-h-[300px]">
              <div className={`${getContentStyle()} space-y-4`}>
                {features.textToSpeech && audioUrl && (
                  <div className="space-y-4">
                    <audio src={audioUrl} controls className="w-full" />
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayPause}
                        className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                      >
                        {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
                <pre className="whitespace-pre-wrap">{preview.accessible}</pre>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(preview.accessible || '')}
                    disabled={!preview.accessible}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadAccessible}
                    disabled={!preview.accessible}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="min-h-[300px]">
              <div className={getContentStyle()}>
                <pre className="whitespace-pre-wrap">{preview.analysis}</pre>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(preview.analysis || '')}
                    disabled={!preview.analysis}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Copy Analysis
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </section>
  );
};
