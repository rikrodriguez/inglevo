import {
  Award,
  BriefcaseBusiness,
  FileText,
  Mic,
  Radar,
  UserRoundCheck,
} from "lucide-react";

const capabilities = [
  ["Role English", UserRoundCheck],
  ["Tool Simulations", Radar],
  ["Remote Setup", Mic],
  ["Professionalism", FileText],
  ["Verified Certificate", Award],
  ["USD Opportunities", BriefcaseBusiness],
] as const;

export function CapabilityStrip() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="brand-marquee mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {capabilities.map(([label, Icon], index) => (
          <div
            key={label}
            className="motion-stamp rounded-full border border-black/5 bg-white px-4 py-3 text-center text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <span className="inline-flex items-center gap-2">
              <Icon className="size-4 text-black" />
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
