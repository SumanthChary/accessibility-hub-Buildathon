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
      const image = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(image).toString('base64');

      const response = await groqClient.chat.completions.create({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing images and answering questions about them.',
          },
          {
            role: 'user',
            content: `Based on this image: ${base64Image}\n\nPlease answer this question: ${question}`,
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
      const image = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(image).toString('base64');

      const response = await groqClient.chat.completions.create({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'system',
            content: `You are an expert image analysis model specializing in accessibility. 
            Analyze the image and provide:
            1. A detailed caption describing the image content
            2. Any text visible in the image (OCR)
            3. Relevant tags for categorization
            4. Accessibility considerations including color contrast and structural roles`,
          },
          {
            role: 'user',
            content: `Analyze this image with focus on accessibility: ${base64Image}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse the response
      const sections = content.split('\n\n');
      const result: ImageAnalysisResult = {
        caption: '',
        tags: [],
        accessibility: {
          colorContrast: '',
          textAlternatives: [],
          structuralRoles: [],
        },
      };

      sections.forEach((section) => {
        if (section.toLowerCase().includes('caption:')) {
          result.caption = section.split('caption:')[1].trim();
        } else if (section.toLowerCase().includes('text:')) {
          result.text = section.split('text:')[1].trim();
        } else if (section.toLowerCase().includes('tags:')) {
          result.tags = section
            .split('tags:')[1]
            .trim()
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        } else if (section.toLowerCase().includes('accessibility:')) {
          const accessibilityText = section.split('accessibility:')[1].trim();
          result.accessibility = {
            colorContrast: this.extractColorContrast(accessibilityText),
            textAlternatives: this.extractTextAlternatives(accessibilityText),
            structuralRoles: this.extractStructuralRoles(accessibilityText),
          };
        }
      });

      // Ensure default values if parsing failed
      return {
        caption: result.caption || 'No caption available',
        text: result.text,
        tags: result.tags.length > 0 ? result.tags : ['untagged'],
        accessibility: result.accessibility,
      };
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    }
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
