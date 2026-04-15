import type { Metadata } from "next";
import { ThankYouContent } from "@/components/thank-you-content";

export const metadata: Metadata = {
  title: "Cadastro Confirmado",
  description:
    "Seu cadastro foi recebido. Assista ao vídeo e veja se sua empresa está no perfil que a Lena AI atende.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
