import { memo, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: string;
  title: string;
  categories: string[];
  year: string;
  bgClass: string;
  mockupText: string;
  mockupType: 'browser' | 'code' | 'mobile';
}

const PROJECTS: Project[] = [
  {
    id: 'snapalyzer',
    title: 'Snapalyzer',
    categories: ['Development', 'UI/UX Design'],
    year: '2024',
    bgClass: 'bg-indigo-950/40 border-indigo-500/20 text-indigo-400',
    mockupText: 'Scan. Analyze. Track.',
    mockupType: 'browser',
  },
  {
    id: 'collabxweb',
    title: 'Collabxweb',
    categories: ['Development'],
    year: '2023',
    bgClass: 'bg-teal-950/40 border-teal-500/20 text-teal-400',
    mockupText: 'Realtime Document Sync',
    mockupType: 'browser',
  },
  {
    id: 'indicov',
    title: 'IndiCov',
    categories: ['UI/UX Design'],
    year: '2023',
    bgClass: 'bg-rose-950/40 border-rose-500/20 text-rose-400',
    mockupText: 'Vaccine Booking App',
    mockupType: 'mobile',
  },
  {
    id: 'code-screenshot',
    title: 'Code Screenshot',
    categories: ['Development'],
    year: '2024',
    bgClass: 'bg-purple-950/40 border-purple-500/20 text-purple-400',
    mockupText: 'const code = "beautiful";',
    mockupType: 'code',
  },
];

function Projects({ isLoading }: { isLoading: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const section = containerRef.current;
      if (!section) return;

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
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section ref={containerRef} id="projects" className="space-y-16">
        <div>
          <span className="text-xs font-bold tracking-widest text-accent-lime uppercase block mb-4">
            ✦ MY WORK
          </span>
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-text-primary">
            Selected projects.
          </h2>
        </div>

      {/* Staggered Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            className={`flex flex-col gap-6 group cursor-pointer ${
              idx % 2 === 1 ? 'md:translate-y-16' : ''
            }`}
          >
            {/* Image Stage/Mockup container */}
            <div
              className={`aspect-[4/3] rounded-lg border ${project.bgClass} flex items-center justify-center p-8 transition-all duration-500 overflow-hidden relative group-hover:scale-[1.02]`}
            >
              {/* Subtle Background Inner Glow */}
              <div className="absolute inset-0 bg-radial from-transparent to-black/10 pointer-events-none" />

              {/* Dynamic Mockup Representation */}
              {project.mockupType === 'browser' && (
                <div className="w-full max-w-[85%] bg-surface/90 border border-border-subtle rounded-md shadow-2xl flex flex-col overflow-hidden">
                  <div className="h-6 bg-surface-elevated/80 border-b border-border-subtle px-3 flex items-center gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-border-subtle" />
                    <span className="w-2 h-2 rounded-full bg-border-subtle" />
                    <span className="w-2 h-2 rounded-full bg-border-subtle" />
                    <div className="h-3 w-1/3 bg-bg/50 rounded-sm mx-auto" />
                  </div>
                  <div className="p-6 flex flex-col gap-2 items-center justify-center min-h-[120px] text-center">
                    <span className="text-sm font-semibold text-text-primary">
                      {project.mockupText}
                    </span>
                    <span className="text-xs text-text-muted">Interactive Web Layout</span>
                  </div>
                </div>
              )}

              {project.mockupType === 'mobile' && (
                <div className="w-[140px] h-[240px] bg-surface/90 border border-border-subtle rounded-[24px] shadow-2xl flex flex-col p-3 overflow-hidden relative">
                  <div className="w-16 h-4 bg-bg rounded-full mx-auto mb-4 border border-border-subtle shrink-0" />
                  <div className="flex-1 flex flex-col justify-center items-center text-center gap-2">
                    <span className="text-xs font-semibold text-text-primary">
                      {project.mockupText}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent-lime/10 flex items-center justify-center text-accent-lime text-[10px]">
                      ●
                    </div>
                  </div>
                </div>
              )}

              {project.mockupType === 'code' && (
                <div className="w-full max-w-[85%] bg-[#0d0e12] border border-border-subtle rounded-md shadow-2xl p-4 font-mono text-[11px] leading-relaxed text-left flex flex-col gap-1 overflow-hidden">
                  <div className="text-text-muted">// Project Blueprint</div>
                  <div>
                    <span className="text-indigo-400">const</span> app ={' '}
                    <span className="text-emerald-400">new</span>{' '}
                    <span className="text-amber-400">Application</span>()
                  </div>
                  <div className="pl-4">{project.mockupText}</div>
                  <div className="text-text-muted">return app.render()</div>
                </div>
              )}
            </div>

            {/* Metadata & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-text-primary group-hover:text-accent-lime transition-colors">
                  {project.title}
                </h3>
                <span className="text-sm text-text-muted font-mono">{project.year}</span>
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 flex-wrap">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2.5 py-0.5 rounded-full border border-border-subtle bg-surface text-text-secondary"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Projects);
