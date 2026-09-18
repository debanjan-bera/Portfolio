import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SlotRollTextProps {
  text: string;
  trigger?: boolean;
  className?: string;
}

export default function SlotRollText({
  text,
  trigger = false,
  className = '',
}: SlotRollTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);
  const prevText = useRef(text);
  const isFirst = useRef(true);
  const DURATION = 0.45;
  const STAGGER = 0.02;

  useEffect(() => {
    const current = currentRef.current;
    const next = nextRef.current;
    if (!current || !next) return;
    const currentChars = current.querySelectorAll('span');
    const nextChars = next.querySelectorAll('span');

    // FIRST RENDER
    if (isFirst.current) {
      isFirst.current = false;
      prevText.current = text;
      gsap.set(currentChars, { yPercent: 0, opacity: 1 });
      gsap.set(nextChars, { yPercent: 100, opacity: 0 }); // start below
      return;
    }

    if (prevText.current === text) return;
    prevText.current = text;

    gsap.killTweensOf([currentChars, nextChars]);

    // RESET (New text starts below)
    gsap.set(currentChars, { yPercent: 0, opacity: 1 });
    gsap.set(nextChars, { yPercent: 100, opacity: 1 });

    const tl = gsap.timeline();

    // OLD TEXT GOES UP
    tl.to(currentChars, {
      yPercent: -100,
      duration: DURATION,
      ease: 'power3.inOut',
      stagger: STAGGER,
    });

    // NEW TEXT COMES FROM BOTTOM
    tl.to(
      nextChars,
      {
        yPercent: 0,
        duration: DURATION,
        ease: 'power3.inOut',
        stagger: STAGGER,
      },
      0
    );
  }, [text]);

  useEffect(() => {
    if (isFirst.current) return;
    const current = currentRef.current;
    const next = nextRef.current;
    if (!current || !next) return;
    const currentChars = current.querySelectorAll('span');
    const nextChars = next.querySelectorAll('span');

    gsap.killTweensOf([currentChars, nextChars]);

    const tl = gsap.timeline();

    if (trigger) {
      // Hover In: roll UP (current goes up to -100, next comes up to 0 from 100)
      gsap.set(currentChars, { yPercent: 0 });
      gsap.set(nextChars, { yPercent: 100, opacity: 1 });

      tl.to(currentChars, {
        yPercent: -100,
        duration: DURATION,
        ease: 'power3.inOut',
        stagger: STAGGER,
      }).to(
        nextChars,
        {
          yPercent: 0,
          duration: DURATION,
          ease: 'power3.inOut',
          stagger: STAGGER,
        },
        0
      );
    } else {
      // Hover Out: roll DOWN (reverses back to start)
      tl.to(currentChars, {
        yPercent: 0,
        duration: DURATION,
        ease: 'power3.inOut',
        stagger: STAGGER,
      }).to(
        nextChars,
        {
          yPercent: 100,
          duration: DURATION,
          ease: 'power3.inOut',
          stagger: STAGGER,
        },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [trigger]);

  const renderChars = (str: string) =>
    str.split('').map((char, i) => (
      <span key={i} className="inline-block will-change-transform">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <span
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ whiteSpace: 'nowrap' }}
    >
      {/* layout helper */}
      <span className="invisible block" aria-hidden>
        {text}
      </span>
      {/* CURRENT TEXT */}
      <span ref={currentRef} className="absolute inset-0 block">
        {renderChars(prevText.current)}
      </span>
      {/* NEXT TEXT */}
      <span ref={nextRef} className="absolute inset-0 block">
        {renderChars(text)}
      </span>
    </span>
  );
}