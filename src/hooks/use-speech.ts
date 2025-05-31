import { useState } from 'react';
import { SpeechService } from '../services/speech.service';
import type { SupportedVoices } from '../lib/api-config';

export const useSpeech = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribeAudio = async (file: File): Promise<string> => {
    setIsTranscribing(true);
    setError(null);
    try {
      const transcript = await SpeechService.transcribe(file);
      return transcript;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transcribe audio');
      throw err;
    } finally {
      setIsTranscribing(false);
    }
  };

  const synthesizeSpeech = async (text: string, voice: SupportedVoices = 'alloy'): Promise<Blob> => {
    setIsSynthesizing(true);
    setError(null);
    try {
      const audioBlob = await SpeechService.synthesizeSpeech(text);
      return audioBlob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to synthesize speech');
      throw err;
    } finally {
      setIsSynthesizing(false);
    }
  };

  return {
    transcribeAudio,
    synthesizeSpeech,
    isTranscribing,
    isSynthesizing,
    error,
  };
};
