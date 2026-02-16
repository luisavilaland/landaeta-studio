import "./css/style.css";

import { Inter } from "next/font/google";
import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Landaeta Studio | Ads y Analítica para eCommerce",
  description:
    "Mejoramos performance en Meta/Google Ads y transformamos datos en decisiones con tracking, dashboards y optimización de embudos para eCommerce.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>

        <GoogleAnalytics />
      </body>
    </html>
  );
}
