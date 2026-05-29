import Link from "next/link";
import {
  Award,
  BookOpen,
  ClipboardList,
  Compass,
  FileText,
  LayoutDashboard,
  Library,
  MessagesSquare,
  Shield,
  Settings,
} from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { LogoutButton } from "@/components/shared/logout-button";
import type { Profile } from "@/types";

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/ai-trainer", label: "English Trainer", icon: BookOpen },
  { href: "/app/certificate", label: "Certification", icon: Award },
  { href: "/app/resume", label: "Resume Builder", icon: FileText },
  { href: "/app/job-crm", label: "Job CRM", icon: ClipboardList },
  { href: "/app/community", label: "Community", icon: MessagesSquare },
  { href: "/app/library", label: "Library", icon: Library },
  { href: "/for-employers", label: "Employers", icon: Compass },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

const adminNavItem = { href: "/app/admin", label: "Admin", icon: Shield };

export function AppShell({
  children,
  profile,
  isDemoMode,
  isAdmin = false,
}: {
  children: React.ReactNode;
  profile: Profile;
  isDemoMode: boolean;
  isAdmin?: boolean;
}) {
  const visibleNavItems = isAdmin ? [...navItems, adminNavItem] : navItems;

  return (
    <div className="app-bg min-h-screen">
      <aside className="fixed inset-y-0 left-0 hidden w-68 border-r border-border/80 bg-white/90 px-4 py-5 shadow-[10px_0_40px_rgba(18,53,91,0.06)] backdrop-blur lg:block">
        <BrandLogo href="/app" />
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Role English, verified tools and USD remote opportunities
        </p>
        <nav className="mt-8 grid gap-1">
          {visibleNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-muted-foreground transition hover:bg-[#d0f5e3] hover:text-foreground"
            >
              <item.icon className="size-4 transition group-hover:text-black" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-x-4 bottom-5 rounded-2xl border border-[#dfdbd6] bg-[#dfdbd6] p-4 text-sm">
          <p className="font-semibold text-black">Remote Ready path</p>
          <p className="mt-2 text-xs leading-5 text-black">
            Build English signals, job assets and certificate progress.
          </p>
        </div>
      </aside>
      <div className="lg:pl-68">
        <header className="sticky top-0 z-20 border-b border-border/80 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <BrandLogo href="/app" className="lg:hidden" />
            <div className="hidden text-sm text-muted-foreground sm:block">
              {profile.main_goal ?? "Better remote opportunities"}
            </div>
            <div className="flex items-center gap-3 text-sm">
              {isDemoMode ? (
                <span className="rounded-full bg-[#dfdbd6] px-3 py-1 text-black">
                  Demo mode: connect Supabase to save real data.
                </span>
              ) : null}
              <span className="font-medium">{profile.full_name ?? profile.email}</span>
              <LogoutButton />
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto border-t border-border/70 px-4 py-2 sm:px-6 lg:hidden">
            {visibleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
