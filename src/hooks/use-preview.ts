import { useState } from 'react';
import { useSpeech } from './use-speech';
import { useVision } from './use-vision';
import { useDocument } from './use-document';
import { useToast } from './use-toast';
import { API_CONFIG } from '@/lib/api-config';
import { LyzerService } from '@/services/lyzer.service';

interface PreviewState {
  original: string;
  accessible: string;
  analysis: string;
  error?: string;
}

export const usePreview = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<PreviewState>({
    original: '',
    accessible: '',
    analysis: ''
  });
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const { transcribeAudio, synthesizeSpeech } = useSpeech();
  const { analyzeImage } = useVision();
  const { parseDocument } = useDocument();
  const { toast } = useToast();

  const processFile = async (file: File) => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      // Clear previous state
      setPreview({ original: '', accessible: '', analysis: '' });
      
      // Create preview URL for original content
      const originalUrl = URL.createObjectURL(file);
      setPreview(prev => ({ ...prev, original: originalUrl }));
      setProgress(20);

      // Process based on file type
      if (file.type.startsWith('audio/')) {
        await processAudio(file);
      } else if (file.type.startsWith('image/')) {
        await processImage(file);
      } else if (file.type === 'application/pdf') {
        await processDocument(file);
      } else {
        throw new Error('Unsupported file type');
      }

      toast({
        title: 'Success',
        description: 'Content processed successfully'
      });
    } catch (error) {
      console.error('Processing error:', error);
      setPreview(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to process content'
      }));
      toast({
        title: 'Error',
        description: 'Failed to process content',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
      setProgress(100);
    }
  };

  const processAudio = async (file: File) => {
    // Transcribe audio
    setProgress(40);
    const transcript = await transcribeAudio(file);
    
    // Generate enhanced version
    setProgress(60);
    const analysis = await LyzerService.analyzeContent(transcript, 'text');
    
    // Create accessible audio version
    setProgress(80);
    const accessibleAudio = await synthesizeSpeech(analysis.enhanced_text || transcript);
    const audioBlob = new Blob([accessibleAudio], { type: 'audio/mp3' });
    setAudioUrl(URL.createObjectURL(audioBlob));

    setPreview(prev => ({
      ...prev,
      accessible: transcript,
      analysis: JSON.stringify(analysis, null, 2)
    }));
  };

  const processImage = async (file: File) => {
    // Analyze image
    setProgress(40);
    const imageAnalysis = await analyzeImage(file);
    
    // Generate accessible description
    setProgress(60);
    const accessibleVersion = await LyzerService.generateAccessibleVersion(file);
    
    // Get detailed analysis
    setProgress(80);
    const analysis = await LyzerService.analyzeContent(file, 'vision');

    setPreview(prev => ({
      ...prev,
      accessible: accessibleVersion.description,
      analysis: JSON.stringify({ ...imageAnalysis, ...analysis }, null, 2)
    }));
  };

  const processDocument = async (file: File) => {
    // Parse document
    setProgress(30);
    const content = await parseDocument(file);
    
    // Generate accessible version
    setProgress(60);
    const accessibleVersion = await LyzerService.generateAccessibleVersion(content);
    
    // Analyze document structure
    setProgress(80);
    const analysis = await LyzerService.analyzeContent(content, 'analysis');

    setPreview(prev => ({
      ...prev,
      accessible: accessibleVersion.content,
      analysis: JSON.stringify(analysis, null, 2)
    }));
  };

  const processUrl = async (url: string) => {
    if (!url) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      setPreview({ original: '', accessible: '', analysis: '' });
      
      // Fetch URL content
      const response = await fetch(url);
      const contentType = response.headers.get('content-type') || '';
      
      setProgress(30);
      
      if (contentType.includes('audio')) {
        const blob = await response.blob();
        await processAudio(new File([blob], 'audio', { type: contentType }));
      } else if (contentType.includes('image')) {
        const blob = await response.blob();
        await processImage(new File([blob], 'image', { type: contentType }));
      } else {
        // Process as web content
        const text = await response.text();
        const accessibleVersion = await LyzerService.generateAccessibleVersion(text);
        const analysis = await LyzerService.analyzeContent(text, 'analysis');
        
        setPreview({
          original: url,
          accessible: accessibleVersion.content,
          analysis: JSON.stringify(analysis, null, 2)
        });
      }

      toast({
        title: 'Success',
        description: 'URL processed successfully'
      });
    } catch (error) {
      console.error('URL processing error:', error);
      setPreview(prev => ({
        ...prev,
        error: 'Failed to process URL'
      }));
      toast({
        title: 'Error',
        description: 'Failed to process URL',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
      setProgress(100);
    }
  };

  return {
    processing,
    progress,
    preview,
    audioUrl,
    processFile,
    processUrl
  };
};
