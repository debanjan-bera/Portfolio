import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Smile, LayoutGrid, Send } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/', icon: Home },
  { id: 'about', label: 'About', href: '/about', icon: Smile },
  { id: 'projects', label: 'Projects', href: '/projects', icon: LayoutGrid },
  { id: 'contact', label: 'Contact', href: '/contact', icon: Send },
];

function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface/90 backdrop-blur-lg border-t border-border-subtle rounded-t-[24px] px-6 pt-3 pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] transition-colors duration-300">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-accent-lime font-medium scale-105'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5 transition-transform duration-300" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(MobileNav);
