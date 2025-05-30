
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-20 pb-32 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight leading-tight">
          Accessibility for{' '}
          <span className="text-blue-600">Everyone</span>,{' '}
          <span className="block mt-2">Instantly.</span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Transform any content—websites, documents, or videos—into formats everyone can use.{' '}
          <span className="font-medium text-slate-700">No barriers. No waiting.</span>
        </p>
        
        <div className="pt-8">
          <Button 
            onClick={scrollToUpload}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-200 focus:ring-4 focus:ring-blue-200 focus:outline-none group"
            aria-label="Get started with accessibility tools"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="pt-16 opacity-60">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
