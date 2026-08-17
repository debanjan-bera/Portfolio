import { useEffect, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import FloatingWidget from './components/FloatingWidget';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

// Start loading the initial page immediately
const landingPageImport = import('./pages/LandingPage');

const LandingPage = lazy(() =>
  landingPageImport.then((m) => ({
    default: m.LandingPage,
  }))
);

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Projects = lazy(() => import('./pages/Projects'));

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    landingPageImport.then(() => {
      setAppReady(true);
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    if (!introFinished) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, [introFinished]);

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary relative">

      <Header />

      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={
            <LandingPage isLoading={!introFinished} />
          }
          />
          <Route path="/about" element={
            <AboutPage isLoading={!introFinished} />
          }
          />

          <Route path="/projects"
            element={
              <main className="max-w-310 mx-auto px-6 md:px-12 pt-24">
                <Projects isLoading={!introFinished} />
              </main>
            }
          />

          <Route path="/contact" element={
            <ContactPage isLoading={!introFinished} />
          }
          />
        </Routes>
      </Suspense>

      <FloatingWidget />

      {!introFinished && (
        <Loader appReady={appReady} onComplete={handleIntroComplete} />
      )}
    </div>
  );
}

function RouteLoader() {
  return (
    <div className="fixed inset-0 bg-bg z-9998 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/5 overflow-hidden">
        <div className="h-full w-[30%] bg-accent-lime animate-pulse" />
      </div>
    </div>
  );
}