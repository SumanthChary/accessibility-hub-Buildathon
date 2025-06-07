
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration with smooth animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 sm:-top-20 md:-top-32 lg:-top-40 -right-10 sm:-right-20 md:-right-32 lg:-right-40 w-24 h-24 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 sm:-bottom-20 md:-bottom-32 lg:-bottom-40 -left-10 sm:-left-20 md:-left-32 lg:-left-40 w-24 h-24 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 max-w-5xl mx-auto">
          {/* Badge with smooth animation */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-100 text-blue-700 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
            <span className="whitespace-nowrap">Enterprise AI-Powered Accessibility Platform</span>
          </div>

          {/* Main heading with staggered animation */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-200">
              Transform Content into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent italic block sm:inline animate-gradient-x">
                Accessible Formats
              </span>{' '}
              <span className="block sm:inline">Instantly</span>
            </h1>
          </div>

          {/* Subheading with animation */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-500 px-2 sm:px-0">
            Professional AI-powered platform that converts audio, images, and PDFs into 
            accessible formats. Ensure compliance and reach wider audiences effortlessly.
          </p>

          {/* CTA Buttons with hover animations */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-700 px-2 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              onClick={() => {
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-spin" />
              <span>Start Free Trial</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl border-2 hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Pricing</span>
            </Button>
          </div>

          {/* Trust indicators with staggered animations */}
          <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-1000">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 md:mb-6">Trusted by accessibility professionals worldwide</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center justify-center max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm font-medium text-center">Global Standards</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm font-medium text-center">Enterprise Security</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm font-medium text-center">Lightning Fast</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm font-medium text-center">AI-Powered</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1 md:space-x-2 text-gray-600 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-all duration-300 transform hover:scale-105 col-span-2 sm:col-span-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium text-center">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
