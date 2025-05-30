import { Groq } from 'groq-sdk';

// Initialize Groq client
export const groqClient = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const API_CONFIG = {
  maxAudioFileSize: 25 * 1024 * 1024, // 25MB max for speech-to-text
  supportedAudioFormats: ['audio/wav', 'audio/mp3', 'audio/mpeg'],
  supportedImageFormats: ['image/jpeg', 'image/png', 'image/webp'],
  supportedDocumentFormats: ['application/pdf'],
  groq: {
    models: {
      chat: 'mixtral-8x7b-32768',
      vision: 'llava-13b-v1.6',
      audio: 'whisper-large-v3'
    },
    maxTokens: 4096,
    temperature: 0.7,
  }
};

export type SupportedVoices = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

// Utility function to check file size
export const isFileSizeValid = (file: File, maxSize: number) => {
  return file.size <= maxSize;
};

// Utility function to check file type
export const isFileTypeSupported = (file: File, supportedTypes: string[]) => {
  return supportedTypes.includes(file.type);
};
