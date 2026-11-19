import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutBenefits from './components/sections/AboutBenefits';
import CurriculumPreview from './components/sections/CurriculumPreview';
import DocumentationGallery from './components/sections/DocumentationGallery';
import Mentors from './components/sections/Mentors';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as any).lenis = lenis;

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutBenefits />
      <CurriculumPreview />
      <DocumentationGallery />
      <Mentors />
      <Footer />
    </>
  );
}

export default App;
