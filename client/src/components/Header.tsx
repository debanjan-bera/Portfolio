import { useState, useEffect, memo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SlotRollText from './SlotRollText';

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

function HeaderNavLink({ link, isActive }: { link: typeof NAV_LINKS[0]; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={link.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors py-1 px-1.5 sm:px-2.5 cursor-pointer flex items-center gap-1.5 justify-center transform-gpu"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
          isActive ? 'bg-accent-lime scale-100' : 'bg-transparent scale-0'
        }`}
      />
      <SlotRollText text={link.label} trigger={isHovered} />
    </Link>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    return !document.documentElement.classList.contains('light');
  });

  // Scroll handler for navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!(document as any).startViewTransition || prefersReducedMotion) {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 550,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <header id="header"
      className={`fixed top-4 left-0 right-0 mx-auto z-50 w-[90%] transition-all duration-[400ms] ease-standard transform-gpu ${
        isScrolled ? 'max-w-[600px]' : 'max-w-[1240px]'
      }`}
    >
      <div
        className={`transition-all duration-[400ms] ease-standard flex items-center justify-between w-full border transform-gpu ${
          isScrolled
            ? 'bg-surface/80 backdrop-blur-xl border-border-subtle rounded-pill px-6 py-3 shadow-lg'
            : 'bg-transparent border-transparent rounded-none px-0 py-3'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tighter text-text-primary hover:text-accent-lime transition-colors cursor-pointer"
        >
          DB
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-3 sm:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return <HeaderNavLink key={link.id} link={link} isActive={isActive} />;
          })}
        </nav>

        {/* Theme / Action */}
        <button
          onClick={toggleTheme}
          className="text-text-secondary p-2 rounded-full hover:bg-text-primary/10 transition-colors cursor-pointer flex items-center justify-center transform-gpu active:scale-95"
          aria-label="Toggle theme"
        >
          <div className="relative w-4 h-4">
            <Sun className={`absolute inset-0 w-4 h-4 transition-all duration-500 transform-gpu ${isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
            <Moon className={`absolute inset-0 w-4 h-4 transition-all duration-500 transform-gpu ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`} />
          </div>
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
