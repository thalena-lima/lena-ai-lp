import type { Metadata } from "next";
import Script from "next/script";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/smooth-scroll";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const siteUrl = "https://lenaai.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Lena AI | Arquitetura de IA para Negócios",
    template: "%s | Lena AI",
  },
  description:
    "Implementamos IA que torna sua operação mais previsível e eficiente — com a mesma equipe que você já tem. Diagnóstico gratuito para empresas em Teresina, PI e todo o Brasil.",
  keywords: [
    "inteligência artificial para empresas",
    "arquitetura de IA",
    "automação com IA",
    "consultoria IA",
    "sistemas de IA para negócios",
    "IA para operações",
    "Lena AI",
    "Teresina PI",
  ],
  authors: [{ name: "Lena AI", url: siteUrl }],
  creator: "Lena AI",
  publisher: "Lena AI",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Lena AI",
    title: "Lena AI | Arquitetura de IA para Negócios",
    description:
      "Implementamos IA que torna sua operação mais previsível e eficiente — com a mesma equipe que você já tem. Diagnóstico gratuito.",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Lena AI — Arquitetura de IA para Negócios",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Lena AI | Arquitetura de IA para Negócios",
    description:
      "Implementamos IA que torna sua operação mais previsível e eficiente. Diagnóstico gratuito.",
    images: ["/favicon/android-chrome-512x512.png"],
  },

  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/favicon/favicon.ico" },
    ],
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
    languages: {
      "pt-BR": siteUrl,
    },
  },

  category: "technology",

  // ─── Google Search Console ────────────────────────────────────────────────
  // Cole aqui apenas o código da chave (sem o prefixo "google-site-verification=")
  // Exemplo: se a tag do Google for content="AbCdEfGh123", cole só "AbCdEfGh123"
  verification: {
    google: "COLE_AQUI_SUA_CHAVE_GOOGLE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>

        {/* ─── Facebook Pixels ────────────────────────────────────────────── */}
        {/* Pixel: lenai-08 (766275922600329) + thalena (561658019363529)    */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '766275922600329');
              fbq('init', '561658019363529');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=766275922600329&ev=PageView&noscript=1" alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=561658019363529&ev=PageView&noscript=1" alt="" />
        </noscript>
      </body>
    </html>
  );
}
