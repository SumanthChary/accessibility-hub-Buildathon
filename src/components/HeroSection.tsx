import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Globe } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Make Your Content <span className="text-blue-600">Accessible</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your audio, images, and PDFs into accessible formats instantly.
          Powered by AI to ensure everyone can access your content.
        </p>
        <Button
          size="lg"
          onClick={() => {
            document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Try it now
        </Button>
      </div>
    </section>
  );
};
