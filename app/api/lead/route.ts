import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.WEBHOOK_URL;

type LeadPayload = {
  name: string;
  email: string;
  phone_number: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

function sanitizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizePhoneNumber(value: unknown) {
  return sanitizeText(value).replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;

  try {
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ message: "Payload invalido." }, { status: 400 });
  }

  const payload: LeadPayload = {
    name: sanitizeText(body.name),
    email: sanitizeText(body.email).toLowerCase(),
    phone_number: sanitizePhoneNumber(body.phone_number),
    utm_source: sanitizeText(body.utm_source),
    utm_medium: sanitizeText(body.utm_medium),
    utm_campaign: sanitizeText(body.utm_campaign),
    utm_content: sanitizeText(body.utm_content),
  };

  if (!payload.name || !payload.email || !payload.phone_number) {
    return NextResponse.json(
      { message: "Nome, e-mail e WhatsApp sao obrigatorios." },
      { status: 400 },
    );
  }

  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ message: "E-mail invalido." }, { status: 400 });
  }

  if (!WEBHOOK_URL) {
    return NextResponse.json({ message: "Servico indisponivel." }, { status: 503 });
  }

  const webhookResponse = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { message: "Falha ao encaminhar lead para o webhook." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Lead enviado com sucesso." });
}
