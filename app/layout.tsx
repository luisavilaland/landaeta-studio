import "./css/style.css";

import MetaPixel from "@/components/meta-pixel";

import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.landaetastudio.com"),
  title: {
    default: "Landaeta Studio | Ads y Analítica para eCommerce",
    template: "%s | Landaeta Studio",
  },
  description:
    "Mejoramos performance en Meta/Google Ads y transformamos datos en decisiones con tracking, dashboards y optimización del embudo para eCommerce.",
  openGraph: {
    title: "Landaeta Studio | Ads y Analítica para eCommerce",
    description:
      "Mejoramos performance en Meta/Google Ads y transformamos datos en decisiones con tracking, dashboards y optimización del embudo para eCommerce.",
    url: "https://www.landaetastudio.com",
    siteName: "Landaeta Studio",
    locale: "es_UY",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Landaeta Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landaeta Studio | Ads y Analítica para eCommerce",
    description:
      "Mejoramos performance en Meta/Google Ads y transformamos datos en decisiones con tracking, dashboards y optimización del embudo para eCommerce.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://www.landaetastudio.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>

        <GoogleAnalytics />
        <MetaPixel />         
      </body>
    </html>
  );
}
