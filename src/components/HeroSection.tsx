import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';

export const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />
      
      <div className="relative container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Make Your Content 
          <span className="text-blue-600"> Accessible</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Transform your media into accessible formats instantly. 
          Support for audio transcription, image descriptions, and PDF accessibility.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <a 
            href="#demo-section"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Try It Now
          </a>
          <a 
            href="#features"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-slate-700 bg-white rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};
