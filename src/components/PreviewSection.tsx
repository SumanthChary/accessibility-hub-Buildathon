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
  Download, 
  Copy,
  Eye
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

  // Debug logging
  console.log('PreviewSection Render:', { hasContent, file, url, processing, progress, preview, audioUrl });

  useEffect(() => {
    console.log('PreviewSection Effect:', { file, url });
    if (file) {
      console.log('Processing file:', file.name, file.type);
      processFile(file);
    } else if (url) {
      console.log('Processing URL:', url);
      processUrl(url);
    }
  }, [file, url, processFile, processUrl]);

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
      // TODO: Show toast notification
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 border-2 border-red-500" id="preview-section">
      {/* Debug info */}
      <div className="bg-yellow-100 p-4 mb-4 rounded">
        <p>Debug Info:</p>
        <pre className="text-xs">
          {JSON.stringify({
            hasContent,
            fileName: file?.name,
            fileType: file?.type,
            url,
            processing,
            progress,
            hasPreview: !!preview.original
          }, null, 2)}
        </pre>
      </div>

      {/* Existing preview UI */}
      <Card className={features.highContrast ? "bg-gray-900 text-white p-6" : "p-6"}>
        <div className="space-y-6">
          {/* Loading State */}
          {processing && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                Processing your content... {progress}%
              </p>
            </div>
          )}

          {/* Error State */}
          {preview.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{preview.error}</AlertDescription>
            </Alert>
          )}

          {/* Content Preview */}
          <Tabs defaultValue="original" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="accessible">Accessible Version</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            {/* Original Content */}
            <TabsContent value="original" className="min-h-[300px] mt-4">
              <div className="rounded-lg border p-4">
                {!file && !url ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <Eye className="h-12 w-12 text-gray-400" />
                    <p className="text-lg text-muted-foreground">
                      Upload a file or enter a URL to see the preview
                    </p>
                  </div>
                ) : file ? (
                  <>
                    {file.type.startsWith('audio/') && (
                      <div className="space-y-4">
                        <audio src={preview.original} controls className="w-full" />
                        {features.captions && preview.accessible && (
                          <div className="bg-black bg-opacity-80 text-white p-3 rounded">
                            {preview.accessible}
                          </div>
                        )}
                      </div>
                    )}
                    {file.type.startsWith('image/') && (
                      <div className="relative">
                        <img
                          src={preview.original}
                          alt={preview.accessible || "Original upload"}
                          className="max-w-full h-auto mx-auto"
                          style={features.highContrast ? { filter: 'contrast(150%) brightness(120%)' } : undefined}
                        />
                        {features.signLanguage && (
                          <div className="fixed bottom-4 right-4 w-48 h-64 bg-black rounded-lg border border-white">
                            <div className="p-2 text-white text-center text-sm">
                              Sign Language Interpreter
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {file.type === 'application/pdf' && (
                      <iframe
                        src={preview.original}
                        className="w-full h-[600px]"
                        title="PDF preview"
                      />
                    )}
                  </>
                ) : (
                  <iframe
                    src={url || ''}
                    className="w-full h-[600px]"
                    title="Web content preview"
                  />
                )}
              </div>
            </TabsContent>

            {/* Accessible Version */}
            <TabsContent value="accessible" className="min-h-[300px] mt-4">
              <div className="rounded-lg border p-4 space-y-4">
                {features.textToSpeech && audioUrl && (
                  <div className="space-y-4">
                    <audio src={audioUrl} controls className="w-full" />
                    <div className="flex justify-center">
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
                <div className="prose max-w-none dark:prose-invert">
                  {preview.accessible ? (
                    <pre className="whitespace-pre-wrap">{preview.accessible}</pre>
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Process a file or URL to see its accessible version
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(preview.accessible || '')}
                    disabled={!preview.accessible}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={downloadAccessible}
                    disabled={!preview.accessible}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Analysis */}
            <TabsContent value="analysis" className="min-h-[300px] mt-4">
              <div className="rounded-lg border p-4">
                {preview.analysis ? (
                  <pre className="whitespace-pre-wrap">{preview.analysis}</pre>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Process a file or URL to see its analysis
                  </p>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(preview.analysis || '')}
                    disabled={!preview.analysis}
                    className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                  >
                    <Copy className="h-4 w-4 mr-2" />
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
