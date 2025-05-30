import { groqClient } from '../lib/api-config';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export class DocumentService {
  // Parse PDF documents
  static async parsePDF(file: File): Promise<{
    text: string;
    structure: any;
    metadata: any;
  }> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const numPages = pdf.numPages;
      let fullText = '';
      const structure = [];

      // Extract text from each page
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';

        // Get page structure
        structure.push({
          pageNumber: i,
          size: {
            width: page.view[2],
            height: page.view[3],
          },
        });
      }

      // Get document metadata
      const metadata = await pdf.getMetadata();

      // Use Groq to analyze the document content
      const analysisResponse = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Analyze this document content and provide a structured summary: ${fullText}`,
          },
        ],
        model: 'mixtral-8x7b-32768',
      });

      return {
        text: fullText,
        structure: {
          pages: structure,
          analysis: analysisResponse.choices[0]?.message?.content,
        },
        metadata: metadata.info,
      };
    } catch (error) {
      console.error('Document parsing error:', error);
      throw new Error('Failed to parse document');
    }
  }

  // Extract specific information from document
  static async extractInformation(file: File, query: string): Promise<string> {
    try {
      const { text } = await this.parsePDF(file);

      const response = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Based on this document content: "${text}", ${query}`,
          },
        ],
        model: 'mixtral-8x7b-32768',
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Information extraction error:', error);
      throw new Error('Failed to extract information from document');
    }
  }
}
