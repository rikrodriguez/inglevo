import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { canBypassAuthForAIEnglishDemo } from "@/lib/ai-english/demo-access";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isAppRoute = url.pathname === "/app" || url.pathname.startsWith("/app/");
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    canBypassAuthForAIEnglishDemo({
      pathname: url.pathname,
      hostname: url.hostname,
    })
  ) {
    return NextResponse.next();
  }

  if (!isAppRoute || !hasSupabase) {
    return NextResponse.next();
  }

  const response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed")
    .eq("id", user.id)
    .maybeSingle();

  const isOnboarding = url.pathname === "/app/onboarding";

  if (!profile?.onboarding_completed && !isOnboarding) {
    url.pathname = "/app/onboarding";
    return NextResponse.redirect(url);
  }

  if (profile?.onboarding_completed && isOnboarding) {
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
