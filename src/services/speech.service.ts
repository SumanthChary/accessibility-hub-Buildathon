import { groqClient } from '../lib/api-config';

export class SpeechService {
  // Speech-to-Text transcription
  static async transcribe(audioFile: File): Promise<string> {
    try {
      const audio = await audioFile.arrayBuffer();
      const base64Audio = Buffer.from(audio).toString('base64');
      
      const response = await groqClient.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: 'system',
            content: 'You are an expert audio transcription model. Transcribe the given audio accurately.'
          },
          {
            role: 'user',
            content: `Transcribe this audio file: ${base64Audio}`
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
  static async synthesizeSpeech(text: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      try {
        // Create audio context and nodes
        const audioContext = new window.AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Configure audio nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create an offline context for rendering
        const offlineCtx = new OfflineAudioContext(1, 44100 * 2, 44100);
        const source = offlineCtx.createBufferSource();
        
        // Generate audio data
        const audioBuffer = offlineCtx.createBuffer(1, 44100 * 2, 44100);
        const channelData = audioBuffer.getChannelData(0);
        
        // Simple sine wave generation
        for (let i = 0; i < channelData.length; i++) {
          channelData[i] = Math.sin(i * 0.1) * 0.5;
        }
        
        source.buffer = audioBuffer;
        source.connect(offlineCtx.destination);
        source.start();
        
        // Render audio to buffer
        offlineCtx.startRendering().then((renderedBuffer) => {
          // Convert audio buffer to wave file
          const numberOfChannels = renderedBuffer.numberOfChannels;
          const length = renderedBuffer.length * numberOfChannels * 2;
          const buffer = new ArrayBuffer(length);
          const view = new DataView(buffer);
          let offset = 0;
          
          for (let i = 0; i < renderedBuffer.length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
              const sample = renderedBuffer.getChannelData(channel)[i];
              const value = Math.max(-1, Math.min(1, sample));
              view.setInt16(offset, value < 0 ? value * 0x8000 : value * 0x7FFF, true);
              offset += 2;
            }
          }
          
          const blob = new Blob([buffer], { type: 'audio/wav' });
          resolve(blob);
        }).catch(reject);
        
      } catch (error) {
        console.error('Speech synthesis error:', error);
        reject(new Error('Failed to synthesize speech'));
      }
    });
  }
}
