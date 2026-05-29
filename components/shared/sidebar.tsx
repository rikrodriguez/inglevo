import Link from "next/link";
import { BookOpen, History, LayoutDashboard, MessageSquareText, Settings } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/interview", label: "Interview", icon: MessageSquareText },
  { href: "/app/templates", label: "Templates", icon: BookOpen },
  { href: "/app/history", label: "History", icon: History },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-white px-4 py-5 lg:block">
      <BrandLogo href="/app" />
      <nav className="mt-8 grid gap-1">
        {navItems.map((item) => (
          <Button key={item.href} asChild variant="ghost" className="justify-start">
            <Link href={item.href}>
              <item.icon />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}
