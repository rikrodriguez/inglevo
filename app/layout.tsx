import type { Metadata } from "next";
import { AnalyticsCapture } from "@/components/shared/analytics-capture";
import { AnalyticsProvider } from "@/components/shared/analytics-provider";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { RouteAnalytics } from "@/components/shared/route-analytics";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Inglevo",
  title: {
    default: "Inglevo | Verified English for LATAM Remote Talent",
    template: "%s | Inglevo",
  },
  description:
    "Inglevo helps LATAM professionals improve role English, verify remote-work readiness and build stronger hiring signals for US remote opportunities.",
  keywords: [
    "LATAM remote jobs",
    "professional English",
    "remote work readiness",
    "verified talent",
    "US remote opportunities",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Inglevo",
    title: "Inglevo | Verified English for LATAM Remote Talent",
    description:
      "Role English, remote setup and professional verification signals for LATAM talent pursuing US remote opportunities.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Inglevo verified profile preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inglevo | Verified English for LATAM Remote Talent",
    description:
      "Build stronger communication and readiness signals for US remote roles.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AnalyticsProvider />
        <RouteAnalytics />
        <AnalyticsCapture />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
