import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container relative mx-auto text-center px-4 space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6 animate-fade-in">
          Make Your Content <span className="text-blue-600">Accessible</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
          Transform your audio, images, and PDFs into accessible formats instantly.
          Powered by AI to ensure everyone can access your content.
        </p>
        <div className="flex items-center justify-center gap-4 animate-fade-in animation-delay-400">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => {
              document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Try it now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn more <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center items-center gap-8 mt-12 text-gray-600">
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            <span>Global Access</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            <span>Inclusive Design</span>
          </div>
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
};
