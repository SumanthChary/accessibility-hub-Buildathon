
import { useEffect } from 'react';
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

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      {user ? (
        // Authenticated user sees dashboard and upload section
        <main className="pt-16">
          <Dashboard />
          <section id="demo-section" className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Transform Your Content
                </h2>
                <p className="text-xl text-gray-600">
                  Upload files to make them accessible with AI-powered transformations
                </p>
              </div>
              <UploadForm />
            </div>
          </section>
        </main>
      ) : (
        // Non-authenticated users see the marketing landing page
        <main>
          <HeroSection />
          <FeaturesShowcase />
          <Stats />
          <section id="demo-section">
            <UploadForm />
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
