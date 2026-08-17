import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const revealText = containerRef.current?.querySelector('.reveal-text');
      if (!revealText) return;

      const words = revealText.querySelectorAll('.reveal-word');
      if (words.length === 0) return;

      gsap.to(
        words,
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: revealText,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: true, // precise real-time tracking
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="inline-block mr-[0.22em] reveal-word text-text-primary">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="flex flex-col items-center justify-center text-center py-16 md:py-24 md:pb-48 max-w-5xl mx-auto space-y-8"
    >
      {/* Centered Badge */}
      <div className="flex items-center gap-2 text-accent-lime">
        <span className="text-md">✦</span>
        <span className="text-md font-bold font-satoshi tracking-widest uppercase">ABOUT ME</span>
      </div>

      {/* Large Centered Paragraph */}
      <p className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight text-center leading-[1.3] reveal-text">
        {splitWords(
          "I'm Debanjan, with over 5+ years of experience in design & development with strong focus on producing high quality & impactful digital experiences. I have worked with some of the most innovative industry leaders to help build their top-notch products."
        )}
      </p>
    </section>
  );
}

export default memo(About);


