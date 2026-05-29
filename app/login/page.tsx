import { AuthForm } from "@/components/shared/auth-form";
import { SiteHeader } from "@/components/shared/site-header";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-canvas flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
          <p className="section-kicker">Continue training</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Return to your readiness path.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to continue your interview practice, job assets and readiness
            progress.
          </p>
          <div className="mt-6">
            <AuthForm mode="login" />
          </div>
        </div>
      </main>
    </>
  );
}
