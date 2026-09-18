export const LoopingTechStack = () => {
    return (

        <div className="w-full overflow-hidden border-t border-b border-border-subtle py-8 flex relative select-none">
            {/* Left and Right Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

            {/* Infinite Technology Loop Marquee */}
            <div className="flex whitespace-nowrap gap-16 animate-marquee shrink-0 min-w-full justify-around pr-16">
                {['REACT', 'TYPESCRIPT', 'GSAP', 'VITE', 'TAILWIND CSS', 'HTML5', 'CSS3'].map((tech, idx) => (
                    <span key={idx} className="text-lg md:text-3xl font-display font-semibold tracking-widest text-text-muted flex items-center gap-6">
                        <span>{tech}</span>
                        <span className="text-accent-lime">✦</span>
                    </span>
                ))}
            </div>
            <div className="flex whitespace-nowrap gap-16 animate-marquee shrink-0 min-w-full justify-around pr-16" aria-hidden="true">
                {['REACT', 'TYPESCRIPT', 'GSAP', 'VITE', 'TAILWIND CSS', 'HTML5', 'CSS3'].map((tech, idx) => (
                    <span key={idx} className="text-lg md:text-3xl font-display font-semibold tracking-widest text-text-muted flex items-center gap-6">
                        <span>{tech}</span>
                        <span className="text-accent-lime">✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}