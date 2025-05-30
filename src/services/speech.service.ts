import { groqClient, API_CONFIG } from '../lib/api-config';
import type { SupportedVoices } from '../lib/api-config';

export class SpeechService {
  // Speech-to-Text using Whisper model
  static async transcribe(audioFile: File): Promise<string> {
    try {
      const audio = await audioFile.arrayBuffer();
      const base64Audio = Buffer.from(audio).toString('base64');
      
      const response = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Transcribe this audio: ${base64Audio}`,
          },
        ],
        model: API_CONFIG.groq.models.audio,
        temperature: API_CONFIG.groq.temperature,
        max_tokens: API_CONFIG.groq.maxTokens,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  // Text-to-Speech using chat model
  static async synthesize(
    text: string,
    voice: SupportedVoices = 'alloy'
  ): Promise<string> {
    try {
      const response = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are a text-to-speech service. Convert the following text into natural speech in the ${voice} voice.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        model: API_CONFIG.groq.models.chat,
        temperature: API_CONFIG.groq.temperature,
        max_tokens: API_CONFIG.groq.maxTokens,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw new Error('Failed to synthesize speech');
    }
  }
}
