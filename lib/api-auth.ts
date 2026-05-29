import { NextResponse } from "next/server";

import { hasSupabaseConfig } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/supabase/server";

export async function requireApiUser() {
  if (!hasSupabaseConfig()) {
    return { user: null, response: null };
  }

  const user = await getCurrentUser().catch(() => null);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Log in to use this feature." },
        { status: 401 }
      ),
    };
  }

  return { user, response: null };
}
