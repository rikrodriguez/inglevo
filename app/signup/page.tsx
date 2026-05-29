import { AuthForm } from "@/components/shared/auth-form";
import { SiteHeader } from "@/components/shared/site-header";

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <main className="landing-canvas flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_24px_90px_rgba(7,9,12,0.08)]">
          <p className="section-kicker">Start free</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Practice your first remote interview answer in minutes.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account, choose your role path and start with
            “Tell me about yourself”.
          </p>
          <div className="mt-6">
            <AuthForm mode="signup" />
          </div>
        </div>
      </main>
    </>
  );
}
