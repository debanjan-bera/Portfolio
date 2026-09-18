import { memo, useState, useLayoutEffect, useRef } from 'react';
import { LuGithub, LuInstagram, LuLinkedin, LuMail, LuTwitter } from 'react-icons/lu';
import { gsap } from 'gsap';
import LiquidButton from '../components/LiquidButton';
import Footer from '../components/Footer';

function ContactPage({ isLoading }: { isLoading: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Handle form submit logic here...
  };

  useLayoutEffect(() => {
    if (isLoading) return;
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // Entrance animation for form and cards
      gsap.fromTo(
        '.contact-fade-in',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-bg text-text-primary px-6 md:px-12 pt-28 flex flex-col items-center select-none"
    >
      {/* Top Heading Wrapper - Aligned to max-w-5xl */}
      <div className="w-full max-w-6xl mb-12 space-y-4">
        <div className="flex items-center gap-2 text-accent-lime">
          <span className="text-md">✦</span>
          <span className="text-xs font-bold tracking-widest uppercase">CONNECT WITH ME</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-text-primary leading-tight">
          Let's start a project <br /> together
        </h1>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* Left Column - Contact Form */}
        <div className="contact-fade-in lg:col-span-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-lime transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-lime transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={3}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-lime transition-colors resize-none"
              />
            </div>
            <LiquidButton text="Submit" hoverText="Submit" type="submit" />
          </form>
        </div>

        {/* Right Column - Info Card */}
        <div className="contact-fade-in lg:col-span-6 flex items-start">
          <div className="w-full bg-surface-elevated border border-border-subtle rounded-lg p-8 md:p-12 flex flex-col md:flex-row gap-8 relative overflow-hidden">
            {/* Background radial accent glow */}
            <div className="absolute inset-0 bg-radial from-accent-lime/5 to-transparent pointer-events-none" />

            {/* Left side in card - Portrait Avatar */}
            <div className="shrink-0 z-10 relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border-subtle shadow-md grayscale">
                <img
                  src="/portrait-colour.png"
                  alt="Debanjan avatar"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right side in card - Info & Links */}
            <div className="space-y-6 flex-1 z-10 relative">
              {/* Availability Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dark-surface border border-accent-lime/25">
                  <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider text-accent-lime">
                    Available for work
                  </span>
                </div>
              </div>

              {/* Bio Text */}
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-satoshi">
                My inbox is always open. Whether you have a project or just want to say Hi. I would love to hear from you. Feel free to contact me and I'll get back to you.
              </p>

              {/* Social Icons row */}
              <div className="flex items-center gap-5 text-text-secondary">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors" aria-label="LinkedIn">
                  <LuLinkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors" aria-label="GitHub">
                  <LuGithub className="w-6 h-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors" aria-label="Instagram">
                  <LuInstagram className="w-6 h-6" />
                </a>
                <a href="mailto:contact@debanjan.com" className="hover:text-accent-lime transition-colors" aria-label="Email">
                  <LuMail className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-lime transition-colors" aria-label="Twitter">
                  <LuTwitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className='w-full mt-3 max-w-6xl'>
        <Footer />
      </div>
    </div>
  );
}

export default memo(ContactPage);
