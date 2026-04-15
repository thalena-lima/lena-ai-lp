"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface EnergyService {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface EnergyServiceGridProps {
  services: EnergyService[];
}

const easeOut = [0.22, 1, 0.36, 1] as const;

interface EnergyMotionState {
  index: number;
  reducedMotion: boolean;
}

const cardVariants = {
  dormant: {
    opacity: 0.34,
    y: 18,
    scale: 0.985,
  },
  live: ({ index, reducedMotion }: EnergyMotionState) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: reducedMotion ? 0 : index * 0.16,
      duration: reducedMotion ? 0 : 0.72,
      ease: easeOut,
    },
  }),
};

const iconVariants = {
  dormant: {
    opacity: 0.45,
    scale: 0.94,
  },
  live: ({ index, reducedMotion }: EnergyMotionState) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: reducedMotion ? 0 : index * 0.16 + 0.18,
      duration: reducedMotion ? 0 : 0.5,
      ease: easeOut,
    },
  }),
};

function EnergyConnector({
  active,
  className,
  delay,
  orientation,
  reducedMotion,
}: {
  active: boolean;
  className: string;
  delay: number;
  orientation: "horizontal" | "vertical";
  reducedMotion: boolean;
}) {
  const scaleAxis = orientation === "horizontal" ? "scaleX" : "scaleY";

  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-hidden bg-white/[0.06]", className)}
    >
      <motion.span
        className={cn(
          "absolute inset-0 shadow-[0_0_18px_var(--accent-glow)]",
          orientation === "horizontal"
            ? "bg-[linear-gradient(90deg,transparent,var(--accent-hover),rgba(255,255,255,0.85),var(--accent-hover),transparent)]"
            : "bg-[linear-gradient(180deg,transparent,var(--accent-hover),rgba(255,255,255,0.85),var(--accent-hover),transparent)]",
        )}
        initial={{ opacity: 0, [scaleAxis]: 0 }}
        animate={active ? { opacity: 1, [scaleAxis]: 1 } : { opacity: 0, [scaleAxis]: 0 }}
        transition={{
          delay: reducedMotion ? 0 : delay,
          duration: reducedMotion ? 0 : 0.55,
          ease: easeOut,
        }}
        style={{
          transformOrigin: orientation === "horizontal" ? "left center" : "center top",
        }}
      />
    </span>
  );
}

function EnergySideRail({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
      <EnergyConnector
        active={active}
        delay={0.72}
        orientation="vertical"
        reducedMotion={reducedMotion}
        className="right-[-1.25rem] top-28 hidden h-[calc(100%-14rem)] w-px origin-top md:block"
      />
      <EnergyConnector
        active={active}
        delay={0.18}
        orientation="vertical"
        reducedMotion={reducedMotion}
        className="left-[-1rem] top-28 h-[calc(100%-14rem)] w-px origin-top md:hidden"
      />
    </>
  );
}

function ServiceEnergyCard({
  service,
  index,
  isLive,
  reducedMotion,
}: {
  service: EnergyService;
  index: number;
  isLive: boolean;
  reducedMotion: boolean;
}) {
  const Icon = service.icon;
  const delay = reducedMotion ? 0 : index * 0.16 + 0.22;

  return (
    <motion.article
      custom={{ index, reducedMotion }}
      initial="dormant"
      animate={isLive ? "live" : "dormant"}
      variants={cardVariants}
      className="group relative z-10 min-h-56 rounded-lg border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-colors duration-500 hover:border-[var(--border-hover)]"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_20%_15%,rgba(139,92,246,0.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLive ? 1 : 0 }}
        transition={{ delay, duration: reducedMotion ? 0 : 0.62, ease: easeOut }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <motion.div
          custom={{ index, reducedMotion }}
          initial="dormant"
          animate={isLive ? "live" : "dormant"}
          variants={iconVariants}
          className="mb-6 grid size-10 place-items-center rounded-lg border border-[var(--border)] bg-[var(--accent-subtle)] text-[var(--accent-hover)] shadow-[0_0_22px_var(--accent-glow)]"
        >
          <Icon size={20} aria-hidden="true" />
        </motion.div>

        <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
          {service.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-[var(--text-secondary)]">
          {service.description}
        </p>
      </div>

      <EnergyConnector
        active={isLive}
        delay={delay + 0.18}
        orientation="horizontal"
        reducedMotion={reducedMotion}
        className="right-[-1.25rem] top-1/2 hidden h-px w-5 origin-left md:block"
      />
    </motion.article>
  );
}

export function EnergyServiceGrid({ services }: EnergyServiceGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-18% 0px -12% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = Boolean(shouldReduceMotion);

  return (
    <div ref={containerRef} className="relative mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <EnergySideRail active={isInView} reducedMotion={reducedMotion} />
      {services.map((service, index) => (
        <ServiceEnergyCard
          key={service.title}
          service={service}
          index={index}
          isLive={isInView}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
