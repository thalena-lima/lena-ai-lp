import { MapPin } from "lucide-react";
import Image from "next/image";
// Ícone SVG idêntico ao estilo do Lucide com a marca do Instagram
const InstagramIcon = ({ size = 24, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const links = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Resultados", href: "#resultados" },
  { label: "Processo", href: "#processo" },
];
const social = [
  { label: "Instagram", href: "https://www.instagram.com/lena.aii_/", icon: InstagramIcon },
];
const location = {
  label: "Localização",
  href: "https://share.google/GwQ8L14PUKhcSYlFU",
  address: "Teresina, PI — Brasil",
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-void)]">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3 md:items-start">
        <div>
          <a href="#inicio" aria-label="Lena AI início" className="block w-fit">
            <Image
              src="/logo-com-nome.png"
              alt="Lena AI"
              width={120}
              height={60}
              className="w-[120px] h-auto pointer-events-none"
            />
          </a>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">Arquitetura de IA para negócios</p>
        </div>

        <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-4 md:justify-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:justify-end">
          {social.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="grid size-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            );
          })}

          <a
            href={location.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={location.label}
            className="group flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)] transition hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
          >
            <MapPin size={14} aria-hidden="true" className="shrink-0" />
            <span className="text-xs">{location.address}</span>
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-tertiary)]">
        © 2026 Lena AI. Todos os direitos reservados.
      </div>
    </footer>
  );
}
