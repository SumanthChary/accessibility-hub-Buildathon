import { useState, useCallback } from 'react';
import { useSpeech } from './use-speech';
import { useVision } from './use-vision';
import { useDocument } from './use-document';
import { useToast } from './use-toast';

interface PreviewState {
  original: string;
  accessible: string;
  analysis: string;
  error?: string;
  contentType?: 'audio' | 'image' | 'pdf' | 'unknown';
}

export const usePreview = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<PreviewState>({
    original: '',
    accessible: '',
    analysis: '',
    contentType: 'unknown'
  });
  const [audioUrl, setAudioUrl] = useState<string>('');

  const { transcribeAudio, synthesizeSpeech } = useSpeech();
  const { analyzeImage } = useVision();
  const { parseDocument } = useDocument();
  const { toast } = useToast();

  const processFile = useCallback(async (file: File) => {
    console.log('Processing file:', file.name, file.type);
    if (!file) return;

    setProcessing(true);
    setProgress(0);
    
    // Immediately show the file preview
    const originalUrl = URL.createObjectURL(file);
    console.log('Created URL for preview:', originalUrl);
    
    setPreview(prev => ({ 
      ...prev, 
      original: originalUrl,
      accessible: 'Processing...',
      analysis: 'Analyzing...',
      error: undefined,
      contentType: file.type.startsWith('audio/') ? 'audio' 
        : file.type.startsWith('image/') ? 'image'
        : file.type === 'application/pdf' ? 'pdf'
        : 'unknown'
    }));

    try {
      setProgress(30);

      if (file.type.startsWith('audio/')) {
        console.log('Processing audio file...');
        const transcript = await transcribeAudio(file);
        setPreview(prev => ({
          ...prev,
          accessible: transcript || 'No transcript available',
          analysis: 'Audio transcription complete'
        }));
        
        // Generate audio URL for playback if needed
        if (transcript) {
          try {
            await synthesizeSpeech(transcript);
            // Note: synthesizeSpeech will handle setting the audioUrl
          } catch (err) {
            console.error('Failed to synthesize speech:', err);
          }
        }

      } else if (file.type.startsWith('image/')) {
        console.log('Processing image file...');
        const analysis = await analyzeImage(file);
        setPreview(prev => ({
          ...prev,
          accessible: analysis.caption || 'No caption available',
          analysis: JSON.stringify({
            caption: analysis.caption,
            tags: analysis.tags || [],
            text: analysis.text
          }, null, 2)
        }));

      } else if (file.type === 'application/pdf') {
        console.log('Processing PDF file...');
        const result = await parseDocument(file);
        let accessibleText = '';
        let analysisText = '';
        
        if (typeof result === 'string') {
          accessibleText = result;
          analysisText = 'Basic text extraction complete';
        } else {
          accessibleText = result.text || 'No text content available';
          analysisText = JSON.stringify({
            pageCount: result.metadata?.pageCount,
            structure: result.structure,
            metadata: result.metadata
          }, null, 2);
        }

        setPreview(prev => ({
          ...prev,
          accessible: accessibleText,
          analysis: analysisText
        }));
      } else {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      setProgress(100);
      toast({
        title: 'Success',
        description: 'File processed successfully'
      });

    } catch (error) {
      console.error('Error processing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
      setPreview(prev => ({
        ...prev,
        error: errorMessage
      }));
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  }, [transcribeAudio, analyzeImage, parseDocument, synthesizeSpeech, toast]);

  const processUrl = useCallback(async (url: string) => {
    console.log('Processing URL:', url);
    if (!url) return;

    setProcessing(true);
    setProgress(0);

    try {
      setPreview(prev => ({ 
        ...prev, 
        original: url,
        accessible: 'Processing URL...',
        analysis: 'Analyzing...',
        error: undefined,
        contentType: 'unknown'
      }));

      setProgress(30);

      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      console.log('URL content type:', contentType);

      const contentResponse = await fetch(url);
      const blob = await contentResponse.blob();
      const file = new File([blob], 'preview-file', { type: contentType });

      await processFile(file);

    } catch (error) {
      console.error('Error processing URL:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process URL';
      setPreview(prev => ({
        ...prev,
        error: errorMessage
      }));
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  }, [processFile, toast]);

  return {
    processing,
    progress,
    preview,
    audioUrl,
    processFile,
    processUrl,
  };
};
