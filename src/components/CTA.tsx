
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export const CTA = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Zap className="h-4 w-4" />
          Limited Time: Free Pro Features
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Ready to Make the Web
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            Accessible for All?
          </span>
        </h2>
        
        <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
          Join the accessibility revolution. Transform your first piece of content in under 30 seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToUpload}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-lg rounded-xl transition-all duration-300 focus:ring-4 focus:ring-white/20 focus:outline-none group shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
          >
            <Sparkles className="mr-3 h-6 w-6" />
            Start Free Transformation
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-blue-100 text-sm">
            No credit card required • 100% free to start
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/90">
          <div>
            <div className="text-3xl font-bold mb-2">1.3B+</div>
            <div className="text-blue-200">People Need Accessibility</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">3s</div>
            <div className="text-blue-200">Average Transform Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">99.2%</div>
            <div className="text-blue-200">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};
