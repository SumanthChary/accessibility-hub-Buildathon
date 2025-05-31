import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { useAuth } from '@/hooks/use-auth';
import { Stats } from '@/components/Stats';
import { UploadForm } from '@/components/UploadForm';
import { FeatureToggles } from '@/components/FeatureToggles';
import { PreviewSection } from '@/components/PreviewSection';
import { FeaturesShowcase } from '@/components/FeaturesShowcase';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { usePreview } from '@/hooks/use-preview';

const Index = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [features, setFeatures] = useState({
    captions: true,
    signLanguage: false,
    highContrast: false,
    textToSpeech: true,
    plainLanguage: true
  });

  const hasContent = Boolean(uploadedFile || inputUrl);
  const { user } = useAuth();
  const { processUrl } = usePreview();

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  };

  const handleUrlSubmit = async (url: string) => {
    if (!url) return;
    await processUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main>
        <HeroSection />
        <Stats />
        <section id="demo-section" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Try it Yourself
                </h2>
                <p className="text-lg text-gray-600">
                  Upload a file or paste a URL to see how we can make your content accessible.
                </p>
              </div>              <UploadForm
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                onUrlSubmit={handleUrlSubmit}
              />

              <FeatureToggles 
                features={features}
                onToggle={handleFeatureToggle}
              />

              <PreviewSection
                features={features}
                hasContent={hasContent}
                file={uploadedFile}
                url={inputUrl || null}
              />
            </div>
          </div>
        </section>
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
