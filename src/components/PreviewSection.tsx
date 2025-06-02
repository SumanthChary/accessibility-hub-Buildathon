
import { ProcessingResults } from './ProcessingResults';

interface PreviewSectionProps {
  features: Record<string, boolean>;
  hasContent: boolean;
  file: File | null;
  url: string;
}

export const PreviewSection = ({ features, hasContent, file, url }: PreviewSectionProps) => {
  if (!hasContent) return null;

  return (
    <div className="mt-8 p-6 bg-white border-2 border-gray-200 rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Live Processing Preview
      </h3>
      
      {file && (
        <ProcessingResults 
          file={file} 
          url=""
          isProcessing={false}
        />
      )}
      
      {url && !file && (
        <ProcessingResults 
          file={null} 
          url={url}
          isProcessing={false}
        />
      )}
    </div>
  );
};
