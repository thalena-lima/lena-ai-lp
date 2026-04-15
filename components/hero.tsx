"use client";

import dynamic from "next/dynamic";
import AnimatedContent from "@/components/AnimatedContent";
import BlurText from "@/components/BlurText";
import { RainbowButton } from "@/components/ui/rainbow-button";

const GradientBlinds = dynamic(() => import("@/components/GradientBlinds"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.3)_0%,transparent_60%)]" />,
});

export function Hero() {
  return (
    <section id="inicio" className="noise-overlay relative min-h-screen overflow-hidden bg-[var(--bg-void)]">
      <div className="absolute inset-0 z-0 hidden md:block">
        <GradientBlinds
          dpr={1}
          gradientColors={["#7C3AED", "#3B0764", "#050507"]}
          blindCount={14}
          noise={0.15}
          spotlightRadius={0.72}
          spotlightSoftness={0.9}
          spotlightOpacity={1.15}
          distortAmount={0.42}
          blindMinWidth={48}
          mouseDampening={0.12}
          mirrorGradient
          shineDirection="right"
          mixBlendMode="screen"
        />
      </div>
      <div
        className="absolute inset-0 z-0 md:hidden"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(circle at 50% 18%, rgba(124,58,237,0.34) 0%, rgba(91,33,182,0.18) 26%, transparent 54%)",
            "linear-gradient(180deg, rgba(18,7,33,0.98) 0%, rgba(10,8,18,0.98) 48%, #050507 100%)",
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 48px)",
          ].join(","),
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_42%,rgba(5,5,7,0.08),rgba(5,5,7,0.7)_58%,#050507_100%)] md:bg-[radial-gradient(circle_at_50%_42%,rgba(5,5,7,0.15),rgba(5,5,7,0.84)_62%,#050507_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-30 md:hidden precision-dots" />
      <div className="section-shell relative z-10 flex min-h-screen items-center justify-center pb-10 pt-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-8 rounded-full border border-[var(--border)] bg-[var(--bg-void)]/45 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-secondary)] backdrop-blur-md">
            Arquitetura de Sistemas de IA
          </div>

          <h1 className="max-w-5xl font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]">
            <BlurText
              text="Implementamos IA que torna sua operação mais previsível e eficiente"
              animateBy="words"
              direction="bottom"
              delay={30}
              className="[&>span:nth-child(8)]:text-[#c4b5fd] [&>span:nth-child(8)]:[text-shadow:0_0_15px_rgba(124,58,237,0.7)] [&>span:nth-child(10)]:text-[#c4b5fd] [&>span:nth-child(10)]:[text-shadow:0_0_15px_rgba(124,58,237,0.7)] justify-center"
            />
          </h1>

          <p className="mt-8 max-w-xl text-balance text-base leading-[1.7] text-[var(--text-secondary)] md:text-lg">
            Com a mesma equipe que você já tem. Sem contratar ninguém. Sem reformar o que funciona.
          </p>

          <AnimatedContent distance={30} delay={0.5} className="mt-10">
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <RainbowButton
                onClick={() => window.dispatchEvent(new CustomEvent("open-form-modal"))}
                aria-label="Quero um diagnóstico gratuito"
                className="h-12 w-full sm:w-auto text-sm font-semibold cursor-pointer"
              >
                Quero um diagnóstico gratuito
              </RainbowButton>
              <a
                href="#solucoes"
                aria-label="Ver soluções"
                className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-void)]/45 px-6 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-md transition hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] sm:w-auto"
              >
                Ver soluções
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
