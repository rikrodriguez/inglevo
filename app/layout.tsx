import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/shared/analytics-provider";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { RouteAnalytics } from "@/components/shared/route-analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inglevo",
  description:
    "The trusted verification profile for LATAM remote talent: role English, setup, tools and professional hiring signals.",
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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
