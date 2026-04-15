"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle2 } from "lucide-react";

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

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone_number: normalizePhoneNumber(String(formData.get("phone_number") ?? "")),
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
                <input
                  required
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  autoComplete="tel"
                  className="w-full rounded-none border border-white/10 bg-[#111114] p-3 text-white transition-colors placeholder:text-white/20 focus:border-[var(--accent)] focus:outline-none lg:p-4"
                  placeholder="(11) 99999-9999"
                />
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
