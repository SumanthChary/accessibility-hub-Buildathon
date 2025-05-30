
import { Button } from '@/components/ui/button';
import { Download, Link as LinkIcon, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PreviewSectionProps {
  features: {
    captions: boolean;
    signLanguage: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    plainLanguage: boolean;
  };
  hasContent: boolean;
}

export const PreviewSection = ({ features, hasContent }: PreviewSectionProps) => {
  const { toast } = useToast();
  
  const activeFeatures = Object.entries(features).filter(([_, active]) => active);
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your accessible content is being prepared for download."
    });
  };

  const handleCopyLink = () => {
    const link = "https://accessible-content.example.com/shared/abc123";
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Shareable accessible link copied to clipboard."
    });
  };

  const getPreviewText = () => {
    const baseText = "Welcome to our website. We believe in creating content that everyone can access and enjoy.";
    
    if (features.plainLanguage) {
      return "Welcome! We make content that everyone can use and enjoy.";
    }
    
    return baseText;
  };

  const getPreviewStyle = () => {
    let className = "p-6 rounded-lg border text-left transition-all duration-300 ";
    
    if (features.highContrast) {
      className += "bg-black text-white border-white ";
    } else {
      className += "bg-white border-gray-200 ";
    }
    
    return className;
  };

  if (!hasContent) {
    return (
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-slate-800">
            Live Preview
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload content or enter a URL to see the accessibility features in action.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Preview will appear here</p>
              <p className="text-sm text-gray-400">Add content above to see it transformed</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold text-slate-800">
          Live Preview
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See how your content looks with the selected accessibility features applied.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Active Features Summary */}
        {activeFeatures.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Active Features:</h3>
            <div className="flex flex-wrap gap-2">
              {activeFeatures.map(([feature, _]) => (
                <span 
                  key={feature}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                >
                  {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preview Content */}
        <div className={getPreviewStyle()}>
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${features.highContrast ? 'text-white' : 'text-slate-800'}`}>
              Sample Content Preview
            </h3>
            
            <p className={`leading-relaxed ${
              features.highContrast ? 'text-gray-100' : 'text-slate-600'
            } ${features.textToSpeech ? 'border-l-4 border-blue-400 pl-4' : ''}`}>
              {getPreviewText()}
            </p>
            
            {features.captions && (
              <div className="bg-black bg-opacity-80 text-white p-3 rounded text-sm">
                [Captions: "Welcome to our website content..."]
              </div>
            )}
            
            {features.signLanguage && (
              <div className="bg-blue-100 border border-blue-300 p-3 rounded text-sm text-blue-800">
                🤟 Sign language interpretation overlay would appear here
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleDownload}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Accessible Version
          </Button>
          
          <Button 
            onClick={handleCopyLink}
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg"
          >
            <Copy className="mr-2 h-5 w-5" />
            Copy Shareable Link
          </Button>
        </div>
      </div>
    </section>
  );
};
