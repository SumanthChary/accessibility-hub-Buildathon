import { useState, useCallback, useRef } from 'react';
import { useSpeech } from './use-speech';
import { useVision } from './use-vision';
import { useDocument } from './use-document';
import { useToast } from './use-toast';
import { useAuth } from './use-auth';
import { getAudioDuration, getImageDimensions, formatFileSize, createChunkedFile } from '@/utils/file-utils';
import type { CacheEntry, PreviewState, ServiceResult } from '@/types/preview';

const CACHE_VERSION = '1.0';
const PROCESSING_TIMEOUT = 30000; // 30 seconds timeout

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
  
  const processingTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();
  
  const { transcribeAudio, synthesizeSpeech } = useSpeech();
  const { analyzeImage } = useVision();
  const { parseDocument } = useDocument();
  const { toast } = useToast();

  // Cache management
  const getFromCache = useCallback((key: string): CacheEntry | null => {
    try {
      const cached = localStorage.getItem(`preview_cache_${key}`);
      if (!cached) return null;

      const entry: CacheEntry = JSON.parse(cached);
      const isExpired = Date.now() - entry.timestamp > 3600000; // 1 hour cache
      const isOldVersion = entry.version !== CACHE_VERSION;

      if (isExpired || isOldVersion) {
        localStorage.removeItem(`preview_cache_${key}`);
        return null;
      }

      return entry;
    } catch {
      return null;
    }
  }, []);

  const saveToCache = useCallback((key: string, data: ServiceResult) => {
    try {
      const entry: CacheEntry = {
        timestamp: Date.now(),
        version: CACHE_VERSION,
        data
      };
      localStorage.setItem(`preview_cache_${key}`, JSON.stringify(entry));
    } catch {
      // Ignore cache errors
    }
  }, []);

  // Process audio files in chunks for better performance
  const processAudioFile = useCallback(async (file: File): Promise<ServiceResult> => {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
    const fileSize = file.size;
    const chunks = Math.ceil(fileSize / CHUNK_SIZE);
    let transcript = '';
    
    try {
      for (let i = 0; i < chunks; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          throw new Error('Processing cancelled');
        }

        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileSize);
        const chunk = createChunkedFile(file.slice(start, end), file);
        
        setProgress(Math.floor((i / chunks) * 80));
        const chunkTranscript = await transcribeAudio(chunk);
        transcript += chunkTranscript + ' ';
      }
      
      setProgress(90);
      const processedTranscript = transcript.trim();
      let audioUrl: string | undefined;
      
      try {
        const audioBlob = await synthesizeSpeech(processedTranscript);
        audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } catch (error) {
        console.error('Speech synthesis failed:', error);
        // Don't throw, we still want to show the transcript
      }
      
      setProgress(100);
      const duration = await getAudioDuration(file);
      
      const result: ServiceResult = {
        accessible: processedTranscript,
        analysis: JSON.stringify({
          duration: `${duration.toFixed(2)} seconds`,
          format: file.type,
          size: formatFileSize(file.size),
          processingMethod: 'Chunk-based streaming transcription',
          wordCount: processedTranscript.split(/\s+/).length
        })
      };

      if (audioUrl) {
        result.audioUrl = audioUrl;
      }

      return result;
    } catch (error) {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      throw error;
    }
  }, [transcribeAudio, synthesizeSpeech]);

  const processFile = useCallback(async (file: File) => {
    try {
      // Cancel any existing processing
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      
      setProcessing(true);
      setProgress(0);
      
      // Validate file size
      const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 50MB limit');
      }
      
      // Check cache first
      const cacheKey = `${file.name}_${file.size}_${file.lastModified}`;
      const cached = getFromCache(cacheKey);

      if (cached) {
        const contentType = file.type.split('/')[0] as PreviewState['contentType'];
        setPreview(prev => ({
          ...prev,
          accessible: cached.data.accessible,
          analysis: cached.data.analysis,
          error: undefined,
          contentType
        }));
        if (cached.data.audioUrl) setAudioUrl(cached.data.audioUrl);
        setProgress(100);
        return;
      }

      // Set processing timeout
      processingTimeoutRef.current = setTimeout(() => {
        abortControllerRef.current?.abort();
        throw new Error('Processing timeout exceeded');
      }, PROCESSING_TIMEOUT);

      // Create preview URL and update state
      const originalUrl = URL.createObjectURL(file);
      const contentType = file.type.split('/')[0] as PreviewState['contentType'];
      setPreview(prev => ({ 
        ...prev, 
        original: originalUrl,
        contentType
      }));
      
      let result: ServiceResult;

      // Process based on file type
      if (file.type.startsWith('audio/')) {
        result = await processAudioFile(file);
      } else if (file.type.startsWith('image/')) {
        const analysis = await analyzeImage(file);
        const dimensions = await getImageDimensions(file);
        
        result = {
          accessible: analysis.caption,
          analysis: JSON.stringify({
            caption: analysis.caption,
            tags: analysis.tags,
            accessibility: analysis.accessibility,
            dimensions,
            format: file.type,
            size: formatFileSize(file.size)
          }, null, 2)
        };
      } else if (file.type === 'application/pdf') {
        const content = await parseDocument(file);
        result = {
          accessible: typeof content === 'string' ? content : content.text,
          analysis: JSON.stringify({
            structure: content.structure,
            metadata: content.metadata,
            summary: content.summary,
            size: formatFileSize(file.size)
          }, null, 2)
        };
      } else {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      // Update cache and state
      setProgress(100);
      saveToCache(cacheKey, result);

      setPreview(prev => ({
        ...prev,
        accessible: result.accessible,
        analysis: result.analysis,
        error: undefined
      }));
      if (result.audioUrl) setAudioUrl(result.audioUrl);

    } catch (error) {
      console.error('Processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Processing failed';
      
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
      clearTimeout(processingTimeoutRef.current);
      setProcessing(false);
      
      // Clean up URLs when processing is done
      if (abortControllerRef.current?.signal.aborted) {
        URL.revokeObjectURL(preview.original);
        URL.revokeObjectURL(audioUrl);
      }
    }
  }, [processAudioFile, analyzeImage, parseDocument, toast, getFromCache, saveToCache, audioUrl, preview.original]);

  const processUrl = useCallback(async (url: string) => {
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

      // Validate URL
      try {
        new URL(url);
      } catch {
        throw new Error('Invalid URL format');
      }

      setProgress(30);

      const response = await fetch(url, { 
        method: 'HEAD',
        signal: abortControllerRef.current?.signal 
      });

      if (!response.ok) {
        throw new Error(`Failed to access URL: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType) {
        throw new Error('Could not determine content type');
      }

      console.log('URL content type:', contentType);

      // Handle redirects
      const finalUrl = response.url;
      if (finalUrl !== url) {
        console.log('Following redirect to:', finalUrl);
      }

      const contentResponse = await fetch(finalUrl, {
        signal: abortControllerRef.current?.signal
      });

      if (!contentResponse.ok) {
        throw new Error(`Failed to fetch content: ${contentResponse.statusText}`);
      }

      const contentSize = contentResponse.headers.get('content-length');
      if (contentSize && parseInt(contentSize) > 50 * 1024 * 1024) {
        throw new Error('Content size exceeds 50MB limit');
      }

      const blob = await contentResponse.blob();
      const fileName = finalUrl.split('/').pop() || 'downloaded-file';
      const file = new File([blob], fileName, { type: contentType });

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
