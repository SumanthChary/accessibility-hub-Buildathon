import { useState } from 'react';
import { VisionService } from '../services/vision.service';

export const useVision = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await VisionService.analyzeImage(file);
      return analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const answerImageQuestion = async (file: File, question: string) => {
    setIsAnswering(true);
    setError(null);
    try {
      const answer = await VisionService.answerQuestion(file, question);
      return answer;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to answer question');
      throw err;
    } finally {
      setIsAnswering(false);
    }
  };

  return {
    analyzeImage,
    answerImageQuestion,
    isAnalyzing,
    isAnswering,
    error,
  };
};
