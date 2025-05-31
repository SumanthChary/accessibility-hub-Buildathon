import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePreview } from '@/hooks/use-preview';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase, checkQuota, updateQuota } from '@/lib/supabase';
import { 
  Play as PlayIcon, 
  Pause as PauseIcon, 
  Download, 
  Copy,
  Eye,
  AlertTriangle
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const { user, quota } = useAuth();
  const { toast } = useToast();

  // Process content with quota check
  useEffect(() => {
    const handleContent = async () => {
      if (!user) {
        setLoadError('Please sign in to process content');
        return;
      }

      try {
        if (file) {
          // Check quota based on file type
          let quotaType: 'audio_minutes' | 'image_count' | 'pdf_pages';
          let quotaAmount = 1;

          if (file.type.startsWith('audio/')) {
            quotaType = 'audio_minutes';
            const buffer = await file.arrayBuffer();
            const audioContext = new AudioContext();
            const audioBuffer = await audioContext.decodeAudioData(buffer);
            quotaAmount = Math.ceil(audioBuffer.duration / 60);
          } else if (file.type.startsWith('image/')) {
            quotaType = 'image_count';
          } else if (file.type === 'application/pdf') {
            quotaType = 'pdf_pages';
          } else {
            throw new Error('Unsupported file type');
          }

          const hasQuota = await checkQuota(user.id, quotaType);
          if (!hasQuota) {
            throw new Error(`Processing quota exceeded for ${quotaType.replace('_', ' ')}. Please upgrade your plan.`);
          }

          console.log('Processing file:', file.name, file.type);
          await processFile(file);

          // Update quota and log history
          await Promise.all([
            updateQuota(user.id, quotaType, quotaAmount),
            supabase.from('processing_history').insert({
              user_id: user.id,
              type: quotaType.split('_')[0] as 'audio' | 'image' | 'pdf',
              file_name: file.name,
              file_size: file.size,
              processing_time: Date.now()
            })
          ]);

          toast({
            title: 'Success',
            description: 'File processed successfully',
          });

        } else if (url) {
          console.log('Processing URL:', url);
          await processUrl(url);
          
          toast({
            title: 'Success',
            description: 'URL processed successfully',
          });
        }
      } catch (error) {
        console.error('Error in content processing:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to process content';
        setLoadError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive'
        });
      }
    };

    if (file || url) {
      handleContent();
    }
  }, [file, url, processFile, processUrl, user, toast]);

  // Reset error state when new content is loaded
  useEffect(() => {
    setLoadError(null);
  }, [file, url]);

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
    <section className="w-full max-w-4xl mx-auto p-6" id="preview-section">
      {!user && (
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please sign in to process and analyze content.
          </AlertDescription>
        </Alert>
      )}

      {user && quota && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Remaining quota: {quota.audio_minutes} min audio | {quota.image_count} images | {quota.pdf_pages} PDF pages
          </p>
        </div>
      )}

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
          {/* Loading and Error States */}
          {(processing || loadError) && (
            <div className="space-y-4">
              {processing && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    Processing your content... {progress}%
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </div>
              )}
              {loadError && !processing && (
                <Alert variant="destructive">
                  <AlertTitle>Error Loading Content</AlertTitle>
                  <AlertDescription>{loadError}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Error State */}
          {preview.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{preview.error}</AlertDescription>
            </Alert>
          )}
          {loadError && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{loadError}</AlertDescription>
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
                {processing ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-lg text-muted-foreground">
                      Processing your content... {progress}%
                    </p>
                  </div>
                ) : !file && !url ? (
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
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-inner">
                          <audio 
                            src={preview.original} 
                            controls 
                            className="w-full focus:outline-none" 
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onError={(e) => {
                              console.error('Audio failed to load');
                              setLoadError('Failed to load audio file');
                            }}
                          />
                          {features.captions && preview.accessible && (
                            <div className="mt-4 bg-black bg-opacity-80 text-white p-4 rounded-lg font-medium leading-relaxed tracking-wide">
                              {preview.accessible}
                            </div>
                          )}
                          {audioUrl && (
                            <div className="mt-4 flex items-center justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={togglePlayPause}
                                className={features.highContrast ? "border-white text-white hover:bg-gray-800" : ""}
                              >
                                {isPlaying ? <PauseIcon className="h-4 w-4 mr-2" /> : <PlayIcon className="h-4 w-4 mr-2" />}
                                {isPlaying ? 'Pause' : 'Play'} Synthesized Speech
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {file.type.startsWith('image/') && (
                      <div className="relative">
                        <div className="group relative">
                          <img
                            src={preview.original}
                            alt={preview.accessible || "Original upload"}
                            className="max-w-full h-auto mx-auto rounded-lg shadow-lg transition-all duration-300"
                            style={features.highContrast ? { filter: 'contrast(150%) brightness(120%)' } : undefined}
                            onError={(e) => {
                              console.error('Image failed to load');
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          {preview.accessible && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {preview.accessible}
                            </div>
                          )}
                        </div>
                        {features.signLanguage && (
                          <div className="fixed bottom-4 right-4 w-48 h-64 bg-black rounded-lg border border-white shadow-xl">
                            <div className="p-2 text-white text-center text-sm font-medium">
                              Sign Language Interpreter
                            </div>
                            <div className="flex items-center justify-center h-52 bg-gray-900">
                              <span className="text-white text-sm">Interpreter feed loading...</span>
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
