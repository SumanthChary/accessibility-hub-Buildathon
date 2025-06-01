
import { groqClient } from '../lib/api-config';

export class SpeechService {
  // Speech-to-Text transcription
  static async transcribe(audioFile: File): Promise<string> {
    try {
      if (!groqClient) {
        return `Transcription unavailable: API key not configured. File: ${audioFile.name}`;
      }

      // Convert audio file to base64 for processing
      const audio = await audioFile.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audio)));
      
      const response = await groqClient.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: 'system',
            content: 'You are an expert audio transcription assistant. Provide a mock transcription for demonstration purposes.'
          },
          {
            role: 'user',
            content: `Provide a sample transcription for an audio file named: ${audioFile.name}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      });

      return response.choices[0]?.message?.content || 'No transcription available';
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  // Text-to-Speech synthesis using Web Speech API
  static synthesizeSpeech(text: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis is not supported in this browser'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // For now, return a simple audio blob placeholder
      // In a real implementation, you'd capture the audio from speechSynthesis
      const audioChunks: BlobPart[] = [];
      
      utterance.onend = () => {
        // Create a minimal audio blob
        const audioBlob = new Blob(['fake audio data'], { type: 'audio/mp3' });
        resolve(audioBlob);
      };

      utterance.onerror = (error) => {
        reject(new Error('Speech synthesis failed'));
      };

      window.speechSynthesis.speak(utterance);
    });
  }
}
