export interface CacheEntry {
  timestamp: number;
  version: string;
  data: {
    accessible: string;
    analysis: string;
    audioUrl?: string;
  };
}

export interface PreviewState {
  original: string;
  accessible: string;
  analysis: string;
  error?: string;
  contentType?: 'audio' | 'image' | 'pdf' | 'unknown';
}

export interface ServiceResult {
  accessible: string;
  analysis: string;
  audioUrl?: string;
}
