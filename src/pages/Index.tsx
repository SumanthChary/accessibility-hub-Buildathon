
import { HeroSection } from '@/components/HeroSection';
import { FeaturesShowcase } from '@/components/FeaturesShowcase';
import { PricingPlans } from '@/components/PricingPlans';
import { Stats } from '@/components/Stats';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/use-auth';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';

const Index = () => {
  const { user, loading } = useAuth();

  // Show dashboard for authenticated users
  if (!loading && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Dashboard />
        </main>
        <Footer />
      </div>
    );
  }

  // Show landing page for non-authenticated users without header
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <Stats />
        <FeaturesShowcase />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
