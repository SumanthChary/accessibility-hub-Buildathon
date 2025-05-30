
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';

export const HeroSection = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200">
          <Sparkles className="h-4 w-4" />
          #1 Accessibility Platform
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>

        {/* Main Headlines */}
        <h1 className="text-6xl lg:text-7xl font-bold text-slate-800 tracking-tight leading-tight mb-8">
          <span className="block">Accessibility for</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Everyone
          </span>
          <span className="block mt-2 text-5xl lg:text-6xl">Instantly.</span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
          Transform any content—websites, documents, or videos—into formats everyone can use.{' '}
          <span className="font-semibold text-slate-800">No barriers. No waiting. No excuses.</span>
        </p>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">1.3B+ people need accessible content</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="font-medium">Built with love & purpose</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <span className="font-medium">Global impact, instant results</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            onClick={scrollToUpload}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-200 focus:outline-none group shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            aria-label="Get started with accessibility tools"
          >
            Start Transforming Content
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
            onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Visual Elements */}
        <div className="relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <div className="w-96 h-96 border-8 border-blue-300 rounded-full"></div>
            <div className="absolute w-72 h-72 border-4 border-purple-300 rounded-full"></div>
            <div className="absolute w-48 h-48 border-2 border-pink-300 rounded-full"></div>
          </div>
          
          <div className="relative z-10 pt-16">
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="w-10 h-10 bg-blue-600 rounded-lg"></div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center transform -rotate-2 hover:-rotate-6 transition-transform duration-300">
                <div className="w-10 h-10 bg-purple-600 rounded-lg"></div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center transform rotate-1 hover:rotate-3 transition-transform duration-300">
                <div className="w-10 h-10 bg-pink-600 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
