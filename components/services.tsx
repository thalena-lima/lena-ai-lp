"use client";

import { EnergyServiceGrid, type EnergyService } from "@/components/energy-service-grid";
import { LayoutDashboard, Lightbulb, Settings, Sparkles, Video, Workflow } from "lucide-react";

const services: EnergyService[] = [
  {
    icon: Sparkles,
    title: "IA Comercial",
    description: "Agentes que qualificam leads, respondem dúvidas e agendam reuniões 24h no WhatsApp.",
  },
  {
    icon: Workflow,
    title: "Automações de Processos",
    description: "Fluxos que eliminam tarefas manuais repetitivas e conectam seus sistemas.",
  },
  {
    icon: LayoutDashboard,
    title: "Sistemas Personalizados",
    description: "Dashboards, CRMs internos e painéis de gestão feitos sob medida com IA.",
  },
  {
    icon: Video,
    title: "Conteúdo com IA",
    description: "Geração, curadoria e distribuição de conteúdo automatizados para suas redes.",
  },
  {
    icon: Lightbulb,
    title: "Damos vida às suas ideias",
    description: "Tem uma ideia com IA? A gente prototipa, valida e implementa.",
  },
  {
    icon: Settings,
    title: "Melhoria de processos",
    description: "Analisamos sua operação e aplicamos IA onde gera mais resultado com menos atrito.",
  },
];

export function Services() {
  return (
    <section id="solucoes" className="relative bg-[var(--bg-void)] py-24 md:py-40">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--text-tertiary)]">Soluções</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
            Sistemas que desenhamos
            <br />
            para o seu negócio
          </h2>
        </div>

        <EnergyServiceGrid services={services} />
      </div>
    </section>
  );
}
