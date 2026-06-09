"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Lock, MessageSquareText, PackageCheck } from "lucide-react";

const activeItems = [
  { href: "/app/ai-trainer", label: "Overview", icon: BookOpen },
  { href: "/app/ai-trainer/practice", label: "Practice", icon: MessageSquareText },
  { href: "/app/ai-trainer/answer-bank", label: "Answer Bank", icon: PackageCheck },
];

const lockedItems = ["Voice", "Verification"];

export function AIEnglishSubnav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {activeItems.map((item) => {
        const active =
          item.href === "/app/ai-trainer"
            ? pathname === item.href
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
              active
                ? "border-black bg-black text-white"
                : "border-border bg-white text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
      {lockedItems.map((item) => (
        <span
          key={item}
          className="inline-flex h-10 shrink-0 cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-muted px-3 text-sm font-semibold text-muted-foreground"
          title={`${item} will unlock later`}
        >
          <Lock className="size-4" />
          {item}
        </span>
      ))}
    </nav>
  );
}
