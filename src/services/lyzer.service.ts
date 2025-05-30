import { lyzerConfig, API_CONFIG } from '@/lib/api-config';

export class LyzerService {
  private static async makeRequest(endpoint: string, data: any) {
    const response = await fetch(`${lyzerConfig.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lyzerConfig.apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lyzer API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async analyzeText(text: string) {
    try {
      const response = await this.makeRequest('/analyze/text', {
        model: API_CONFIG.lyzer.models.text,
        text,
        max_tokens: API_CONFIG.lyzer.maxTokens,
        temperature: API_CONFIG.lyzer.temperature,
      });

      return response;
    } catch (error) {
      console.error('Text analysis error:', error);
      throw new Error('Failed to analyze text');
    }
  }

  static async analyzeImage(imageFile: File) {
    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });

      const response = await this.makeRequest('/analyze/image', {
        model: API_CONFIG.lyzer.models.vision,
        image: base64Image.split(',')[1],
        max_tokens: API_CONFIG.lyzer.maxTokens,
        temperature: API_CONFIG.lyzer.temperature,
      });

      return response;
    } catch (error) {
      console.error('Image analysis error:', error);
      throw new Error('Failed to analyze image');
    }
  }

  static async performAnalysis(data: any) {
    try {
      const response = await this.makeRequest('/analyze', {
        model: API_CONFIG.lyzer.models.analysis,
        data,
        max_tokens: API_CONFIG.lyzer.maxTokens,
        temperature: API_CONFIG.lyzer.temperature,
      });

      return response;
    } catch (error) {
      console.error('Analysis error:', error);
      throw new Error('Failed to perform analysis');
    }
  }
}
