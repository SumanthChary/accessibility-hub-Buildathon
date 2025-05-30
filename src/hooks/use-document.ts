import { useState } from 'react';
import { DocumentService } from '../services/document.service';

export const useDocument = () => {
  const [isParsing, setIsParsing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseDocument = async (file: File) => {
    setIsParsing(true);
    setError(null);
    try {
      const result = await DocumentService.parsePDF(file);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse document');
      throw err;
    } finally {
      setIsParsing(false);
    }
  };

  const extractInformation = async (file: File, query: string) => {
    setIsExtracting(true);
    setError(null);
    try {
      const information = await DocumentService.extractInformation(file, query);
      return information;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract information');
      throw err;
    } finally {
      setIsExtracting(false);
    }
  };

  return {
    parseDocument,
    extractInformation,
    isParsing,
    isExtracting,
    error,
  };
};
