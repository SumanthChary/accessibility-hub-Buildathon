
import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { UploadForm } from '@/components/UploadForm';
import { FeatureToggles } from '@/components/FeatureToggles';
import { PreviewSection } from '@/components/PreviewSection';
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
      <main className="max-w-6xl mx-auto px-6 lg:px-8">
        <HeroSection />
        <div className="space-y-16 pb-24">
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
            hasContent={inputUrl || uploadedFile}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
