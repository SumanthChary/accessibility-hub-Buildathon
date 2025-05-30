import { groqClient, API_CONFIG } from '../lib/api-config';

export class VisionService {
  // Image Analysis using Vision models
  static async analyzeImage(imageFile: File): Promise<{
    caption: string;
    text?: string;
    tags: string[];
  }> {
    try {
      const image = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(image).toString('base64');

      // Get image caption and analysis
      const response = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an advanced vision model that analyzes images. Provide a detailed caption, extract any visible text (OCR), and generate relevant tags.',
          },
          {
            role: 'user',
            content: `Analyze this image and provide: 1) A detailed caption 2) Any text visible in the image 3) Relevant tags. Format as JSON: ${base64Image}`,
          },
        ],
        model: API_CONFIG.groq.models.vision,
        temperature: API_CONFIG.groq.temperature,
        max_tokens: API_CONFIG.groq.maxTokens,
      });

      try {
        const result = JSON.parse(response.choices[0]?.message?.content || '{}');
        return {
          caption: result.caption || '',
          text: result.text,
          tags: result.tags || [],
        };
      } catch {
        return {
          caption: response.choices[0]?.message?.content || '',
          text: '',
          tags: [],
        };
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    }
  }

  // Visual Question Answering
  static async answerQuestion(imageFile: File, question: string): Promise<string> {
    try {
      const image = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(image).toString('base64');

      const response = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an advanced vision model that answers questions about images accurately and concisely.',
          },
          {
            role: 'user',
            content: `Question: ${question}\nImage: ${base64Image}`,
          },
        ],
        model: API_CONFIG.groq.models.vision,
        temperature: API_CONFIG.groq.temperature,
        max_tokens: API_CONFIG.groq.maxTokens,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('VQA error:', error);
      throw new Error('Failed to answer question about image');
    }
  }
}
