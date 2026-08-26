import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import About from "../components/About";
import Contact from "../components/Contact";
import Expertise from "../components/Expertise";
import Hero from "../components/Hero";
import { LoopingTechStack } from "../components/LoopingTechStack";

export const LandingPage = ({ isLoading }: { isLoading: boolean }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero immediate entrance reveal
      gsap.fromTo(
        '#home > div > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );

      // 2. Scroll reveal for each section
      const scrollSections = ['#about', '#expertise', '#testimonials', '#contact'];
      scrollSections.forEach((id) => {
        const section = document.querySelector(id);
        if (!section) return;

        // Collect elements to slide up, excluding preview stages
        const targets = Array.from(
          section.querySelectorAll('h2, p, .grid, .flex, .inline-flex, .border-t, footer > div')
        ).filter((el) => !el.closest('.no-reveal'));
        if (targets.length === 0) return;

        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <main ref={containerRef} className="max-w-[1240px] mx-auto px-0 md:px-12 pt-24 flex flex-col gap-[clamp(96px,5vw,100px)]">
      <Hero onAboutClick={() => navigate('/about')} />
        <LoopingTechStack/>
      <About />
      <Expertise />
      <Contact />
    </main>
  );
};