
import { groqClient } from '../lib/api-config';
import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PageStructure {
  pageNumber: number;
  textLength: number;
}

interface PDFMetadata {
  info?: {
    Title?: string;
    Author?: string;
    Subject?: string;
    Keywords?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
  };
  metadata?: unknown;
}

interface DocumentAnalysis {
  text: string;
  structure: PageStructure[];
  metadata: PDFMetadata;
  summary?: string;
  simplifiedText?: string;
}

// Helper function to check if an item is a TextItem with str property
function hasTextContent(item: TextItem | TextMarkedContent): item is TextItem {
  return 'str' in item && typeof (item as TextItem).str === 'string';
}

export class DocumentService {
  static async parsePDF(file: File): Promise<DocumentAnalysis> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const numPages = pdf.numPages;
      let fullText = '';
      const structure: PageStructure[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .filter(hasTextContent)
          .map(item => item.str)
          .join(' ');
        
        fullText += pageText + '\n\n';
        structure.push({
          pageNumber: i,
          textLength: pageText.length,
        });
      }

      const metadata = await pdf.getMetadata() as PDFMetadata;

      let summary = '';
      let simplifiedText = '';

      // Use Groq for text analysis if available
      if (groqClient && fullText.length > 0) {
        try {
          const response = await groqClient.chat.completions.create({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: 'system',
                content: 'Analyze and simplify the following document text. Provide: 1) A concise summary (max 3 sentences) 2) A simplified version in plain language'
              },
              {
                role: 'user',
                content: `Text to analyze: ${fullText.substring(0, 4000)}...`
              }
            ],
            temperature: 0.3,
            max_tokens: 2048
          });

          const analysisContent = response.choices[0]?.message?.content || '';
          const parts = analysisContent.split('\n\n');
          summary = parts[0]?.replace(/^(Summary:|Simplified Version:)/i, '').trim() || 'Summary not available';
          simplifiedText = parts[1]?.replace(/^(Summary:|Simplified Version:)/i, '').trim() || 'Simplified text not available';
        } catch (error) {
          console.warn('AI analysis failed:', error);
          summary = 'AI analysis unavailable';
          simplifiedText = 'Text simplification unavailable';
        }
      } else {
        summary = 'AI analysis requires API key configuration';
        simplifiedText = 'Text simplification requires API key configuration';
      }

      return {
        text: fullText,
        structure,
        metadata,
        summary,
        simplifiedText
      };

    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error('Failed to parse PDF document');
    }
  }

  static async extractInformation(file: File, query: string): Promise<string> {
    try {
      const analysis = await this.parsePDF(file);
      
      if (!groqClient) {
        return `Based on the query "${query}", here's the extracted text from the document: ${analysis.text.substring(0, 1000)}...`;
      }

      const response = await groqClient.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: 'system',
            content: 'You are an expert at extracting specific information from documents. Answer the user\'s query based on the provided document text.'
          },
          {
            role: 'user',
            content: `Document text: ${analysis.text.substring(0, 4000)}\n\nQuery: ${query}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      });

      return response.choices[0]?.message?.content || 'No information found for the given query.';
    } catch (error) {
      console.error('Information extraction error:', error);
      throw new Error('Failed to extract information from document');
    }
  }

  static async simplifyText(text: string): Promise<string> {
    try {
      if (!groqClient) {
        return `Simplified version: ${text.substring(0, 500)}... (AI simplification requires API key configuration)`;
      }

      const response = await groqClient.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: 'system',
            content: 'Convert the following text into simple, plain language that is easy to understand.'
          },
          {
            role: 'user',
            content: `Text to simplify: ${text}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1024
      });

      return response.choices[0]?.message?.content || text;
    } catch (error) {
      console.error('Text simplification error:', error);
      throw new Error('Failed to simplify text');
    }
  }
}
