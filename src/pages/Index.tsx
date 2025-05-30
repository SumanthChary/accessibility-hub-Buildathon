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

  // Debug logging
  console.log('Index Render:', { inputUrl, uploadedFile, features });

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />
      <main className="container mx-auto px-4">
        <HeroSection />
        <Stats />
        <div id="demo-section" className="space-y-8 py-16">
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
          <div className="border-2 border-blue-500 p-4 rounded-lg">
            <PreviewSection 
              features={features}
              hasContent={true}
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
