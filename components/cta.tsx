"use client";

import AnimatedContent from "@/components/AnimatedContent";

const steps = [
  {
    title: "Preencha o formulário",
    description: "Leva menos de 1 minuto.",
  },
  {
    title: "Nosso time entra em contato",
    description: "Vamos entender sua operação, o momento da empresa e agendar a conversa com mais contexto.",
  },
  {
    title: "Conversa com um Arquiteto de IA",
    description: "Você vai enxergar onde a IA pode ajudar e qual caminho faz sentido na sua realidade.",
  },
];

export function Cta() {
  return (
    <section
      id="diagnostico"
      className="relative overflow-hidden py-24 md:py-40 bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[rgba(124,58,237,0.12)] to-background" aria-hidden="true" />
      <div className="precision-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
      <div className="precision-dots absolute inset-0 opacity-[0.1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(124,58,237,0.15),transparent_40rem)]" />
      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            <span className="block">Agende uma consultoria gratuita</span>
            <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              para entender o que faz sentido
            </span>
          </h2>
          <div
            className="mx-auto mt-8 h-px w-32 bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.8),transparent)]"
            aria-hidden="true"
          />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">
            Em vez de uma apresentação genérica, você vai passar por uma análise da sua realidade e entender como IA pode
            ser aplicada no seu negócio de forma prática e personalizada.
          </p>
        </div>

        <div id="processo" className="relative mx-auto mt-20 max-w-6xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.34),rgba(255,255,255,0.18),rgba(139,92,246,0.34),transparent)] md:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px opacity-60 [background-image:linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_40%,transparent_40%,transparent_52%)] [background-size:18px_1px] md:block"
          />
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <AnimatedContent distance={36} delay={index * 0.15}>
                <div
                  className={`group relative flex min-h-[19rem] flex-col overflow-hidden rounded-none border-2 border-white/10 bg-[#0a0a0c] p-8 md:p-10 shadow-[8px_8px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:border-white/30 hover:shadow-[12px_12px_0_rgba(255,255,255,0.1)] hover:-translate-y-2 hover:-translate-x-2 ${index === 1 ? "md:translate-y-6" : ""}`}
                >
                  {/* Brutalist accents on cards */}
                  <div className="absolute top-0 right-0 w-12 h-1 bg-white/20 transition-all duration-300 group-hover:w-full group-hover:bg-white/40" />
                  <div className="absolute bottom-0 left-0 w-1 h-12 bg-white/20 transition-all duration-300 group-hover:h-full group-hover:bg-white/40" />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_60%)] opacity-100"
                  />
                  <div className="relative mb-10 flex items-center justify-between">
                    <div className="grid size-14 place-items-center rounded-none bg-white text-lg font-black text-black shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
                      {index + 1}
                    </div>
                    <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(255,255,255,0.2),transparent)] ml-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-white mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="max-w-[28ch] text-base leading-relaxed text-zinc-400 font-medium">
                    {step.description}
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-auto pt-8"
                  >
                    <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.15),transparent)]" />
                  </div>
                </div>
              </AnimatedContent>
            </div>
          ))}
        </div>
        </div>

        <div className="mx-auto mt-24 max-w-5xl border-2 border-white/10 bg-[#050507] p-8 md:p-16 text-center relative rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Brutalist Corner Accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-foreground" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-foreground" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-foreground" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-foreground" />

          <p className="mx-auto max-w-4xl font-display text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold leading-[1.2] text-white tracking-tight">
            Você sai da call com uma visão clara do que vale a pena fazer e de como aplicar IA de forma <span style={{ color: "var(--accent)" }}>personalizada</span> no seu negócio.
          </p>
          
          <div className="mt-14 flex justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-form-modal"))}
              className="group relative inline-flex items-center justify-center bg-white px-8 py-5 md:px-12 md:py-6 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[8px_8px_0_rgba(124,58,237,0.4)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <span className="relative flex items-center gap-3">
                Quero meu diagnóstico gratuito
                <svg className="size-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
