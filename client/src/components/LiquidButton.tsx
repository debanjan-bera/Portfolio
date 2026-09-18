import { useRef } from "react";
import gsap from "gsap";

interface LiquidButtonProps {
    text?: string;
    hoverText?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function LiquidButton({
    text = "Know me better",
    hoverText = "About Me",
    type = "button",
    onClick,
}: LiquidButtonProps) {
    const liquidRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const hoverTextRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        if (!liquidRef.current || !textRef.current || !hoverTextRef.current) {
            return;
        }

        gsap.killTweensOf([
            liquidRef.current,
            textRef.current,
            hoverTextRef.current,
        ]);

        const tl = gsap.timeline();

        // Liquid rises
        tl.to(
            liquidRef.current,
            {
                yPercent: -72,
                scaleX: 1.05,
                duration: 0.5,
                ease: "power3.out",
            },
            0
        );

        // Old text disappears quickly
        tl.to(
            textRef.current,
            {
                y: -8,
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
            },
            0.08
        );

        // New text appears
        tl.fromTo(
            hoverTextRef.current,
            {
                y: 8,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
            },
            0.16
        );

        // Settle liquid
        tl.to(
            liquidRef.current,
            {
                scaleX: 1,
                duration: 0.45,
                ease: "power2.out",
            },
            0.25
        );
    };

    const handleMouseLeave = () => {
        if (!liquidRef.current || !textRef.current || !hoverTextRef.current) {
            return;
        }

        gsap.killTweensOf([
            liquidRef.current,
            textRef.current,
            hoverTextRef.current,
        ]);

        const tl = gsap.timeline();

        // Hover text disappears
        tl.to(
            hoverTextRef.current,
            {
                y: -8,
                opacity: 0,
                duration: 0.15,
                ease: "power2.out",
            },
            0
        );

        // Original text comes back
        tl.fromTo(
            textRef.current,
            {
                y: 8,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
            },
            0.08
        );

        // Liquid goes down
        tl.to(
            liquidRef.current,
            {
                yPercent: 0,
                duration: 0.45,
                ease: "power3.inOut",
            },
            0
        );
    };

    return (
        <button
            type={type}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=" relative isolate inline-flex h-[52px] min-w-[170px] items-center justify-center overflow-hidden rounded-full border border-text-primary/20 px-7 text-sm font-medium text-text-primary"
        >
            {/* Liquid */}
            <span
                ref={liquidRef}
                aria-hidden="true"
                className="
          pointer-events-none
          absolute
          left-1/2
          top-full
          z-0
          h-[115px]
          w-[200%]
          -translate-x-1/2
          rounded-[50%]
          bg-text-primary
        "
            />

            {/* Original text */}
            <span
                ref={textRef}
                className="
          absolute
          z-10
          whitespace-nowrap
        "
            >
                {text}
            </span>

            {/* Hover text */}
            <span
                ref={hoverTextRef}
                className="
          absolute
          z-10
          whitespace-nowrap
          text-bg
          opacity-0
        "
            >
                {hoverText}
            </span>
        </button>
    );
}