"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function CopyButton({
  text,
  templateTitle,
  templateCategory,
}: {
  text: string;
  templateTitle?: string;
  templateCategory?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setError(false);
      setCopied(true);
      trackEvent("template_copied", {
        template_title: templateTitle,
        template_category: templateCategory,
      });
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setError(true);
    }
  }

  return (
    <Button
      type="button"
      variant={copied ? "default" : "outline"}
      onClick={copy}
      className={error ? "border-[#dfdbd6] text-black" : ""}
    >
      <Copy />
      {error ? "No se pudo copiar" : copied ? "Copiado" : "Copiar"}
    </Button>
  );
}
