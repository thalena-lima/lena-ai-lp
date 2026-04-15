"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutDashboard, TrendingUp, CalendarDays } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type MetricConfig = {
  end: number;
  suffix: string;
  label: string;
  Icon: React.ElementType;
  upDuration: number;
  downDuration: number;
  format?: (n: number) => string;
};

const METRICS: MetricConfig[] = [
  {
    end: 329,
    suffix: "+",
    label: "Sistemas criados para atendimento, comercial, gestão e operação",
    Icon: LayoutDashboard,
    upDuration: 2.4,
    downDuration: 1.2,
  },
  {
    end: 9782,
    suffix: "+",
    label: "Vendas fechadas pelos sistemas",
    Icon: TrendingUp,
    upDuration: 3.0,
    downDuration: 1.5,
    format: (n) => n.toLocaleString("pt-BR"),
  },
  {
    end: 5,
    suffix: "+",
    label: "Anos desenvolvendo arquiteturas de IA para negócios",
    Icon: CalendarDays,
    upDuration: 1.6,
    downDuration: 0.8,
  },
];

function MetricCard({ metric }: { metric: MetricConfig }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const currentValue = useRef(0);
  const [displayCount, setDisplayCount] = useState(0);

  const inView = useInView(cardRef, {
    amount: 0.5,
    margin: "0px 0px -60px 0px",
  });

  useEffect(() => {
    const from = currentValue.current;
    const to = inView ? metric.end : 0;

    const controls = animate(from, to, {
      duration: inView ? metric.upDuration : metric.downDuration,
      ease: inView ? "easeOut" : "easeIn",
      onUpdate(value) {
        const rounded = Math.round(value);
        currentValue.current = rounded;
        setDisplayCount(rounded);
      },
    });

    return controls.stop;
  }, [inView, metric.end, metric.upDuration, metric.downDuration]);

  const displayed = metric.format
    ? metric.format(displayCount)
    : displayCount.toString();

  return (
    <div
      ref={cardRef}
      data-metric
      className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.07)] bg-[linear-gradient(180deg,rgba(16,16,20,0.92),rgba(10,10,12,0.84))] p-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.55),transparent)]" />
      <div className="absolute -right-8 top-0 size-28 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_70%)] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-8 text-violet-400/70" aria-hidden="true">
        <metric.Icon size={22} strokeWidth={1.5} />
      </div>

      <div className="font-display text-5xl font-bold leading-none tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-tertiary)] md:text-6xl">
        {displayed}
        {metric.suffix}
      </div>

      <p className="mt-4 max-w-[20ch] text-sm leading-6 text-[var(--text-secondary)]">
        {metric.label}
      </p>
    </div>
  );
}

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-metric-heading]", {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from("[data-metric]", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-40 bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[rgba(124,58,237,0.12)] to-background" aria-hidden="true" />
      <div className="precision-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
      <div className="precision-dots absolute inset-0 opacity-[0.1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(124,58,237,0.15),transparent_40rem)]" />

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            data-metric-heading
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            <span className="block">Estrutura, execução</span>
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              e resultado
            </span>
          </h2>
          <div
            className="mx-auto mt-8 h-px w-32 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.8),transparent)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.2),rgba(237,237,239,0.12),rgba(139,92,246,0.2),transparent)] md:block"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
            {METRICS.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
