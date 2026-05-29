import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ href = "/", compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link href={href} className={`group flex items-center gap-2 font-semibold ${className}`}>
      <BrandMark />
      {compact ? null : (
        <span className="text-2xl font-extrabold tracking-[-0.07em] text-[#050d34]">
          inglevo
        </span>
      )}
    </Link>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid size-7 place-items-center overflow-hidden rounded-[0.65rem] bg-[linear-gradient(135deg,#7c2cff_0%,#5b5cf6_48%,#27a8ff_100%)] text-white shadow-[0_8px_18px_rgba(91,92,246,0.22)] transition duration-300 group-hover:scale-[1.03] ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className="relative size-5 transition duration-300 group-hover:scale-105"
      >
        <circle cx="13" cy="9" r="4.2" fill="currentColor" />
        <path
          d="M9 19.7c0-3 2.4-5.4 5.4-5.4s5.4 2.4 5.4 5.4v9.7c0 2.3-1.8 4.1-4.1 4.1h-2.6c-2.3 0-4.1-1.8-4.1-4.1v-9.7Z"
          fill="currentColor"
        />
        <path
          d="M16.5 28.7 31.2 13.8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="6.4"
        />
      </svg>
    </span>
  );
}
