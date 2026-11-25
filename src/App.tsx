import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Hauling from '@/components/Hauling';
import Gallery from '@/components/Gallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import Equipment from '@/components/Equipment';
import ServiceArea from '@/components/ServiceArea';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import { findPage } from '@/lib/pages';

export default function App({ path = '/' }: { path?: string }) {
  const page = findPage(path);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  // When a visitor clicks "Get a quote for this" on a service card, preselect
  // that service in the form and scroll to it.
  function handleServiceSelect(label: string) {
    setPresetService(label);
    requestAnimationFrame(() => {
      document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Capture clicks on the service card quote links (data-service attribute).
  function onRootClick(e: React.MouseEvent) {
    const target = (e.target as HTMLElement).closest('[data-service]') as HTMLElement | null;
    if (target) {
      const label = target.getAttribute('data-service');
      if (label) handleServiceSelect(label);
    }
  }

  if (page) {
    return (
      <div className="min-h-screen bg-cream">
        <LandingPage page={page} />
      </div>
    );
  }

  return (
    <div onClick={onRootClick} className="min-h-screen bg-cream">
      <Header />
      <main>
        <Hero />
        <QuoteForm presetService={presetService} />
        <HowItWorks />
        <Services />
        <Equipment />
        <Hauling />
        <Gallery />
        <WhyChooseUs />
        <ServiceArea />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
