import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Code, Layers, Compass, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaFigma,
  FaGitAlt
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiCypress,
  SiFirebase,
  SiTailwindcss,
  SiFramer,
  SiGreensock
} from 'react-icons/si';

interface ExpertiseItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  imageDesc: string;
  bgGradient: string;
}

const EXPERTISE: ExpertiseItem[] = [
  {
    id: 'dev',
    title: 'Development',
    icon: <Code className="w-5 h-5 text-accent-lime" />,
    description:
      'Building responsive websites. Providing the users an enriching experience that responds to any device and screen size.',
    imageDesc:
      'Clean semantic code blocks, highly optimized components, responsive previews, and performance scores of 100/100.',
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    icon: <Layers className="w-5 h-5 text-accent-lime" />,
    description:
      'Designing user-centric, modern interfaces that shapes how the audience interacts with the product.',
    imageDesc:
      'High-fidelity Figma prototypes, modern color grids, scale ratios, and dark mode interface specifications.',
    bgGradient: 'from-blue-500/10 to-indigo-500/5',
  },
  {
    id: 'branding',
    title: 'Branding & Identity',
    icon: <Compass className="w-5 h-5 text-accent-lime" />,
    description:
      'Building brand identities including working on logo, typography, iconography, colour palette, visual language, and brand personality.',
    imageDesc: 'Vector layouts of custom Monograms, editorial font pairings, guidelines, and accent systems.',
    bgGradient: 'from-amber-500/10 to-orange-500/5',
  },
];

const TECHNOLOGIES = [
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500 w-4 h-4" /> },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-500 w-4 h-4" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400 w-4 h-4" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-600 w-4 h-4" /> },
  { name: 'React.js', icon: <FaReact className="text-cyan-400 w-4 h-4" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-text-primary w-4 h-4" /> },
  { name: 'Angular', icon: <FaAngular className="text-red-600 w-4 h-4" /> },
  { name: 'Redux', icon: <SiRedux className="text-purple-600 w-4 h-4" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-500 w-4 h-4" /> },
  { name: 'Express.js', icon: <SiExpress className="text-text-primary w-4 h-4" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-500 w-4 h-4" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-600 w-4 h-4" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400 w-4 h-4" /> },
  { name: 'Cypress', icon: <SiCypress className="text-emerald-600 w-4 h-4" /> },
  { name: 'Docker', icon: <FaDocker className="text-blue-500 w-4 h-4" /> },
  { name: 'Firebase', icon: <SiFirebase className="text-amber-500 w-4 h-4" /> },
  { name: 'AWS', icon: <FaAws className="text-orange-400 w-4 h-4" /> },
  { name: 'GSAP', icon: <SiGreensock className="text-green-400 w-4 h-4" /> },
  { name: 'Framer Motion', icon: <SiFramer className="text-text-primary w-4 h-4" /> },
  { name: 'Figma', icon: <FaFigma className="text-pink-500 w-4 h-4" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400 w-4 h-4" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-600 w-4 h-4" /> },
];

function Expertise() {
  const [activeExpertise, setActiveExpertise] = useState<string>('dev');

  const handleToggleExpertise = useCallback((id: string) => {
    setActiveExpertise((prev) => (prev === id ? '' : id));
  }, []);

  const expertiseContentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const expertiseInnerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const expertiseChevronRefs = useRef<Record<string, SVGSVGElement | null>>({});
  const expertisePreviewRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const expertiseBadgeRef = useRef<HTMLSpanElement>(null);
  const previousExpertiseRef = useRef<string>('dev');

  // Expertise Accordion + Contextual Preview Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    EXPERTISE.forEach((item) => {
      const content = expertiseContentRefs.current[item.id];
      const inner = expertiseInnerRefs.current[item.id];
      const chevron = expertiseChevronRefs.current[item.id];

      if (!content || !inner) return;

      const isOpen = activeExpertise === item.id;

      gsap.killTweensOf([content, inner, chevron]);

      if (isOpen) {
        // Measure the real content height.
        gsap.set(content, {
          height: 'auto',
        });

        const targetHeight = content.offsetHeight;

        // Start closed, then smoothly expand.
        gsap.fromTo(
          content,
          {
            height: 0,
          },
          {
            height: targetHeight,
            duration: 1.15,
            ease: 'power3.inOut',
            overwrite: true,
          }
        );

        // Content enters slightly after the container begins opening.
        gsap.fromTo(
          inner,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.18,
            ease: 'power3.out',
            overwrite: true,
          }
        );

        // Rotate chevron.
        if (chevron) {
          gsap.to(chevron, {
            rotation: 180,
            duration: 0.75,
            ease: 'power3.inOut',
            overwrite: true,
          });
        }
      } else {
        // Close accordion.
        gsap.to(content, {
          height: 0,
          duration: 0.9,
          ease: 'power3.inOut',
          overwrite: true,
        });

        gsap.to(inner, {
          opacity: 0,
          y: -8,
          duration: 0.4,
          ease: 'power2.inOut',
          overwrite: true,
        });

        // Reset chevron.
        if (chevron) {
          gsap.to(chevron, {
            rotation: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            overwrite: true,
          });
        }
      }
    });

    // ----------------------------------------
    // Contextual Preview
    // ----------------------------------------

    const previousId = previousExpertiseRef.current;

    if (previousId !== activeExpertise) {
      const previousPreview = expertisePreviewRefs.current[previousId];
      const nextPreview = expertisePreviewRefs.current[activeExpertise];

      const timeline = gsap.timeline();

      // Old preview exits.
      if (previousPreview) {
        timeline.to(
          previousPreview,
          {
            opacity: 0,
            y: -16,
            scale: 0.96,
            duration: 0.55,
            ease: 'power3.inOut',
          },
          0
        );
      }

      // New preview enters.
      if (nextPreview) {
        gsap.set(nextPreview, {
          opacity: 0,
          y: 20,
          scale: 0.96,
        });

        timeline.to(
          nextPreview,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          },
          0.3
        );

        // Animate the preview icon.
        const icon = nextPreview.querySelector('[data-preview-icon]');

        if (icon) {
          gsap.fromTo(
            icon,
            {
              opacity: 0,
              scale: 0.75,
              rotate: -8,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 1.1,
              delay: 0.45,
              ease: 'power3.out',
            }
          );
        }

        // Animate preview text.
        const text = nextPreview.querySelector('[data-preview-text]');

        if (text) {
          gsap.fromTo(
            text,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: 0.55,
              ease: 'power3.out',
            }
          );
        }
      }

      // Animate the top badge.
      if (expertiseBadgeRef.current) {
        gsap.fromTo(
          expertiseBadgeRef.current,
          {
            opacity: 0,
            y: -6,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }
        );
      }

      previousExpertiseRef.current = activeExpertise;
    }
  }, [activeExpertise]);

  return (
    <section id="expertise" className="px-6 md:px-0 space-y-16">
      <div>
        <span className="text-xs font-bold tracking-widest text-accent-lime uppercase block mb-4">
          ✦ SPECIALITY
        </span>
        <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-text-primary">
          Areas of expertise.
        </h2>
      </div>

      {/* Accordion Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
        {/* ============================================
            ACCORDION LIST
        ============================================ */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {EXPERTISE.map((item) => {
            const isOpen = activeExpertise === item.id;

            return (
              <div
                key={item.id}
                className={`border border-border-subtle rounded-md overflow-hidden bg-surface transition-colors duration-700 ${
                  isOpen ? 'ring-1 ring-accent-lime/30' : ''
                }`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-surface-elevated transition-colors duration-500 cursor-pointer"
                  onClick={() => handleToggleExpertise(item.id)}
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-lg md:text-xl font-medium text-text-primary">
                      {item.title}
                    </span>
                  </div>

                  <ChevronDown
                    ref={(element) => {
                      expertiseChevronRefs.current[item.id] = element;
                    }}
                    className="w-5 h-5 text-text-secondary"
                  />
                </button>

                {/* ========================================
                    ACCORDION CONTENT
                ======================================== */}
                <div
                  ref={(element) => {
                    expertiseContentRefs.current[item.id] = element;
                  }}
                  className="h-0 overflow-hidden"
                >
                  <div
                    ref={(element) => {
                      expertiseInnerRefs.current[item.id] = element;
                    }}
                    className="border-t border-border-subtle/50 p-6 space-y-4"
                  >
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================
            CONTEXTUAL PREVIEW STAGE
        ============================================ */}
        <div className="lg:col-span-5 flex items-stretch no-reveal">
          <div className="w-full min-h-[340px] rounded-lg border border-border-subtle bg-surface-elevated/40 flex flex-col justify-between p-8 relative overflow-hidden">
            {/* Subtle Preview Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[size:18px_18px]" />

            {/* ========================================
                TOP BADGE
            ======================================== */}
            <div className="relative z-10 text-xs font-mono text-text-muted flex justify-between items-center w-full">
              <span>CAPABILITY PREVIEW</span>
              <span ref={expertiseBadgeRef}>
                [{activeExpertise ? activeExpertise.toUpperCase() : 'NONE'}]
              </span>
            </div>

            {/* ========================================
                PREVIEW CONTENT
            ======================================== */}
            <div className="relative flex-1 flex flex-col justify-center py-8">
              {EXPERTISE.map((item) => {
                const isActive = activeExpertise === item.id;

                return (
                  <div
                    key={item.id}
                    ref={(element) => {
                      expertisePreviewRefs.current[item.id] = element;
                    }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-center gap-5 pointer-events-none"
                    style={{
                      opacity: isActive ? 1 : 0,
                      visibility: isActive ? 'visible' : 'hidden',
                    }}
                  >
                    {/* Preview Icon */}
                    <div
                      data-preview-icon
                      className={`w-20 h-20 rounded-full bg-gradient-to-tr ${item.bgGradient} border border-border-subtle flex items-center justify-center shadow-[0_0_40px_rgba(163,230,53,0.04)]`}
                    >
                      {item.icon}
                    </div>

                    {/* Preview Text */}
                    <div data-preview-text className="max-w-sm">
                      <h3 className="text-lg md:text-xl font-medium text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed italic">
                        "{item.imageDesc}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================
                BOTTOM STATUS
            ======================================== */}
            <div className="relative z-10 flex items-center gap-2 text-xs text-accent-lime">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>Realtime Interactive Display</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Technology Strip */}
      <div className="w-full overflow-hidden  py-8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 whitespace-nowrap cursor-pointer group w-max">
          {/* First loop container */}
          <div className="flex gap-4 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
            {TECHNOLOGIES.map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 border border-border-subtle bg-surface px-4 py-2 rounded-full text-sm text-text-secondary transition-colors hover:text-text-primary hover:border-accent-lime"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
          {/* Second loop container for seamless integration */}
          <div className="flex gap-4 animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
            {TECHNOLOGIES.map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 border border-border-subtle bg-surface px-4 py-2 rounded-full text-sm text-text-secondary transition-colors hover:text-text-primary hover:border-accent-lime"
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Expertise);
