
import { groqClient } from '../lib/api-config';

export interface ImageAnalysisResult {
  caption: string;
  text?: string;
  tags: string[];
  accessibility?: {
    colorContrast: string;
    textAlternatives: string[];
    structuralRoles: string[];
  };
}

export class VisionService {
  static async answerQuestion(imageFile: File, question: string): Promise<string> {
    try {
      if (!groqClient) {
        return `Vision analysis unavailable: API key not configured. Question: "${question}" for image: ${imageFile.name}`;
      }

      const image = await imageFile.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(image)));

      const response = await groqClient.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing images and answering questions about them. Since you cannot see images directly, provide helpful mock responses for demonstration.',
          },
          {
            role: 'user',
            content: `Please answer this question about an image file (${imageFile.name}): ${question}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 512,
      });

      return response.choices[0]?.message?.content || 'Unable to answer the question.';
    } catch (error) {
      console.error('Error answering question:', error);
      throw error;
    }
  }

  // Image Analysis using Vision models
  static async analyzeImage(imageFile: File): Promise<ImageAnalysisResult> {
    try {
      if (!groqClient) {
        return {
          caption: `Image analysis unavailable: API key not configured for ${imageFile.name}`,
          tags: ['demo', 'placeholder'],
          accessibility: {
            colorContrast: 'Analysis requires API key',
            textAlternatives: ['Configure API key for full analysis'],
            structuralRoles: ['Placeholder analysis'],
          },
        };
      }

      const image = await imageFile.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(image)));

      const response = await groqClient.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: `You are an expert image analysis model specializing in accessibility. 
            Since you cannot see images directly, provide structured mock analysis for demonstration.
            Format your response as:
            Caption: [description]
            Text: [any visible text]
            Tags: [comma-separated tags]
            Accessibility: [accessibility notes]`,
          },
          {
            role: 'user',
            content: `Analyze this image file for accessibility: ${imageFile.name}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse the response
      const result: ImageAnalysisResult = {
        caption: this.extractSection(content, 'caption') || `Mock analysis for ${imageFile.name}`,
        text: this.extractSection(content, 'text'),
        tags: this.extractTags(content) || ['demo', 'mock'],
        accessibility: {
          colorContrast: this.extractSection(content, 'accessibility') || 'Mock contrast analysis',
          textAlternatives: ['Mock text alternative'],
          structuralRoles: ['Mock structural role'],
        },
      };

      return result;
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    }
  }

  private static extractSection(content: string, section: string): string | undefined {
    const regex = new RegExp(`${section}:\\s*([^\\n]+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : undefined;
  }

  private static extractTags(content: string): string[] | undefined {
    const tagsSection = this.extractSection(content, 'tags');
    return tagsSection ? tagsSection.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : undefined;
  }

  private static extractColorContrast(text: string): string {
    const match = text.match(/color contrast:([^,\n]+)/i);
    return match ? match[1].trim() : 'Unknown contrast ratio';
  }

  private static extractTextAlternatives(text: string): string[] {
    const match = text.match(/text alternatives:([^,\n]+)/i);
    return match
      ? match[1].split(',').map((alt) => alt.trim()).filter((alt) => alt.length > 0)
      : ['No text alternatives provided'];
  }

  private static extractStructuralRoles(text: string): string[] {
    const match = text.match(/structural roles:([^,\n]+)/i);
    return match
      ? match[1].split(',').map((role) => role.trim()).filter((role) => role.length > 0)
      : ['No structural roles identified'];
  }
}
