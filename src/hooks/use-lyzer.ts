import { useState } from 'react';
import { LyzerService } from '@/services/lyzer.service';

export const useLyzer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeText = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await LyzerService.analyzeText(text);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze text');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeImage = async (imageFile: File) => {
    setLoading(true);
    setError(null);
    try {
      const result = await LyzerService.analyzeImage(imageFile);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const performAnalysis = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await LyzerService.performAnalysis(data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform analysis');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeText,
    analyzeImage,
    performAnalysis,
    loading,
    error,
  };
};
