import { useState, useEffect, useRef, useCallback } from 'react';
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

  if (!hasContent) {
    return (
      <Card className="p-6 text-center bg-white/50 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Ready to Make Content Accessible</h3>
          <p className="text-slate-600">
            Upload a file or provide a URL above to start making your content accessible.
            We support audio files, images, and PDFs.
          </p>
        </div>
      </Card>
    );
  }

  if (processing) {
    return (
      <Card className="p-6 bg-white/50 backdrop-blur-sm">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Processing Your Content</h3>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-slate-600">
            {progress < 100 ? 'Making your content accessible...' : 'Almost done...'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="original">Original</TabsTrigger>
          <TabsTrigger value="accessible">Accessible Version</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="original" className="mt-4">
          {preview.contentType === 'audio' && audioUrl && (
            <div className="flex items-center space-x-4 mb-4">
              <Button onClick={togglePlayback} variant="outline">
                {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
            </div>
          )}
          {/* Rest of the original content rendering */}
        </TabsContent>

        <TabsContent value="accessible" className="mt-4">
          {preview.accessible}
        </TabsContent>

        <TabsContent value="analysis" className="mt-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {preview.analysis}
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
