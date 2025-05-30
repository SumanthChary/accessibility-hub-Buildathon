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
  Copy as CopyIcon,
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

  const getContentStyle = () => {
    let className = "p-4 rounded-lg ";
    
    if (features.highContrast) {
      className += "bg-black text-white border border-white ";
    } else {
      className += "bg-white border border-gray-200 ";
    }
    
    return className;
  };

  // Always show the preview area, even if no file or URL is provided
  return (
    <section className="w-full max-w-4xl mx-auto p-6">
      <div style={{ background: '#ffeeba', color: '#856404', padding: '20px', borderRadius: '10px', margin: '30px 0', textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem', border: '3px solid #856404', zIndex: 9999 }}>
        Preview is always visible!<br />
        file: {file ? file.name : 'none'} | url: {url || 'none'} | hasContent: {String(hasContent)}
      </div>
      <div style={{ background: '#f8f9fa', border: '2px dashed #ccc', borderRadius: '8px', padding: '40px', textAlign: 'center', color: '#888', fontSize: '1.2rem' }}>
        {/* Show a message or a placeholder preview */}
        {file || url ? (
          <span>Preview will appear here for your uploaded file or URL.</span>
        ) : (
          <span>Upload a file or enter a URL above to see the preview here.</span>
        )}
      </div>
    </section>
  );
};
