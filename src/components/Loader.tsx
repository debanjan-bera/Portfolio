import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  appReady: boolean;
  onComplete: () => void;
}

interface WordStep {
  text: string;
  subtext?: string;
  dot?: boolean;
}

export default function Loader({ appReady, onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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

      const steps: WordStep[] = [
        { text: 'HELLO', dot: true },
        { text: 'FULL-STACK DEVELOPER', dot: true },
        { text: 'AI ENGINEERING', dot: true },
        { text: 'READY TO BUILD', dot: true }
      ];

      // Helper to generate the text HTML
      const getHtmlForStep = (step: WordStep) => {
        return `${step.text}${step.dot ? '<span class="text-white/20">.</span>' : ''}`;
      };

      // 1. Initial fade-in of elements (start with HELLO. and intro description)
      tl.fromTo(
        [brandRef.current, textRef.current, descRef.current, progressBarRef.current?.parentElement, countRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      );

      // 2. Loop through and transition the subsequent steps
      steps.slice(1).forEach((step, index) => {
        // Slide out the current word (and description on first step)
        const targets = index === 0 ? [textRef.current, descRef.current] : [textRef.current];
        tl.to(targets, {
          y: -20,
          opacity: 0,
          duration: 0.12,
          ease: 'power3.in',
        });

        // Set the new content and place them below in position
        tl.set(textRef.current, {
          innerHTML: getHtmlForStep(step),
          y: 20,
        });

        if (index === 0) {
          tl.set(descRef.current, {
            textContent: '',
            y: 0,
          });
        }

        // Slide in the new word
        tl.to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.15,
          ease: 'power3.out',
        });

        // Hold duration: last word has slightly longer hold
        const isLastWord = index === steps.length - 2;
        const holdDuration = isLastWord ? 0.5 : 0.18;
        tl.to({}, { duration: holdDuration });
      });

      // Capture duration up to this point to sync progress counting
      const exitTime = tl.duration();

      // Pause point: wait until appReady is true!
      tl.add(() => {
        if (!appReadyRef.current) {
          tl.pause();
        }
      });

      // 3. Exit Animation
      tl.to([brandRef.current, textRef.current, descRef.current, countRef.current, progressBarRef.current?.parentElement], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.03,
        ease: 'power3.in',
      });

      // Slide up the container curtain
      tl.to(
        containerRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.65,
          ease: 'power4.inOut',
        },
        '-=0.15'
      );

      // 4. Progress bar & percentage counting syncing (runs from start to the exitTime)
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: exitTime,
        ease: 'none',
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          if (countRef.current) {
            countRef.current.textContent = `${val.toString().padStart(3, '0')}%`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${val}%`;
          }
        },
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 bg-[#080A0A] z-[9999] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
    >
      {/* Top Section - Brand / Logo */}
      <div ref={brandRef} className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 text-accent-lime font-bold tracking-wider text-sm">
          <span>✦</span>
          <span>Debanjan.PORTFOLIO</span>
        </div>
        <div className="text-text-muted text-xs font-satoshi uppercase tracking-widest">
          EST. 2026
        </div>
      </div>

      {/* Middle Section - Word Cycle (Centered) */}
      <div className="flex-grow flex flex-col justify-center items-center text-center gap-6 px-4">
        <div
          ref={textRef}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-accent-lime uppercase leading-none"
          style={{ minHeight: '1.2em' }}
          dangerouslySetInnerHTML={{ __html: 'HELLO<span class="text-white/20">.</span>' }}
        />

        <div
          ref={descRef}
          className="text-text-muted max-w-lg text-sm sm:text-base font-mono tracking-wider"
        >
          Crafting exceptional and high-impact digital products with modern aesthetic engineering.
        </div>
      </div>

      {/* Bottom Section - Progress Bar and Percent */}
      <div className="flex flex-col gap-6 w-full font-satoshi">
        <div className="flex justify-between items-baseline">
          <span className="text-text-muted text-xs uppercase tracking-widest">
            INITIALIZING CORE ENGINE
          </span>
          <div
            ref={countRef}
            className="text-6xl md:text-8xl font-display font-semibold tabular-nums tracking-tighter"
          >
            000%
          </div>
        </div>

        {/* Outer bar */}
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full">
          {/* Inner bar */}
          <div
            ref={progressBarRef}
            className="h-full bg-accent-lime absolute left-0 top-0 shadow-[0_0_8px_var(--color-accent-lime)]"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
