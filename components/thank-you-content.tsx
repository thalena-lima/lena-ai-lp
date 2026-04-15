"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ThankYouContent() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", "ViewObrigado");
    }
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-void)]">

      {/* ── HERO + VÍDEO ── */}
      <section className="noise-overlay relative overflow-hidden bg-[var(--bg-void)]">

        {/* Gradients */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.28) 0%, rgba(91,33,182,0.12) 32%, transparent 58%)",
              "linear-gradient(180deg, rgba(5,5,7,0.0) 0%, rgba(5,5,7,0.72) 60%, #050507 100%)",
            ].join(","),
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] precision-dots opacity-[0.07] md:hidden" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block precision-grid opacity-[0.025]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_30%,rgba(5,5,7,0.05),rgba(5,5,7,0.55)_55%,#050507_100%)]" aria-hidden="true" />

        <div className="section-shell relative z-10 flex flex-col items-center pt-28 pb-20 text-center md:pt-36 md:pb-28">

          {/* Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-8 flex items-center gap-2.5 rounded-full border border-[var(--success)]/25 bg-[var(--success)]/8 px-4 py-2"
          >
            <span className="size-2 rounded-full bg-[var(--success)] shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--success)]">
              Cadastro confirmado
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--text-primary)]"
          >
            Antes da call, veja se sua empresa está no{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 drop-shadow-[0_0_18px_rgba(139,92,246,0.35)]">
              perfil que atendemos
            </span>
            .
          </motion.h1>

          {/* Divisor */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mx-auto my-8 h-px w-28 origin-center bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.75),transparent)]"
            aria-hidden="true"
          />

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-balance text-base leading-[1.78] text-[var(--text-secondary)] md:text-lg"
          >
            Nosso time comercial vai entrar em contato com você pelo WhatsApp nos
            próximos minutos. Antes disso, assista a este vídeo rápido: ele vai te
            ajudar a avaliar se a sua empresa se encaixa no tipo de operação que a
            Lena AI atende hoje.
          </motion.p>

          {/* Vídeo */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 w-full max-w-4xl"
          >
            <div className="relative aspect-video overflow-hidden rounded-none border-2 border-[var(--accent)] bg-[var(--bg-elevated)] shadow-[0_0_64px_rgba(124,58,237,0.22),0_32px_64px_rgba(0,0,0,0.5)]">
              <iframe
                src="https://player-vz-b88f8a77-022.tv.pandavideo.com.br/embed/?v=7dec0945-3766-4dc8-af69-f6ae6457015f"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                title="Vídeo Lena AI — veja se sua empresa está no perfil que atendemos"
              />
              <div className="absolute left-0 top-0 z-10 size-6 border-l-2 border-t-2 border-[var(--accent)]" />
              <div className="absolute right-0 top-0 z-10 size-6 border-r-2 border-t-2 border-[var(--accent)]" />
              <div className="absolute bottom-0 left-0 z-10 size-6 border-b-2 border-l-2 border-[var(--accent)]" />
              <div className="absolute bottom-0 right-0 z-10 size-6 border-b-2 border-r-2 border-[var(--accent)]" />
              <div className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.7),transparent)]" />
            </div>
          </motion.div>

        </div>
      </section>


    </main>
  );
}
