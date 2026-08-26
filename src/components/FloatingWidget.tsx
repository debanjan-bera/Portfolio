import { useState, useEffect, useRef, memo } from 'react';
import Assistant from './Assistant';

function FloatingWidget() {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking eye pupils interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!widgetRef.current) return;
      const rect = widgetRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(2.5, Math.sqrt(dx * dx + dy * dy) / 50); // shift up to 2.5px

      setEyeOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={widgetRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-16 h-16 bg-white rounded-[50%] flex items-center justify-center shadow-lg border border-border-subtle hover:scale-105 active:scale-95 transition-transform cursor-pointer group"
        title="Interactive Helper"
      >
        <div className="flex gap-0.5">
          {/* Left Eye */}
          <div className="w-[14px] h-[20px] bg-white border-2 border-black rounded-[50%] relative flex items-center justify-center overflow-hidden">
            <div
              className="w-[8px] h-[8px] bg-black rounded-full absolute transition-all duration-75"
              style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
            >
              {/* Eye Glint */}
              <span className="w-[2px] h-[2px] bg-white rounded-full absolute top-[1px] left-[1px]" />
            </div>
          </div>
          {/* Right Eye */}
          <div className="w-[14px] h-[20px] bg-white border-2 border-black rounded-[50%] relative flex items-center justify-center overflow-hidden">
            <div
              className="w-[8px] h-[8px] bg-black rounded-full absolute transition-all duration-75"
              style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}
            >
              {/* Eye Glint */}
              <span className="w-[2px] h-[2px] bg-white rounded-full absolute top-[1px] left-[1px]" />
            </div>
          </div>
        </div>
      </div>

      <Assistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default memo(FloatingWidget);
