"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";

import GooeyNav from "@/components/GooeyNav";

const navItems = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Resultados", href: "#resultados" },
  { label: "Processo", href: "#processo" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const boxShadow = useTransform(
    shadowOpacity,
    (value) => `0 18px 48px rgba(0,0,0,${0.24 * value})`,
  );

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Only hide if menu is closed AND we are scrolling down past a threshold
    if (!mobileOpen && current > previous && current > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: hidden ? -96 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-void)]/80 backdrop-blur-xl"
    >
      <div className="section-shell grid h-20 grid-cols-[auto_1fr] items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
        <motion.a
          href="#inicio"
          aria-label="Ir para o início"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="relative flex items-center h-10 w-[120px] md:h-12 md:w-[160px]"
        >
          <Image
            src="/logo-com-nome.png"
            alt="Lena AI"
            width={800}
            height={400}
            className="absolute left-0 top-1/2 min-w-[120px] w-[120px] md:min-w-[150px] md:w-[150px] -translate-y-1/2 mt-[6px] md:mt-[8px] h-auto pointer-events-none"
            priority
          />
        </motion.a>

        <div className="hidden justify-self-center md:block">
          <GooeyNav
            items={navItems}
            initialActiveIndex={0}
            animationTime={520}
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-form-modal"))}
            aria-label="Agendar diagnóstico gratuito"
            className="hidden md:flex h-10 items-center rounded-lg bg-white px-5 text-[13px] font-bold text-black shadow-sm transition hover:bg-white/90 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Diagnóstico gratuito
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={toggleMobileMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white/5 text-[var(--text-primary)] transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--bg-void)]/95 md:hidden"
          >
            <div className="section-shell flex flex-col gap-3 py-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex h-12 items-center rounded-lg px-4 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-white/5 hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <button
                onClick={() => {
                  closeMobileMenu();
                  window.dispatchEvent(new CustomEvent("open-form-modal"));
                }}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-white text-sm font-bold text-black shadow-lg transition active:scale-[0.98]"
              >
                Diagnóstico gratuito
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
        style={{ scaleX: progress }}
      />
    </motion.header>
  );
}
