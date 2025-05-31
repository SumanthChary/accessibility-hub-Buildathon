import { groqClient } from '../lib/api-config';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface TextItem {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
}

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
          .filter((item): item is TextItem => 'str' in item)
          .map(item => item.str)
          .join(' ');
        
        fullText += pageText + '\n\n';
        structure.push({
          pageNumber: i,
          textLength: pageText.length,
        });
      }

      const metadata = await pdf.getMetadata() as PDFMetadata;

      // Use Groq for text analysis
      const response = await groqClient.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
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
      const [summary = '', simplifiedText = ''] = analysisContent.split('\n\n').map(text => 
        text.replace(/^(Summary:|Simplified Version:)/i, '').trim()
      );

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

  static async simplifyText(text: string): Promise<string> {
    try {
      const response = await groqClient.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
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
