"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Download, Mail } from "lucide-react";

import {
  formatLeadMagnetForDownload,
  getLeadMagnet,
  leadMagnets,
  type LeadMagnetSlug,
} from "@/data/lead-magnets";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LeadMagnetForm({
  sourcePath,
  defaultLeadMagnet = "remote-interview-english-cheat-sheet",
  compact = false,
}: {
  sourcePath: string;
  defaultLeadMagnet?: LeadMagnetSlug;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<LeadMagnetSlug>(defaultLeadMagnet);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const selectedLeadMagnet = useMemo(
    () => getLeadMagnet(selectedSlug) ?? leadMagnets[0],
    [selectedSlug]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const response = await fetch("/api/lead-magnets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        role: role || null,
        leadMagnet: selectedSlug,
        sourcePath,
        consent: true,
      }),
    }).catch(() => null);

    if (!response?.ok) {
      setStatus("error");
      setMessage("Try again in a moment, or create a free account to keep going.");
      return;
    }

    setStatus("success");
    setMessage("Saved. Your resource is ready below.");
  }

  function downloadResource() {
    const text = formatLeadMagnetForDownload(selectedLeadMagnet);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = selectedLeadMagnet.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section
      className={`rounded-[2rem] border border-black/5 bg-[#07090c] text-white shadow-[0_24px_90px_rgba(7,9,12,0.20)] ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      <div className={compact ? "grid gap-5" : "grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">
            <Mail className="h-3.5 w-3.5" />
            Free resource
          </div>
          <h2 className={`${compact ? "text-2xl" : "text-4xl sm:text-5xl"} mt-5 font-extrabold leading-[0.98] tracking-[-0.045em]`}>
            Get the remote job English checklist.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            Capture the exact phrases, CV checks and interview signals that
            help LATAM candidates sound ready for US remote teams.
          </p>
          <ul className="mt-5 grid gap-2">
            {selectedLeadMagnet.bullets.slice(0, compact ? 3 : 4).map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm leading-6 text-white/75">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#9ff5c8]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.5rem] bg-white p-4 text-black shadow-sm sm:p-5">
          <div className="grid gap-2">
            {leadMagnets.map((leadMagnet) => (
              <button
                key={leadMagnet.slug}
                type="button"
                onClick={() => setSelectedSlug(leadMagnet.slug)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  selectedSlug === leadMagnet.slug
                    ? "border-black bg-[#effaf5]"
                    : "border-black/10 bg-[#f8f8f7] hover:border-black/30"
                }`}
              >
                <p className="text-sm font-semibold">{leadMagnet.shortTitle}</p>
                <p className="mt-1 text-xs leading-5 text-neutral-600">
                  {leadMagnet.primaryUse}
                </p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
            <label className="grid gap-1.5 text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Target role
              <input
                type="text"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Customer Support, SDR, VA..."
                className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black"
              />
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Get the checklist"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {message ? (
            <p
              className={`mt-3 rounded-2xl px-4 py-3 text-sm ${
                status === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-[#effaf5] text-[#12824c]"
              }`}
            >
              {message}
            </p>
          ) : null}

          {status === "success" ? (
            <div className="mt-4 rounded-2xl border border-black/10 bg-[#f8f8f7] p-4">
              <p className="text-sm font-semibold">{selectedLeadMagnet.title}</p>
              <div className="mt-3 grid gap-3 text-xs leading-5 text-neutral-700">
                {selectedLeadMagnet.sections.slice(0, 2).map((section) => (
                  <div key={section.title}>
                    <p className="font-semibold text-neutral-950">{section.title}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4">
                      {section.items.slice(0, 2).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={downloadResource}
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold transition hover:border-black/30"
              >
                <Download className="h-4 w-4" />
                Download text file
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
