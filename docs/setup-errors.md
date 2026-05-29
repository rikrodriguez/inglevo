# Setup Errors

## 2026-04-25: Production build font fetch failure

Command:

```bash
npm run build
```

Exact error:

```text
Turbopack build encountered 2 warnings:
[next]/internal/font/google/geist_a71539c9.module.css
Error while requesting resource
There was an issue establishing a connection while requesting https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap

[next]/internal/font/google/geist_mono_8d43a2aa.module.css
Error while requesting resource
There was an issue establishing a connection while requesting https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap

> Build error occurred
Error: Turbopack build failed with 2 errors:
[next]/internal/font/google/geist_a71539c9.module.css
next/font: error:
Failed to fetch `Geist` from Google Fonts.

[next]/internal/font/google/geist_mono_8d43a2aa.module.css
next/font: error:
Failed to fetch `Geist Mono` from Google Fonts.
```

Resolution:

Removed `next/font/google` usage from the root layout and defined local system font stacks in `app/globals.css` so builds do not require external font requests.

## 2026-04-25: Turbopack middleware placeholder failure

Command:

```bash
npm run build
```

Exact error:

```text
FATAL: An unexpected Turbopack error occurred. A panic log has been written to /var/folders/4p/jrzx9dvn6v7bhgl8h5lxn4v00000gn/T/next-panic-445c457733808e4830db7e51f9fe2297.log.

> Build error occurred
Error [TurbopackInternalError]: [project]/app/globals.css [app-client] (css)

Caused by:
- creating new process
- binding to a port
- Operation not permitted (os error 1)

Debug info:
- Execution of output_assets_operation failed
- Execution of <MiddlewareEndpoint as Endpoint>::output failed
- Execution of MiddlewareEndpoint::output_assets failed
- Execution of MiddlewareEndpoint::edge_chunk_group failed
- Execution of evaluate_webpack_loader failed
- creating new process
- binding to a port
- Operation not permitted (os error 1)
```

Resolution:

Kept `middleware.ts` as a non-functional placeholder so the requested base file exists without activating the deprecated middleware convention or edge build path yet.

## 2026-04-25: Middleware placeholder missing function export

Command:

```bash
npm run build
```

Exact error:

```text
> Build error occurred
Error: Turbopack build failed with 1 errors:
./middleware.ts
Middleware is missing expected function export name
This function is what Next.js runs for every request handled by this middleware.

Why this happens:
- The file exists but doesn't export a function.
- The export is not a function (e.g., an object or constant).
- There's a syntax error preventing the export from being recognized.

To fix it:
- Ensure this file has either a default or "middleware" function export.

Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
```

Resolution:

Restored a minimal `middleware()` export returning `NextResponse.next()` so the requested base file is valid.

## 2026-04-25: Middleware escaped quotes parse error

Command:

```bash
npm run build
```

Exact error:

```text
Error: Turbopack build failed with 2 errors:
./middleware.ts:1:30
Expected unicode escape
> 1 | import { NextResponse } from \"next/server\";
  |                              ^

./middleware.ts:1:31
Unterminated string constant
> 1 | import { NextResponse } from \"next/server\";
  |                               ^^^^^^^^^^^^^^^

Parsing ecmascript source code failed
```

Resolution:

Removed escaped quotes from `middleware.ts` so it contains normal TypeScript string literals.

## 2026-04-25: Package script update ENOSPC

Command:

```bash
npm pkg set scripts.build="next build --webpack"
```

Exact error:

```text
npm error code ENOSPC
npm error syscall open
npm error path /Users/ricardorodriguez/Documents/New project/inglevo/package.json
npm error errno -28
npm error nospc ENOSPC: no space left on device, open '/Users/ricardorodriguez/Documents/New project/inglevo/package.json'
npm error nospc There appears to be insufficient space on your system to finish.
npm error nospc Clear up some disk space and try again.
```

Resolution:

Removed the temporary npm cache created for this setup at `/tmp/inglevo-npm-cache`, then retried the package script update.

## 2026-04-26: Dashboard quick links tuple inference

Command:

```bash
npm run build
```

Exact error:

```text
./app/app/page.tsx:108:19
Type error: Type 'string | ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>' is not assignable to type 'ReactNode'.
```

Resolution:

Typed the dashboard quick links as objects instead of mixed arrays so labels, hrefs, and icons keep their correct TypeScript types.

## 2026-04-26: Dev server bind EPERM on default host

Command:

```bash
npm run dev
```

Exact error:

```text
Error: listen EPERM: operation not permitted 0.0.0.0:3000
code: 'EPERM'
syscall: 'listen'
address: '0.0.0.0'
port: 3000
```

Resolution:

Retried the local server on an explicit localhost host/port instead of binding to `0.0.0.0:3000`.

## 2026-04-26: Dev server bind EPERM on localhost retry

Command:

```bash
npx next dev -H 127.0.0.1 -p 3001
```

Exact error:

```text
Error: listen EPERM: operation not permitted 127.0.0.1:3001
code: 'EPERM'
syscall: 'listen'
address: '127.0.0.1'
port: 3001
```

Resolution:

Could not start a local dev server in this sandbox because binding a local port is blocked. Verified the app with `npm run lint` and `npm run build` instead.

## 2026-04-26: Build ENOSPC while writing Next artifacts

Command:

```bash
npm run build
```

Exact error:

```text
Error: ENOSPC: no space left on device, open '/Users/ricardorodriguez/Documents/New project/inglevo/.next/server/app/_not-found.segments/_full.segment.rsc'
errno: -28
code: 'ENOSPC'
syscall: 'open'
```

Resolution:

Removed the regenerable `.next` build output and retried the build.

## 2026-04-26: Build ENOSPC while writing favicon trace

Command:

```bash
npm run build
```

Exact error:

```text
Error: ENOSPC: no space left on device, open '/Users/ricardorodriguez/Documents/New project/inglevo/.next/server/app/favicon.ico/route.js.nft.json'
errno: -28
code: 'ENOSPC'
syscall: 'open'
uncaughtException [Error: ENOSPC: no space left on device, write]
```

Resolution:

The app compiled and TypeScript finished, but the machine ran out of disk while writing final `.next` artifacts. Removed `.next` because it is regenerable.
