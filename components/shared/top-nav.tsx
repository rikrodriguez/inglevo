import Link from "next/link";

import { LogoutButton } from "@/components/shared/logout-button";
import type { Profile } from "@/types";

export function TopNav({
  profile,
  isDemoMode,
}: {
  profile: Profile;
  isDemoMode: boolean;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/app" className="font-semibold lg:hidden">
          Inglevo
        </Link>
        <div className="hidden text-sm text-muted-foreground sm:block">
          {profile.main_goal ?? "Better remote opportunities"}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {isDemoMode ? (
            <span className="rounded-full bg-[#dfdbd6] px-3 py-1 text-black">
              Demo mode
            </span>
          ) : null}
          <span className="font-medium">{profile.full_name ?? profile.email}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
