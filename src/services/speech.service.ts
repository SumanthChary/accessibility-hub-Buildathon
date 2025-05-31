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

      // Create a MediaRecorder to capture the synthesized speech
      const audioStream = new MediaStream();
      const mediaRecorder = new MediaRecorder(audioStream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        resolve(audioBlob);
      };

      mediaRecorder.onerror = (error) => {
        reject(error);
      };

      utterance.onend = () => {
        mediaRecorder.stop();
      };

      mediaRecorder.start();
      window.speechSynthesis.speak(utterance);
    });
  }
}
