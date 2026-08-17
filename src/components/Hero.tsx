import { memo } from 'react';
import { Hand } from 'lucide-react';
import LiquidButton from './LiquidButton';

interface HeroProps {
  onAboutClick: () => void;
}

function Hero({ onAboutClick }: HeroProps) {
  return (
    <section id="home" className="min-h-[75vh] flex flex-col justify-center items-start gap-12">
      {/* Greeting Badge */}
      <div className="flex items-center gap-3 select-none">
        <Hand className="w-5 h-5 text-accent-lime animate-wave origin-[70%_70%]" />
        <span className="text-sm md:text-lg font-display font-medium text-text-primary tracking-tight">
          Hi! It's me Debanjan,
        </span>
      </div>

      <div className="max-w-4xl space-y-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-text-primary">
          Crafting <span className="text-accent-lime">purpose driven</span> digital experiences that
          inspire & engage.
        </h1>
      </div>

      {/* Divider and bottom info row */}
      <div className="w-full flex flex-col md:flex-row gap-5 items-start md:items-center">
        <span className="h-[1px] w-full md:w-1/2 bg-border-subtle shrink-0" />
        <p className="text-sm md:text-md text-text-secondary font-normal max-w-2xl">
          I work with brands globally to build pixel-perfect, engaging, and accessible digital
          experiences that drive results and achieve business goals.
        </p>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 select-none font-sans">
        {/* Left Side: Social Links */}
        <div className="hidden md:flex flex-wrap gap-8 text-md font-bold tracking-[0.2em] text-text-secondary uppercase">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors duration-300"
          >
            LINKEDIN <span className="text-[11px] font-light text-text-secondary">↗</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors duration-300"
          >
            GITHUB <span className="text-[11px] font-light text-text-secondary">↗</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors duration-300"
          >
            INSTAGRAM <span className="text-[11px] font-light text-text-secondary">↗</span>
          </a>
          <a
            href="mailto:contact@debanjan.com"
            className="flex items-center gap-1.5 hover:text-text-primary transition-colors duration-300"
          >
            GMAIL <span className="text-[11px] font-light text-text-secondary">↗</span>
          </a>
        </div>

        {/* Right Side: Description and Know me better Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-20 lg:justify-end flex-1">

          <LiquidButton onClick={onAboutClick} />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
