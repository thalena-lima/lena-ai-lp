"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2, ChevronDown } from "lucide-react";

type Country = {
  name: string;
  flag: string;
  code: string; // e.g. "+55"
  iso: string;  // e.g. "BR"
};

const COUNTRIES: Country[] = [
  { name: "Brasil", flag: "🇧🇷", code: "+55", iso: "BR" },
  { name: "Portugal", flag: "🇵🇹", code: "+351", iso: "PT" },
  { name: "Estados Unidos", flag: "🇺🇸", code: "+1", iso: "US" },
  { name: "Argentina", flag: "🇦🇷", code: "+54", iso: "AR" },
  { name: "Espanha", flag: "🇪🇸", code: "+34", iso: "ES" },
  { name: "México", flag: "🇲🇽", code: "+52", iso: "MX" },
  { name: "Colômbia", flag: "🇨🇴", code: "+57", iso: "CO" },
  { name: "Chile", flag: "🇨🇱", code: "+56", iso: "CL" },
  { name: "Uruguai", flag: "🇺🇾", code: "+598", iso: "UY" },
  { name: "Paraguai", flag: "🇵🇾", code: "+595", iso: "PY" },
  { name: "Bolívia", flag: "🇧🇴", code: "+591", iso: "BO" },
  { name: "Peru", flag: "🇵🇪", code: "+51", iso: "PE" },
  { name: "Equador", flag: "🇪🇨", code: "+593", iso: "EC" },
  { name: "Venezuela", flag: "🇻🇪", code: "+58", iso: "VE" },
  { name: "Panamá", flag: "🇵🇦", code: "+507", iso: "PA" },
  { name: "Costa Rica", flag: "🇨🇷", code: "+506", iso: "CR" },
  { name: "El Salvador", flag: "🇸🇻", code: "+503", iso: "SV" },
  { name: "Guatemala", flag: "🇬🇹", code: "+502", iso: "GT" },
  { name: "Honduras", flag: "🇭🇳", code: "+504", iso: "HN" },
  { name: "República Dominicana", flag: "🇩🇴", code: "+1809", iso: "DO" },
  { name: "Cuba", flag: "🇨🇺", code: "+53", iso: "CU" },
  { name: "Canadá", flag: "🇨🇦", code: "+1", iso: "CA" },
  { name: "Reino Unido", flag: "🇬🇧", code: "+44", iso: "GB" },
  { name: "França", flag: "🇫🇷", code: "+33", iso: "FR" },
  { name: "Alemanha", flag: "🇩🇪", code: "+49", iso: "DE" },
  { name: "Itália", flag: "🇮🇹", code: "+39", iso: "IT" },
  { name: "Japão", flag: "🇯🇵", code: "+81", iso: "JP" },
  { name: "China", flag: "🇨🇳", code: "+86", iso: "CN" },
  { name: "Índia", flag: "🇮🇳", code: "+91", iso: "IN" },
  { name: "Angola", flag: "🇦🇴", code: "+244", iso: "AO" },
  { name: "Moçambique", flag: "🇲🇿", code: "+258", iso: "MZ" },
  { name: "Cabo Verde", flag: "🇨🇻", code: "+238", iso: "CV" },
];

function CountryPicker({
  value,
  onChange,
}: {
  value: Country;
  onChange: (c: Country) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search),
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); setSearch(""); }}
        className="flex h-full min-h-[50px] items-center gap-1.5 border border-white/10 bg-[#111114] px-3 text-white transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:outline-none"
        aria-label="Selecionar país"
      >
        <span className="text-xl leading-none">{value.flag}</span>
        <span className="font-mono text-xs text-white/70">{value.code}</span>
        <ChevronDown
          className={`size-3.5 text-white/40 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 border border-white/10 bg-[#0d0d10] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {/* Search */}
          <div className="border-b border-white/10 p-2">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar país ou código..."
              className="w-full bg-[#111114] px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          {/* List */}
          <ul className="max-h-56 overflow-y-auto" role="listbox">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-xs text-white/40">Nenhum país encontrado</li>
            ) : (
              filtered.map((c) => (
                <li
                  key={c.iso}
                  role="option"
                  aria-selected={c.iso === value.iso}
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                    c.iso === value.iso ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-white/80"
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="font-mono text-xs text-white/40">{c.code}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

type SubmitState = "idle" | "submitting" | "success" | "error";

type TrackingParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

const TRACKING_STORAGE_KEY = "lena-ai-tracking";

function getReferrerSource() {
  const referrer = document.referrer.toLowerCase();

  if (!referrer) {
    return "direct";
  }

  if (referrer.includes("instagram.com")) {
    return "instagram";
  }

  if (referrer.includes("facebook.com")) {
    return "facebook";
  }

  if (referrer.includes("wa.me") || referrer.includes("whatsapp.com")) {
    return "whatsapp";
  }

  if (referrer.includes("google.")) {
    return "google";
  }

  if (referrer.includes("linkedin.com")) {
    return "linkedin";
  }

  return "referral";
}

function readStoredTrackingParams(): TrackingParams | null {
  try {
    const rawValue = window.localStorage.getItem(TRACKING_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as TrackingParams;
  } catch {
    return null;
  }
}

function persistTrackingParams(trackingParams: TrackingParams) {
  try {
    window.localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(trackingParams));
  } catch {
    // Ignore storage failures to avoid blocking form submission.
  }
}

function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  const storedTrackingParams = readStoredTrackingParams();

  const trackingParams: TrackingParams = {
    utm_source:
      params.get("utm_source")?.trim() ||
      storedTrackingParams?.utm_source ||
      getReferrerSource(),
    utm_medium:
      params.get("utm_medium")?.trim() ||
      storedTrackingParams?.utm_medium ||
      "",
    utm_campaign:
      params.get("utm_campaign")?.trim() ||
      storedTrackingParams?.utm_campaign ||
      "",
    utm_content:
      params.get("utm_content")?.trim() ||
      storedTrackingParams?.utm_content ||
      "",
  };

  persistTrackingParams(trackingParams);

  return trackingParams;
}

function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

async function submitLead(payload: {
  name: string;
  email: string;
  phone_number: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(result?.message || "Nao foi possivel enviar seus dados.");
  }

  return response;
}

export function FormModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Brazil default

  useEffect(() => {
    getTrackingParams();
  }, []);

  useEffect(() => {
    if (submitState !== "success") return;

    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/obrigado");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [submitState, router]);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setSubmitState("idle");
      setFeedbackMessage("");
      setIsOpen(true);
    };

    window.addEventListener("open-form-modal", handleOpen);

    return () => window.removeEventListener("open-form-modal", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const rawPhone = normalizePhoneNumber(String(formData.get("phone_number") ?? ""));
    const countryCode = normalizePhoneNumber(selectedCountry.code);
    const fullPhone = `${countryCode}${rawPhone}`;

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone_number: fullPhone,
      ...getTrackingParams(),
    };

    setSubmitState("submitting");
    setFeedbackMessage("");

    try {
      await submitLead(payload);

      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead", {
          content_name: "Diagnostico Gratuito",
        });
      }

      setSubmitState("success");
      setFeedbackMessage("");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error ? error.message : "Nao foi possivel enviar seus dados.",
      );
    }
  }

  if (!isOpen) {
    return null;
  }

  const isSubmitting = submitState === "submitting";
  const isSuccess = submitState === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={() => !isSuccess && setIsOpen(false)} />

      <div className="relative w-full max-w-lg rounded-none border-2 border-[var(--accent)] bg-[#050507] p-8 shadow-[0_0_50px_rgba(124,58,237,0.3)] animate-in fade-in zoom-in-95 duration-300 md:p-12">
        {!isSuccess && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground transition-colors hover:text-white"
            aria-label="Fechar"
            type="button"
          >
            <X className="size-6" />
          </button>
        )}

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-6 grid size-16 place-items-center rounded-full border border-[var(--success)]/30 bg-[var(--success)]/10 shadow-[0_0_24px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="size-8 text-[var(--success)]" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold tracking-tight text-white">
              Cadastro enviado!
            </h3>
            <p className="mb-8 text-sm text-[var(--text-secondary)]">
              Preparando sua página personalizada…
            </p>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
              <span className="size-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Redirecionando em {countdown}s
            </div>
          </div>
        ) : (
          <>
            <h3 className="mb-2 font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
              Seu Diagnostico
            </h3>
            <p className="mb-8 text-muted-foreground">
              Preencha os dados abaixo para falar com um Arquiteto de IA.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)]"
                >
                  Nome completo
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-none border border-white/10 bg-[#111114] p-3 text-white transition-colors placeholder:text-white/20 focus:border-[var(--accent)] focus:outline-none lg:p-4"
                  placeholder="Ex: Joao Silva"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)]"
                >
                  E-mail corporativo
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-none border border-white/10 bg-[#111114] p-3 text-white transition-colors placeholder:text-white/20 focus:border-[var(--accent)] focus:outline-none lg:p-4"
                  placeholder="Ex: joao@empresa.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone_number"
                  className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent)]"
                >
                  WhatsApp
                </label>
                <div className="flex items-stretch gap-0">
                  <CountryPicker
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />
                  <input
                    required
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    autoComplete="tel"
                    className="min-w-0 flex-1 rounded-none border border-l-0 border-white/10 bg-[#111114] p-3 text-white transition-colors placeholder:text-white/20 focus:border-[var(--accent)] focus:outline-none lg:p-4"
                    placeholder={selectedCountry.iso === "BR" ? "(11) 99999-9999" : "Número sem código"}
                  />
                </div>
              </div>

              {feedbackMessage ? (
                <p role="status" className="text-sm text-red-300">
                  {feedbackMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center bg-white px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[4px_4px_0_rgba(124,58,237,0.5)] transition-all duration-300 hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60 md:text-sm"
              >
                {isSubmitting ? "Enviando..." : "Comecar Agora"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
