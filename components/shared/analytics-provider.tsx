"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { analyticsConsentKey } from "@/lib/analytics";

export function AnalyticsProvider() {
  const [hasConsent, setHasConsent] = useState(false);
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  useEffect(() => {
    function refreshConsent() {
      setHasConsent(window.localStorage.getItem(analyticsConsentKey) === "accepted");
    }

    refreshConsent();
    window.addEventListener("inglevo:analytics-consent", refreshConsent);

    return () => {
      window.removeEventListener("inglevo:analytics-consent", refreshConsent);
    };
  }, []);

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {provider === "plausible" && plausibleDomain ? (
        <>
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)}`}
          </Script>
          <Script
            defer
            data-domain={plausibleDomain}
            src={plausibleSrc}
            strategy="afterInteractive"
          />
        </>
      ) : null}

      {provider === "posthog" && posthogKey ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init("${posthogKey}",{api_host:"${posthogHost}",person_profiles:"identified_only"});
          `}
        </Script>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {tiktokPixelId ? (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${tiktokPixelId}');
  ttq.page();
}(window, document, 'ttq');
          `}
        </Script>
      ) : null}

      {gaMeasurementId || googleAdsId ? (
        <>
          <Script
            id="google-tag-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId ?? googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-init" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${gaMeasurementId ? `gtag('config', '${gaMeasurementId}');` : ""}
${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
