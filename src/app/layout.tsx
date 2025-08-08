import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Aricia Residences @ Sungai Besi',
  description: 'Official Site | Freehold Condo near MRT & TRX. Starting from RM3xxK',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <head>
  {/* same-runtime 脚本 */}
  <script
    crossOrigin="anonymous"
    src="//unpkg.com/same-runtime/dist/index.global.js"
  ></script>

  {/* Google Ads / Analytics 追踪代码 */}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-OFQNQ1FKDX"></script>
  <script
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-OFQNQ1FKDX');
      `,
    }}
  />
</head>

      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
