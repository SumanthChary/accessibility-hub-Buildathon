
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Shield, Zap, Play } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export const HeroSection = () => {
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/auth';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-sm font-medium animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Enterprise AI-Powered Accessibility Platform</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 leading-tight animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-200">
              Transform Content into{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent italic">
                Accessible Formats
              </span>{' '}
              Instantly
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-500">
              Professional AI-powered platform that converts audio, images, and PDFs into 
              accessible formats. Ensure compliance and reach wider audiences effortlessly.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-700">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
              onClick={handleGetStarted}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              <span>{user ? 'Go to Dashboard' : 'Start Free Trial'}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl border-2 hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5 group"
              onClick={() => {
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Watch Demo</span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 sm:pt-16 lg:pt-20 animate-in fade-in-50 slide-in-from-bottom-8 duration-700 delay-1000">
            <p className="text-sm text-gray-500 mb-6">Trusted by accessibility professionals worldwide</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 items-center justify-center max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-600 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-center">Global Standards</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-600 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-center">Enterprise Security</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-600 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-center">Lightning Fast</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-600 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-center">AI-Powered</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 text-gray-600 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 transform hover:scale-105 cursor-pointer col-span-2 sm:col-span-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-center">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
