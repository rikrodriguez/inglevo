import { NextResponse, type NextRequest } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

function getIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";
}

export function checkRateLimit({
  request,
  userId,
  route,
  limit,
  windowMs,
}: {
  request: NextRequest;
  userId?: string | null;
  route: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const key = `${route}:${userId ?? getIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    return NextResponse.json(
      {
        error:
          "You have used this feature several times in a short period. Wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": `${Math.ceil((current.resetAt - now) / 1000)}`,
        },
      }
    );
  }

  current.count += 1;
  buckets.set(key, current);
  return null;
}
