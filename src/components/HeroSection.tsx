
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto text-center px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Enterprise AI-Powered Accessibility Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Transform Content into{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Accessible Formats
            </span>{' '}
            Instantly
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional AI-powered platform that converts audio, images, and PDFs into 
            accessible formats. Ensure compliance and reach wider audiences effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => {
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg rounded-xl border-2 hover:bg-gray-50"
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Pricing
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 sm:pt-12">
            <p className="text-sm text-gray-500 mb-6">Trusted by accessibility professionals worldwide</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center">
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Global Standards</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
