const fallbackSiteUrl = "https://inglevo.vercel.app";

function isLocalUrl(url: string) {
  return url.includes("localhost") || url.includes("127.0.0.1");
}

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  if (!configuredUrl) {
    return fallbackSiteUrl;
  }

  if (process.env.NODE_ENV === "production" && isLocalUrl(configuredUrl)) {
    return fallbackSiteUrl;
  }

  return configuredUrl;
}
