import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/index.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Sabbir Ahmad — Software Engineer",
  description:
    "Sabbir Ahmad builds SaaS platforms, custom web applications, and AI-powered products.",
  metadataBase: new URL("https://www.bysabbir.com"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
