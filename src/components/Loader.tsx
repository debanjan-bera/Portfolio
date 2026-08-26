import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  appReady: boolean;
  onComplete: () => void;
}

export default function Loader({ appReady, onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const darkBgRef = useRef<HTMLDivElement>(null);

  const appReadyRef = useRef(appReady);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Sync appReady changes and resume timeline if paused
  useEffect(() => {
    appReadyRef.current = appReady;
    if (appReady && tlRef.current && tlRef.current.paused()) {
      tlRef.current.play();
    }
  }, [appReady]);

  // Keep a stable ref of onComplete to avoid recreating the GSAP timeline
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current(),
      });
      tlRef.current = tl;

      if (prefersReducedMotion) {
        // Fast fade-out for users who prefer reduced motion
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
        return;
      }

      const progressObj = { value: 0 };

      // Helper to update text
      const updateCount = (val: number) => {
        const rounded = Math.floor(val);
        if (countRef.current) {
          countRef.current.textContent = `${rounded}%`;
        }
      };

      // 1. Initial fade-in of elements (brand info, the big number, footer)
      tl.fromTo(
        [brandRef.current, countRef.current, footerRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );

      // 2. Animate 0 -> 50
      tl.to(progressObj, {
        value: 50,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => updateCount(progressObj.value),
      });

      // Small pause
      tl.to({}, { duration: 0.15 });

      // 3. Animate 50 -> 75
      tl.to(progressObj, {
        value: 75,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => updateCount(progressObj.value),
      });

      // Small pause
      tl.to({}, { duration: 0.15 });

      // 4. Animate 75 -> 99
      tl.to(progressObj, {
        value: 99,
        duration: 1.2,
        ease: 'power1.out',
        onUpdate: () => updateCount(progressObj.value),
      });

      // 5. Pause point: wait until appReady is true!
      tl.add(() => {
        if (!appReadyRef.current) {
          tl.pause();
        }
      });

      // 6. Animate 99 -> 100
      tl.to(progressObj, {
        value: 100,
        duration: 0.4,
        ease: 'power3.out',
        onUpdate: () => updateCount(progressObj.value),
      });

      // Hold briefly at 100%
      tl.to({}, { duration: 0.2 });

      // 7. Exit animation: Fade out UI elements and the dark background layer
      tl.to([brandRef.current, countRef.current, footerRef.current, darkBgRef.current], {
        opacity: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power3.inOut',
      });

      // 8. 6-Strip exit animation (staggered slide-up of the lime strips)
      tl.to('.loader-strip', {
        yPercent: -100,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power4.inOut',
      }, '-=0.25');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden bg-transparent"
    >
      {/* 6 strips background (rendered below the dark Bg layer) */}
      <div className="absolute inset-0 flex pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="loader-strip h-full flex-1 bg-[#1A1A1E] border-r border-white/5 last:border-r-0"
          />
        ))}
      </div>

      {/* Solid dark background layer that covers the screen during loading */}
      <div
        ref={darkBgRef}
        className="absolute inset-0 bg-bg pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Top Section - Brand / Logo */}
      <div ref={brandRef} className="flex justify-between items-center w-full z-10 relative">
        <div className="flex items-center gap-2 text-accent-lime font-bold tracking-wider text-sm">
          <span>✦</span>
          <span>Debanjan.PORTFOLIO</span>
        </div>
        <div className="text-text-muted text-xs font-satoshi uppercase tracking-widest">
          EST. 2026
        </div>
      </div>

      {/* Middle Section - Big Count Number (Centered) */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 z-10 relative">
        <div
          ref={countRef}
          className="text-8xl sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-display font-light tabular-nums tracking-tighter text-text-secondary leading-none"
        >
          0%
        </div>
      </div>

      {/* Bottom Section - Info */}
      <div ref={footerRef} className="flex flex-col gap-6 w-full font-satoshi z-10 relative">
        <div className="flex justify-between items-baseline">
          <span className="text-text-muted text-xs uppercase tracking-widest font-semibold">
            INITIALIZING CORE ENGINE
          </span>
        </div>
      </div>
    </div>
  );
}
