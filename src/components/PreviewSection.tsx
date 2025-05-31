import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  const { user } = useAuth();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle audio playback
  const togglePlayback = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Playback failed:', error);
        toast({
          title: 'Playback Error',
          description: 'Failed to play audio. Please try again.',
          variant: 'destructive'
        });
      });
    }
  }, [isPlaying, audioUrl, toast]);

  // Update audio element when URL changes
  useEffect(() => {
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onplay = () => setIsPlaying(true);
        audioRef.current.onpause = () => setIsPlaying(false);
        audioRef.current.onended = () => setIsPlaying(false);
      } else {
        audioRef.current.src = audioUrl;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  // Process content with quota check
  useEffect(() => {
    let mounted = true;

    const handleContent = async () => {
      try {
        if (!hasContent || !user) {
          if (mounted) setLoadError(null);
          return;
        }

        if (file) {
          // Check quota based on file type
          const type = file.type.startsWith('audio/') ? 'audio_minutes' :
                      file.type.startsWith('image/') ? 'image_count' :
                      file.type === 'application/pdf' ? 'pdf_pages' : null;
          
          if (!type) {
            if (mounted) setLoadError('Unsupported file type');
            return;
          }

          const hasQuota = await checkQuota(user.id, type);
          if (!hasQuota) {
            if (mounted) setLoadError('Quota exceeded. Please upgrade your plan.');
            return;
          }

          if (mounted) {
            await processFile(file);
          }
        } else if (url && mounted) {
          await processUrl(url);
        }
      } catch (error) {
        console.error('Content processing error:', error);
        if (mounted) {
          setLoadError(error instanceof Error ? error.message : 'Failed to process content');
        }
      }
    };

    handleContent();

    return () => {
      mounted = false;
    };
  }, [file, url, user, hasContent, processFile, processUrl]);

  // Landing page component
  const LandingContent = () => (
    <div className="p-8 text-center">
      <h3 className="text-2xl font-semibold mb-4">Start Making Content Accessible</h3>
      <p className="text-gray-600 mb-6">
        Upload files or paste URLs to transform your content into accessible formats.
        We support audio, images, and PDFs.
      </p>
      <div className="flex justify-center space-x-8 text-gray-500">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 mx-auto">
            <PlayIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p>Audio Files</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 mx-auto">
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <p>Images</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2 mx-auto">
            <Download className="w-8 h-8 text-purple-600" />
          </div>
          <p>PDFs</p>
        </div>
      </div>
    </div>
  );

  // Auth prompt component
  const AuthPrompt = () => (
    <div className="p-8 text-center">
      <h3 className="text-xl font-semibold mb-4">Sign in to Process Content</h3>
      <p className="text-gray-600 mb-6">
        Please sign in to start processing your content and make it accessible.
      </p>
      <Button asChild>
        <Link to="/auth">Sign In</Link>
      </Button>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg overflow-hidden">
      {!hasContent ? (
        <LandingContent />
      ) : !user && hasContent ? (
        <AuthPrompt />
      ) : processing ? (
        <div className="p-8">
          <h3 className="text-xl font-semibold mb-4">Processing Your Content</h3>
          <Progress value={progress} className="mb-4" />
          <p className="text-gray-600 text-sm">
            {progress < 100 ? 'Making your content accessible...' : 'Almost done...'}
          </p>
        </div>
      ) : (
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="original">Original</TabsTrigger>
              <TabsTrigger value="accessible">Accessible</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="mt-4 min-h-[200px]">
              {loadError ? (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{loadError}</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {preview.contentType === 'audio' && audioUrl && (
                    <div className="flex items-center space-x-4">
                      <Button onClick={() => {
                        if (audioRef.current) {
                          if (isPlaying) {
                            audioRef.current.pause();
                          } else {
                            audioRef.current.play();
                          }
                        }
                      }} variant="outline" size="sm">
                        {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                        <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
                      </Button>
                    </div>
                  )}
                  {preview.contentType === 'image' && preview.original && (
                    <img 
                      src={preview.original} 
                      alt="Original content"
                      className="max-w-full h-auto rounded-lg"
                    />
                  )}
                  {preview.contentType === 'pdf' && preview.original && (
                    <iframe
                      src={preview.original}
                      className="w-full h-[600px] rounded-lg border"
                      title="PDF Preview"
                    />
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accessible" className="mt-4 min-h-[200px]">
              <div className="prose max-w-none">
                {preview.accessible ? (
                  <>
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(preview.accessible);
                          toast({
                            title: "Copied",
                            description: "Text copied to clipboard"
                          });
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <p className="whitespace-pre-wrap">{preview.accessible}</p>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No accessible content available yet
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4 min-h-[200px]">
              {preview.analysis ? (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{preview.analysis}</code>
                </pre>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No analysis available yet
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Card>
  );
};
