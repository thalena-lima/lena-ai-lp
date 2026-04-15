"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.72,
};

const tapSpring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 24,
};

const haloSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
  mass: 0.72,
};

export default function GooeyNav({
  items,
  animationTime = 520,
  initialActiveIndex = 0,
}: GooeyNavProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const currentIndex = hoverIndex ?? activeIndex;
  const duration = animationTime / 1000;

  return (
    <nav aria-label="Navegação principal" className="relative w-full">
      <motion.ul
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={() => setHoverIndex(null)}
        className="relative isolate flex items-center justify-center gap-1 rounded-[0.95rem] border border-white/7 bg-white/[0.03] p-1 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const isCurrent = currentIndex === index;

          return (
            <li key={item.href} className="relative">
              {isCurrent ? (
                <>
                  <motion.span
                    layoutId="gooey-nav-halo"
                    transition={{ ...haloSpring, duration }}
                    className="absolute -inset-1 rounded-[1rem] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.16),rgba(139,92,246,0.05)_56%,transparent_78%)] blur-md"
                  />
                  <motion.span
                    layoutId="gooey-nav-surface"
                    transition={{ ...spring, duration }}
                    className="absolute inset-0 overflow-hidden rounded-[0.78rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(124,58,237,0.08),rgba(255,255,255,0.12),rgba(124,58,237,0.14))]" />
                    <span className="absolute inset-x-3 top-1 h-4 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.28),rgba(255,255,255,0.04),rgba(255,255,255,0.16))] opacity-90 blur-sm" />
                  </motion.span>
                </>
              ) : null}

              {isActive ? (
                <motion.span
                  layoutId="gooey-nav-marker"
                  transition={tapSpring}
                  className="absolute left-1/2 -bottom-1 h-1 w-5 -translate-x-1/2 rounded-full bg-[var(--accent-hover)] shadow-[0_0_12px_var(--accent-glow)]"
                />
              ) : null}

              <motion.a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => setHoverIndex(null)}
                onMouseEnter={() => setHoverIndex(index)}
                whileTap={{ scale: 0.97 }}
                transition={tapSpring}
                className="relative z-10 block min-w-[6.65rem] rounded-[0.78rem] px-4 py-2 text-center text-sm font-medium text-[var(--text-secondary)] outline-none transition-colors duration-200 hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-hover)]/50 data-[active=true]:text-[var(--text-primary)]"
                data-active={isActive}
              >
                {item.label}
              </motion.a>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
