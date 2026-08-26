import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { LoopingTechStack } from '../components/LoopingTechStack';

export default function AboutPage({ isLoading }: { isLoading: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(() => !document.documentElement.classList.contains('light'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Entrance animation for image and typography
      gsap.fromTo(
        '.about-image-container',
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.about-title > span',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.about-content-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg text-text-primary px-6 md:px-12 pt-28  flex flex-col items-center"
    >
      {/* Hero Visual Section (Editorial Design) */}
      <div className="relative w-full max-w-4xl mb-32 flex items-center justify-center min-h-[40vh] md:min-h-[50vh]">
        {/* Hover Target Container (Sized exactly to the portrait bounds) */}
        <div className="relative w-55 h-92.5 sm:w-70 sm:h-105 md:w-90 md:h-135 lg:w-100 lg:h-125 group/image cursor-pointer flex items-center justify-center border border-border-subtle">
          {/* Layer 1: Background Panel Image Container (Stays still - z-0) */}
          <div className={`about-image-container absolute inset-0 overflow-hidden shadow-2xl z-0 ${isDark ? 'grayscale' : ''}`}>
            <img
              src={isDark ? '/portrait-grey-bg.png' : '/portrait-colour-bg.png'}
              alt="About Background"
              className={`w-full h-full object-cover object-center opacity-80 pointer-events-none transition-opacity duration-700 group-hover/image:opacity-80 ${isDark ? '' : 'mix-blend-multiply'}`}
            />
            {/* Top Fade Overlay only */}
            {isDark && <div className="absolute top-0 inset-x-0 h-16 bg-linear-to-b from-bg to-transparent pointer-events-none z-10" />}
          </div>

          {/* Layer 2: Giant Serif Typography (Sandwiched in the middle - z-10) */}
          <h1 className="about-title absolute w-screen max-w-5xl px-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center font-serif text-[clamp(2.2rem,6.5vw,5.5rem)] font-normal leading-[1.3] tracking-tight text-[#CEC9C9] pointer-events-none z-10 select-none transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1) group-hover/image:opacity-30">
            <span className="inline-block">Debanjan</span>

            <span className="inline-block  flex flex-row">
              FullStack <span>Developer<span className="text-accent-lime font-sans">*</span></span>
            </span>
            <span className="inline-block">Kolkata 2026</span>
          </h1>

          {/* Layer 3: Foreground Cutout of the Man (Sits in front of the text - z-20) */}
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-20">
            <img
              src={isDark ? '/portrait-grey-transparent.png' : '/portrait-colour-transparent.png'}
              alt="Debanjan Foreground"
              className="w-full h-full object-cover object-center opacity-0 group-hover/image:opacity-100 transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1) origin-bottom"
            />
          </div>
        </div>
      </div>
      <LoopingTechStack />
      {/* Narrative Biography Section */}
      <div className="about-content-section w-full max-w-2xl mt-16 mb-16 md:mt-32 space-y-8 font-satoshi">
        <div className="flex items-center gap-2 text-accent-lime">
          <span className="text-md">✦</span>
          <span className="text-xs font-bold tracking-widest uppercase">MY STORY</span>
        </div>

        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          I started coding with a simple curiosity — I wanted to solve real-life problems and build things that could actually help people. My first project was an ISRO website redesign using HTML and CSS. It was a small beginning, but it made me more interested in how ideas become real products.
        </p>

        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          As I built more projects, my curiosity moved beyond the interface. I wanted to understand how the frontend, backend, databases, and different services work together to create scalable applications. Later, I became interested in machine learning, especially the process of training and evaluating models. That curiosity eventually led me to explore AI agents and intelligent systems.
        </p>

        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          Today, I enjoy working across the full stack, exploring AI, solving problems, and understanding how systems work as a whole. I’m still learning, building, and experimenting — with the goal of creating technology that is useful, thoughtful, and built to grow.
        </p>
      </div>



      {/* Editorial Contact Links Footer */}
      <div className="w-full max-w-4xl mt-38 flex flex-col items-center select-none text-center">
        {/* Contact Me Badge */}
        <div className="flex items-center gap-2 text-text-secondary uppercase tracking-widest text-xs font-bold font-satoshi mb-8">
          <span className="text-accent-lime">✦</span>
          <span>CONTACT ME</span>
          <span className="text-accent-lime">✦</span>
        </div>

        {/* Center Serif Links */}
        <div className="flex flex-col gap-6 font-serif">
          <a
            href="mailto:contact@debanjan.com"
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-text-primary hover:text-accent-lime hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-text-primary hover:text-accent-lime hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-text-primary hover:text-accent-lime hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl md:text-6xl lg:text-7xl font-normal text-text-primary hover:text-accent-lime hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            Twitter
          </a>
        </div>

        <div className="text-text-muted text-xs font-satoshi uppercase tracking-widest mt-24 mb-12 pt-8 border-t border-white/5 w-full">
          &copy; {new Date().getFullYear()} Debanjan. All rights reserved.
        </div>
      </div>
    </div>
  );
}
