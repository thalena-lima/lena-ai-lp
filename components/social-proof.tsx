"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const companies = [
  { name: "Estúdio Pra Site", image: "/logos-sites/logo-prasite.jpg" },
  { name: "Clínica Kiva", image: "/logos-sites/clinicakiva.jpg" },
  { name: "Dra. Maximiana", image: "/logos-sites/dramaxiamiana.jpg" },
  { name: "Gentil Barreira Imóveis", image: "/logos-sites/gentil-barreira.jpg" },
  { name: "Mapa Carimbado", image: "/logos-sites/mapacarimbado.jpg" },
  { name: "Art Green Pousada", image: "/logos-sites/artgrennpousada.jpg" },
  { name: "Editora Dialética", image: "/logos-sites/editora-dialetica.jpg" },
  { name: "Brasflexo Sacolas", image: "/logos-sites/brasflexo-sacolas.jpg" },
  { name: "GP Imóveis Uberaba", image: "/logos-sites/gpimoveisuberaba.jpg" },
  { name: "Hipernatacha", image: "/logos-sites/hipernatacha.jpg" },
];

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-proof-intro]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        "[data-proof-track]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="border-y border-white/6 bg-[#050505] py-16 md:py-24"
    >
      <div className="section-shell">
        <div data-proof-intro className="mb-10 text-center">
          <p className="text-xl tracking-[-0.03em] text-white/72 md:text-2xl">
            Empresas que confiam na Lena AI
          </p>
        </div>

        <div data-proof-track>
          <InfiniteMovingCards
            items={companies}
            speed="slow"
            pauseOnHover
            unstyledItems
            className="mx-auto max-w-[120rem] [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
            itemClassName="px-12 py-3 md:px-16"
            renderItem={(item) => {
              return (
                <div className="flex items-center gap-4 whitespace-nowrap opacity-72 transition-opacity duration-300 hover:opacity-100">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-white/5 border border-white/10">
                    <Image
                      src={item.image || ""}
                      alt={`Logo ${item.name}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <span className="font-sans text-[1.85rem] font-semibold tracking-[-0.05em] text-white/84 md:text-[2.2rem]">
                    {item.name}
                  </span>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
