"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { Check, X } from "lucide-react";

const withoutStructure = [
  "Crescimento gera mais caos, ruído e desorganização",
  "Time gastando horas respondendo e organizando tudo no braço",
  "Leads esfriando por demora, esquecimento ou falta de follow-up",
  "Operação depende demais de pessoas-chave pra funcionar",
];

const withAi = [
  "Crescimento com controle, consistência e previsibilidade",
  "Menos trabalho manual, mais tempo pro que importa",
  "Leads respondidos em segundos, 24h, sem perder nenhum",
  "Processos padronizados que rodam sem depender de ninguém",
];

// ── Variants ──────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const HEADER_V: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const BEFORE_CARD_V: Variants = {
  hidden: { opacity: 0, x: -96 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.95, ease: EASE_OUT } },
};

const AFTER_CARD_V: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE_OUT } },
};

const LIST_BEFORE_CONTAINER_V: Variants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.09 } },
};

const LIST_AFTER_CONTAINER_V: Variants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } },
};

const LIST_ITEM_LEFT_V: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const LIST_ITEM_RIGHT_V: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};
// ──────────────────────────────────────────────────────────

export function BeforeAfter() {
  const headerRef   = useRef<HTMLDivElement>(null);
  const beforeRef   = useRef<HTMLDivElement>(null);
  const afterRef    = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { amount: 0.4 });
  const beforeInView = useInView(beforeRef, { amount: 0.2 });
  const afterInView  = useInView(afterRef,  { amount: 0.2 });

  return (
    <section
      id="resultados"
      className="relative py-24 md:py-40 bg-background overflow-hidden"
    >
      <div className="section-shell">

        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={HEADER_V}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="mb-20 max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 mb-6 bg-border/20 border border-border px-4 py-2">
            <div className="size-2 bg-foreground rounded-none" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
              Realidade vs Arquitetura IA
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.9] tracking-tighter text-foreground">
            O que muda na <br /> sua operação.
          </h2>
        </motion.div>

        {/* Layout: Asymmetric Overlap */}
        <div className="relative flex flex-col w-full md:items-end">

          {/* SEM ESTRUTURA (BEFORE) */}
          <motion.div
            ref={beforeRef}
            variants={BEFORE_CARD_V}
            initial="hidden"
            animate={beforeInView ? "visible" : "hidden"}
            className="w-full md:w-[85%] border p-8 md:p-14 md:pb-36 self-start relative z-10 rounded-none shadow-2xl"
            style={{ backgroundColor: "#111114", borderColor: "rgba(239,68,68,0.3)" }}
          >
            <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: "rgba(239,68,68,0.8)" }} />

            <div className="flex items-center gap-4 mb-12">
              <div className="size-4 rounded-none shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse" style={{ backgroundColor: "var(--danger)" }} />
              <h3 className="font-mono uppercase tracking-[0.2em] font-bold text-sm md:text-base" style={{ color: "var(--danger)" }}>
                Realidade Sem Estrutura
              </h3>
            </div>

            <motion.ul
              variants={LIST_BEFORE_CONTAINER_V}
              initial="hidden"
              animate={beforeInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              {withoutStructure.map((item, i) => (
                <motion.li key={i} variants={LIST_ITEM_LEFT_V} className="flex flex-row items-start gap-4 group">
                  <X className="size-8 shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--danger)" }} strokeWidth={2.5} />
                  <p className="text-muted-foreground font-medium text-lg leading-relaxed">{item}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* COM ESTRUTURA IA (AFTER) */}
          <motion.div
            ref={afterRef}
            variants={AFTER_CARD_V}
            initial="hidden"
            animate={afterInView ? "visible" : "hidden"}
            className="w-full md:w-[90%] bg-card border-2 p-8 md:p-16 md:-mt-20 relative z-20 rounded-none shadow-[0_30px_60px_-15px_rgba(34,197,94,0.15)]"
            style={{ borderColor: "var(--success)" }}
          >
            {/* Brutalist accents */}
            <div className="absolute top-0 right-0 w-32 h-2" style={{ backgroundColor: "var(--success)" }} />
            <div className="absolute bottom-0 left-0 w-2 h-32" style={{ backgroundColor: "var(--success)" }} />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 hidden md:block" style={{ borderColor: "var(--success)" }} />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 hidden md:block" style={{ borderColor: "var(--success)" }} />

            <div className="flex items-center gap-4 mb-16">
              <div className="size-4 rounded-none shadow-[0_0_20px_rgba(34,197,94,0.6)]" style={{ backgroundColor: "var(--success)" }} />
              <h3 className="font-mono uppercase tracking-[0.2em] font-bold text-sm md:text-base" style={{ color: "var(--success)" }}>
                Com Arquitetura Lena IA
              </h3>
            </div>

            <motion.ul
              variants={LIST_AFTER_CONTAINER_V}
              initial="hidden"
              animate={afterInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
            >
              {withAi.map((item, i) => (
                <motion.li key={i} variants={LIST_ITEM_RIGHT_V} className="flex flex-row items-start gap-5 group">
                  <Check className="size-10 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--success)" }} strokeWidth={3} />
                  <p className="text-foreground font-bold text-xl md:text-2xl leading-tight">{item}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
