import { memo } from 'react';

import LiquidButton from './LiquidButton';
import Footer from './Footer';


function Contact() {
  return (
    <section id="contact">
      {/* Availability Card Container */}
      <div className="bg-surface-elevated border border-border-subtle rounded-lg p-8 md:p-16  text-center flex flex-col items-center gap-8 relative overflow-hidden">
        {/* Background Accent Grid or Circles */}
        <div className="absolute inset-0 bg-radial from-accent-lime/5 to-transparent pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dark-surface border border-accent-lime/20 relative z-10">
          <span className="w-2 h-2 rounded-full bg-accent-lime" />
          <span className="text-xs font-semibold tracking-wider text-accent-lime uppercase">
            Available for freelance & contract
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-text-primary max-w-2xl leading-none relative z-10">
          Let's create your next big idea.
        </h2>
        <LiquidButton text="Contact Me" hoverText="Let's talk" />
      </div>

      {/* Footer Area */}
      <Footer />
    </section>
  );
}

export default memo(Contact);
