import {
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Laptop,
  Mic,
  MonitorCheck,
  Router,
  ShieldCheck,
} from "lucide-react";

const requirements = [
  ["Laptop ready", "Device and browser prepared for remote work.", Laptop],
  ["Camera ready", "Video-call presence for interviews and team calls.", Camera],
  ["Internet speed", "Stable connection for meetings and async work.", Router],
  ["Role English", "English aligned with the job the user wants.", BadgeCheck],
  ["Constant practice", "Repeated English practice, not a one-time test.", MonitorCheck],
  ["Simulators", "Interview, async writing and remote communication drills.", Mic],
  ["Opportunities", "Roles from companies open to remote LATAM talent.", BriefcaseBusiness],
] as const;

export function CertificationSignalSection() {
  return (
    <section id="certificate-signal" className="px-4 py-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="section-kicker">Not a diploma. A role-ready signal.</p>
          <h2 className="brand-section-title mt-4 text-6xl sm:text-7xl">
            Your certificate is the output.
          </h2>
          <p className="mt-7 max-w-xl text-xl leading-8 text-neutral-600">
            The Inglevo Verified profile shows role English, tool familiarity,
            remote setup and professional reliability. It is not a university
            diploma; it is a practical hiring signal.
          </p>
          <div className="mt-8 rounded-3xl border border-[#dfdbd6] bg-[#dfdbd6] p-5 text-sm leading-6 text-black">
            It does not guarantee employment, income, interviews, visas,
            sponsorship or job placement. It shows role signals that matter
            before hiring conversations start.
          </div>
        </div>

        <div className="hero-mockup">
          <div className="rounded-[2rem] bg-[var(--brand-black)] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker text-white/45">Inglevo Verified</p>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.055em]">
                  Software Engineering English
                </h3>
              </div>
              <div className="certificate-seal size-16">
                <ShieldCheck className="size-8" />
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {requirements.map(([title, copy, Icon], index) => (
                <div
                  key={title}
                  className="motion-stamp rounded-2xl border border-white/10 bg-white/[0.07] p-4"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <Icon className="size-5 text-[#d0f5e3]" />
                  <p className="mt-4 font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-5 text-white/60">{copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl bg-[#d0f5e3]/20 p-5">
              <p className="text-sm font-medium text-[#d0f5e3]">
                Designed to help employers see role-specific English beyond a
                generic “advanced English” claim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
