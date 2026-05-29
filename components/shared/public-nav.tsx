"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Talent", href: "/talent" },
  { label: "Employers", href: "/employers" },
  { label: "Features", href: "/features" },
  { label: "Success Stories", href: "/#success-stories" },
  { label: "Pricing", href: "/pricing" },
] as const;

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-black/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-1 text-sm font-medium text-neutral-500 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3 py-2 transition hover:bg-[#f3efff] hover:text-black"
            >
              {item.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,var(--click-purple),var(--click-blue),var(--click-pink))] transition group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/login" className="text-sm font-medium text-neutral-500 transition hover:text-black">
            Login
          </Link>
          <Button asChild className="brand-button h-10 rounded-full bg-black px-5 text-white hover:bg-black/90">
            <Link href="/signup">
              Start for free
              <ArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:bg-[#f8f8f7] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-white px-4 py-4 shadow-[0_20px_60px_rgba(7,9,12,0.08)] lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-border bg-[#f8f8f7] px-4 py-3 text-sm font-semibold text-neutral-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-border bg-[#f8f8f7] px-4 py-3 text-sm font-semibold text-neutral-800"
            >
              Login
            </Link>
            <Button asChild className="click-gradient-button mt-3 h-11 rounded-full">
              <Link href="/signup" onClick={() => setOpen(false)}>
                Start for free
                <ArrowRight />
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
