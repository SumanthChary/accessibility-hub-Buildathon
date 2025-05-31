import { Groq } from 'groq-sdk';

// Initialize Groq client with direct API key
export const groqClient = new Groq({
  apiKey: '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',
});

// Initialize Lyzer client configuration
export const lyzerConfig = {
  apiKey: import.meta.env.VITE_LYZER_API_KEY,
  baseURL: 'https://api.lyzerstudio.com/v1',
};

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
  },
  lyzer: {
    models: {
      text: 'lyzer-text-v1',
      vision: 'lyzer-vision-v1',
      analysis: 'lyzer-analysis-v1'
    },
    maxTokens: 2048,
    temperature: 0.5,
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
