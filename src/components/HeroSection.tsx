
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-24 px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 sm:-top-40 -right-32 sm:-right-40 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 sm:-bottom-40 -left-32 sm:-left-40 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Enterprise AI-Powered Accessibility Platform</span>
            <span className="sm:hidden">AI Accessibility Platform</span>
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] sm:leading-tight px-2">
            Transform Content into{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent italic block sm:inline">
              Accessible Formats
            </span>{' '}
            <span className="block sm:inline">Instantly</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
            Professional AI-powered platform that converts audio, images, and PDFs into 
            accessible formats. Ensure compliance and reach wider audiences effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => {
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Start Free Trial</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl border-2 hover:bg-gray-50"
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="whitespace-nowrap">View Pricing</span>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">Trusted by accessibility professionals worldwide</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-center justify-center max-w-5xl mx-auto">
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 p-2 sm:p-3">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Global Standards</span>
              </div>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 p-2 sm:p-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 p-2 sm:p-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 p-2 sm:p-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-gray-600 p-2 sm:p-3 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                <span className="text-xs sm:text-sm font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
