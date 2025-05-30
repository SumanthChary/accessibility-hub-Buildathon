import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Stats } from '@/components/Stats';
import { UploadForm } from '@/components/UploadForm';
import { FeatureToggles } from '@/components/FeatureToggles';
import { PreviewSection } from '@/components/PreviewSection';
import { FeaturesShowcase } from '@/components/FeaturesShowcase';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [features, setFeatures] = useState({
    captions: false,
    signLanguage: false,
    highContrast: false,
    textToSpeech: false,
    plainLanguage: false,
  });

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      <main>
        <HeroSection />
        <Stats />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-24 pb-24">
            <UploadForm 
              inputUrl={inputUrl}
              setInputUrl={setInputUrl}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
            />
            <FeatureToggles 
              features={features}
              onToggle={handleFeatureToggle}
            />
            <PreviewSection 
              features={features}
              hasContent={Boolean(inputUrl || uploadedFile)}
              file={uploadedFile}
              url={inputUrl}
            />
          </div>
        </div>
        <FeaturesShowcase />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
