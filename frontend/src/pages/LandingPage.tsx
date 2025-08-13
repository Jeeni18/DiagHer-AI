import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import TechnologySection from '../components/TechnologySection';
import ImpactSection from '../components/ImpactSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navigation />
      <Hero scrollY={scrollY} />
      <ProblemSection scrollY={scrollY} />
      
      <div id="solution">
        <SolutionSection />
      </div>

      <div id="how-it-works">
        <TechnologySection scrollY={scrollY} />
      </div>

      <div id="features">
        <ImpactSection scrollY={scrollY} />
      </div>

      <CTASection scrollY={scrollY} />
      <Footer />
    </div>
  );
}

export default LandingPage;
