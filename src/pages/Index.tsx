
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesShowcase } from '@/components/FeaturesShowcase';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { PricingPlans } from '@/components/PricingPlans';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';
import { UploadForm } from '@/components/UploadForm';
import { ProcessingResults } from '@/components/ProcessingResults';

const Index = () => {
  const { user } = useAuth();
  const [inputUrl, setInputUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUrlSubmit = (url: string) => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      {user ? (
        // Authenticated user sees dashboard and upload section
        <main className="pt-16">
          <Dashboard />
          <section id="demo-section" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                  Transform Your Content
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                  Upload files to make them accessible with AI-powered transformations
                </p>
              </div>
              <div className="space-y-8">
                <UploadForm 
                  inputUrl={inputUrl}
                  setInputUrl={setInputUrl}
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                  onUrlSubmit={handleUrlSubmit}
                />
                {(uploadedFile || inputUrl || isProcessing) && (
                  <ProcessingResults 
                    file={uploadedFile}
                    url={inputUrl}
                    isProcessing={isProcessing}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      ) : (
        // Non-authenticated users see the marketing landing page
        <main>
          <HeroSection />
          <FeaturesShowcase />
          <Stats />
          <section id="demo-section" className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                  Try Our Demo
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                  Experience the power of AI-driven accessibility transformation
                </p>
              </div>
              <UploadForm 
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                uploadedFile={uploadedFile}
                setUploadedFile={setUploadedFile}
                onUrlSubmit={handleUrlSubmit}
              />
            </div>
          </section>
          <Testimonials />
          <PricingPlans />
          <FAQ />
          <CTA />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
